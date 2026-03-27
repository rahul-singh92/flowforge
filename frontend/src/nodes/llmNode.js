// llmNode.js

import { BaseNode } from "./baseNode";

export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    description: 'Send prompts to a language model and get a response.',
    color: '#8b5cf6',     
    inputs: [
      { id: 'system', label: 'System' },
      { id: 'prompt', label: 'Prompt' },
    ],
    outputs: [
      { id: 'response', label: 'Response' },
    ],
    fields: [
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        options: ['gpt-4o', 'gpt-4', 'gpt-3.5-turbo'],
        default: 'gpt-4o',
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
}
