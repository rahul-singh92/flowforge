// src/nodes/baseNode.js
import { Handle, Position } from 'reactflow';
import { useState, useRef } from 'react';
import { useStore } from '../store';

export const BaseNode = ({ id, data, config }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const deleteNode = useStore((state) => state.deleteNode);

  const [isMinimized, setIsMinimized] = useState(false);
  const [deleteState, setDeleteState] = useState(null);

  const nodeRef = useRef(null);

  const {
    title,
    color = '#4f46e5',
    inputs = [],
    outputs = [],
    fields = [],
    description = 'Node',
  } = config;

  const getHandleTop = (index, total) => {
    return `${(100 / (total + 1)) * (index + 1)}%`;
  };

  const handleFieldChange = (fieldName, value) => {
    updateNodeField(id, fieldName, value);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (deleteState === 'confirm') {
      deleteNode(id);
    } else {
      setDeleteState('confirm');
    }
  };

  const handleNodeBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDeleteState(null);
    }
  };

  const renderField = (field) => {
    const currentValue = data?.[field.name] ?? field.default ?? '';

    switch (field.type) {
      case 'select':
        return (
          <div key={field.name} className="node-field">
            <label className="node-label">{field.label}</label>
            <select
              className="node-select nodrag"
              value={currentValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
            >
              {field.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="node-field">
            <label className="node-label">{field.label}</label>
            <textarea
              className="node-textarea"
              value={currentValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder || ''}
              rows={3}
            />
          </div>
        );

      case 'text':
      default:
        return (
          <div key={field.name} className="node-field">
            <label className="node-label">{field.label}</label>
            <input
              className="node-input"
              type="text"
              value={currentValue}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder || ''}
            />
          </div>
        );
    }
  };

  return (
    <div
      ref={nodeRef}
      className={`base-node ${isMinimized ? 'base-node--minimized' : ''}`}
      tabIndex="-1"
      onBlur={handleNodeBlur}
    >
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{ top: getHandleTop(index, inputs.length) }}
        />
      ))}

      <div className="node-header" style={{ borderTopColor: color }}>
        <span className="node-title">{title}</span>

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
            className={`node-action-btn node-delete-btn ${deleteState === 'confirm' ? 'node-delete-btn--confirm' : ''}`}
            onClick={handleDeleteClick}
            data-tooltip={deleteState === 'confirm' ? 'Confirm delete' : 'Delete node'}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="node-description">
        <p>{description}</p>
      </div>

      {!isMinimized && (
        <div className="node-body">
          {fields.map((field) => renderField(field))}
        </div>
      )}

      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{ top: getHandleTop(index, outputs.length) }}
        />
      ))}
    </div>
  );
};