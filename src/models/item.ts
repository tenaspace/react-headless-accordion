import { ElementType, ReactNode } from 'react';
import { IContextAccordionItem } from './contexts/item';

export interface IAccordionItem {
  as?: ElementType;
  eventKey: IContextAccordionItem[`eventKey`];
  id?: string;
  className?: string;
  children: ({ open }: { open: boolean }) => ReactNode;
}
