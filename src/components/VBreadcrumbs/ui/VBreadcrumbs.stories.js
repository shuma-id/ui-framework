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
    template: "<VBreadcrumbs v-bind=\"args\" />",
});

export const Breadcrumbs = Template.bind({});

Breadcrumbs.args = {
    links: [
        { label: "Applications", to: "/apps" },
        { label: "AppName", to: `/apps/appId/incidents` },
        { label: "Incident" },
    ],
};
