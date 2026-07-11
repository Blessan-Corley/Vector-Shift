// inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { LabeledInput, LabeledSelect } from './fields';
import { useStore } from '../store';
import { LogInIcon } from '../icons';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, 'inputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={<LogInIcon />}
      accent="var(--c-input)"
      sourceHandles={[{ id: 'value' }]}
    >
      <LabeledInput label="Name" value={currName} onChange={handleNameChange} />
      <LabeledSelect
        label="Type"
        value={inputType}
        onChange={handleTypeChange}
        options={[{ value: 'Text', label: 'Text' }, { value: 'File', label: 'File' }]}
      />
    </BaseNode>
  );
};
