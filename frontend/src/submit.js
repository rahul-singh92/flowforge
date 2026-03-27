// src/submit.js
import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = ({ onResult }) => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      onResult(result);

    } catch (err) {
      console.error('Pipeline parse failed:', err);
      onResult({ error: true, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-wrapper">
      <button
        className={`submit-btn ${loading ? 'submit-btn--loading' : ''}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner" />
            Analyzing...
          </>
        ) : (
          'Run Pipeline'
        )}
      </button>
    </div>
  );
};
