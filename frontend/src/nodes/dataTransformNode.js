import { BaseNode } from './baseNode';

export const DataTransformNode = ({ id, data }) => {
    const config = {
        title: 'Data Transform',
        description: 'Transform and reshape data as it flows through the pipeline.',
        color: '#14b8a6',
        inputs: [
            { id: 'input', label: 'Input' },
        ],
        outputs: [
            { id: 'output', label: 'Output' },
        ],
        fields: [
            {
                name: 'operation',
                label: 'Operation',
                type: 'select',
                options: ['JSON Parse', 'JSON Stringify', 'To Uppercase', 'To Lowercase', 'Trim'],
                default: 'JSON Parse',
            },
        ],
    };

    return <BaseNode id={id} data={data} config={config} />;
}