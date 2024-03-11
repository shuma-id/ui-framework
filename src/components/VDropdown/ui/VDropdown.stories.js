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
    { action: "edit", label: "Edit" },
    { action: "share", label: "Share" },
    { action: "save", label: "Save" },
    { action: "delete", label: "Delete" },
];

const testAction = (action) => {
    switch (action.action) {
        case "edit":
            console.log("Editing...");
            break;
        case "share":
            console.log("Sharing...");
            break;
        case "save":
            console.log("Saving...");
            break;
        case "delete":
            console.log("Deleting...");
            break;
        default:
            console.log("Unknown action");
    }
};

const Template = (args, { argTypes }) => ({
    components: { VDropdown },
    setup() {
        return { args };
    },
    props: Object.keys(argTypes),
    template: '<VDropdown v-bind="args" :actionHandler="args.actionHandler" />',
});

export const Default = Template.bind({});
Default.args = {
    actions: ActionList,
    actionHandler: testAction,
};
