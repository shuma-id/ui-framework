import VPlaceholder from "./VPlaceholder.vue";

export default {
    title: "VPlaceholder",
    component: VPlaceholder,
    tags: ["autodocs"],
};

const Template = (args) => ({
    components: { VPlaceholder },
    setup() {
        return { args };
    },
    template: '<v-placeholder v-bind="args" @update:state="args.state = $event" />',
});

export const Primary = Template.bind({});

Primary.args = {

};
