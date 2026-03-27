// toolbar.js

import { DraggableNode } from './draggableNode';
import logo from './assets/logo.png'

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <span className="toolbar-logo">
        <span className="toolbar-logo-text">FlowForge</span>
      </span>

      <div className="toolbar-divider" />

      <span className="toolbar-label">Nodes</span>

      <div className="toolbar-nodes">
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='apiCall' label='API Call' />
        <DraggableNode type='condition' label='Condition' />
        <DraggableNode type='timer' label='Timer' />
        <DraggableNode type='dataTransform' label='Transform' />
        <DraggableNode type='note' label='Note' />
      </div>
    </div>
  );
};
