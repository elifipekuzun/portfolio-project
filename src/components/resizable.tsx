import './resizable.css';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

export const Resizable: React.FC<
  PropsWithChildren<{ direction: 'horizontal' | 'vertical' }>
> = ({ children, direction }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHight, setWindowHight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  let resizableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resizable-horizontal',
      width,
      height: Infinity,
      resizeHandles: ['e'],
      maxConstraints: [windowWidth * 0.75, Infinity],
      minConstraints: [windowWidth * 0.2, Infinity],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, windowHight * 0.9],
      minConstraints: [Infinity, 24],
    };
  }

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setWindowHight(window.innerHeight);
        setWindowWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [width]);

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
