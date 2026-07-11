// textNode.js
//
// Two behaviors on top of the base text field, per the assessment:
//  1. The node grows (width + height) to fit whatever the user types.
//  2. Any `{{ variableName }}` found in the text becomes a new target
//     Handle on the left, named after the variable, so it can be wired
//     up to another node's output.

import { useEffect, useMemo, useRef, useState } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import { TypeIcon } from '../icons';

const VARIABLE_RE = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const MIN_WIDTH = 240;
const MAX_WIDTH = 440;
const MIN_HEIGHT_ROWS = 2;

function extractVariables(text) {
  const found = [];
  const seen = new Set();
  let match;
  VARIABLE_RE.lastIndex = 0;
  while ((match = VARIABLE_RE.exec(text)) !== null) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      found.push(name);
    }
  }
  return found;
}

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const cleanUpNodeEdges = useStore((s) => s.cleanUpNodeEdges);
  const [currText, setCurrText] = useState(data?.text ?? 'Hello {{input}}!');
  const textareaRef = useRef(null);
  const measureRef = useRef(null);
  const [width, setWidth] = useState(MIN_WIDTH);

  const variables = useMemo(() => extractVariables(currText), [currText]);

  // Clean up dangling target edges when variables list changes.
  useEffect(() => {
    cleanUpNodeEdges(id, [{ id: 'output' }], variables.map((v) => ({ id: v })));
  }, [variables, id, cleanUpNodeEdges]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCurrText(value);
    updateNodeField(id, 'text', value);
  };

  // Grow the textarea's height to fit its content.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [currText, width]);

  // Grow the node's width to fit the longest line, using a hidden
  // measuring element rendered with the same font as the textarea.
  useEffect(() => {
    const measurer = measureRef.current;
    if (!measurer) return;
    const lines = currText.split('\n');
    let longest = '';
    lines.forEach((line) => {
      if (line.length > longest.length) longest = line;
    });
    measurer.textContent = longest || ' ';
    const measuredWidth = measurer.getBoundingClientRect().width + 56; // padding + borders
    setWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, measuredWidth)));
  }, [currText]);

  const targetHandles = variables.map((v) => ({ id: v, label: v }));

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={<TypeIcon />}
      accent="var(--c-text)"
      width={width}
      targetHandles={targetHandles}
      sourceHandles={[{ id: 'output' }]}
    >
      <span
        ref={measureRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'pre',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          lineHeight: 1.5,
          top: -9999,
          left: -9999,
        }}
      />
      <textarea
        ref={textareaRef}
        className="pf-textarea nodrag"
        value={currText}
        onChange={handleTextChange}
        rows={MIN_HEIGHT_ROWS}
        placeholder="Type text… use {{variableName}} to add an input"
      />
      {variables.length > 0 && (
        <div className="pf-var-list">
          {variables.map((v) => (
            <span key={v} className="pf-chip">
              {'{{' + v + '}}'}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
