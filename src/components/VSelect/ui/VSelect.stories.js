import VSelect from "./VSelect.vue";

export default {
    title: "VSelect",
    component: VSelect,
    tags: ["autodocs"],
    argTypes: {
        disabled: { control: "boolean" },
        error: { control: "boolean" },
        options: { control: "object" },
    },
};

const currencyOptions = [
    { value: "rub", label: "Russian Ruble" },
    { value: "usd", label: "US Dollar" },
    { value: "idr", label: "Indonesian Rupiah" },
    { value: "eur", label: "Euro" },
];

const Template = (args, { updateArgs }) => ({
    components: { VSelect },
    setup() {
        return { args };
    },
    template: '<VSelect v-bind="args" @update:modelValue="updateArgs" />',
    methods: {
        updateArgs(modelValue) {
            updateArgs({ ...args, modelValue });
        },
    },
});

export const Default = Template.bind({});
Default.args = {
    placeholder: "Placeholder",
    options: currencyOptions,
};
