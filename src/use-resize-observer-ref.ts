import {
    useRef,
    useCallback,
    Ref,
    RefCallback,
    useLayoutEffect,
    useEffect
} from 'react';

export type Size = {
    width?: number;
    height?: number;
};

type ChangeCallback = (newSize: Size, oldSize: Size) => void;

const useResizeObserverRef = <T extends Element>(
    onChange: ChangeCallback
): Ref<T> => {
    const animationFrameId = useRef<number>();
    const nodeRef = useRef<T | null>();
    const resizeObserverRef = useRef<ResizeObserver>();
    const previousSize = useRef<Size>({});
    const onChangeRef = useRef<ChangeCallback>(onChange);

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    useLayoutEffect(() => {
        if (resizeObserverRef.current) {
            return;
        }

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
                const oldSize = previousSize.current;
                const newSize = { width, height };

                previousSize.current = newSize;

                animationFrameId.current = requestAnimationFrame(() =>
                    onChangeRef.current(newSize, oldSize)
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

    return ref;
};

export { useResizeObserverRef };
