# Safe Chain Workflow PR Creation Guide

## 概要

このスクリプトは、laststance organization の全リポジトリに対して、malware-safe-chain ワークフローファイルを追加または更新する PR を作成するためのものです。

## 現在の状況

- ✅ ワークフローファイルのテンプレートを作成済み
- ✅ 各リポジトリの既存ワークフローを確認済み
- ❌ PR 作成は権限不足のため失敗（GitHub App/Bot の権限が不十分）

## 使用方法

### 方法1: スクリプトを実行して手動で PR を作成

```bash
# スクリプトを実行して、各リポジトリのワークフローファイルを生成
python3 create_safe_chain_prs.py

# 生成されたワークフローファイルを確認し、手動で PR を作成
```

### 方法2: GitHub Actions を使用して PR を作成

適切な権限を持つ GitHub App または Personal Access Token を使用して、スクリプトを実行してください。

## ワークフローファイルの内容

最新のワークフローファイルは、curl 経由でのインストールを使用しています：

```yaml
name: Malware Safe Chain

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
      - name: Install pnpm  # pnpm を使用する場合のみ
        uses: pnpm/action-setup@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install safe-chain
        run: curl -fsSL https://raw.githubusercontent.com/AikidoSec/safe-chain/main/install-scripts/install-safe-chain.sh | sh -s -- --ci

      - name: Install dependencies with Safe Chain protection
        run: pnpm install --frozen-lockfile  # または npm ci, yarn install --frozen-lockfile
```

## レガシーなワークフローファイルの更新

既存のワークフローファイルが以下のようなレガシーな形式の場合：

```yaml
- name: Install Aikido Safe Chain
  run: npm install -g @aikidosec/safe-chain
- name: Setup Safe Chain for CI
  run: safe-chain setup-ci
```

これを以下のように更新してください：

```yaml
- name: Install safe-chain
  run: curl -fsSL https://raw.githubusercontent.com/AikidoSec/safe-chain/main/install-scripts/install-safe-chain.sh | sh -s -- --ci
```

## 注意事項

- アーカイブされたリポジトリはスキップされます
- 書き込み権限がないリポジトリはスキップされます
- package.json がないリポジトリはスキップされます
