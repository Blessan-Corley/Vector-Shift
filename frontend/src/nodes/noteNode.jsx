// noteNode.js
// A free-floating sticky note. Demonstrates that BaseNode works fine with
// zero handles at all — not every node needs to sit inside the data flow.

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { StickyNoteIcon } from '../icons';

export const NoteNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [text, setText] = useState(data?.note ?? 'Leave a note for your teammates…');

  const handleChange = (e) => {
    setText(e.target.value);
    updateNodeField(id, 'note', e.target.value);
  };

  return (
    <BaseNode id={id} title="Note" icon={<StickyNoteIcon />} accent="var(--c-note)" className="note-node" hideId>
      <textarea
        className="pf-textarea nodrag"
        style={{ minHeight: 64 }}
        value={text}
        onChange={handleChange}
        placeholder="Write a note…"
      />
    </BaseNode>
  );
};
