// llmNode.js

import { BaseNode } from './BaseNode';
import { SparklesIcon } from '../icons';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={<SparklesIcon />}
      accent="var(--c-llm)"
      targetHandles={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      sourceHandles={[{ id: 'response', label: 'response' }]}
    >
      <p className="pf-node-desc">Sends the system &amp; prompt inputs to a language model and emits its response.</p>
    </BaseNode>
  );
};
