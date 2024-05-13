import VInput from "./VInput.vue";

export default {
    title: "UI/VInput",
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

export const DefaultInput = Template.bind({});
DefaultInput.args = {
    placeholder: "Placeholder",
    typeInput: "input",
};

export const Textarea = Template.bind({});
Textarea.args = {
    placeholder: "Write the message",
    typeInput: "textarea",
};
