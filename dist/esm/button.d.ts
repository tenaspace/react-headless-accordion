import { ElementType, HTMLAttributes, ReactElement } from "react";
export interface IHeadlessAccordionButton extends HTMLAttributes<ReactElement> {
    as?: ElementType;
}
declare const HeadlessAccordionButton: ({ as, ...props }: IHeadlessAccordionButton) => JSX.Element;
export default HeadlessAccordionButton;
