#!/usr/bin/env python3
"""
Create pull requests to add/update malware-safe-chain.yml workflow
for all laststance organization repositories.
"""

import json
import subprocess
import tempfile
import os
from pathlib import Path


def run_gh_command(cmd: list[str]) -> dict | list | None:
    """Run a GitHub CLI command and return parsed JSON."""
    try:
        result = subprocess.run(
            ["gh"] + cmd,
            capture_output=True,
            text=True,
            check=True,
        )
        return json.loads(result.stdout)
    except subprocess.CalledProcessError:
        return None
    except json.JSONDecodeError:
        return None


def get_repos() -> list[str]:
    """Get all repositories in the laststance organization."""
    repos = run_gh_command(["api", "orgs/laststance/repos", "--paginate"])
    if not repos:
        return []
    return [repo["full_name"] for repo in repos]


def has_file(repo: str, path: str) -> bool:
    """Check if a file exists in a repository."""
    result = run_gh_command(["api", f"repos/{repo}/contents/{path}"])
    return result is not None


def get_file_content(repo: str, path: str) -> str | None:
    """Get file content from a repository."""
    result = run_gh_command(["api", f"repos/{repo}/contents/{path}"])
    if not result:
        return None
    import base64

    return base64.b64decode(result["content"]).decode("utf-8")


def detect_package_manager(repo: str) -> tuple[str, str]:
    """
    Detect package manager and return (install_cmd, setup_steps).
    Returns (install_cmd, setup_steps) tuple.
    """
    # Check existing workflow first
    existing = get_file_content(repo, ".github/workflows/malware-safe-chain.yml")
    if existing:
        if "pnpm install" in existing:
            return (
                "pnpm install --frozen-lockfile",
                """      - name: Install pnpm
        uses: pnpm/action-setup@v4
      - name: Use Node.js""",
            )
        elif "yarn install" in existing:
            return ("yarn install --frozen-lockfile", "      - name: Use Node.js")
        elif "npm ci" in existing or "npm install" in existing:
            return ("npm ci", "      - name: Use Node.js")

    # Check lock files
    if has_file(repo, "pnpm-lock.yaml"):
        return (
            "pnpm install --frozen-lockfile",
            """      - name: Install pnpm
        uses: pnpm/action-setup@v4
      - name: Use Node.js""",
        )
    elif has_file(repo, "yarn.lock"):
        return ("yarn install --frozen-lockfile", "      - name: Use Node.js")
    elif has_file(repo, "package-lock.json"):
        return ("npm ci", "      - name: Use Node.js")

    # Default to pnpm
    return (
        "pnpm install --frozen-lockfile",
        """      - name: Install pnpm
        uses: pnpm/action-setup@v4
      - name: Use Node.js""",
    )


def is_legacy_workflow(content: str) -> bool:
    """Check if workflow uses legacy npm install method."""
    # Check if it uses npm install -g @aikidosec/safe-chain
    has_npm_install = "@aikidosec/safe-chain" in content and "npm install -g" in content
    # Check if it doesn't use curl installation
    has_curl_install = "curl -fsSL https://raw.githubusercontent.com/AikidoSec/safe-chain" in content
    return has_npm_install or not has_curl_install


def generate_workflow(repo: str) -> str:
    """Generate workflow file content for a repository."""
    install_cmd, setup_steps = detect_package_manager(repo)

    return f"""name: Malware Safe Chain

on:
  pull_request: ~
  push:
    branches:
      - main

jobs:
  malware-safe-chain:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
{setup_steps}
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install safe-chain
        run: curl -fsSL https://raw.githubusercontent.com/AikidoSec/safe-chain/main/install-scripts/install-safe-chain.sh | sh -s -- --ci

      - name: Install dependencies with Safe Chain protection
        run: {install_cmd}
"""


