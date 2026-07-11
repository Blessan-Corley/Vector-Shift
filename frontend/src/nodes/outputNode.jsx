// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { LabeledInput, LabeledSelect } from './fields';
import { useStore } from '../store';
import { LogOutIcon } from '../icons';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={<LogOutIcon />}
      accent="var(--c-output)"
      targetHandles={[{ id: 'value' }]}
    >
      <LabeledInput label="Name" value={currName} onChange={handleNameChange} />
      <LabeledSelect
        label="Type"
        value={outputType}
        onChange={handleTypeChange}
        options={[{ value: 'Text', label: 'Text' }, { value: 'Image', label: 'Image' }]}
      />
    </BaseNode>
  );
};
