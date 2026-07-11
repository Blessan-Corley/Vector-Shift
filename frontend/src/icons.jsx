// icons.js
// A tiny, dependency-free set of stroke icons used across the pipeline builder.
// Keeping these inline (rather than pulling an icon package) keeps the app
// self-contained and easy to theme via `currentColor`.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
};

export const LogInIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
    <polyline points="15 17 20 12 15 7" />
    <line x1="20" y1="12" x2="8" y2="12" />
  </svg>
);

export const LogOutIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="9 17 4 12 9 7" />
    <line x1="4" y1="12" x2="16" y2="12" />
  </svg>
);

export const SparklesIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3l1.8 4.6L18 9.5l-4.2 1.9L12 16l-1.8-4.6L6 9.5l4.2-1.9L12 3z" />
    <path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
  </svg>
);

export const TypeIcon = (p) => (
  <svg {...base} {...p}>
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
);

export const CalcIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="8" y2="10.01" />
    <line x1="12" y1="10" x2="12" y2="10.01" />
    <line x1="16" y1="10" x2="16" y2="10.01" />
    <line x1="8" y1="14" x2="8" y2="14.01" />
    <line x1="12" y1="14" x2="12" y2="14.01" />
    <line x1="16" y1="14" x2="16" y2="14.01" />
    <line x1="8" y1="18" x2="16" y2="18" />
  </svg>
);

export const GitBranchIcon = (p) => (
  <svg {...base} {...p}>
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);

export const GlobeIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const StickyNoteIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10l6-6V5a2 2 0 0 0-2-2z" />
    <path d="M15 21v-6h6" />
  </svg>
);

export const MergeIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M6 3v6a4 4 0 0 0 4 4h4" />
    <path d="M6 21v-6" />
    <polyline points="18 9 18 3" />
    <polyline points="15 6 18 3 21 6" />
    <circle cx="18" cy="17" r="3" />
  </svg>
);

export const TrashIcon = (p) => (
  <svg {...base} {...p}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

export const PlayIcon = (p) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

export const CheckCircleIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const AlertCircleIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export const XCircleIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

export const BoxesIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M2.5 9.5L12 4l9.5 5.5-9.5 5.5-9.5-5.5z" />
    <path d="M2.5 9.5V16l9.5 5.5" />
    <path d="M21.5 9.5V16L12 21.5" />
    <path d="M12 15v6.5" />
  </svg>
);

export const NetworkIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="4" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
    <path d="M12 6v6M12 12L5 17M12 12l7 5" />
  </svg>
);
