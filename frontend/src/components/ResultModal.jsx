// ResultModal.js
// A friendlier stand-in for window.alert() that shows the pipeline's
// node/edge counts and whether it forms a DAG, per the assessment spec.

import { CheckCircleIcon, XCircleIcon, AlertCircleIcon } from '../icons';

export const ResultModal = ({ result, error, onClose }) => {
  if (!result && !error) return null;

  const isDag = result?.is_dag;

  return (
    <div className="pf-modal-overlay" onClick={onClose}>
      <div className="pf-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pf-modal-header">
          <div className={`pf-modal-icon ${error ? 'err' : isDag ? 'ok' : 'warn'}`}>
            {error ? <AlertCircleIcon /> : isDag ? <CheckCircleIcon /> : <XCircleIcon />}
          </div>
          <div>
            <div className="pf-modal-title">
              {error ? 'Could not reach the backend' : isDag ? 'Valid pipeline' : 'Cycle detected'}
            </div>
            <div className="pf-modal-sub">
              {error
                ? 'Check that the FastAPI server is running.'
                : isDag
                ? 'Your pipeline forms a directed acyclic graph.'
                : 'This pipeline has a cycle — it is not a DAG.'}
            </div>
          </div>
        </div>

        {error ? (
          <div className="pf-modal-error-msg">{error}</div>
        ) : (
          <div className="pf-modal-stats">
            <div className="pf-stat-card">
              <div className="pf-stat-value">{result.num_nodes}</div>
              <div className="pf-stat-label">Nodes</div>
            </div>
            <div className="pf-stat-card">
              <div className="pf-stat-value">{result.num_edges}</div>
              <div className="pf-stat-label">Edges</div>
            </div>
            <div className={`pf-stat-card ${isDag ? 'dag-yes' : 'dag-no'}`}>
              <div className="pf-stat-value">{isDag ? 'Yes' : 'No'}</div>
              <div className="pf-stat-label">Is DAG</div>
            </div>
          </div>
        )}

        <div className="pf-modal-footer">
          <button className="pf-modal-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
