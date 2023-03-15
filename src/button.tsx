import { ElementType, HTMLAttributes, ReactElement, useContext } from "react";
import { ContextAccordion } from ".";
import { ContextAccordionItem, IContextHeadlessAccordionItem } from "./item";

export interface IHeadlessAccordionButton extends HTMLAttributes<ReactElement> {
  as?: ElementType;
}

const HeadlessAccordionButton = ({
  as = `button`,
  ...props
}: IHeadlessAccordionButton) => {
  const As = as;
  const { multipleOpen, active, setActive } = useContext(ContextAccordion);
  const { eventKey } = useContext(ContextAccordionItem);
  const handleOnClick = (
    eventKey: IContextHeadlessAccordionItem[`eventKey`]
  ) => {
    const listActive = [...active];
    const includes = listActive.includes(eventKey);
    if (multipleOpen) {
      setActive(
        includes
          ? listActive.filter((item) => item !== eventKey)
          : [...listActive, eventKey]
      );
    } else {
      setActive(includes ? [] : [eventKey]);
    }
  };
  return (
    <As
      {...props}
      className={`${props.className ?? ``}`}
      onClick={() => handleOnClick(eventKey)}
    >
      {props.children}
    </As>
  );
};

export default HeadlessAccordionButton;
