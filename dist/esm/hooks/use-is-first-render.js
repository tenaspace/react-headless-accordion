import { useRef } from 'react';
function useIsFirstRender() {
    var isFirst = useRef(true);
    if (isFirst.current) {
        isFirst.current = false;
        return true;
    }
    return isFirst.current;
}
export default useIsFirstRender;
//# sourceMappingURL=use-is-first-render.js.map