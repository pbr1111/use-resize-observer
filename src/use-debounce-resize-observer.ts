import { Ref, useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useResizeObserverRef, Size } from './use-resize-observer-ref';

type ResizeObserverObject<T> = {
    ref: Ref<T>;
} & Size;

const useDebounceResizeObserver = <T extends Element>(
    delayMs: number
): ResizeObserverObject<T> => {
    const [size, setSize] = useState<Size>({});
    const timeoutId = useRef<NodeJS.Timeout | null>();

    const updateSize = useCallback((newSize: Size, oldSize: Size): void => {
        if (oldSize.width === undefined && oldSize.height === undefined) {
            setSize(newSize);
            return;
        }

        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = null;
        }
        timeoutId.current = setTimeout(() => setSize(newSize), delayMs);
    }, []);

    const ref = useResizeObserverRef<T>(updateSize);

    useEffect(() => {
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, []);

    return useMemo(() => ({ ref, ...size }), [ref, size]);
};

export { useDebounceResizeObserver };
