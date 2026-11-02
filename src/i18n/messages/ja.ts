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

  pages: {
    home: {
      tagline: 'Web アプリケーション開発を、もっとまっすぐに。',
      bio: '東京在住の <link>Ryota Murakami</link> です。現在はフリーランスの React/Node/TypeScript エンジニアとして活動しています。ここは私が運営する独立系 OSS 組織のサイトです。',
      followOn: {
        twitter: 'Twitter でフォロー',
        instagram: 'Instagram でフォロー',
        github: 'GitHub でフォロー',
        linkedin: 'LinkedIn でフォロー',
      },
      photos: {
        photo1: '開発作業の様子を写した写真',
        photo2: 'クリエイティブコーディング作品のスナップショット',
        photo3: '開発用ワークスペースの様子',
        photo4: 'ソフトウェア開発での共同作業の様子',
        photo5: 'プログラミングの成果のハイライト',
      },
    },
    about: {
      meta: {
        title: 'プロフィール',
        description: 'OSS 活動のための独立した組織です。',
      },
      heading: 'Laststance.io は、こういうものをなくすための私の実験室です。➡️',
      portraitAlt: 'Ryota Murakami のポートレート写真',
      intro:
        '<link>東京在住の Ryota Murakami</link> です。ここは私個人の GitHub Organization のウェブサイトです。<br></br><br></br>もともと Laststance.io は、「@foo/mylib」のような npm のスコープ名を使うためだけに作った GitHub Organization でした。新しく公開するパッケージ名が、すでにほかの人に使われていても困らないようにするためです。',
      hub: 'でも今では、私のすべての OSS 活動をひとつにまとめる大切な拠点になっています。',
      focus:
        '現在の Laststance.io は、React をはじめとする Web 開発の課題に取り組むとともに、ソフトウェア開発の品質と開発者体験を高めるためのツールチェーンの開発・研究に力を入れています。',
      finalGig:
        'Laststance.io の最終目標は、最高の Web アプリケーションフレームワークを作ることです。<br></br>「週5日・1日8時間の仕事では時間が足りないし、毎日の仕事で疲れ切っている」？ それなら週3日だけ働いて、Web 開発や OSS のあらゆるものを生み出しましょう。',
      followOn: {
        twitter: 'Twitter でフォロー',
        instagram: 'Instagram でフォロー',
        github: 'GitHub でフォロー',
        linkedin: 'LinkedIn でフォロー',
      },
    },
    articles: {
      meta: {
        title: '記事',
        description:
          'JavaScript の OSS や新しいプロダクトなどについて書いた長文記事を、時系列でまとめています。',
      },
      intro:
        'React、CSS、JavaScript、TypeScript、Node.js を中心に、Web アプリケーション開発に関するリリース情報やアップデート、考えたことを時系列で書いています。',
    },
    projects: {
      meta: {
        title: 'プロジェクト',
        description:
          'Laststance.io のプロジェクト - Web 開発から複雑さを取り除くための取り組みです。',
      },
      intro:
        'Web 開発から不要な複雑さを取り除くことを目指しています。現実の課題を解決するツール、ライブラリ、アプリケーションを紹介します。',
      featuredLabel: '注目のプロジェクト',
      stableLabel: '安定版のプロジェクト',
      stableHeading: '安定版',
      iconsBy: 'アイコン提供：<link>Icons8</link>',
      categories: {
        desktopApp: 'デスクトップアプリ',
        vscodeExtension: 'VS Code 拡張機能',
        npmPackage: 'npm パッケージ',
        webApp: 'Web アプリ',
        reactLibrary: 'React ライブラリ',
        chromeExtension: 'Chrome 拡張機能',
        template: 'テンプレート',
        developerTool: '開発者ツール',
        macosApp: 'macOS アプリ',
      },
      items: {
        skillsDesktop:
          'インストール済みの Skills と、AI エージェント間のシンボリックリンクの状態を可視化します。21種類の AI エージェントに対応し、26種類のテーマを備えた Skills 管理用の GUI です。',
        goToDefinitionForJsdoc:
          "JSDoc の '{@link SymbolName}' 参照から、TypeScript のワークスペース内のシンボルへジャンプできます。移動のためだけの使い捨ての import を追加する必要はありません。",
        tailwindcssCanonicalClasses:
          '正規形ではない Tailwind CSS v4 のクラスを、同等の正規形（canonical）のクラスへ自動で変換します。Prettier プラグイン、CLI、コアライブラリとして提供しています。',
        reduxStorageMiddleware:
          'SSR でも安全に使える、localStorage への永続化のための Redux Toolkit ミドルウェアです。スライス単位の選択的なハイドレーションと、パフォーマンスの最適化に対応しています。',
        gitbox:
          'GitHub リポジトリをカンバンボード形式で管理できる Web アプリケーションです。リポジトリを視覚的に整理して、生産性を高められます。',
        reactLightbox:
          'キーボード操作とタッチ操作に対応した、柔軟でアクセシブルな画像表示用の React ライトボックスコンポーネントです。',
        reactFlowScrollbar:
          'React Flow / @xyflow/react v12 向けに、ビューポートと同期するカスタムスクロールバーと、ズームを考慮した範囲制限付きのパン操作を提供します。',
        eslintConfigTsPrefixer:
          '実行時に意味のあるルールと美しいフォーマッターを組み合わせた、こだわりの ESLint 設定です。',
        reactNextEslintPlugin:
          'React と Next.js 向けの ESLint プラグイン集です。ベストプラクティスを自動で徹底できます。',
        cleanUrl:
          'URL からトラッキングパラメーターを自動で取り除き、ブラウジング中のプライバシーを守ります。',
        coffeeTimer:
          'プッシュ通知と通知音のカスタマイズに対応した、コーヒーブレイク用のシンプルなタイマー PWA です。',
        createReactAppVite:
          'CRA 風のシンプルな Vite テンプレートです。おなじみの構成のまま、モダンなツールを使えます。',
        doINeedUmbrella:
          '天気をもとに判断を手助けするアプリです。毎日の「傘はいる？」という疑問に、シンプルに答えます。',
        dotfiles:
          '個人用の Mac OS X セットアップマニュアルです。開発環境を再現できるようにしています。',
        gitCommitGpt:
          'OpenAI の GPT モデルを使ってコミットメッセージを生成する、AI 搭載の Git 拡張です。',
        nextMswIntegration:
          'Next.js 16 と MSW を統合したデモです。ブラウザーとサーバーの両方の環境向けに Mock Service Worker をセットアップしています。',
        npmPublishTool:
          'バージョン管理も含めて、npm パッケージの公開をスムーズに行えるツールです。',
        nsx: '個人用の技術リソース記録ツールです。役に立った記事を集めて、あとから読み返せます。',
        prettierHuskyLintStagedInstaller:
          'コマンドひとつで、pre-commit 時にステージ済みのファイルを Prettier で整形する設定を導入できます。',
        reactTypescriptTodomvc2022:
          'モダンな TodoMVC の実装です。クリーンなコードとモダンなパターンで書かれています。',
        signage:
          '頭をクールダウンさせるための、暗い画面のスクリーンセーバーアプリです。気が散る要素を最小限にして、集中力を最大限に高めます。',
        viteRtkQuery:
          'RTK Query を含む React + TypeScript + Redux Toolkit 構成の Vite テンプレートです。',
      },
    },
    uses: {
      meta: {
        title: '愛用品',
        description:
          '私が使っているソフトウェアや、お気に入りの道具を紹介しています。',
      },
      intro:
        '愛用しているハードウェアやソフトウェアなどを紹介します。快適な作業環境を支えるお気に入りの道具の一覧です。',
      sections: {
        hardware: 'ハードウェア',
        development: '開発ツール',
        utility: 'ユーティリティ',
      },
      tools: {
        macbookPro: {
          title:
            '16インチ MacBook Pro M4 Max（16コア CPU、40コア GPU、64GB RAM）（2024年）',
          body: 'ついに、16コア CPU と 40コア GPU を備えた最新の Apple Silicon、M4 Max にアップグレードしました。Intel i7 から M4 Max への進化はまさに別次元で、コンパイル時間は約10倍速くなり、Cursor の AI アシスタントもパフォーマンスを気にせず快適に動くようになりました。ProMotion（最大 120Hz）対応の Liquid Retina XDR ディスプレイのおかげで、スクロールも驚くほど滑らかです。<br></br>64GB のユニファイドメモリは、Next.js のビルドや Docker コンテナー、複数のエディターの同時起動といった重い作業にも十分な容量です。Thunderbolt 5 にも対応しているので、この先も長く使えます。<br></br>引き続き、外付けの 1440p モニター、Magic Keyboard、Magic Trackpad と組み合わせたクラムシェルモードで使い、作業姿勢を保っています。M4 Max は熱効率が良いので、高負荷時でもマシンは静かなままです。',
        },
        magicKeyboard: {
          title: 'Apple Magic Keyboard - 英語（US）',
          body: 'キーボードには特にこだわりがないので、Apple 純正のものを使っています。特別な機能のない普通のキーボードで、性能のわりに値段は高いと思います。',
        },
        magicTrackpad: {
          title: 'Apple Magic Trackpad - ブラック（Multi-Touch 対応）',
          body: 'ブラックのものを使っています。MacBook Pro のトラックパッドとまったく同じ操作感で、ほかのノートパソコンと比べても最も完成度の高いポインティングデバイスです。Apple 製品にしては珍しく、価格と性能のバランスが取れていると思います。',
        },
        expressKeyboardPlatform: {
          title: 'eXpress Keyboard Platform',
          body: '外付けの Apple Magic Keyboard と Apple Magic Trackpad を、MacBook Pro と同じような配置で並べるためのガジェットです。これを使わずにキーボードの手前に Trackpad をただ置くだけだと、高さの差が大きすぎてキーボードをうまく打てません。このガジェットのおかげで、MacBook Pro のクラムシェルモードと通常のノートパソコンとしての使い方をスムーズに切り替えられます。',
        },
        lgUltragear: {
          title: 'LG 24 UltraGear FHD IPS 1ms 144Hz HDR モニター',
          body: '記憶が少しあいまいですが、Amazon のセールで安くなっていたので買った外付けモニターです。クラムシェルモードで接続しています。<br></br>このモニターの良いところは、表示の遅延をまったく感じないことです（1ms の遅延に気づける人なんているでしょうか？）。<br></br>遅延を感じないうえに、リフレッシュレートを最大 144Hz まで設定できるので、Web サイトのスクロールがとても滑らかです（MacBook Pro では、144Hz に設定すると画面が緑色になってしまうので 120Hz にしています）。<br></br>60Hz と 120Hz の滑らかさの違いは、ガジェット好きではない普通の人でもはっきりわかるほどです。<br></br>なので正直なところ、iPhone 15 Pro の 120Hz 対応は USB-C 化よりも重要なアップデートだったと思います。',
        },
        cursor: {
          title: 'Cursor',
          body: 'VS Code からフォークされたエディターで、私が知る限り最高の AI IDE です。ライブラリのドキュメントを取り込んで学習させたり、コードベース全体の知識をもとに質問に答えたりできるので、実際のプロダクト開発でも強力なツールになります。VS Code のフォークなので VS Code の keybinding.json や settings.json を参照でき、VS Code と併用するのも簡単です。',
        },
        webstorm: {
          title: 'WebStorm（JetBrains IDE）',
          body: 'まず何より、私は JetBrains の大ファンです。PHP の Symfony フレームワークを使ったプロジェクトで初めて PhpStorm を使って以来、コードの型や文脈を理解したうえで影響する箇所をすべて自動で書き換え、コードをきちんと Code Complete な状態に保ってくれる強力なリファクタリング機能に感動してきました。IDE を使う文化がまだなかった頃に、JavaScript 開発者が Sublime Text から VS Code に乗り換えたときの感覚に近いと思います。私は WebStorm、VS Code、Cursor の3つの IDE を使い分けています。WebStorm の一番の魅力は、自動インポート、IntelliSense、リファクタリングの正確さ、ESLint の autofix の実行速度で、Project Tree も一番使いやすいと思います。import 文を手で書く場面はほとんどないので、普通にプログラムを書くときはまず WebStorm を選びます。',
        },
        terminal: {
          title: 'Terminal（Mac OS X 標準）',
          body: 'ほかのターミナルアプリの高度な機能を知らないだけかもしれませんが、やりたいことをこなすには十分安定しているので、標準のターミナルが気に入っています。画面分割はまったく使わないので、標準の Terminal でも不便を感じないのかもしれません。複数のプロセスを立ち上げるときは、タブで管理しています。',
        },
        fishShell: {
          title: 'Fish Shell',
          body: 'プログラミング初心者だった頃、カスタマイズした zsh のような便利な機能がほぼ設定なしで使える、というブログを読んで bash から fish に乗り換えました。ただ当初の fish は bash/zsh と互換性がなく、Stack Overflow などで見つけたシェルスクリプトをそのまま実行できないのが不便でした。今では fish もメジャーなシェルになり、さまざまな CLI ツールのインストールスクリプトが fish に対応しているうえ、`config.fish` へのパス追加にも対応しているので、以前より使いやすくなっています。とはいえ、fish の機能のひとつである `abbr` コマンドの使い方がわからず、いつも alias を使っています…',
        },
        volta: {
          title: 'Volta',
          body: 'Volta は Node.js のバージョン管理ツールで、nvm の代わりになるものです。シンプルな API を備えていて、`volta pin` コマンドでプロジェクトの Node.js バージョンを package.json に記録しておくと、そのディレクトリに移動したときに Node.js のバージョンを自動で切り替えてくれます。',
        },
        pnpm: {
          title: 'pnpm',
          body: 'JS/TS のプロジェクトでは、すべてパッケージマネージャーに pnpm を使っています。ストレージを大幅に節約できるうえ、モジュール解決がとても素直で、<br></br>アプリケーション側で import するパッケージは、トップレベルの package.json の dependency/devDependency に書かれていなければなりません。<br></br>素直でトラブルの起きにくいモジュール解決ルールを持った、すばらしいパッケージマネージャーだと思います。<br></br>ときどき Bun も使っています。TS を直接実行でき、多くの場合 Node.js より高速なランタイムです。',
        },
        figma: {
          title: 'Figma',
          body: 'コンポーネント指向のフロントエンド開発におけるデザインデータと実装コードの橋渡し、<br></br>個人で GUI アプリケーションを開発するときに必要になるデザイナーとしてのスキルやデザインツールのスキル、そして VS Code や Storybook の Figma 拡張機能の登場など、開発者もデザインツールのスキルを身につけておいたほうがいいと感じる場面が、ここ数年で増えてきました。<br></br>デザイナーとしての能力も、フルスタック開発者が関心を持つべき範囲に含まれていると思います。',
        },
        raycast: {
          title: 'Raycast',
          body: '英単語のスペルを覚えるのが苦手なので、Raycast で一番使っているのは辞書機能です。<br></br>ほかにも、GitHub のリポジトリ検索、プロセスの強制終了（kill process）、Bing 検索、フローティングノートを使っています。まだ知らない便利な使い方がたくさんあるはずなので、時間があるときにいろいろな拡張機能を試してみたいです。<br></br>Raycast 上で AI に質問したい場面が見つからなかったので、無料プランを使っています。',
        },
        istatMenus: {
          title: 'iStat Menu',
          body: 'アクティビティモニタのように、マシンのあらゆる統計情報をメニューバーに表示してくれるアプリです。<br></br>センサータブで CPU の温度やファンの回転数を眺めたり、ファンの回転数を 100% にして CPU をどこまで冷やせるか試したりするのが楽しいです。',
        },
      },
    },
    privacy: {
      meta: {
        title: 'プライバシーポリシー',
        description:
          'laststance.io と、Laststance.io の名前で公開している個人用ツールが収集する情報と、その利用方法について説明します。',
      },
      translationNotice:
        'この日本語訳は参考訳です。英語版と内容に相違がある場合は英語版が優先されます。',
      intro:
        'Laststance.io は Ryota Murakami が個人で運営しています。このページでは、このウェブサイトと私の個人用ツールが収集する情報について説明します。最終更新日：{date}',
      website: {
        title: 'このウェブサイト',
        analytics:
          'laststance.io には、アカウント登録、サインイン、入力フォームはありません。Cookie を使わずにページビューを計測するために Vercel Analytics を、エラーを把握して修正するために Sentry を使用しています。エラーレポートには、お使いのブラウザーのバージョン、ページの URL、IP アドレスが含まれる場合があります。',
        noSale:
          'これらのデータを販売することはなく、広告目的で利用することもありません。',
      },
      google: {
        title: 'Google アカウントへのアクセス',
        tool: '私は、OAuth を使って Google API に接続するコマンドラインツール（「gog cli」）を運用しています。このツールは私個人が使うためのもので、サインインするのは私だけです。このツールが読み書きするのは、私自身の Google アカウント内の Gmail と Google カレンダーのデータです。',
        tokens:
          'このツールは私自身のコンピューター上で動作し、アクセストークンもそのコンピューターの外には出ません。私はときどき、このツールを通じて AI アシスタントに自分のメールやカレンダーを読ませることがあり、その際は私の依頼に応えるために、その内容がアシスタントのモデル提供元（Anthropic）に送信されます。それ以外に、データが Laststance のサーバーに送信されたり、販売されたり、広告に利用されたりすることはありません。',
        limitedUse:
          'このツールによる Google API から受け取った情報の使用は、限定使用（Limited Use）の要件を含め、Google API サービスのユーザーデータに関するポリシー（Google API Services User Data Policy）に準拠しています。アクセス権は、Google アカウントの権限ページからいつでも取り消すことができます。',
      },
      contact: {
        title: 'お問い合わせ',
        body: '本ポリシーに関するご質問は、<link>dojce1048@gmail.com</link> までお寄せください。',
      },
    },
    keybinds: {
      meta: {
        title: 'キーバインド',
        description: '私が使っているエディターのキーバインドです。',
      },
      intro:
        '私が使っている Raycast、Cursor、WebStorm、Chrome のショートカット集です。チートシートとして、このページをいつも開いています。（macOS・US キーボード配列）',
      tableLabel: '{label} のショートカット',
      groups: {
        raycast: 'Raycast',
        chrome: 'Chrome',
        editor: 'エディター',
        'move-cursor': 'カーソル移動',
        selection: '選択',
        scroll: 'スクロール',
        'code-edit': 'コード編集',
        find: '検索',
        'split-editor-window': 'エディターの分割',
        'code-jump': 'コードジャンプ',
        intellisense: 'IntelliSense',
        'file-explorer': 'ファイルエクスプローラー',
        'ide-feature': 'IDE の機能',
        ai: 'AI',
        git: 'Git',
        'multiple-cursor': 'マルチカーソル',
      },
      actions: {
        toggleRaycast: 'Raycast の表示切り替え',
        clipboardHistory: 'クリップボード履歴',
        searchSnippets: 'スニペットを検索',
        searchQuicklinks: 'クイックリンクを検索',
        searchEmojiAndSymbols: '絵文字と記号を検索',
        enToJp: '英日翻訳',
        confettiWithSound: '効果音付きの紙吹雪',
        toggleDevtools: 'DevTools の表示切り替え',
        openChromeExtensions: 'chrome://extensions/ を開く',
        openChromeBookmarks: 'chrome://bookmarks/ を開く',
        duplicateTab: 'タブを複製',
        devtoolsPauseScript: 'DevTools：スクリプトの実行を一時停止',
        cursorRight: 'カーソルを右へ',
        cursorLeft: 'カーソルを左へ',
        cursorUp: 'カーソルを上へ',
        cursorDown: 'カーソルを下へ',
        cursorRightWord: '単語単位で右へ',
        cursorLeftWord: '単語単位で左へ',
        cursorUpBlock: 'ブロック単位で上へ',
        cursorDownBlock: 'ブロック単位で下へ',
        moveCursorToLineStart: '行頭へ移動',
        moveCursorToLineEnd: '行末へ移動',
        rightWithSelection: '選択しながら右へ',
        leftWithSelection: '選択しながら左へ',
        upWithSelection: '選択しながら上へ',
        downWithSelection: '選択しながら下へ',
        cursorEndSelect: 'cursorEndSelect',
        cursorStartSelect: 'cursorStartSelect',
        cursorRightWordSelect: 'cursorRightWordSelect',
        cursorLeftWordSelect: 'cursorLeftWordSelect',
        cursorTopBlockSelect: 'cursorTopBlockSelect',
        cursorBottomBlockSelect: 'cursorBottomBlockSelect',
        rectangularSelectionOnMouseDrag: 'マウスドラッグで矩形選択',
        selectInnerBracket: '括弧の内側を選択（Cursor/Zed）',
        toggleStickySelection: 'スティッキー選択の切り替え（WebStorm）',
        selectBracket: '括弧ごと選択（Cursor/Zed）',
        cursorPageDown: 'cursorPageDown',
        cursorPageUp: 'cursorPageUp',
        cursorTop: 'cursorTop',
        cursorBottm: 'cursorBottm',
        scrollToCenter: '画面中央へスクロール',
        deleteCharacter: '1文字削除',
        copy: 'コピー',
        paste: '貼り付け',
        undo: '元に戻す',
        redo: 'やり直し',
        duplicateLine: '行を複製',
        insertLineAbove: '上に行を挿入（Cursor/Zed）',
        insertLineBelow: '下に行を挿入（Cursor/Zed）',
        deleteMatchedBracketOrTag: '対応する括弧またはタグを削除',
        cutAllRight: 'カーソル位置から行末までカット',
        renameSelectedSymbol: '選択中のシンボル名を変更',
        surroundWith: '囲む（Surround With）',
        surroundWithSnippet: 'スニペットで囲む',
        wrapWithHtmlTag: '選択範囲を HTML タグで囲む：子要素を選択して ->',
        deleteParentHtmlTag: '親の HTML タグを削除（子要素は残す）（WebStorm）',
        findTextInCurrentSingleFile: '現在のファイル内を検索',
        findInProjectOrAnyFolder: 'プロジェクトまたはフォルダー内を検索',
        replaceTextInCurrentSingleFile: '現在のファイル内で置換',
        replaceTextInFolder: 'フォルダー内で置換',
        splitRight: '右に分割',
        splitDown: '下に分割',
        splitUp: '上に分割',
        moveFocusWindowRight: '右のウィンドウへフォーカスを移動',
        moveFocusWindowLeft: '左のウィンドウへフォーカスを移動',
        goToImplementation: '実装へ移動',
        goToDefinition: '定義へ移動',
        goToTypeDeclaration: '型宣言へ移動',
        goToMatchingPairBraceBracket: '対応する括弧へ移動',
        goToMatchingHtmlJsxTag: '対応する HTML/JSX タグへ移動（Cursor）',
        prevCodeJumpHistory: 'ジャンプ履歴を戻る',
        nextCodeJumpHistory: 'ジャンプ履歴を進む',
        nextHighlightSymbol: '次のハイライトされたシンボルへ',
        prevHighlightSymbol: '前のハイライトされたシンボルへ',
        nextProblem: '次の問題へ',
        showTypeBasedCompletion: '型に基づく補完候補を表示',
        toggleExplorer: 'エクスプローラーの表示切り替え',
        focusEditor: 'エディターにフォーカス',
        newFile: '新しいファイル',
        newFolder: '新しいフォルダー',
        rename: '名前を変更',
        delete: '削除',
        copyRelativeFilePath: '相対パスをコピー',
        commandPalette: 'コマンドパレット',
        openFilenameSearch: 'ファイル名検索を開く',
        openGoToSymbolSearch: 'シンボル検索（Go to Symbol）を開く',
        openRefactorMenuSelectedCode:
          '選択したコードのリファクタリングメニューを開く',
        showReferenceUsage: '参照/使用箇所を表示',
        showContextMenu: 'コンテキストメニューを表示',
        toggleTerminal: 'ターミナルの表示切り替え',
        togglePanelRightBottom: 'パネルの位置を右/下で切り替え',
        reloadWindow: 'ウィンドウを再読み込み',
        openSettings: '設定を開く',
        keybindSettings: 'キーバインド設定',
        openCursorSettings: 'Cursor の設定を開く',
        eslintFix: 'ESLint —fix を実行',
        formatWithPrettier: 'Prettier でフォーマット',
        showMarkdownPreview: 'Markdown プレビューを表示',
        switchProject: 'プロジェクトを切り替え',
        togglePrimarySideBar: 'プライマリサイドバーの表示切り替え',
        toggleChatTab: 'チャットタブの表示切り替え',
        newAiChat: '新しい AI チャット',
        toggleCursorZedAgentTab: 'Cursor/Zed のエージェントタブの表示切り替え',
        toggleCursorZedAgentsWindow:
          'Cursor/Zed のエージェントウィンドウの表示切り替え',
        gitBlame: 'Git Blame を表示（WebStorm）',
        multiCursorModifier:
          'editor.multiCursorModifier（VS Code/Cursor の settings.json。macOS では ctrlCmd に設定すると、CMD+クリックでマルチカーソル、Option+ドラッグで矩形選択になります）',
        rectangularMultiCursorSelectWebStorm:
          '矩形マルチカーソル選択（WebStorm）',
        rectangularMultiCursorSelectCursor: '矩形マルチカーソル選択（Cursor）',
        addOrRemoveCaret:
          'キャレットを追加/削除（macOS で multiCursorModifier を ctrlCmd にした場合）',
        cloneCursorAbove: '上にカーソルを複製',
        cloneCursorBelow: '下にカーソルを複製',
        verticalCursorFill: '縦方向にカーソルを追加（Cursor）',
      },
    },
  },
} satisfies CatalogShape

export default ja
