// src/nodes/textNode.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { useStore } from '../store';

const MIN_WIDTH = 220;
const MAX_WIDTH = 480;
const MIN_HEIGHT = 50;
const MAX_HEIGHT = 100;

const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const vars = [];
  const seen = new Set();
  let match;
  VARIABLE_REGEX.lastIndex = 0;
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  while ((match = regex.exec(text)) !== null) {
    const varName = match[1];
    if (!seen.has(varName)) {
      seen.add(varName);
      vars.push(varName);
    }
  }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const deleteNode = useStore((state) => state.deleteNode);
  const { setNodes } = useReactFlow();

  const [text, setText] = useState(data?.text || '');
  const [isMinimized, setIsMinimized] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const currentWidthRef = useRef(MIN_WIDTH);

  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);

  const [dims, setDims] = useState({ width: MIN_WIDTH, height: MIN_HEIGHT });

  const variables = extractVariables(text);

  const recalcSize = useCallback(() => {
    const mirror = mirrorRef.current;
    if (!mirror) return;

    mirror.textContent = text + '\u200b';

    const rawWidth = Math.min(
      Math.max(mirror.scrollWidth + 32, MIN_WIDTH),
      MAX_WIDTH
    );
    const rawHeight = Math.min(
      text ? Math.max(mirror.scrollHeight + 16, MIN_HEIGHT) : MIN_HEIGHT,
      MAX_HEIGHT  // WHY: Cap height here, textarea scrolls internally beyond this
    );

    const prevWidth = currentWidthRef.current;
    const widthDelta = rawWidth - prevWidth;

    if (widthDelta !== 0 || rawHeight !== dims.height) {
      setDims({ width: rawWidth, height: rawHeight });

      if (widthDelta !== 0) {
        currentWidthRef.current = rawWidth;

        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id === id) {
              return {
                ...node,
                position: {
                  x: node.position.x - widthDelta / 2,
                  y: node.position.y,
                },
              };
            }
            return node;
          })
        );
      }
    }
  }, [text, dims.height, id, setNodes]);

  useEffect(() => {
    recalcSize();
  }, [text]);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    updateNodeField(id, 'text', val);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (deleteState) {
      deleteNode(id);
    } else {
      setDeleteState(true);
      setTimeout(() => setDeleteState(false), 3000);
    }
  };

  const handleNodeBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDeleteState(false);
    }
  };

  const handleMouseDown = (e) => {
    const interactiveTags = ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON', 'OPTION'];
    const isInteractive =
      interactiveTags.includes(e.target.tagName) ||
      e.target.closest('select, input, textarea, button, label');

    if (isInteractive) {
      const nodeEl = e.currentTarget;
      nodeEl.setAttribute('draggable', 'false');

      const reset = () => {
        nodeEl.setAttribute('draggable', 'true');
        window.removeEventListener('mouseup', reset);
      };
      window.addEventListener('mouseup', reset);
    }
  };
  const getVarHandleTop = (index, total) => {
    return `${(100 / (total + 1)) * (index + 1)}%`;
  };

  return (
    <div
      className="base-node text-node"
      style={{ width: dims.width }}
      tabIndex="-1"
      onBlur={handleNodeBlur}
      onMouseDown={handleMouseDown}
    >

      {variables.map((varName, index) => {
        const topPct = getVarHandleTop(index, variables.length);
        return (
          <div key={varName}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-var-${varName}`}
              style={{ top: topPct }}
            />
            <div
              className="var-handle-label"
              style={{ top: topPct }}
            >
              {varName}
            </div>
          </div>
        );
      })}

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%' }}
      />

      <div className="node-header" style={{ borderTopColor: '#f59e0b' }}>
        <span className="node-title">Text</span>
        <div className="node-actions">
          <button
            className="node-action-btn"
            onClick={() => setIsMinimized((v) => !v)}
            data-tooltip={isMinimized ? 'Expand node' : 'Minimize node'}
          >
            {isMinimized ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>

          <button
            className={`node-action-btn node-delete-btn ${deleteState ? 'node-delete-btn--confirm' : ''}`}
            onClick={handleDeleteClick}
            data-tooltip={deleteState ? 'Confirm delete' : 'Delete node'}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="node-description">
        <p>Define static text or template variables for your pipeline.</p>
      </div>
      {!isMinimized && (
        <div className="node-body">
          <div className="node-field">
            <label className="node-label">Text</label>
            <textarea
              ref={textareaRef}
              className="node-textarea nodrag"
              value={text}
              onChange={handleTextChange}
              placeholder="Type {{variable_name}} to use a variable..."
              style={{
                width: '100%',
                height: `${dims.height}px`,
                minHeight: `${MIN_HEIGHT}px`,
                resize: 'none',
                overflowY: dims.height >= MAX_HEIGHT ? 'auto' : 'hidden'
              }}
            />
          </div>
          {variables.length > 0 && (
            <div className="var-pills">
              <span className="var-pills-label">Detected variables:</span>
              <div className="var-pills-list">
                {variables.map((v) => (
                  <span key={v} className="var-pill">
                    {`{{${v}}}`}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div
        ref={mirrorRef}
        className="textarea-mirror"
        aria-hidden="true"
      />
    </div>
  );
};
