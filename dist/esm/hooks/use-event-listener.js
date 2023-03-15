import { useEffect, useRef } from 'react';
import useIsomorphicLayoutEffect from './use-isomorphic-layout-effect';
function useEventListener(eventName, handler, element, options) {
    // Create a ref that stores handler
    var savedHandler = useRef(handler);
    useIsomorphicLayoutEffect(function () {
        savedHandler.current = handler;
    }, [handler]);
    useEffect(function () {
        var _a;
        // Define the listening target
        var targetElement = (_a = element === null || element === void 0 ? void 0 : element.current) !== null && _a !== void 0 ? _a : window;
        if (!(targetElement && targetElement.addEventListener))
            return;
        // Create event listener that calls handler function stored in ref
        var listener = function (event) { return savedHandler.current(event); };
        targetElement.addEventListener(eventName, listener, options);
        // Remove event listener on cleanup
        return function () {
            targetElement.removeEventListener(eventName, listener, options);
        };
    }, [eventName, element, options]);
}
export default useEventListener;
//# sourceMappingURL=use-event-listener.js.map