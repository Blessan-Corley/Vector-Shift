// mergeNode.js
// Combines N upstream values into one. The number of target handles is
// driven directly by user input, showing the abstraction handles a
// fully dynamic handle count just as easily as a fixed one.

import { useEffect, useState } from 'react';
import { BaseNode } from './BaseNode';
import { LabeledSelect } from './fields';
import { useStore } from '../store';
import { MergeIcon } from '../icons';

const COUNT_OPTIONS = [2, 3, 4, 5];

export const MergeNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const cleanUpNodeEdges = useStore((s) => s.cleanUpNodeEdges);
  const [count, setCount] = useState(data?.inputCount || 2);

  const targetHandles = Array.from({ length: count }, (_, i) => ({
    id: `in${i + 1}`,
    label: `in${i + 1}`,
  }));

  // Clean up dangling edges when input count decreases.
  useEffect(() => {
    cleanUpNodeEdges(id, [{ id: 'merged' }], targetHandles);
  }, [count, id, cleanUpNodeEdges]);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setCount(value);
    updateNodeField(id, 'inputCount', value);
  };

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon={<MergeIcon />}
      accent="var(--c-merge)"
      targetHandles={targetHandles}
      sourceHandles={[{ id: 'merged', label: 'merged' }]}
    >
      <LabeledSelect
        label="Number of Inputs"
        value={count}
        onChange={handleChange}
        options={COUNT_OPTIONS.map((n) => ({ value: n, label: String(n) }))}
      />
    </BaseNode>
  );
};
