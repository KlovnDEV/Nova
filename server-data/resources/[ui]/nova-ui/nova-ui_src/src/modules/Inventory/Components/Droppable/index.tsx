// core
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import T from 'modules/Inventory/types';

interface IProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop' | 'onHover'> {
  onDrop: { (dropData: T.IDragItem, pos: { x: number; y: number }): void };
  onHover: { (dropData: T.IDragItem, pos: { x: number; y: number }): void };
  accept: Array<string>;

  [x: string]: unknown;
}

const Droppable = React.forwardRef(
  (
    { onDrop, onHover, accept, children, ...rest }: IProps,
    fwRef: React.RefObject<HTMLDivElement>,
  ): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = fwRef || useRef<HTMLDivElement>();

    const [, drop] = useDrop<T.IDragItem, void, unknown>({
      accept: accept,
      drop: (item, monitor): void => {
        if (monitor.didDrop()) return;
        if (!ref.current) return;

        const hoverBoundingRect = ref.current.getBoundingClientRect();

        const clientOffset = monitor.getSourceClientOffset();

        const x = clientOffset.x - hoverBoundingRect.left;
        const y = clientOffset.y - hoverBoundingRect.top;

        if (onDrop) onDrop(item, { x, y });
      },
      hover: (item, monitor): void => {
        if (!ref.current) return;

        const clientOffset = monitor.getSourceClientOffset();

        if (onHover) onHover(item, { x: clientOffset.x, y: clientOffset.y });
      },
    });

    drop(ref);

    return (
      <div ref={ref} {...rest}>
        {children}
      </div>
    );
  },
);

export { Droppable };
export default Droppable;
