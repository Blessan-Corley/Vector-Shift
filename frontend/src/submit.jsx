// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { ResultModal } from './components/ResultModal';
import { PlayIcon } from './icons';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(`${BACKEND_URL}/pipelines/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server responded with ${response.status}: ${text || response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong while contacting the backend.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setResult(null);
    setError(null);
  };

  return (
    <>
      <div className="submit-bar">
        <button className="submit-btn" onClick={handleSubmit} disabled={loading || nodes.length === 0}>
          {loading ? <span className="spinner" /> : <PlayIcon />}
          {loading ? 'Analyzing…' : 'Run Pipeline Check'}
        </button>
      </div>
      <ResultModal result={result} error={error} onClose={closeModal} />
    </>
  );
};
