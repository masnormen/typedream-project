import { Descendant, BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type H1Element = {
  type: 'h1';
  children: Descendant[];
};

export type H2Element = {
  type: 'h2';
  children: Descendant[];
};

export type H3Element = {
  type: 'h3';
  children: Descendant[];
};

export type CodeBlockElement = {
  type: 'code';
  children: Descendant[];
};

export type QuoteElement = {
  type: 'quote';
  children: Descendant[];
};

export type ParagraphElement = {
  type: 'paragraph';
  children: Descendant[];
};

type CustomElement = H1Element | H2Element | H3Element | CodeBlockElement | QuoteElement | ParagraphElement;

export type CustomBlockStrings = CustomElement['type'];

export type CustomMarkupStrings = 'bold' | 'italic' | 'code';

export type CustomText = Partial<Record<CustomMarkupStrings, boolean>> & {
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
  export interface BaseElement {
    type: CustomBlockStrings;
  }
}
