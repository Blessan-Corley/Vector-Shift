// draggableNode.js

export const DraggableNode = ({ type, label, icon: Icon, accent }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="dnd-node"
      style={{ '--node-accent': accent }}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <span className="dnd-node-icon">{Icon ? <Icon /> : null}</span>
      <span className="dnd-node-label">{label}</span>
    </div>
  );
};
