# useResizeObserver

[![npm version](https://badge.fury.io/js/%40pbr1111%2Fuse-resize-observer.svg)](https://badge.fury.io/js/%40pbr1111%2Fuse-resize-observer)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@pbr1111/use-resize-observer)

React hook implementation of ResizeObserver to measure the size of an element.

Written in TypeScript. The declaration files (.d.ts) are included in the package.

## Installation

With yarn:

```sh
yarn add @pbr1111/use-resize-observer
```

With npm:

```sh
npm install @pbr1111/use-resize-observer
```

## Usage

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
