import type { Messages } from 'next-intl'

type KeybindMessages = Messages['pages']['keybinds']

/**
 * Section id that is both the URL anchor (`/keybinds#move-cursor`) and the
 * catalog key of its heading (`pages.keybinds.groups['move-cursor']`).
 */
export type KeybindGroupId = keyof KeybindMessages['groups']

export type KeybindActionId = keyof KeybindMessages['actions']

export type KeybindRow = {
  readonly action: KeybindActionId
  /** Space-separated keys, rendered as one `<KBD>` each, e.g. `'^ CMD Space'`. */
  readonly keys: string
}

export type KeybindSection = {
  readonly id: KeybindGroupId
  readonly rows: readonly KeybindRow[]
}

export type KeybindGroup = KeybindSection & {
  readonly subgroups: readonly KeybindSection[]
}

/**
 * The keybind cheat sheet in display order, rendered by {@link KeybindsClient}.
 *
 * Labels live in the catalog under `pages.keybinds`; shortcut strings stay here
 * because they are the same in every language. An id the catalog lacks fails `tsc`.
 */
export const KEYBIND_GROUPS: readonly KeybindGroup[] = [
  {
    id: 'raycast',
    rows: [
      { action: 'toggleRaycast', keys: 'CMD Space' },
      { action: 'clipboardHistory', keys: '^ D' },
      { action: 'searchSnippets', keys: 'CMD I' },
      { action: 'searchQuicklinks', keys: 'Option Q' },
      { action: 'searchEmojiAndSymbols', keys: '^ CMD Space' },
      { action: 'enToJp', keys: 'CMD J' },
      { action: 'confettiWithSound', keys: 'Option D' },
    ],
    subgroups: [],
  },
  {
    id: 'chrome',
    rows: [
      { action: 'toggleDevtools', keys: '^ Space' },
      { action: 'openChromeExtensions', keys: 'CMD E' },
      { action: 'openChromeBookmarks', keys: 'CMD B' },
      { action: 'duplicateTab', keys: 'CMD D' },
      { action: 'devtoolsPauseScript', keys: '^ J' },
    ],
    subgroups: [],
  },
  {
    id: 'editor',
    rows: [],
    subgroups: [
      {
        id: 'move-cursor',
        rows: [
          { action: 'cursorRight', keys: '^ F' },
          { action: 'cursorLeft', keys: '^ B' },
          { action: 'cursorUp', keys: '^ P' },
          { action: 'cursorDown', keys: '^ N' },
          { action: 'cursorRightWord', keys: 'Option F' },
          { action: 'cursorLeftWord', keys: 'Option B' },
          { action: 'cursorUpBlock', keys: 'Option P' },
          { action: 'cursorDownBlock', keys: 'Option N' },
          { action: 'moveCursorToLineStart', keys: '^ A' },
          { action: 'moveCursorToLineEnd', keys: '^ E' },
        ],
      },
      {
        id: 'selection',
        rows: [
          { action: 'rightWithSelection', keys: '^ F CMD' },
          { action: 'leftWithSelection', keys: '^ B CMD' },
          { action: 'upWithSelection', keys: '^ P CMD' },
          { action: 'downWithSelection', keys: '^ N CMD' },
          { action: 'cursorEndSelect', keys: '^ E CMD' },
          { action: 'cursorStartSelect', keys: '^ A CMD' },
          { action: 'cursorRightWordSelect', keys: '^ F Option' },
          { action: 'cursorLeftWordSelect', keys: '^ B Option' },
          { action: 'cursorTopBlockSelect', keys: '^ P Option' },
          { action: 'cursorBottomBlockSelect', keys: '^ N Option' },
          { action: 'rectangularSelectionOnMouseDrag', keys: 'Option Click' },
          { action: 'selectInnerBracket', keys: '^ CMD M' },
          { action: 'toggleStickySelection', keys: 'Option A' },
          { action: 'selectBracket', keys: 'Option A' },
        ],
      },
      {
        id: 'scroll',
        rows: [
          { action: 'cursorPageDown', keys: '^ V' },
          { action: 'cursorPageUp', keys: 'Option V' },
          { action: 'cursorTop', keys: '^-x ^-[' },
          { action: 'cursorBottm', keys: '^-x ^-]' },
          { action: 'scrollToCenter', keys: '^-x L' },
        ],
      },
      {
        id: 'code-edit',
        rows: [
          { action: 'deleteCharacter', keys: 'Delete' },
          { action: 'copy', keys: 'CMD C' },
          { action: 'paste', keys: 'CMD V' },
          { action: 'undo', keys: 'CMD Z' },
          { action: 'redo', keys: 'CMD Shift Z' },
          { action: 'duplicateLine', keys: 'CMD D' },
          { action: 'insertLineAbove', keys: '^ CMD Enter' },
          { action: 'insertLineBelow', keys: 'CMD Enter' },
          { action: 'deleteMatchedBracketOrTag', keys: '^-x ^-m' },
          { action: 'cutAllRight', keys: '^ K' },
          { action: 'renameSelectedSymbol', keys: '^ R' },
          { action: 'surroundWith', keys: 'Shift CMD T' },
          { action: 'surroundWithSnippet', keys: '^ CMD T' },
          { action: 'wrapWithHtmlTag', keys: '^ S' },
          { action: 'deleteParentHtmlTag', keys: '^ CMD S' },
        ],
      },
      {
        id: 'find',
        rows: [
          { action: 'findTextInCurrentSingleFile', keys: 'CMD F' },
          { action: 'findInProjectOrAnyFolder', keys: 'CMD Shift F' },
          { action: 'replaceTextInCurrentSingleFile', keys: 'CMD R' },
          { action: 'replaceTextInFolder', keys: 'CMD Shift R' },
        ],
      },
      {
        id: 'split-editor-window',
        rows: [
          { action: 'splitRight', keys: '^-x ^-f' },
          { action: 'splitDown', keys: '^-x ^-n' },
          { action: 'splitUp', keys: '^-x ^-p' },
          { action: 'moveFocusWindowRight', keys: '^-x ^-j' },
          { action: 'moveFocusWindowLeft', keys: '^-x ^-h' },
        ],
      },
      {
        id: 'code-jump',
        rows: [
          { action: 'goToImplementation', keys: 'CMD B' },
          { action: 'goToDefinition', keys: 'CMD B' },
          { action: 'goToTypeDeclaration', keys: 'CMD T' },
          { action: 'goToMatchingPairBraceBracket', keys: '^ M' },
          { action: 'goToMatchingHtmlJsxTag', keys: '^ CMD M' },
          { action: 'prevCodeJumpHistory', keys: 'CMD [' },
          { action: 'nextCodeJumpHistory', keys: 'CMD ]' },
          { action: 'nextHighlightSymbol', keys: 'CMD G' },
          { action: 'prevHighlightSymbol', keys: 'Shift CMD G' },
          { action: 'nextProblem', keys: 'Shift CMD P' },
        ],
      },
      {
        id: 'intellisense',
        rows: [{ action: 'showTypeBasedCompletion', keys: '^ I' }],
      },
      {
        id: 'file-explorer',
        rows: [
          { action: 'toggleExplorer', keys: 'CMD 1' },
          { action: 'focusEditor', keys: 'ESC' },
          { action: 'newFile', keys: 'CMD N' },
          { action: 'newFolder', keys: 'CMD D' },
          { action: 'rename', keys: '^ R' },
          { action: 'delete', keys: 'CMD Delete' },
          { action: 'copyRelativeFilePath', keys: 'CMD Shift C' },
        ],
      },
      {
        id: 'ide-feature',
        rows: [
          { action: 'commandPalette', keys: 'CMD P' },
          { action: 'openFilenameSearch', keys: 'Cmd O' },
          { action: 'openGoToSymbolSearch', keys: 'CMD Shift O' },
          { action: 'openRefactorMenuSelectedCode', keys: '^ T' },
          { action: 'showReferenceUsage', keys: 'CMD U' },
          { action: 'showContextMenu', keys: '^-c ^-c' },
          { action: 'toggleTerminal', keys: 'CMD + 2' },
          { action: 'togglePanelRightBottom', keys: 'Shift CMD D' },
          { action: 'reloadWindow', keys: '^-x ^-r' },
          { action: 'openSettings', keys: 'CMD ,' },
          { action: 'keybindSettings', keys: 'Shift CMD ,' },
          { action: 'openCursorSettings', keys: 'Shift CMD N' },
          { action: 'eslintFix', keys: '^-x ^-x' },
          { action: 'formatWithPrettier', keys: '^ Space' },
          { action: 'showMarkdownPreview', keys: 'CMD E' },
          { action: 'switchProject', keys: '^ W' },
          { action: 'togglePrimarySideBar', keys: '^-x ^-1' },
        ],
      },
      {
        id: 'ai',
        rows: [
          { action: 'toggleChatTab', keys: 'CMD L' },
          { action: 'newAiChat', keys: 'CMD Shift L' },
          { action: 'toggleCursorZedAgentTab', keys: '^-x ^-c' },
          { action: 'toggleCursorZedAgentsWindow', keys: 'CMD Shift J' },
        ],
      },
      {
        id: 'git',
        rows: [{ action: 'gitBlame', keys: '^-g ^-b' }],
      },
      {
        id: 'multiple-cursor',
        rows: [
          { action: 'multiCursorModifier', keys: 'ctrlCmd' },
          {
            action: 'rectangularMultiCursorSelectWebStorm',
            keys: 'Option Drag',
          },
          {
            action: 'rectangularMultiCursorSelectCursor',
            keys: 'Option Shift Drag',
          },
          { action: 'addOrRemoveCaret', keys: 'CMD Click' },
          { action: 'cloneCursorAbove', keys: 'Option CMD ↑' },
          { action: 'cloneCursorBelow', keys: 'Option CMD ↓' },
          { action: 'verticalCursorFill', keys: 'CMD Shift mouse' },
        ],
      },
    ],
  },
]
