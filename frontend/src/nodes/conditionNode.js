import { BaseNode } from "./baseNode";

export const ConditionNode = ({ id, data }) => {
    const config = {
        title: 'Condition',
        description: 'Branch your pipeline based on a condition evaluation.',
        color: '#f97316',
        inputs: [
            { id: 'value', label: 'Value' },
        ],
        outputs: [
            { id: 'true', label: 'True' },
            { id: 'false', label: 'False' },
        ],
        fields: [
            {
                name: 'operator',
                label: 'Operator',
                type: 'select',
                options: ['equals', 'not equals', 'contains', 'greater than', 'less than'],
                default: 'equals',
            },
            {
                name: 'compareValue',
                label: 'Compare Value',
                type: 'text',
                default: '',
            },
        ],
    };

    return <BaseNode id={id} data={data} config={config} />;
}