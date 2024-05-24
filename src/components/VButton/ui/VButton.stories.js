import VButton from "./VButton.vue";

export default {
    title: "VButton",
    component: VButton,
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: { type: "select" },
            options: ["normal", "small"],
        },
    },
};

const Template = (args) => ({
    components: { VButton },
    setup() {
        return { args };
    },
    template: '<VButton v-bind="args" @update:state="args.state = $event">{{args.label}}</VButton>',
});

export const Primary = Template.bind({});

Primary.args = {
    label: "Click me",
    type: "primary",
    state: "main",
};

export const Secondary = Template.bind({});
Secondary.args = {
    label: "Click me",
    type: "secondary",
    state: "main",
};

export const Danger = Template.bind({});
Danger.args = {
    label: "Click me",
    type: "danger",
    state: "main",
};

export const Borderless = Template.bind({});
Borderless.args = {
    label: "Click me",
    type: "borderless",
    state: "main",
};
