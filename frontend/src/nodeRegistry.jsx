// nodeRegistry.js
// Single source of truth mapping a node "type" to its component, display
// label, icon and accent color. Both the draggable toolbar and the React
// Flow canvas read from this list, so adding a brand-new node type is a
// one-line addition here (plus the node component itself).

import { InputNode } from './nodes/inputNode';
import { OutputNode } from './nodes/outputNode';
import { LLMNode } from './nodes/llmNode';
import { TextNode } from './nodes/textNode';
import { NoteNode } from './nodes/noteNode';
import { MathNode } from './nodes/mathNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { APIRequestNode } from './nodes/apiRequestNode';
import { MergeNode } from './nodes/mergeNode';

import {
  LogInIcon,
  LogOutIcon,
  SparklesIcon,
  TypeIcon,
  StickyNoteIcon,
  CalcIcon,
  GitBranchIcon,
  GlobeIcon,
  MergeIcon,
} from './icons';

export const NODE_GROUPS = [
  {
    title: 'Core',
    items: [
      { type: 'customInput', label: 'Input', icon: LogInIcon, accent: 'var(--c-input)', component: InputNode },
      { type: 'llm', label: 'LLM', icon: SparklesIcon, accent: 'var(--c-llm)', component: LLMNode },
      { type: 'customOutput', label: 'Output', icon: LogOutIcon, accent: 'var(--c-output)', component: OutputNode },
      { type: 'text', label: 'Text', icon: TypeIcon, accent: 'var(--c-text)', component: TextNode },
    ],
  },
  {
    title: 'Logic',
    items: [
      { type: 'math', label: 'Math', icon: CalcIcon, accent: 'var(--c-math)', component: MathNode },
      { type: 'conditional', label: 'Conditional', icon: GitBranchIcon, accent: 'var(--c-conditional)', component: ConditionalNode },
      { type: 'merge', label: 'Merge', icon: MergeIcon, accent: 'var(--c-merge)', component: MergeNode },
    ],
  },
  {
    title: 'Integrations',
    items: [
      { type: 'apiRequest', label: 'API Request', icon: GlobeIcon, accent: 'var(--c-api)', component: APIRequestNode },
      { type: 'note', label: 'Note', icon: StickyNoteIcon, accent: 'var(--c-note)', component: NoteNode },
    ],
  },
];

export const ALL_NODE_ITEMS = NODE_GROUPS.flatMap((g) => g.items);

export const nodeTypes = Object.fromEntries(ALL_NODE_ITEMS.map((item) => [item.type, item.component]));
