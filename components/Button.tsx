import { useSlate } from 'slate-react';
import { RTEHelper } from '../pages';
import { CustomTypeStrings } from '../types/slate';

type ButtonProps = {
  text: string;
  blockType: CustomTypeStrings;
};

const Button = ({ text, blockType }: ButtonProps) => {
  const editor = useSlate();

  return (
    <button
      className={`bg-gray-400 text-white text-sm py-1 px-3 rounded-md ${
        RTEHelper.isBlockActive(editor, blockType) ? 'bg-red-600' : ''
      }`}

      onMouseDown={(e: any) => {
        e.preventDefault();
        RTEHelper.toggleBlock(editor, blockType);
      }}
    >
      {text}
    </button>
  );
};

export default Button;