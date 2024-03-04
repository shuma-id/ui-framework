import VSelect from './VSelect.vue';

export default {
    title: 'VSelect',
    component: VSelect,
    tags: ["autodocs"],
    argTypes: {
        modelValue: { control: 'text' },
    },
};

export const Default = (args, { argTypes }) => ({
    components: { VSelect },
    props: Object.keys(argTypes),
    data() {
        return {
            modelValue: ''
        };
    },
    template: '<VSelect v-model="modelValue" />',
});