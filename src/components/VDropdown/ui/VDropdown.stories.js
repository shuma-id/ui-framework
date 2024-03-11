import VDropdown from "./VDropdown.vue";

export default {
    title: "VDropdown",
    component: VDropdown,
    tags: ["autodocs"],
    argTypes: {
        actions: { control: "object" },
    },
};

const ActionList = [
    { action: "edit", label: "Edit", callback: () => alert('edit')  },
    { action: "share", label: "Share", callback: () => alert('share') },
    { action: "save", label: "Save", callback: () => alert('save') },
    { action: "delete", label: "Delete", callback: () => alert('delete') },
];

const Template = (args, { argTypes }) => ({
    components: { VDropdown },
    setup() {
        return { args };
    },
    props: Object.keys(argTypes),
    template: '<VDropdown v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
    actions: ActionList,
};
