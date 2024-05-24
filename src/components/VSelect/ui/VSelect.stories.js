import ComponentDemo from "./ComponentDemo.vue";
import VSelect from "./VSelect.vue";

export default {
    title: "VSelect",
    component: VSelect,
    tags: ["autodocs"],
    decorators: [
        () => ({
            template: `<div style="position: relative; border: 1px black dashed; min-height: 300px; padding: 20px;">
                    <story />
                </div>`,
        }),
    ],
    argTypes: {
        disabled: { control: "boolean" },
        error: { control: "boolean" },
        options: { control: "object" },
    },
};

const currencyOptions = [
    { value: "rub", label: "<ComponentDemo />" },
    { value: "usd", label: "US Dollar" },
    { value: "idr", label: "Indonesian Rupiah" },
    { value: "eur", label: "Euro" },
    { value: "cny", label: "CNY" },
    { value: "cny", label: "CNY" },
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

const TemplateDeff = (args, { updateArgs }) => ({
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
export const Default2 = TemplateDeff.bind({});
Default2.args = {
    placeholder: "Placeholder",
    options: [
        { value: "One Two", labelComponent: ComponentDemo, props: { name: "One" } },
        { value: "One Threee", labelComponent: ComponentDemo, props: { name: "Two" } },
    ],
};
