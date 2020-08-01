import { useState, useMemo, Ref, useCallback } from 'react';
import { useResizeObserverRef, Size } from './use-resize-observer-ref';

type ResizeObserverObject<T> = {
    ref: Ref<T>;
} & Size;

const useResizeObserver = <T extends Element>(): ResizeObserverObject<T> => {
    const [size, setSize] = useState<Size>({});

    const updateSize = useCallback((newSize: Size): void => {
        setSize(newSize);
    }, []);

    const ref = useResizeObserverRef<T>(updateSize);

    return useMemo(() => ({ ref, ...size }), [ref, size]);
};

export { useResizeObserver };
