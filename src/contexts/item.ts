import { createContext } from 'react';
import { IContextAccordionItem } from 'src/models/contexts/item';

const ContextAccordionItem = createContext<IContextAccordionItem>({
  eventKey: -1,
  open: false,
});

export default ContextAccordionItem;
