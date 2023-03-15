import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useContext, useRef } from "react";
import { useIsFirstRender, useEventListener } from "./hooks";
import { ContextAccordion } from ".";
import { ContextAccordionItem } from "./item";
var HeadlessAccordionPanel = function (_a) {
    var _b = _a.as, as = _b === void 0 ? "div" : _b, className = _a.className, children = _a.children;
    var As = as;
    var defaultActiveKey = useContext(ContextAccordion).defaultActiveKey;
    var _c = useContext(ContextAccordionItem), eventKey = _c.eventKey, open = _c.open;
    var ref = useRef(null);
    var firstRender = useIsFirstRender();
    useEffect(function () {
        if (ref && ref.current) {
            if (!firstRender) {
                if (open) {
                    ref.current.style.cssText = "display: block; overflow: hidden; max-height: 0;";
                    ref.current.style.maxHeight = "".concat(ref.current.scrollHeight, "px");
                }
                else {
                    ref.current.style.maxHeight = "".concat(ref.current.scrollHeight, "px");
                    var timeOut_1 = setTimeout(function () {
                        if (ref && ref.current) {
                            ref.current.style.cssText = "overflow: hidden; max-height: 0;";
                        }
                    }, 1);
                    return function () {
                        clearTimeout(timeOut_1);
                    };
                }
            }
        }
    }, [firstRender, ref, open]);
    useEventListener("transitionend", function () {
        if (ref && ref.current) {
            if (!firstRender) {
                if (open) {
                    ref.current.style.cssText = "";
                }
                else {
                    ref.current.style.cssText = "display: none";
                }
            }
        }
    });
    return (_jsx(As, __assign({ ref: ref, className: "".concat(className !== null && className !== void 0 ? className : ""), style: {
            display: "".concat(firstRender && !defaultActiveKey.includes(eventKey) && "none")
        } }, { children: children })));
};
export default HeadlessAccordionPanel;
//# sourceMappingURL=panel.js.map