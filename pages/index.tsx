import { KeyboardEvent, useCallback, useState } from 'react';

import { createEditor, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';

import Head from 'next/head';

import { QuoteElement } from '../components/QuoteElement';
import Button from '../components/Button';

import { CustomTypeStrings } from '../types/slate';

export const RTEHelper = {
  isBlockActive (editor: Editor, blockType: CustomTypeStrings) {
    const { selection } = editor;
    if (!selection) return false;
    
    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n => {
          console.log(n); return Editor.isBlock(editor, n) && n.type === blockType;},
      })
    );
  
    return !!match;
  },
  toggleBlock(editor: Editor, type: CustomTypeStrings) {
    Transforms.setNodes(
      editor,
      { type: RTEHelper.isBlockActive(editor, type) ? undefined : type },
      { match: n => Editor.isBlock(editor, n) }
    );
  },
};

const handleCtrlKeys = (event: KeyboardEvent<HTMLDivElement>, editor: Editor) => {  
  let blockType: CustomTypeStrings;
  
  switch (event.key) {
  case 'q':
    blockType = 'quote';
    break;
  default:
    blockType = 'paragraph';
  }

  event.preventDefault();
  RTEHelper.toggleBlock(editor, blockType);
};

export default function Home() {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
    case 'quote':
      return <QuoteElement {...props}/>;
    default:
      return <DefaultElement {...props} />;
    }
  }, []);
  
  return (
    <>
      <Head>
        <title>TypeMimpi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center min-h-screen p-16">
        <div className="flex flex-col w-full border-red-400 border-4 rounded-md">
          <Slate editor={editor} value={initialValue}>
            <aside id="toolbar" className="pt-8 px-8 space-x-2">
              <Button
                text={'""'}
                blockType="quote"
              />
              <Button
                text="</>"
                blockType="code"
              />
            </aside>
            <Editable
              className="w-full h-full p-8 space-y-2"
              renderElement={renderElement}
              onKeyDown={(event) => {
                if (event.ctrlKey) {
                  handleCtrlKeys(event, editor);
                }
              }}
            />
          </Slate>
        </div>
      </main>
    </>
  );
}

const initialValue: any[] = [
  {
    type: 'paragraph',
    children: [{ text: 'This is TypeMimpi, your rich-text editor!' }],
  },
  {
    type: 'quote',
    children: [{ text: 'The quick brown fox jumped over the lazy dog!' }],
  },
];