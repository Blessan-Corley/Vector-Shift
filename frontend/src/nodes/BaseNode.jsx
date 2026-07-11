// BaseNode.js
//
// This is the shared abstraction every node type in the pipeline is built on.
// It owns everything that is identical across node types — the card chrome,
// the header (icon / title / id badge / delete button), and the positioning
// of source & target Handles (including optional inline labels) — so that a
// new node type only needs to describe *what makes it different*:
// a title, an icon, an accent color, and a list of handles.
//
// Individual node files stay tiny (see nodes/mathNode.js, nodes/noteNode.js,
// etc.) and focus purely on their own state/fields, passed in as `children`.

import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { TrashIcon } from '../icons';

/**
 * @param {Object} props
 * @param {string} props.id - node id, provided by React Flow
 * @param {string} props.title - display title in the header
 * @param {JSX.Element} props.icon - small icon rendered in the header badge
 * @param {string} props.accent - CSS color (or var()) used for this node's theme
 * @param {Array<{id: string, label?: string}>} [props.targetHandles] - handles on the left
 * @param {Array<{id: string, label?: string}>} [props.sourceHandles] - handles on the right
 * @param {string|number} [props.width] - fixed/override width
 * @param {string} [props.className] - extra class on the outer card
 * @param {boolean} [props.hideId] - hide the small id badge in the header
 */
export const BaseNode = ({
  id,
  title,
  icon,
  accent = 'var(--accent-a)',
  targetHandles = [],
  sourceHandles = [],
  width = 240,
  className = '',
  hideId = false,
  children,
}) => {
  const deleteNode = useStore((s) => s.deleteNode);

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const renderHandles = (list, position) =>
    list.map((h, i) => {
      const top = `${((i + 1) / (list.length + 1)) * 100}%`;
      return (
        <div key={h.id} style={{ position: 'absolute', top, left: 0, right: 0, pointerEvents: 'none' }}>
          <Handle
            type={position === Position.Left ? 'target' : 'source'}
            position={position}
            id={h.id}
            style={{ top: 0, pointerEvents: 'all' }}
          />
          {h.label ? (
            <span
              className={`pf-handle-label ${position === Position.Left ? 'left' : 'right'}`}
              style={{ top: 0 }}
            >
              {h.label}
            </span>
          ) : null}
        </div>
      );
    });

  return (
    <div
      className={`pf-node ${className}`}
      style={{ '--node-accent': accent, width }}
    >
      {renderHandles(targetHandles, Position.Left)}
      {renderHandles(sourceHandles, Position.Right)}

      <div className="pf-node-header">
        <div className="pf-node-icon">{icon}</div>
        <div className="pf-node-title">{title}</div>
        {!hideId && <div className="pf-node-id">{id}</div>}
        <button className="pf-node-delete" onClick={handleDelete} title="Delete node">
          <TrashIcon />
        </button>
      </div>

      <div className="pf-node-body">{children}</div>
    </div>
  );
};
