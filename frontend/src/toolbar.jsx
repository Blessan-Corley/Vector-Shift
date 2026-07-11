// toolbar.js

import { DraggableNode } from './draggableNode';
import { NODE_GROUPS } from './nodeRegistry';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-label">Drag a block onto the canvas</div>
      <div className="toolbar-groups">
        {NODE_GROUPS.map((group) => (
          <div className="toolbar-group" key={group.title}>
            <div className="toolbar-group-title">{group.title}</div>
            <div className="toolbar-row">
              {group.items.map((item) => (
                <DraggableNode
                  key={item.type}
                  type={item.type}
                  label={item.label}
                  icon={item.icon}
                  accent={item.accent}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
