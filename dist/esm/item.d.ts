import { ElementType, ReactNode } from 'react';
export interface IContextHeadlessAccordionItem {
    eventKey: number;
    open: boolean;
}
export interface IHeadlessAccordionItem {
    as?: ElementType;
    eventKey: IContextHeadlessAccordionItem[`eventKey`];
    id?: string;
    className?: string;
    children: ({ open }: {
        open: boolean;
    }) => ReactNode;
}
export declare const ContextAccordionItem: import("react").Context<IContextHeadlessAccordionItem>;
declare const HeadlessAccordionItem: ({ as, eventKey, id, className, children, }: IHeadlessAccordionItem) => JSX.Element;
export default HeadlessAccordionItem;
