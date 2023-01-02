import { Editor, Transforms, Text } from 'slate';
import { CustomBlockStrings, CustomMarkupStrings } from '../types/slate';

export const isBlockActive = (editor: Editor, blockType: CustomBlockStrings) => {
  if (!editor.selection) return false;
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, editor.selection),
      match: (n) => Editor.isBlock(editor, n) && n.type === blockType,
    })
  );
  return !!match;
};

export const toggleCurrentBlock = (editor: Editor, type: CustomBlockStrings) => {
  Transforms.setNodes(
    editor,
    { type: isBlockActive(editor, type) ? undefined : type },
    { match: (n) => Editor.isBlock(editor, n) }
  );
};

export const isMarkActive = (editor: Editor, format: CustomMarkupStrings) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMarkup = (editor: Editor, type: CustomMarkupStrings) => {
  console.log(isMarkActive(editor, type));
  Transforms.setNodes(
    editor,
    { [type]: isMarkActive(editor, type) ? false : true },
    { match: (n) => Text.isText(n), split: true }
  );
};
