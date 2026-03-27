// src/components/Toast.js
import { useEffect, useState } from 'react';

export const Toast = ({ result, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    if (result) {
      setVisible(true);
      setAnimatingOut(false);

      const timer = setTimeout(() => handleClose(), 5000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const handleClose = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setVisible(false);
      onClose();
    }, 300); 
  };

  if (!visible || !result) return null;

  const { num_nodes, num_edges, is_dag } = result;

  return (
    <div className={`toast ${animatingOut ? 'toast--out' : 'toast--in'}`}>

      <div className="toast-header">
        <div className="toast-title">
          <span className={`toast-icon ${is_dag ? 'toast-icon--success' : 'toast-icon--warning'}`}>
            {is_dag ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 4v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </span>
          Pipeline Analysis
        </div>
        <button className="toast-close" onClick={handleClose}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="toast-stats">
        <div className="toast-stat">
          <span className="toast-stat-value">{num_nodes}</span>
          <span className="toast-stat-label">Nodes</span>
        </div>
        <div className="toast-stat-divider" />
        <div className="toast-stat">
          <span className="toast-stat-value">{num_edges}</span>
          <span className="toast-stat-label">Edges</span>
        </div>
        <div className="toast-stat-divider" />
        <div className="toast-stat">
          <span className={`toast-stat-value ${is_dag ? 'toast-stat-value--success' : 'toast-stat-value--warning'}`}>
            {is_dag ? 'Valid' : 'Cycle!'}
          </span>
          <span className="toast-stat-label">DAG Status</span>
        </div>
      </div>

      <div className={`toast-message ${is_dag ? 'toast-message--success' : 'toast-message--warning'}`}>
        {is_dag
          ? 'Pipeline is a valid directed acyclic graph.'
          : 'Cycle detected — pipeline is not a DAG.'}
      </div>

      <div className="toast-progress">
        <div className="toast-progress-bar" />
      </div>
    </div>
  );
};
