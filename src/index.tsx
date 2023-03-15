import { useState } from 'react';
import HeadlessAccordionItem from './item';
import HeadlessAccordionButton from './button';
import HeadlessAccordionPanel from './panel';
import { IAccordion } from './models/accordion';
import ContextAccordion from './contexts/accordion';

const HeadlessAccordion = ({
  as = `div`,
  multipleOpen = false,
  defaultActiveKey = [],
  className,
  children,
}: IAccordion) => {
  const As = as;
  const [active, setActive] =
    useState<IAccordion[`defaultActiveKey`]>(defaultActiveKey);
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
