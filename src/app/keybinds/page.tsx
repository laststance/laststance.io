import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/SimpleLayout'

import KeybindsClient from './KeybindsClient'

const title = 'Keybinds'
export const metadata: Metadata = {
  title: title,
  description: 'My Editor Keybinds.',
  openGraph: {
    title,
    images: [`/api/og?title=${title}`],
  },
}

interface KeybindsList {
  [category: string]: Record<string, string>
}

const keybinds: KeybindsList = {
  Raycast: {
    'Toggle Raycast': 'CMD Space',
    'Clipboard History': '^ D',
    'Search Snippets': 'CMD I',
    'Search Quicklinks': 'Option Q',
    'Search Emoji & Symbols': '^ CMD Space',
    'EN to JP': 'Option E',
    'Maximize(Window Management)': 'Option M',
    'Toggle Raycast Note': 'Option Space',
    'Confetti with sound': 'Option D',
  },
  'Move Cursor': {
    'Cursor Right': '^ F',
    'Cursor Left': '^ B',
    'Cursor Top': '^ P',
    'Cursor Down': '^ N',
    'Cursor Right Word': 'Option F',
    'Cursor Left Word': 'Option B',
    'Cursor Top Block': 'Option P',
    'Cursor Down Block': 'Option N',
    'Move Cursor to Line Start': '^ A',
    'Move Cursor to Line End': '^ E',
  },
  Selection: {
    'Right with Selection': '^ F CMD',
    'Left with Slection': '^ B CMD',
    'Up with Section': '^ P CMD',
    'Down with Section': '^ N CMD',
    cursorEndSelect: '^ E CMD',
    cursorStartSelect: '^ A CMD',
    cursorRightWordSelect: '^ F Option',
    cursorLeftWordSelect: '^ B Option',
    cursorTopBlockSelect: '^ P Option',
    cursorBottomBlockSelect: '^ N Option',
    'Rectangular Selection on Mouse Drag': 'Option Click',
    'Select Inner Bracket(Cursor)': '^ CMD M',
    'Toggle Sticky Selection(WebStorm)': 'Option A',
    'Select bracet(Cursor)': 'Option A',
    'Select Current Single Line': '^ L',
  },
  Scroll: {
    cursorPageDown: '^ V',
    cursorPageUp: 'Option V',
    cursorTop: '^-x ^-[',
    cursorBottm: '^-x ^-]',
    'Scroll to Center(WebStorm)': '^-x L',
  },
  'Code Edit': {
    'delete single charchtar': 'Delete',
    Copy: 'CMD C',
    Paste: 'CMD V',
    Undo: 'CMD Z',
    Redo: 'CMD Shift Z',
    'Duplicate Line': 'CMD D',
    'Insert line Above(Cursor)': '^ CMD Enter',
    'Insert line Below(Cursor)': 'CMD Enter',
    'Delete matched bracket or tag': '^-x ^-m',
    'Cut All Left': '^ W',
    'Cut All Right': '^ K',
    'Rename selected symbol': '^ R',
    'Wrapping selected HTML Tag: select children elements ->': '^ S',
    'Delete Pararent HTML Tag(preserve children)(WebStorm)': '^ CMD D',
  },
  Find: {
    'Find text in current single file': 'CMD F',
    'Find in Project or any Folder': 'CMD Shift F',
    'Replace text in current single file': 'CMD R',
    'Replace text in Folder': 'CMD Shift R',
  },
  'Split Editor Window': {
    'Split RIght': '^-x ^-f',
    'Split Down': '^-x ^-n',
    'Split Up': '^-x ^-p',
    'Move Focus Window Right': '^-x ^-j',
    'Move Focus Window Left': '^-x ^-h',
  },
  'Code Jump': {
    'Go to Implementation': 'CMD B',
    'Go to Definition': 'CMD Option B',
    'Go to Type declaration': 'CMD T',
    'Go to Matching Pair Brace/Bracket': '^ M',
    'Go to Matching HTML/JSX Tag(Cursor)': '^ CMD M',
    'prev code jump history': 'CMD [',
    'next code jump history': 'CMD ]',
    'Next HighLight Symbol': 'CMD G',
    'Prev HighLight Symbol': 'Shift CMD G',
  },
  IntelliSense: {
    'Show IntelliSense suggestion popup': '^ I',
  },
  'File Explorer': {
    'Toggle Explorer': 'CMD 1',
    'Toggle File Structure': 'CMD 2',
    'Focus Editor': 'ESC',
    'New File': 'CMD N',
    'New Folder': 'CMD D',
    Rename: '^ R',
    Delete: 'Delete',
    'Copy Relative File Path': 'CMD Shift C',
  },
  'IDE Feature': {
    'Command Palette': 'CMD P',
    'Open filename Search': 'Cmd O',
    'Open Go to Symbol Search': 'CMD Shift O',
    'Open refactor menu selected code': '^ T',
    'Show Reference/Usage': 'CMD U',
    'Show Context Menu': '^-c ^-c',
    'Toggle Terminal': '^ \\',
    'Reload Window': '^-x ^-r',
    'Open keybinds': '^ CMD ,',
    'ESLint  —fix': '^ Space',
    'Format with Prettier': '^-x ^-x',
    'Keybord Shortcut': 'Shift CMD ,',
    'Open Cursor Settings': 'Shift CMD j',
    'Show Markdown Preview': 'CMD E',
  },
  AI: {
    'Toggle Chat Tab': 'CMD L',
    'Toggle Cursor Tab': '^-x ^-c',
  },
  Git: {
    'Git Blame(WebStorm)': '^-g ^-b',
  },
  'Multiple Cursor': {
    'Rectangular Multiple Cursor Select(WebStorm)': 'Option Drag',
    'Rectangular Multiple Cursor Select(Cursor)': 'M Shift Drag',
    'Add or Remove caret': 'CMD Click',
    'Clone Cursor Above': 'Option CMD ↑',
    'Clone Cursor Bellow': 'Option CMD ↓',
    'Vertical cursor fillin(Cursor)': 'CMD Shift mouse',
  },
  Chrome: {
    'Toggle Devtools': '^ Space',
    'Open chrome://extensions/': 'CMD E',
    'Open chrome://bookmarks/': 'CMD B',
    'Duplicate tab': 'CMD D',
  },
}

export default function Keybinds() {
  return (
    <SimpleLayout
      title={
        <div className="text-balance lg:text-nowrap">
          My Raycast, Cursor, WebStorm, Chrome Keybinds.
        </div>
      }
      intro="I'm always keeping this page open as my cheat sheet. 😅 (MacOS US Keyboard Layout)"
    >
      <KeybindsClient keybinds={keybinds} />
    </SimpleLayout>
  )
}
