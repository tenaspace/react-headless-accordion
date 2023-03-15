import { useContext } from 'react';
import ContextAccordion from './contexts/accordion';
import ContextAccordionItem from './contexts/item';
import { IAccordionButton } from './models/button';
import { IContextAccordionItem } from './models/contexts/item';

const HeadlessAccordionButton = ({
  as = `button`,
  ...props
}: IAccordionButton) => {
  const As = as;
  const { multipleOpen, active, setActive } = useContext(ContextAccordion);
  const { eventKey } = useContext(ContextAccordionItem);
  const handleOnClick = (eventKey: IContextAccordionItem[`eventKey`]) => {
    const listActive = [...active];
    const includes = listActive.includes(eventKey);
    if (multipleOpen) {
      setActive(
        includes
          ? listActive.filter((item) => item !== eventKey)
          : [...listActive, eventKey],
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