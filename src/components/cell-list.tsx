import React, { Fragment } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { CellListItem } from './cell-list-item';
import { AddCell } from './add-cell';

export const CellList: React.FC = () => {
  const orderedCells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  return (
    <div>
      <AddCell
        previousCellId={null}
        forcedVisible={orderedCells.length === 0}
      />
      {orderedCells.map((cell) => {
        return (
          <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell previousCellId={cell.id} />
          </Fragment>
        );
      })}
    </div>
  );
};
