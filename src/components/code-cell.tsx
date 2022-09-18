import './code-cell.css';
import React, { useEffect } from 'react';
import { CodeEditor } from './code-editor';
import { Preview } from './preview';
import { Resizable } from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

const CodeCell: React.FC<{ cell: Cell }> = ({ cell }) => {
  const bundlingCell = useTypedSelector((state) => state.bundles[cell.id]);
  const { updateCell, createBundler } = useActions();

  useEffect(() => {
    if (!bundlingCell) {
      createBundler(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundler(cell.id, cell.content);
    }, 750);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundler]);

  return (
    <Resizable direction="vertical">
      <div className={'cell-wrapper'}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundlingCell || bundlingCell.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max={'100'}>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundlingCell.code} error={bundlingCell.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
