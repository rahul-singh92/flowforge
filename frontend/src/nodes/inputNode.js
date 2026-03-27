// inputNode.js

import { BaseNode } from "./baseNode";

export const InputNode = ({ id, data }) => {
  const config = {
    title: 'Input',
    description: 'Pass data of different types into your workflow.',
    color: '#06b6d4',
    inputs: [],           
    outputs: [
      { id: 'value', label: 'Value' }
    ],
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        default: id.replace('customInput-', 'input_'),
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'File'],
        default: 'Text',
      },
    ],
  };
  return <BaseNode id={id} data={data} config={config} />;
}
