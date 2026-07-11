import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { BoxesIcon } from './icons';

const selector = (state) => ({
  nodeCount: state.nodes.length,
  edgeCount: state.edges.length,
});

function App() {
  const { nodeCount, edgeCount } = useStore(selector, shallow);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <img className="brand-logo" src="/logo.jpg" alt="PipelineForge Logo" />
          <div>
            <div className="brand-text-title">PipelineForge</div>
            <div className="brand-text-sub">visual pipeline builder</div>
          </div>
        </div>

        <div className="header-stats">
          <span className="header-stat">
            <span className="dot" style={{ background: 'var(--accent-a)' }} />
            <b>{nodeCount}</b>&nbsp;nodes
          </span>
          <span className="header-stat">
            <span className="dot" style={{ background: 'var(--accent-b)' }} />
            <b>{edgeCount}</b>&nbsp;edges
          </span>
        </div>
        <div className="header-flow-line" />
      </header>

      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
