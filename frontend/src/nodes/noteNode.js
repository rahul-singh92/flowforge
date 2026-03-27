// src/nodes/noteNode.js
import { BaseNode } from './baseNode';

export const NoteNode = ({ id, data }) => {
  const config = {
    title: 'Note',
    color: '#eab308',
    description: 'Leave a comment or annotation anywhere on the canvas.',
    inputs: [],
    outputs: [],
    fields: [
      {
        name: 'note',
        label: 'Note',
        type: 'textarea',
        default: '',
        // WHY: placeholder shows hint text without polluting
        // the actual field value — user starts with a clean slate
        placeholder: 'Write your note here...',
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};