import { ElementType, useContext, createContext, ReactNode } from 'react';
import { ContextAccordion } from '.';

export interface IContextHeadlessAccordionItem {
  eventKey: number;
  open: boolean;
}

export interface IHeadlessAccordionItem {
  as?: ElementType;
  eventKey: IContextHeadlessAccordionItem[`eventKey`];
  id?: string;
  className?: string;
  children: ({ open }: { open: boolean }) => ReactNode;
}

export const ContextAccordionItem = createContext<IContextHeadlessAccordionItem>({
  eventKey: -1,
  open: false,
});

const HeadlessAccordionItem = ({
  as = `div`,
  eventKey,
  id,
  className,
  children,
}: IHeadlessAccordionItem) => {
  const As = as;
  const { active } = useContext(ContextAccordion);
  const open: IContextHeadlessAccordionItem[`open`] = active
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
