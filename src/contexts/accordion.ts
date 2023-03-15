import { createContext } from 'react';
import { IContextAccordion } from 'src/models/contexts/accordion';

const ContextAccordion = createContext<IContextAccordion>({
  multipleOpen: false,
  defaultActiveKey: [],
  active: [],
  setActive: () => {},
});

export default ContextAccordion;
