# use-resize-observer

[![npm version](https://badge.fury.io/js/%40pbr1111%2Fuse-resize-observer.svg)](https://badge.fury.io/js/%40pbr1111%2Fuse-resize-observer)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@pbr1111/use-resize-observer)

React hook implementation of ResizeObserver to measure the size of an element.

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
    -   [useResizeObserver](#useResizeObserver)
    -   [useDebounceResizeObserver](#useDebounceResizeObserver)
    -   [useThrottleResizeObserver](#useThrottleResizeObserver)

# Features

-   Uses RefCallback to react to nodes that change their reference (like conditional nodes).
-   Provides useDebounceResizeObserver and useThrottleResizeObserver hooks for an optimized debouncing and throttling exprience, avoiding unnecessary rerenders.
-   Written in TypeScript. The declaration files (.d.ts) are included in the package.

# Installation

With yarn:

```sh
yarn add @pbr1111/use-resize-observer
```

With npm:

```sh
npm install @pbr1111/use-resize-observer
```

# Usage

All hooks return the same object:

| Property | Description                                                                       |
| -------- | --------------------------------------------------------------------------------- |
| `ref`    | RefCallback `ref` to be observed                                                  |
| `width`  | Element width. It will be undefined until the size of the element is calculated.  |
| `height` | Element height. It will be undefined until the size of the element is calculated. |

## useResizeObserver

### Parameters

This hook has no input parameters.

### Example

```tsx
import React from 'react';
import { useResizeObserver } from '@pbr1111/use-resize-observer';

const App = () => {
    const { ref, width, height } = useResizeObserver<HTMLDivElement>();

    return (
        <div ref={ref}>
            <div>Width: {width}px</div>
            <div>Height: {height}px</div>
        </div>
    );
};
```

## useDebounceResizeObserver

### Parameters

| Parameter | Required | Description                 |
| --------- | -------- | --------------------------- |
| `delayMs` | Yes      | Delay time in milliseconds. |

### Example

```tsx
import React from 'react';
import { useDebounceResizeObserver } from '@pbr1111/use-resize-observer';

const App = () => {
    const { ref, width, height } = useDebounceResizeObserver<HTMLDivElement>(
        500
    );

    return (
        <div ref={ref}>
            <div>Width: {width}px</div>
            <div>Height: {height}px</div>
        </div>
    );
};
```

## useThrottleResizeObserver

### Parameters

| Parameter | Required | Description                 |
| --------- | -------- | --------------------------- |
| `delayMs` | Yes      | Delay time in milliseconds. |

### Example

```tsx
import React from 'react';
import { useThrottleResizeObserver } from '@pbr1111/use-resize-observer';

const App = () => {
    const { ref, width, height } = useThrottleResizeObserver<HTMLDivElement>(
        500
    );

    return (
        <div ref={ref}>
            <div>Width: {width}px</div>
            <div>Height: {height}px</div>
        </div>
    );
};
```
