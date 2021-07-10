import Card from '@/components/Card.vue';
import Stage from '@/components/Stage.vue';
import { rnd } from '@/utils';
import moment from 'moment';

export default {
    title: 'Components/Card',
    components: Card,
    argTypes: {
        stageName: 'text',
        statusClass: {
            control: {
                type: 'select',
                options: ['good', 'warning', 'danger'],
            },
        },
        progress: {
            control: {
                type: 'range',
                options: [0, 100, 1],
            },
        },
    },
};

const Template = (args: any) => ({
    components: { Card, Stage },
    setup() {
        // Story args can be mapped to keys in the returned object
        return { args };
    },
    // Then, those values can be accessed directly in the template
    template: `
        <Stage :stageName="args.stageName">
            <Card v-bind="args"/>
        </Stage>
    `,
});

export const Good: any = Template.bind({});
Good.args = {
    stageName: 'Stage Name',
    statusClass: 'good',
    pilotImage: 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg',
    pilotName: 'Fulanito',
    progress: 32,
};

export const Warning: any = Template.bind({});
Warning.args = {
    stageName: 'Stage Name',
    statusClass: 'warning',
    pilotImage: 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg',
    pilotName: 'Fulanito',
    progress: 64,
};

export const Danger: any = Template.bind({});
Danger.args = {
    stageName: 'Stage Name',
    statusClass: 'danger',
    pilotImage: 'https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg',
    pilotName: 'Fulanito',
    progress: 71,
};
