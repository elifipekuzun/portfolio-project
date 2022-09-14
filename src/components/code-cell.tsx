import { useState, useEffect } from 'react';
import { CodeEditor } from './code-editor';
import { Preview } from './preview';
import { Resizable } from './resizable';
import bundle from '../bundler';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.error);
    }, 750);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div className={'cell-wrapper'}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} error={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
