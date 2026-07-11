// mathNode.js
// Combines two upstream values with a chosen arithmetic operation.

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { LabeledSelect } from './fields';
import { useStore } from '../store';
import { CalcIcon } from '../icons';

const OPERATIONS = [
  { value: 'add', label: 'Add (a + b)' },
  { value: 'subtract', label: 'Subtract (a − b)' },
  { value: 'multiply', label: 'Multiply (a × b)' },
  { value: 'divide', label: 'Divide (a ÷ b)' },
];

export const MathNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handleChange = (e) => {
    setOperation(e.target.value);
    updateNodeField(id, 'operation', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Math"
      icon={<CalcIcon />}
      accent="var(--c-math)"
      targetHandles={[
        { id: 'a', label: 'a' },
        { id: 'b', label: 'b' },
      ]}
      sourceHandles={[{ id: 'result', label: 'result' }]}
    >
      <LabeledSelect label="Operation" value={operation} onChange={handleChange} options={OPERATIONS} />
    </BaseNode>
  );
};
