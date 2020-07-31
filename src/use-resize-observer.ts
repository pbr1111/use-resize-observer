import {
    useState,
    useRef,
    useMemo,
    useCallback,
    Ref,
    RefCallback,
    useLayoutEffect
} from 'react';

type Size = {
    width?: number;
    height?: number;
};

type ResizeObserverObject<T> = {
    ref: Ref<T>;
} & Size;

const useResizeObserver = <T extends Element>(): ResizeObserverObject<T> => {
    const animationFrameId = useRef<number>();
    const nodeRef = useRef<T | null>();
    const resizeObserverRef = useRef<ResizeObserver>();
    const previousSize = useRef<Size>({});
    const [size, setSize] = useState<Size>({});

    useLayoutEffect(() => {
        if (resizeObserverRef.current) {
            return;
        }

        const updateSize = (width: number, height: number): void => {
            const newSize = { width, height };
            previousSize.current = newSize;
            setSize(newSize);
        };

        const resizeObserverCallback = (
            entries: ResizeObserverEntry[]
        ): void => {
            if (!Array.isArray(entries) || !entries.length) {
                return;
            }

            const entry = entries[0];
            const width = Math.round(entry.contentRect.width);
            const height = Math.round(entry.contentRect.height);
            if (
                previousSize.current.width !== width ||
                previousSize.current.height !== height
            ) {
                animationFrameId.current = requestAnimationFrame(() =>
                    updateSize(width, height)
                );
            }
        };

        resizeObserverRef.current = new ResizeObserver(resizeObserverCallback);

        if (nodeRef.current) {
            resizeObserverRef.current?.observe(nodeRef.current);
        }

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            resizeObserverRef.current?.disconnect();
        };
    }, []);

    const ref: RefCallback<T> = useCallback((node: T | null) => {
        if (nodeRef.current) {
            resizeObserverRef.current?.unobserve(nodeRef.current);
        }

        nodeRef.current = node;
        if (node) {
            resizeObserverRef.current?.observe(node);
        }
    }, []);

    return useMemo(() => ({ ref, ...size }), [ref, size]);
};

export { useResizeObserver };
