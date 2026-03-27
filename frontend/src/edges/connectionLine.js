// src/edges/connectionLine.js
import { getBezierPath } from 'reactflow';

export const ConnectionLine = ({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
}) => {
  const [path] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    sourcePosition: fromPosition,
    targetX: toX,
    targetY: toY,
    targetPosition: toPosition,
  });

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke="#4f46e5"        
        strokeWidth={2}
        opacity={0.45}
        strokeDasharray="6 3"
      />
      <circle
        cx={toX}
        cy={toY}
        r={4}
        fill="#4f46e5"
        opacity={0.45}
      />
    </g>
  );
};