import type { CatalogShape } from './en'

/**
 * Japanese catalog, translated key by key from `en.ts`.
 *
 * Prose uses です・ます調 and labels are short phrases. Product names, code and
 * "Ryota Murakami" stay verbatim, with a half-width space between Japanese and
 * Latin words. Rich tags may move within a sentence but never disappear.
 */
const ja = {
  Metadata: {
    description: 'コーディングプロジェクトに取り組む独立系 OSS 組織です。',
  },

  Nav: {
    about: 'プロフィール',
    articles: '記事',
    projects: 'プロジェクト',
    uses: '愛用品',
    keybinds: 'キーバインド',
    nsx: 'NSX',
    menu: 'メニュー',
    navigation: 'ナビゲーション',
    toggleMenu: 'ナビゲーションメニューを開閉',
    menuLabel: 'ナビゲーションメニュー',
    closeMenu: 'メニューを閉じる',
  },

  Header: {
    homeLabel: 'ホーム',
    avatarAlt: 'Ryota Murakami のプロフィール画像',
  },

  Common: {
    opensInNewTab: '{label}（新しいタブで開きます）',
    sendEmailTo: '{email} にメールを送る',
    readArticle: '記事を読む',
    personalSiteLabel: 'Ryota Murakami の個人サイト（新しいタブで開きます）',
  },

  ThemeToggle: {
    switchTo: '{theme}テーマに切り替え',
    toggle: 'テーマを切り替え',
    themes: {
      dark: 'ダーク',
      light: 'ライト',
    },
  },

  WhatsNew: {
    trigger: '更新履歴',
    openLabel: '更新履歴ダイアログを開く',
    title: '更新履歴',
    description: 'このサイトの最新の更新内容と変更点',
    listLabel: '更新履歴の一覧',
    items: {
      addNewProjects: 'プロジェクトページに新しいプロジェクトを追加',
      projectsRedesign:
        '🎨 プロジェクトページをリデザイン：9つのカテゴリで分類したレイアウトに刷新',
      updatedMacBookPro:
        '📱 MacBook Pro を更新：M4 Max（16コア CPU、40コア GPU、64GB RAM）にアップグレード',
      updateProjectsPage: 'プロジェクトページを更新',
      keybindsChromeRaindropIde:
        'キーバインドを更新：Chrome、Raindrop、IDE のショートカットを追加',
      updateKeybindsStyle: 'キーバインドページのスタイルを更新',
      updateUsesPage: '愛用品ページを更新',
      updateKeybinds: 'キーバインドを更新',
      increaseGithubFeedRecord: 'GitHub フィードの表示件数を増加',
      keybindOpenKeybindingJson:
        'キーバインド：VSCode で Keybinding.json を開く',
      keybindsUpdateSelection: 'キーバインド：選択系コマンドを更新',
      addArticle: '記事「<link>{title}</link>」を追加',
      fixInstallerLink:
        'プロジェクト：prettier-husky-lint-staged-installer のリンク切れを修正',
      addPost: '記事「<link>{title}</link>」を投稿',
      updateGoToSymbolKeybind:
        '「Go to symbol」のキーバインドを「CMD + Shift + O」に変更',
      removeIncorrectKeybinds: '誤っていたキーバインドを削除',
      fixBlogPostBodyStyle: '崩れていたブログ記事本文のスタイルを修正',
      addOgImage: 'OG 画像を追加',
      addLaststanceAndDotfiles:
        'プロジェクトに Laststance.io と Dotfiles を追加',
      fixKeybindsTypography: 'キーバインドページのタイポグラフィを修正',
      addWhatsNew: '更新履歴を追加',
      changeShadcnBaseColor: 'shadcn の "baseColor" を "zinc" に変更',
      fixGithubFeedStyle: 'GitHub フィードのスタイルを修正',
      addIcons8Credit: 'プロジェクトページに Icons8 のクレジットを追加',
    },
  },

  Dialog: {
    close: '閉じる',
  },

  Mermaid: {
    loading: '図を読み込み中…',
    openFullscreen: '図を全画面ビューアーで開く',
    lightboxTitle: 'Mermaid 図（拡大・縮小できます）',
    lightboxDescription:
      'ツールバーのボタン、マウスホイール、ドラッグ、ピンチ操作、またはキーボードのプラス・マイナス・ゼロキーで、図の拡大・縮小や移動ができます。Esc キーで閉じます。',
    zoomOut: '縮小（-）',
    resetZoom: 'ズームをリセット（0）',
    zoomIn: '拡大（+）',
  },

  Kbd: {
    keyLabel: 'キー：{keyName}',
  },

  Footer: {
    copyright: '© {year} Laststance.io. All rights reserved.',
  },

  Pagination: {
    label: 'ページ送り',
    previousLabel: '前のページへ',
    previous: '前へ',
    pageOf: '{current} / {total} ページ',
    goToPage: '{page} ページへ移動',
    nextLabel: '次のページへ',
    next: '次へ',
  },

  NotFound: {
    code: '404',
    title: 'ページが見つかりません',
    description: 'お探しのページは見つかりませんでした。',
    backHome: 'ホームに戻る',
  },

  pages: {},
} satisfies CatalogShape

export default ja
