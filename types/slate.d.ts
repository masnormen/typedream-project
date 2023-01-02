import { Descendant, BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type QuoteElement = {
  type: 'quote';
  children: Descendant[];
};

export type ParagraphElement = {
  type: 'paragraph';
  children: Descendant[];
};

type CustomElement = QuoteElement | ParagraphElement;

export type CustomText = {
  text: string;
};

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  // eslint-disable-next-line no-unused-vars
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
