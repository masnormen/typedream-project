import { RenderElementProps } from 'slate-react';

const QuoteBlock = (props: RenderElementProps) => {
  return (
    <blockquote className="border-l-4 border-red-400 pl-2 text-lg italic text-gray-700" {...props.attributes}>
      {props.children}
    </blockquote>
  );
};

export default QuoteBlock;