import { BaseNode } from './baseNode';

export const TimerNode = ({ id, data }) => {
    const config = {
        title: 'Timer',
        description: 'Introduce delays or intervals between pipeline steps.',
        color: '#ec4899',
        inputs: [
            { id: 'trigger', label: 'Trigger' },
        ],
        outputs: [
            { id: 'output', label: 'Output' },
        ],
        fields: [
            {
                name: 'delay',
                label: 'Delay (ms)',
                type: 'text',
                default: '1000',
            },
            {
                name: 'mode',
                label: 'Mode',
                type: 'select',
                options: ['Delay', 'Interval', 'Timeout'],
                default: 'Delay',
            },
        ],
    };

    return <BaseNode id={id} data={data} config={config} />;
}