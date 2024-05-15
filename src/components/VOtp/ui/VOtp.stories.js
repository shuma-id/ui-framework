import VOtp from "./VOtp.vue";

export default {
    title: "UI/VOtp",
    component: VOtp,
    tags: ["autodocs"],
};

const Template = (args) => ({
    components: { VOtp },
    setup() {
        return { args };
    },
    template: '<VOtp v-bind="args" />',
});

export const Otp = Template.bind({});

Otp.args = {};
