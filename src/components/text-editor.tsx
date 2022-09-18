import './text-editor.css';
import React, { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

export const TextEditor: React.FC<{ cell: Cell }> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const mdEditorRef = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!mdEditorRef.current || !event.target) {
        return;
      }
      if (!mdEditorRef.current.contains(event.target as Node)) {
        setEditing(false);
      }
    };
    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.addEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={mdEditorRef}>
        <MDEditor
          value={cell.content}
          onChange={(text) => updateCell(cell.id, text || '')}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'Click to edit.'} />
      </div>
    </div>
  );
};
