import VArrow from "./VArrow.vue";

export default {
    title: "UI/VArrow",
    component: VArrow,
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['active', 'passive'],
        },
        direction: {
            control: { type: 'select' },
            options: ['right', 'bottom', 'left', 'top'],
        },
    },
};

const Template = (args) => ({
    components: { VArrow },
    setup() {
        return { args };
    },
    args: {
       direction: "right"
    },
    template: '<VArrow v-bind="args" />',
});

export const ArrowActive = Template.bind({});

ArrowActive.args = {
    type: "active",
};

export const ArrowPassive = Template.bind({});

ArrowPassive.args = {
    type: "passive",
};


