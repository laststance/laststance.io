import { type Metadata } from 'next'

import { Card, CardTitle, CardDescription } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul className="space-y-16">{children}</ul>
    </Section>
  )
}

function Tool({
  title,
  children,
  href,
}: {
  title: React.ReactNode
  children: React.ReactNode
  href?: string
}) {
  return (
    <Card as="li">
      <CardTitle as="h3" href={href}>
        {title}
      </CardTitle>
      <CardDescription>{children}</CardDescription>
    </Card>
  )
}

const title = 'Uses'
export const metadata: Metadata = {
  title: title,
  description: 'Software I use, my preference, things my favorite.',
  openGraph: {
    title,
    images: [`/api/og?title=${title}`],
  },
}

export default function Uses() {
  return (
    <SimpleLayout
      title={
        <>
          Hardware, Software I use. <br />
          And I love other things.
        </>
      }
      intro="Stay comfortable, Here’s a big list of all of my favorite stuff."
    >
      <div className="space-y-20">
        <ToolsSection title="Hardware">
          <Tool
            title="16” MacBook Pro, 2.6 GHz 6-Core Intel Core i7, 16GB RAM (2019)"
            href="https://www.theverge.com/2019/11/21/20974649/apple-macbook-pro-16-inch-laptop-review-keyboard-test-specs-price-features"
          >
            Probably the last model with Touch Bar, only ESC key is easy to use
            with physical keys. The keyboard layout is US. Honestly I should
            probably replace the Intel chip with the latest ARM chip soon, but
            it's still woking powerful and recent MacBook Pro models are too
            expensive, so I can't easily change models. <br /> To maintain a
            comfortable posture, I run my MacBook Pro in a clamshell mode
            with an external monitor, keyboard, and trackpad (described below)
            connected to the computer. I often run my MacBook Pro in a clamshell
            mode with an external monitor, keyboard, and trackpad connected to
            maintain a comfortable posture.
          </Tool>
          <Tool
            title="Apple Magic Keyboard - US English"
            href="https://www.apple.com/shop/product/MK2A3LL/A/magic-keyboard-us-english"
          >
            I am not particularly particular about keyboards, so I use the Apple
            original one. It is an ordinary keyboard with no special features,
            and I think the price is high compared to the performance.
          </Tool>
          <Tool
            title="Apple Magic Trackpad - Black Multi-Touch Surface"
            href="https://www.apple.com/shop/product/MK2D3AM/A/magic-trackpad-white-multi-touch-surface"
          >
            I use a black color one. It feels exactly like the one on my Macbook
            Pro and is the most complete pointing device compared to other
            laptop products. I think the performance of the product is balanced
            against the price, which is rare for Apple.
          </Tool>
          <Tool
            title="eXpress Keyboard Platform"
            href="https://bullettrain.com/products/express-keyboard-platform?variant=3508308246568"
          >
            This is a gadget for placing an external Apple Magic Keyboard and
            Apple Magic Trackpad in a layout similar to that of a Macbook Pro.
            If you simply place the Trackpad under the keyboard without using
            this product, the height difference is too great and it is difficult
            to operate the keyboard properly. Thanks to this gadget, you can
            smoothly switch between the clamshell mode of the Macbook Pro and
            the normal laptop mode.
          </Tool>
          <Tool
            title="LG 24 UltraGear FHD IPS 1ms 144Hz HDR Monitor"
            href="https://www.amazon.com/LG-24GN650-B-Ultragear-FreeSync-Adjustable/dp/B08V85XBFZ?th=1"
          >
            My memory is a little fuzzy but I bought this external monitor
            because it was on sale at Amazon at a discount, It is connected in
            Clamshell mode. <br />
            The good thing about this monitor is that I don't feel any display
            delay at all (who can detect a 1ms delay?). <br /> The good thing
            about this monitor is that you don't feel any delay at all, The
            monitor can be set to a refresh rate of up to 144Hz, which makes
            scrolling on the web site very smooth. (On my Macbook Pro, I set the
            refresh rate to 120Hz because the screen turns green when set to
            144Hz.) <br /> The difference in smoothness between 60Hz and 120Hz
            is clearly visible even to the average non-gadget geek, <br /> so I
            honestly think the 120Hz support on the iPhone 15 Pro was a more
            important update than USB-C.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Cursor" href="https://www.cursor.so/">
            Forked from VScode, it is the the best AI IDE as far as i know. It
            can import and learn library documents and answer questions based on
            its knowledge of the entire codebase, making it a powerful tool for
            real-world products. Since it is a Fork of VScode, it references
            VScode's keybinding.json and settings.json, so it can easily be used
            with VSCode.
          </Tool>
          <Tool
            title="WebStorm(JetBrains IDE)"
            href="https://www.jetbrains.com/webstorm/"
          >
            First of all, I am a big fan of JetBrains. Since my first use of
            PHPStorm for a project in the PHP Symfony framework, I have been
            impressed by its powerful refactoring features that understand the
            type and context of the code and automatically rewirte all affected
            parts to make sure that the code is properly Code Complete. I think
            this is similar to the feeling that JavaScirpt developers had when
            they switched from SublimeText to VSCode back in the day when there
            was no culture of using IDEs. I use WebStorm, VScode, and Cursor as
            my three IDEs. The best features of WebStorm are Auto Import,
            IntelliSense, refactoring accuracy, ESLint autofix execution speed,
            and I think the Project Tree is the easiest to use. There are almost
            no situations where I have to manually write import statements, so I
            would choose WebStorm first when writing a normal program.
          </Tool>
          <Tool
            title="Terminal(Mac OSX Default)"
            href="https://github.com/ryota-murakami/dotfiles/blob/master/mysetting.terminal"
          >
            Maybe I just don't know the advanced features of other terminal
            apps, but I like the default terminal because it is stable enough to
            do what I want to do. I don't use the split screen at all, so maybe
            I don't feel inconvenienced by the default Terminal. When I launch
            multiple processes, I use tabs to manage them.
          </Tool>
          <Tool
            title="Fish Shell"
            href="https://github.com/ryota-murakami/dotfiles/blob/master/.config/fish/config.fish"
          >
            When I was a programming novice, I switched from bash to fish when I
            saw a blog about a customized zsh-like useful feature with almost
            zero configuration. But at first, fish was not compatible with
            bash/zsh and it was inconvenient that I could not execute
            ShellScript I found on Stackoverflow and so on as is. Now that fish
            has become a major shell, it supports installation scripts for
            various CLI tools, and also supports adding paths to `config.fish`,
            so it is easier to use than before. However, I don't know how to use
            the `abbr` command, which is one of the features of fish, and I use
            alias all the time...
          </Tool>
          <Tool title="Volta" href="https://volta.sh/">
            Volta is a Node.js version control tool, it would be an alternative
            to nvm. It has a simple API and a `volta pin` command that records
            the Node.js version of the project in package.json and automatically
            switches the Node.js version when you move to a directory.
          </Tool>
          <Tool title="pnpm" href="https://pnpm.io/">
            I use pnpm as package manager for all my JS/TS projects. It saves a
            lot of storage space, and it has very straight forward module
            resolution that <br /> imported package from the end application
            must be written the top level package.json's
            dependency/devDependency. <br /> I think it is a great package
            manager with a very straight forward and trouble free module
            resolution rule. <br /> I also use Bun from time to time, which can
            run TS directly and ise often a faster runtime than Node.js.
          </Tool>
          <Tool title="Figma" href="https://www.figma.com/">
            Bridging the gap between design data and implementation code in
            component-oriented front-end development, <br /> the designer skills
            and design tool skills needed when developing GUI applications on a
            solo basis, and the emergence of VSCode and Storybook's Figma
            Extension, developers also I have seen an increasing number of
            situations in recent years where I feel that it is better to be
            equipped with design tool skills. <br />I think that the designer's
            ability is also included in the interest of full-stack developers.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Utility">
          <Tool title="Raycast" href="https://www.raycast.com/">
            I am not good at remembering the spelling of English words, so what
            I use Raycast for the most is the dictionary function. <br /> I also
            use Github repository search, kill process, bing search, and
            floating note. I would like to try various extensions when I have
            time, as I am sure there are many useful ways to use them that I am
            not aware of yet. <br /> I am using the free plan because I couldn't
            find any situation where I want to ask AI questions in the context
            of Raycast.
          </Tool>
          <Tool title="iStat Menu" href="https://bjango.com/mac/istatmenus/">
            It is an application that displays every stat of the machine in the
            menu bar like Activitiy Monitor. <br />
            It is fun to see the CPU temperature and fan speed in the Censer tab
            and to change the fan speed to 100% and try to see how far you can
            cool the CPU.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  )
}
