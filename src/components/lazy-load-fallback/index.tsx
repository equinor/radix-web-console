import { CircularProgress } from '@equinor/eds-core-react';

import './style.css';

export const LazyLoadFallback: () => JSX.Element = () => (
  <div className="lazy-load-fallback">
    <CircularProgress size={16} /> Loading…
  </div>
);
