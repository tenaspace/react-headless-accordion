import { createContext } from 'react';
import { IContextHeadlessAccordion } from 'src/models/contexts/accordion';

const ContextAccordion = createContext<IContextHeadlessAccordion>({
  multipleOpen: false,
  defaultActiveKey: [],
  active: [],
  setActive: () => {},
});

export default ContextAccordion;
