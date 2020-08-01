import { Ref, useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useResizeObserverRef, Size } from './use-resize-observer-ref';

type ResizeObserverObject<T> = {
    ref: Ref<T>;
} & Size;

const useThrottleResizeObserver = <T extends Element>(
    delayMs: number
): ResizeObserverObject<T> => {
    const [size, setSize] = useState<Size>({});
    const nextSize = useRef<Size>({});
    const timeoutId = useRef<NodeJS.Timeout | null>();

    const updateSize = useCallback((newSize: Size, oldSize: Size): void => {
        if (oldSize.width === undefined && oldSize.height === undefined) {
            setSize(newSize);
            return;
        }

        nextSize.current = newSize;
        if (timeoutId.current) {
            return;
        }

        timeoutId.current = setTimeout(() => {
            setSize(nextSize.current);
            timeoutId.current = null;
        }, delayMs);
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

export { useThrottleResizeObserver };
