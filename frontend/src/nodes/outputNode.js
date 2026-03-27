// outputNode.js

import { BaseNode } from "./baseNode";

export const OutputNode = ({ id, data }) => {
  const config = {
    title: 'Output',
    description: 'Collect and export results from your pipeline.',
    color: '#10b981',      
    inputs: [
      { id: 'value', label: 'Value' }
    ],
    outputs: [],            
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        default: id.replace('customOutput-', 'output_'),
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'Image'],
        default: 'Text',
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />
}
