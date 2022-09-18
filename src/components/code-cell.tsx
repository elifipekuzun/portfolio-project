import React, { useState, useEffect } from 'react';
import { CodeEditor } from './code-editor';
import { Preview } from './preview';
import { Resizable } from './resizable';
import bundle from '../bundler';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

const CodeCell: React.FC<{ cell: Cell }> = ({ cell }) => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.error);
    }, 750);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div className={'cell-wrapper'}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} error={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
