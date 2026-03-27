import { BaseNode } from "./baseNode";

export const APICallNode = ({ id, data }) => {
    const config = {
        title: 'API Call',
        description: 'Make HTTP requests to external APIs and retrieve data.',
        color: '#3b82f6',
        inputs: [
            { id: 'body', label: 'Body' },
            { id: 'headers', label: 'Headers' },
        ],
        outputs: [
            { id: 'response', label: 'Response' },
            { id: 'status', label: 'Status' },
        ],
        fields: [
            {
                name: 'url',
                label: 'URL',
                type: 'text',
                default: 'https://',
            },
            {
                name: 'method',
                label: 'Method',
                type: 'select',
                options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
                default: 'GET',
            },
        ],
    };
    return <BaseNode id={id} data={data} config={config} />;
}