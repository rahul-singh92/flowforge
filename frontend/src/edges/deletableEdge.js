// src/edges/deletableEdge.js
import { useState } from 'react';
import { getBezierPath } from 'reactflow';
import { useStore } from '../store';

export const DeletableEdge = ({
  id,
  sourceX, sourceY,
  targetX, targetY,
  sourcePosition, targetPosition,
  markerEnd,
}) => {
  const deleteEdge = useStore((state) => state.deleteEdge);
  const [deleteState, setDeleteState] = useState(null);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
  });

  const isConfirm = deleteState === 'confirm';

  const handleClick = (e) => {
    e.stopPropagation();
    if (isConfirm) {
      deleteEdge(id);
    } else {
      setDeleteState('confirm');
      setTimeout(() => setDeleteState(null), 3000);
    }
  };

  const edgeColor = isConfirm ? '#ef4444' : '#4f46e5';

  return (
    <g>
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke={edgeColor}
        strokeWidth={2}
        markerEnd={markerEnd}
        className={isConfirm ? 'edge-path-confirm' : 'edge-path-animated'}
      />

      <foreignObject
        width={24}
        height={24}
        x={labelX - 12}
        y={labelY - 12}
        style={{ overflow: 'visible' }}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          className={`edge-delete-btn nodrag nopan ${isConfirm ? 'edge-delete-btn--confirm' : ''}`}
          onClick={handleClick}
          data-tooltip={isConfirm ? 'Confirm delete' : 'Delete connection'}
          style={{
            width: '20px',
            height: '20px',
            ...(isConfirm && {
              borderColor: '#ef4444',
              color: '#ef4444',
              backgroundColor: 'rgba(239,68,68,0.15)',
            }),
          }}
        >
          <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
            <line x1="1.5" y1="1.5" x2="8.5" y2="8.5"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="8.5" y1="1.5" x2="1.5" y2="8.5"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </foreignObject>
    </g>
  );
};
