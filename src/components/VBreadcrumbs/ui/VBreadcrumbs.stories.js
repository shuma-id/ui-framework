import VBreadcrumbs from "./VBreadcrumbs.vue";

export default {
    title: "UI/VBreadcrumbs",
    component: VBreadcrumbs,
    tags: ["autodocs"],
};

const Template = (args) => ({
    components: { VBreadcrumbs },
    setup() {
        return { args };
    },
    template: '<v-breadcrumbs v-bind="args" />',
});

export const Bread = Template.bind({});

Bread.args = {

};
