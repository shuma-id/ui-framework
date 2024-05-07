import VArrow from "./VArrow.vue";

export default {
    title: "UI/VArrow",
    component: VArrow,
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['active', 'unactive'],
        },
    },
};

const Template = (args) => ({
    components: { VArrow },
    setup() {
        return { args };
    },
    template: '<v-arrow v-bind="args" />',
});

export const ArrowActive = Template.bind({});

ArrowActive.args = {
    type: "active"
};

export const ArrowUnctive = Template.bind({});

ArrowUnctive.args = {
    type: "unactive"
};


