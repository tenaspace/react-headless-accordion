import { useContext } from 'react';
import ContextAccordion from './contexts/accordion';
import ContextAccordionItem from './contexts/item';
import { IContextAccordionItem } from './models/contexts/item';
import { IAccordionItem } from './models/item';

const HeadlessAccordionItem = ({
  as = `div`,
  eventKey,
  id,
  className,
  children,
}: IAccordionItem) => {
  const As = as;
  const { active } = useContext(ContextAccordion);
  const open: IContextAccordionItem[`open`] = active
    ? active.includes(eventKey)
    : false;
  return (
    <ContextAccordionItem.Provider value={{ eventKey, open }}>
      <As id={id} className={`${className ?? ``}`}>
        {children({ open })}
      </As>
    </ContextAccordionItem.Provider>
  );
};

export default HeadlessAccordionItem;
