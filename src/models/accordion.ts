import { ElementType, ReactNode } from 'react';
import { IContextAccordion } from './contexts/accordion';

export interface IAccordion {
  as?: ElementType;
  multipleOpen?: IContextAccordion[`multipleOpen`];
  defaultActiveKey?: IContextAccordion[`defaultActiveKey`];
  className?: string;
  children?: ReactNode;
}
