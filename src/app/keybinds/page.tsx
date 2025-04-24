import { SimpleLayout } from '@/components/SimpleLayout'
import { Spacer } from '@/components/Spacer'

const title = 'Keybinds'
export const metadata = {
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
    'Clipboard History': '^ + D',
    'Search Snippets': 'CMD + I',
    'Search History (Chrome)': 'Option + 1',
    'Search Bookmarks (Chrome)': 'Option + G',
    'Search Bookmarks (Raindrop)': 'Option + R',
    'Search AI Commands': 'Option + O',
    Dictionary: 'Option + E',
    'Search Quicklinks': 'Option + Q',
    'Left Half(Window Management)': '^ + H',
    'Maximize(Window Management)': 'Option + M',
    'Toggle Raycast Note': 'Option + W',
    Confetti: 'Option + D',
  },
  'Move Cursor': {
    'Cursor Right': '^ + F',
    'Cursor Left': '^ + B',
    'Cursor Top': '^ + P',
    'Cursor Down': '^ + N',
    'Cursor Right Word': 'Option + F',
    'Cursor Left Word': 'Option + B',
    'Cursor Top Block': 'Option + P',
    'Cursor Down Block': 'Option + N',
    'Move Cursor to Line Start': '^ + A',
    'Move Cursor to Line End': '^ + E',
  },
  Selection: {
    'Right with Selection': '^ + F + CMD',
    'Left with Slection': '^ + B + CMD',
    'Up with Section': '^ + CMD + P',
    'Down with Section': '^ + CMD + N',
    cursorEndSelect: '^ + CMD + E',
    cursorStartSelect: '^ + CMD + A',
    cursorRightWordSelect: '^ + Option + F',
    cursorLeftWordSelect: '^ + Option + B',
    cursorTopBlockSelect: '^ + Option + P',
    cursorBottomBlockSelect: '^ + Option + N',
    'Rectangular Selection on Mouse Drag': 'Option + Click',
    'Select Inner Bracket(Cursor)': '^ + CMD + M',
    'Toggle Sticky Selection(WebStorm)': 'Option + A',
    'Select bracet(Cursor)': 'Option + A',
    'Select Current Single Line': '^ + L',
  },
  Scroll: {
    'Scroll Page Down': '^ + V',
    'Scroll Page Up': 'Option + V',
    'Scroll to Top': '^-x + ^-[',
    'Scroll to Bottom': '^-x + ^- ]',
    'Scroll to Center(WebStorm)': '^-x + L',
  },
  'Code Edit': {
    'delete single charchtar': 'Delete',
    'delete front single charchtar': '^ + O',
    Copy: 'CMD + C',
    Paste: 'CMD + V',
    'Insert line Above(VSCode)': '^ + CMD + Enter',
    'Delete matched bracket or tag': '^-x ^-m ',
    'Cut All Left': '^ + W',
    'Cut All Right': '^ + K',
    'Rename selected symbol': '^ + R',
    'Wrapping selected HTML Tag': 'select children elements → ^ + S',
    'Delete Pararent HTML Tag(preserve children)(WebStorm)': '^ + CMD + D',
    'ESLint  —fix': '^ + Space',
    Format: '^-x ^-x',
  },
  Find: {
    'Find text in current single file': 'CMD + F',
    'Find in Project or any Folder': 'CMD + Shift + F',
    'Replace text in current single file': 'CMD + R',
    'Replace text in Folder': 'CMD + Shift + R',
  },
  'Split Editor Window': {
    'Split RIght': '^-x ^-f',
    'Split Down': '^-x  ^-n',
    'Split Up': '^-x ^-p',
    'Move Focus Window Right': '^-x  ^-j',
    'Move Focus Window Left': '^-x  ^-h',
  },
  'Code Jump': {
    'Go to Definition': 'CMD + B',
    'Go to Type declaration': 'CMD + T',
    'Go to Matching Pair Brace/Bracket': '^ + M',
    'Go to Matching HTML/JSX Tag(Cursor)': '^ + CMD + M',
    'prev code jump history': 'CMD + [',
    'next code jump history': 'CMD + ]',
    'Next HighLight Symbol': 'CMD + G',
    'Prev HighLight Symbol': 'Shift + CMD + G',
  },
  IntelliSense: {
    'Show IntelliSense suggestion popup': '^ + I',
  },
  'File Explorer': {
    'Toggle Explorer': 'CMD + 1',
    'Toggle File Structure': 'CMD + 2',
    'Focus Editor': 'ESC',
    'New File': 'CMD + N',
    'New Folder': 'CMD + D',
    Rename: '^ + R',
    Delete: 'Delete',
    'Copy Relative File Path': 'CMD + Shift + C',
  },
  'IDE Feature': {
    'Command Palette': 'CMD + P',
    'Open filename Search': 'Cmd + O',
    'Open Go to Symbol Search': 'CMD + Shift + O',
    'Open refactor menu selected code': '^ + T',
    'Show Reference/Usage': 'CMD + U',
    'Show Context Menu': '^-c ^- c',
    'Show quick fix options(Cursor)': 'Option + Space',
    'Toggle Terminal': '^ + \\',
    'Reload Window': '^-x ^-r',
    'Close Panel': '^-x ^-c',
    'Show Highlighted Symbol Type Info': '^ +  CMD + I',
  },
  Git: {
    'Show Git History': '^-g  ^-h',
    'Show Local Change': '^-g ^-c',
    'Git Blame(WebStorm)': '^-g ^-b',
  },
  'Multiple Cursor': {
    'Rectangular Multiple Cursor Select(WebStorm)': 'Option + Drag',
    'Rectangular Multiple Cursor Select(Cursor)': 'M + Shift + Drag',
    'Add or Remove caret': 'CMD + Click',
    'Clone Cursor Above': 'Option + CMD + ↑',
    'Clone Cursor Bellow': 'Option + CMD + ↓',
    'Vertical cursor fillin': 'CMD + Shift + mouse coursor(VSCode)',
  },
  AI: {
    'Open Chat Tab': 'CMD + L',
    'Close Chat Tab': 'Shift + CMD + .',
  },
  Chrome: {
    'Toggle Devtools': '^ + Space',
    'Open chrome://extensions/': 'CMD + E',
    'Open chrome://bookmarks/': 'CMD + B',
    'Duplicate tab': 'CMD + D',
  },
}

export default function Keybinds() {
  return (
    <SimpleLayout
      title={
        <div className="text-balance lg:text-nowrap">
          My Editor and Chrome, Raycast Keybinds.
        </div>
      }
      intro="Cursor, WebStorm, Chrome, Raycast Keybinds.(MacOS)"
    >
      <div className="w-full sm:w-[400px] mx-auto">
        {Object.keys(keybinds).map((category) => (
          <div key={category}>
            <Spacer size="h-3xs" />
            <h2 className="font-bold text-xl text-left pb-3 border-b border-gray-300">
              {category}
            </h2>
            <table className="min-w-full border-collapse">
              <tbody>
                {Object.entries(keybinds[category]).map(
                  ([action, shortcut]) => (
                    <tr key={action}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {action}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {shortcut}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </SimpleLayout>
  )
}
