import { ElementType, useState, createContext, ReactNode } from 'react';
import HeadlessAccordionItem from './item';
import HeadlessAccordionButton from './button';
import HeadlessAccordionPanel from './panel';

export interface IContextHeadlessAccordion {
  multipleOpen: boolean;
  defaultActiveKey: number[];
  active: number[];
  setActive: (active: number[]) => void;
}

export interface IHeadlessAccordion {
  as?: ElementType;
  multipleOpen?: IContextHeadlessAccordion[`multipleOpen`];
  defaultActiveKey?: IContextHeadlessAccordion[`defaultActiveKey`];
  className?: string;
  children?: ReactNode;
}

export const ContextAccordion = createContext<IContextHeadlessAccordion>({
  multipleOpen: false,
  defaultActiveKey: [],
  active: [],
  setActive: () => {},
});

const HeadlessAccordion = ({
  as = `div`,
  multipleOpen = false,
  defaultActiveKey = [],
  className,
  children,
}: IHeadlessAccordion) => {
  const As = as;
  const [active, setActive] =
    useState<IHeadlessAccordion[`defaultActiveKey`]>(defaultActiveKey);
  return (
    <ContextAccordion.Provider
      value={{
        multipleOpen,
        defaultActiveKey,
        active: active ?? [],
        setActive,
      }}
    >
      <As className={`${className ?? ``}`}>{children}</As>
    </ContextAccordion.Provider>
  );
};

export default Object.assign(HeadlessAccordion, {
  Item: HeadlessAccordionItem,
  Button: HeadlessAccordionButton,
  Panel: HeadlessAccordionPanel,
});