def create_pr(repo: str, workflow_content: str, is_update: bool) -> bool:
    """Create a pull request for a repository."""
    original_cwd = os.getcwd()
    
    try:
        # Create a temporary directory
        with tempfile.TemporaryDirectory() as tmpdir:
            repo_name = repo.split("/")[1]
            branch_name = f"update-malware-safe-chain-{repo_name}"

            # Clone repository
            clone_result = subprocess.run(
                ["gh", "repo", "clone", repo, tmpdir],
                capture_output=True,
                text=True,
                check=False,
            )
            if clone_result.returncode != 0:
                print(f"  Failed to clone {repo}: {clone_result.stderr}")
                return False

            # Change to repo directory first
            os.chdir(tmpdir)

            # Create or update workflow file
            workflow_path = Path(".github") / "workflows" / "malware-safe-chain.yml"
            workflow_path.parent.mkdir(parents=True, exist_ok=True)
            workflow_path.write_text(workflow_content)

            # Check if there are changes
            result = subprocess.run(
                ["git", "diff", "--quiet", "--exit-code", str(workflow_path)],
                capture_output=True,
            )
            if result.returncode == 0:
                # Also check if file is staged or untracked
                status_result = subprocess.run(
                    ["git", "status", "--porcelain", str(workflow_path)],
                    capture_output=True,
                    text=True,
                )
                if not status_result.stdout.strip():
                    print(f"  No changes for {repo}")
                    return False

            # Check if branch already exists
            branch_check = subprocess.run(
                ["git", "show-ref", "--verify", "--quiet", f"refs/heads/{branch_name}"],
                capture_output=True,
            )
            if branch_check.returncode == 0:
                # Branch exists locally, delete it
                subprocess.run(
                    ["git", "branch", "-D", branch_name],
                    capture_output=True,
                )
            
            # Check if remote branch exists
            remote_check = subprocess.run(
                ["git", "ls-remote", "--heads", "origin", branch_name],
                capture_output=True,
                text=True,
            )
            if remote_check.stdout.strip():
                # Remote branch exists, use a different name with timestamp
                import time
                branch_name = f"{branch_name}-{int(time.time())}"

            # Create branch and commit
            subprocess.run(
                ["git", "checkout", "-b", branch_name],
                check=True,
                capture_output=True,
            )
            subprocess.run(
                ["git", "add", str(workflow_path)],
                check=True,
                capture_output=True,
            )

            commit_msg = (
                "chore(ci): update malware-safe-chain workflow to use curl installation"
                if is_update
                else "chore(ci): add malware-safe-chain workflow"
            )
            subprocess.run(
                ["git", "commit", "-m", commit_msg],
                check=True,
                capture_output=True,
            )
            push_result = subprocess.run(
                ["git", "push", "-u", "origin", branch_name],
                check=False,
                capture_output=True,
                text=True,
            )
            if push_result.returncode != 0:
                error_msg = push_result.stderr
                if "archived" in error_msg or "read-only" in error_msg:
                    print(f"  Skipping (repository is archived)")
                    return False
                elif "Permission" in error_msg or "denied" in error_msg:
                    print(f"  Skipping (no write permission)")
                    return False
                else:
                    print(f"  Push failed: {error_msg}")
                    return False

            # Create PR using GitHub API
            pr_title = (
                "Update malware-safe-chain workflow to use curl installation"
                if is_update
                else "Add malware-safe-chain workflow"
            )
            pr_body = (
                "This PR updates the malware-safe-chain workflow to use the latest curl-based installation method "
                "instead of the legacy npm installation, as recommended by the [safe-chain repository](https://github.com/AikidoSec/safe-chain)."
                if is_update
                else "This PR adds the malware-safe-chain workflow to protect against malicious npm packages "
                "during CI/CD, as recommended by the [safe-chain repository](https://github.com/AikidoSec/safe-chain)."
            )

            # Get default branch
            default_branch_result = run_gh_command(["api", f"repos/{repo}"])
            if not default_branch_result:
                print(f"  Failed to get repository info")
                return False
            default_branch = default_branch_result.get("default_branch", "main")

            # Create PR using GitHub API
            pr_data = {
                "title": pr_title,
                "body": pr_body,
                "head": branch_name,
                "base": default_branch,
            }
            
            pr_result = run_gh_command([
                "api",
                f"repos/{repo}/pulls",
                "--method", "POST",
                "--field", f"title={pr_title}",
                "--field", f"body={pr_body}",
                "--field", f"head={branch_name}",
                "--field", f"base={default_branch}",
            ])
            
            if pr_result and "html_url" in pr_result:
                print(f"  Created PR: {pr_result['html_url']}")
                return True
            else:
                # Try with gh pr create as fallback
                pr_result = subprocess.run(
                    [
                        "gh",
                        "pr",
                        "create",
                        "--title",
                        pr_title,
                        "--body",
                        pr_body,
                        "--repo",
                        repo,
                    ],
                    check=False,
                    capture_output=True,
                    text=True,
                )
                if pr_result.returncode == 0:
                    print(f"  Created PR: {pr_result.stdout.strip()}")
                    return True
                else:
                    print(f"  Failed to create PR: {pr_result.stderr}")
                    return False
    finally:
        os.chdir(original_cwd)


def main():
    """Main function."""
    repos = get_repos()
    print(f"Found {len(repos)} repositories\n")

    success_count = 0
    skip_count = 0
    error_count = 0

    for repo in repos:
        print(f"Processing {repo}...")

        # Skip if no package.json
        if not has_file(repo, "package.json"):
            print("  Skipping (no package.json)\n")
            skip_count += 1
            continue

        # Check if workflow exists
        existing_content = get_file_content(
            repo, ".github/workflows/malware-safe-chain.yml"
        )
        is_update = existing_content is not None
        is_legacy = is_update and is_legacy_workflow(existing_content)

        if is_update and not is_legacy:
            print("  Workflow already exists and uses curl installation (up-to-date)\n")
            skip_count += 1
            continue

        # Generate workflow
        workflow_content = generate_workflow(repo)

        # Create PR
        try:
            success = create_pr(repo, workflow_content, is_update)
            if success:
                print(f"  ✓ Created PR for {repo}\n")
                success_count += 1
            else:
                print(f"  - No changes needed for {repo}\n")
                skip_count += 1
        except Exception as e:
            print(f"  ✗ Error creating PR for {repo}: {e}\n")
            error_count += 1

    print(f"\nSummary:")
    print(f"  ✓ Successfully created PRs: {success_count}")
    print(f"  - Skipped: {skip_count}")
    print(f"  ✗ Errors: {error_count}")


if __name__ == "__main__":
    main()
