import VDropDown from "./VDrop-down.vue";

export default {
    title: "VDropDown",
    component: VDropDown,
    tags: ["autodocs"],
    argTypes: {
        actions: { control: "object" },
    },
};

const ActionList = [
    { action: "edit", label: "Edit" },
    { action: "share", label: "Share" },
    { action: "save", label: "Save" },
    { action: "delete", label: "Delete" },
];

const Template = (args, { argTypes }) => ({
    components: { VDropDown },
    setup() {
        return { args };
    },
    props: Object.keys(argTypes),
    template: '<VDropDown v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
    actions: ActionList,
};
