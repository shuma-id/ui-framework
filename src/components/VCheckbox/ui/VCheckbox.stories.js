import VCheckbox from "./VCheckbox.vue";

export default {
    components: { VCheckbox },
    title: "UI/VCheckbox",
    component: VCheckbox,
    tags: ["autodocs"],
    argTypes: {
        disabled: { control: "boolean" },
        modelValue: { control: "boolean" },
        selectedLightTheme: { control: "boolean" },
    },
};

const Template = (args, { updateArgs }) => ({
    components: { VCheckbox },
    setup() {
        return { args };
    },
    template: '<VCheckbox v-bind="args" @update:modelValue="updateArgs" />',
    methods: {
        updateArgs(modelValue) {
            updateArgs({ ...args, modelValue });
        },
    },
});

export const Checkbox = Template.bind({});

Checkbox.args = {};

export const CheckboxLightSelected = Template.bind({});

CheckboxLightSelected.args = {
    selectedLightTheme: true,
};
