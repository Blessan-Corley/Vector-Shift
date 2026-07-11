// conditionalNode.js
// Branches the pipeline in two based on a condition — a one-input,
// two-output shape that the LLM/Text nodes don't otherwise exercise.

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { LabeledInput } from './fields';
import { useStore } from '../store';
import { GitBranchIcon } from '../icons';

export const ConditionalNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [condition, setCondition] = useState(data?.condition ?? 'value > 0');

  const handleChange = (e) => {
    setCondition(e.target.value);
    updateNodeField(id, 'condition', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Conditional"
      icon={<GitBranchIcon />}
      accent="var(--c-conditional)"
      targetHandles={[{ id: 'input', label: 'in' }]}
      sourceHandles={[
        { id: 'true', label: 'true' },
        { id: 'false', label: 'false' },
      ]}
    >
      <LabeledInput label="Condition" value={condition} onChange={handleChange} className="nodrag" style={{ fontFamily: 'var(--font-mono)' }} />
    </BaseNode>
  );
};
