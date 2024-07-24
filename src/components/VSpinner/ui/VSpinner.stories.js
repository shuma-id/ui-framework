import VSpinner from "./VSpinner.vue";

export default {
    title: "VSpinner",
    component: VSpinner,
    tags: ["autodocs"],
};

const Template = (args) => ({
    components: { VSpinner },
    setup() {
        return { args };
    },
    template: "<v-spinner v-bind=\"args\" />",
});

export const Primary = Template.bind({});

Primary.args = {};
