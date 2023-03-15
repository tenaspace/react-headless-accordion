import { ElementType, ReactNode } from 'react';
import { IContextHeadlessAccordion } from './contexts/accordion';

export interface IHeadlessAccordion {
  as?: ElementType;
  multipleOpen?: IContextHeadlessAccordion[`multipleOpen`];
  defaultActiveKey?: IContextHeadlessAccordion[`defaultActiveKey`];
  className?: string;
  children?: ReactNode;
}
