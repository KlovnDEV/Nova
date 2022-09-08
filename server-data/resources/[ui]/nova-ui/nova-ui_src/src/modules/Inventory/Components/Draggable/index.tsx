// core
import React, { RefObject, useRef, forwardRef } from 'react';
import { useDrag } from 'react-dnd';
import T from '~m/Inventory/types';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
  data: AnyObject;
  setDragging: { (isDragging: boolean): void };
}

const Draggable = forwardRef(
  (
    { children, type, data, setDragging, ...rest }: IProps,
    fwRef: RefObject<HTMLDivElement>,
  ): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dragRef = fwRef || useRef<HTMLDivElement>();

    const [, drag] = useDrag<T.IDragItem, unknown, void>({
      type: type,
      item: { ...data, type },
      collect: (monitor): void => {
        setDragging(monitor.isDragging());
      },
    });

    drag(dragRef);

    return (
      <div ref={dragRef} {...rest}>
        {children}
      </div>
    );
  },
);

export { Draggable };
export default Draggable;
