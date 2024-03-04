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

const Template = (args, { argTypes }) => ({
  components: { VSelect },
  props: Object.keys(argTypes),
  template: '<VSelect v-bind="$props" />',
});

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder',
};
