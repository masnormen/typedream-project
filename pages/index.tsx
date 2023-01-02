import Head from 'next/head';

// Import the Slate editor factory.
import { createEditor, Editor, Transforms } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';
import { useCallback, useState } from 'react';

const initialValue: any[] = [
  {
    type: 'paragraph',
    children: [{ text: 'This is TypeMimpi, your rich-text editor!' }],
  },
];

export default function Home() {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props: any) => {
    return <DefaultElement {...props} />;
  }, []);
  
  return (
    <>
      <Head>
        <title>TypeMimpi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center min-h-screen p-16">
        <div className="flex w-full border-red-300 border-2 rounded-md">
          <Slate editor={editor} value={initialValue}>
            <Editable
              className="w-full h-full p-8"
              renderElement={renderElement}
              onKeyDown={(event) => {                
                // Auto replace '&' with 'and'
                if (event.key === '&') {
                  event.preventDefault();
                  editor.insertText('and');
                }
              }}
            />
          </Slate>
        </div>
      </main>
    </>
  );
}
