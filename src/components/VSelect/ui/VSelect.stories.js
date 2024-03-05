import VSelect from './VSelect.vue';

export default {
  title: 'VSelect', 
  component: VSelect, 
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

const Template = (args, { updateArgs }) => ({
  components: { VSelect },
  setup() {
    return { args };
  },
  template: '<VSelect v-bind="args" @update:modelValue="updateArgs" />',
  methods: {
    updateArgs(modelValue) {
      updateArgs({ ...args, modelValue })
    },
  },
});

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder',
};