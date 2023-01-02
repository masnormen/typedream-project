import { useSlate } from 'slate-react';
import { isBlockActive, isMarkActive, toggleCurrentBlock, toggleMarkup } from '../lib/RichTextHelper';
import { MARKUPS } from '../pages';

import { CustomBlockStrings, CustomMarkupStrings } from '../types/slate';
import ELEMENTS from './Blocks';

type MarkupButtonProps = {
  text: string;
  blockType: CustomBlockStrings;
} | {
  text: string;
  markupType: CustomMarkupStrings;
};

const MarkupButton = (props: MarkupButtonProps) => {
  const editor = useSlate();

  if ('blockType' in props) {
    return (
      <button
        title={ELEMENTS[props.blockType].key.join(' + ').toUpperCase()}
        className={`bg-red-300 w-10 text-white text-sm py-1 px-2 rounded-md shadow-sm ${
          isBlockActive(editor, props.blockType) ? 'bg-red-700' : ''
        } ${
          props.blockType === 'paragraph' && isBlockActive(editor, 'paragraph') ? 'pointer-events-none' : ''
        }`}
  
        onMouseDown={(e: any) => {
          e.preventDefault();
          toggleCurrentBlock(editor, props.blockType);
        }}
      >
        {props.text}
      </button>
    );
  }

  return (
    <button
      title={MARKUPS[props.markupType].key.join(' + ').toUpperCase()}
      className={`bg-red-300 w-10 text-white text-sm py-1 px-2 rounded-md shadow-sm ${
        isMarkActive(editor, props.markupType) ? 'bg-red-700' : ''
      }`}
  
      onMouseDown={(e: any) => {
        e.preventDefault();
        toggleMarkup(editor, props.markupType);
      }}
    >
      {props.text}
    </button>
  );


  
};

export default MarkupButton;