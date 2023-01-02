import React from 'react';
import CodeBlock from './CodeBlock';
import HeadingBlock from './HeadingBlock';
import QuoteBlock from './QuoteBlock';
import { DefaultElement, RenderElementProps } from 'slate-react';
import { CustomBlockStrings } from '../../types/slate';

export type ElementMap = Record<
  CustomBlockStrings,
  {
    key: string[],
    symbol: string,
    // eslint-disable-next-line no-unused-vars
    component: (props: RenderElementProps) => JSX.Element
  }
>

const ELEMENTS: ElementMap  = {
  paragraph: {
    key: ['ctrl', 'p'],
    symbol: '❡',
    component: DefaultElement,
  },
  h1: {
    key: ['ctrl', '1'],
    symbol: 'H1',
    component: (props: RenderElementProps) => <HeadingBlock headingSize={1} {...props}/>,
  },
  h2: {
    key: ['ctrl', '2'],
    symbol: 'H2',
    component: (props: RenderElementProps) => <HeadingBlock headingSize={2} {...props}/>,
  },
  h3: {
    key: ['ctrl', '3'],
    symbol: 'H3',
    component: (props: RenderElementProps) => <HeadingBlock headingSize={3} {...props}/>,
  },
  quote: {
    key: ['ctrl', 'q'],
    symbol: '❝',
    component: QuoteBlock,
  },
  code: {
    key: ['ctrl', 'c'],
    symbol: '</>',
    component: CodeBlock,
  },
};
  
export default ELEMENTS;