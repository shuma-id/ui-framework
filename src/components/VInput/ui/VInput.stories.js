import VInput from "./VInput.vue";

export default {
    title: "VInput",
    component: VInput,
    tags: ["autodocs"],
    argTypes: {
        disabled: { control: "boolean" },
        error: { control: "boolean" },
    },
};

const Template = (args, { updateArgs }) => ({
    components: { VInput },
    setup() {
        return { args };
    },
    template: '<VInput v-bind="args" @update:modelValue="updateArgs" />',
    methods: {
        updateArgs(modelValue) {
            updateArgs({ ...args, modelValue });
        },
    },
});

export const Default = Template.bind({});
Default.args = {
    placeholder: "Placeholder",
};
