// apiRequestNode.js
// Fires an HTTP request as part of the pipeline. Shows a node with a
// row of two fields side by side (method + url) using the shared pf-row layout.

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { LabeledInput, LabeledSelect } from './fields';
import { useStore } from '../store';
import { GlobeIcon } from '../icons';

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export const APIRequestNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url ?? 'https://api.example.com/endpoint');

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
    updateNodeField(id, 'method', e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    updateNodeField(id, 'url', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon={<GlobeIcon />}
      accent="var(--c-api)"
      width={260}
      targetHandles={[{ id: 'trigger', label: 'trigger' }]}
      sourceHandles={[{ id: 'response', label: 'response' }]}
    >
      <div className="pf-row">
        <LabeledSelect label="Method" value={method} onChange={handleMethodChange} options={METHODS} />
      </div>
      <LabeledInput
        label="URL"
        value={url}
        onChange={handleUrlChange}
        style={{ fontFamily: 'var(--font-mono)' }}
      />
    </BaseNode>
  );
};
