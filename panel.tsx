import { ElementType, useEffect, useContext, useRef, ReactNode } from 'react';
import { useIsFirstRender, useEventListener } from './hooks';
import { ContextAccordion } from '#/ui/headless/accordion';
import { ContextAccordionItem } from '#/ui/headless/accordion/item';

export interface IHeadlessAccordionPanel {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

const HeadlessAccordionPanel = ({
  as = `div`,
  className,
  children,
}: IHeadlessAccordionPanel) => {
  const As = as;
  const { defaultActiveKey } = useContext(ContextAccordion);
  const { eventKey, open } = useContext(ContextAccordionItem);
  const ref = useRef<HTMLElement | null>(null);
  const firstRender = useIsFirstRender();

  useEffect(() => {
    if (ref && ref.current) {
      if (!firstRender) {
        if (open) {
          ref.current.style.cssText = `display: block; overflow: hidden; max-height: 0;`;
          ref.current.style.maxHeight = `${ref.current.scrollHeight}px`;
        } else {
          ref.current.style.maxHeight = `${ref.current.scrollHeight}px`;
          const timeOut = setTimeout(() => {
            if (ref && ref.current) {
              ref.current.style.cssText = `overflow: hidden; max-height: 0;`;
            }
          }, 1);
          return () => {
            clearTimeout(timeOut);
          };
        }
      }
    }
  }, [firstRender, ref, open]);

  useEventListener(`transitionend`, () => {
    if (ref && ref.current) {
      if (!firstRender) {
        if (open) {
          ref.current.style.cssText = ``;
        } else {
          ref.current.style.cssText = `display: none`;
        }
      }
    }
  });

  return (
    <As
      ref={ref}
      className={`${className ?? ``}`}
      style={{
        display: `${
          firstRender && !defaultActiveKey.includes(eventKey) && `none`
        }`,
      }}
    >
      {children}
    </As>
  );
};

export default HeadlessAccordionPanel;
