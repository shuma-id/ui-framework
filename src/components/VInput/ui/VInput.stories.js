import VInput from './VInput.vue';

export default {
  title: 'VInput',
  component: VInput,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

const Template = (args) => ({
  components: { VInput },
  setup() {
    return { args };
  },
  template: '<VInput v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder',
};