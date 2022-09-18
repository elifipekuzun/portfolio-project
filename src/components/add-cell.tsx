import './add-cell.css';
import React from 'react';
import { useActions } from '../hooks/use-actions';

export const AddCell: React.FC<{
  previousCellId: string | null;
  forcedVisible?: boolean;
}> = ({ previousCellId, forcedVisible }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`add-cell ${forcedVisible ? 'forced-visible' : ''}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, 'code')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, 'text')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};
