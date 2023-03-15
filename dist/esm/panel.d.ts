import { ElementType, ReactNode } from "react";
export interface IHeadlessAccordionPanel {
    as?: ElementType;
    className?: string;
    children?: ReactNode;
}
declare const HeadlessAccordionPanel: ({ as, className, children, }: IHeadlessAccordionPanel) => JSX.Element;
export default HeadlessAccordionPanel;
