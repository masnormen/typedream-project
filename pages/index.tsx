import { useCallback, useState } from 'react';

import { createEditor, Descendant, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';

import { withHistory } from 'slate-history';

import Head from 'next/head';

import MarkupButton from '../components/MarkupButton';
import ELEMENTS from '../components/Blocks';

import { CustomBlockStrings, CustomMarkupStrings } from '../types/slate';
import { toggleCurrentBlock, toggleMarkup } from '../lib/RichTextHelper';


export type MarkupMap = Record<
  CustomMarkupStrings,
  {
    key: string[],
    symbol: string,
    // eslint-disable-next-line no-unused-vars
    className: string;
  }
>

export const MARKUPS: MarkupMap = {
  bold: {
    key: ['ctrl', 'b'],
    symbol: 'B',
    className: 'font-bold'
  },
  italic: {
    key: ['ctrl', 'i'],
    symbol: 'I',
    className: 'italic'
  },
  code: {
    key: ['ctrl', '`'],
    symbol: '<>',
    className: 'font-mono text-sm p-1 bg-gray-200 rounded-md'
  },
};

export default function Home() {
  const [editor] = useState(() => withReact(withHistory(createEditor())));

  const renderBlockElement = useCallback((props: RenderElementProps) => {
    if (props.element.type === undefined) {
      return ELEMENTS['paragraph'].component(props);
    }
    return ELEMENTS[props.element.type].component(props);
  }, []);

  const renderLeafElement = useCallback((props: RenderLeafProps) => {
    return (
      <span
        className={Object.entries(MARKUPS).map(([name, value]) => {
          if (props.leaf[name as CustomMarkupStrings]) {
            return value.className;
          }
        }).join(' ')}
        {...props.attributes}
      >
        {props.children}
      </span>
    );
  }, []);
  
  return (
    <>
      <Head>
        <title>TypeMimpi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col bg-slate-700 items-center min-h-screen p-16">
        <h1 className="text-4xl pb-14 font-bold text-white">
          <span className='text-red-200'>Type</span>
          <span className='text-blue-200'>Mimpi</span>
        </h1>
        <div className="flex flex-col w-full bg-white border-red-400 border-4 rounded-md shadow-xl">
          <Slate
            editor={editor}
            value={initialValue}
          >
            {/* Rich Text Toolbar */}
            <aside id="toolbar" className="py-6 px-8 bg-red-400 space-x-2">
              {Object.entries(MARKUPS).map(([name, value]) => {
                return (
                  <MarkupButton
                    key={name}
                    text={value.symbol}
                    markupType={name as CustomMarkupStrings}
                  />
                );
              })}
              {Object.entries(ELEMENTS).map(([name, value]) => {
                return (
                  <MarkupButton
                    key={name}
                    text={value.symbol}
                    blockType={name as CustomBlockStrings}
                  />
                );
              })}
            </aside>

            {/* Rich Text Editable */}
            <Editable
              className="w-full h-full p-8 space-y-4"
              renderElement={renderBlockElement}
              renderLeaf={renderLeafElement}
              onKeyDown={(event) => {
                // Handle Ctrl keys
                if (event.ctrlKey) {
                  // Match key combination to blocks
                  let match = Object.entries(ELEMENTS).find(([, { key }]) => {
                    return key[0] === 'ctrl' && key[1] === event.key;
                  });
                  if (match) {
                    event.preventDefault();
                    toggleCurrentBlock(editor, match[0] as CustomBlockStrings);
                    return;
                  }

                  // Match key combination to markups
                  let match_m = Object.entries(MARKUPS).find(([, { key }]) => {
                    return key[0] === 'ctrl' && key[1] === event.key;
                  });

                  if (match_m) {
                    event.preventDefault();
                    toggleMarkup(editor, match_m[0] as CustomMarkupStrings);
                  }
                }
                // Handle soft line breaks (shift+enter doesn't create new paragraph)
                else if (event.shiftKey && event.key === 'Enter') {
                  event.preventDefault();
                  Transforms.insertText(editor, '\n');
                }
              }}

            />
          </Slate>
        </div>

        <div className="w-full h-full p-8 space-y-4 text-center">
          <span className="font-bold text-white">Nourman Hajar</span>
        </div>
      </main>
    </>
  );
}

const initialValue: Descendant[] = [
  {
    type: 'h1',
    children: [
      { text: 'Welcome to ' },
      { text: 'TypeMimpi', italic: true },
      { text: ', your simple rich-text editor!' }],
  },
  {
    type: 'quote',
    children: [{ text: '"The quick brown fox jumped over the lazy dog."\n－Some random font site' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'This page will give you a showcase of how you can use this rich text editor 😄' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'You can make ' },
      { text: 'A BIG BOLD TEXT', bold: true },
      { text: ' or make it ' },
      { text: 'slanted like Michael Jackson\'s dancing.', italic: true },
    ]
  },
  {
    type: 'h2',
    children: [{ text: 'This is a text with heading 2' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Try clicking the "H1" toolbar on the top or press the key ' },
      { text: 'Ctrl+1.', code: true }
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'For keyboard shortcuts, hover to the buttons above! Try highlighting some text and press ' },
      { text: 'Ctrl+B.', code: true }
    ],
  },
  {
    type: 'paragraph',
    children: [{ text: '"Enter" will create a new block.\nTry Shift + Enter to add a new line in the same block!' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'You can also add ' },
      { text: 'console.log("a code here!")', code: true },
      { text: '. Wow.' }
    ],
  },
  {
    type: 'h3',
    children: [{ text: 'Code block:' }],
  },
  {
    type: 'code',
    children: [{ text: 'console.log("Typedream is awesome 🫶")' }],
  },
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];