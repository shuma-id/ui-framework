import VTable from "./VTable.vue";

export default {
    title: "UI/VTable",
    component: VTable,
    tags: ["autodocs"],
};

const Template = (args) => ({
    components: { VTable },
    setup() {
        return { args };
    },
    template: '<VTable v-bind="args" />',
});

const items = [
    { id: 1, name: "First item" },
    { id: 2, name: "Second item" },
];
const fields = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
];

export const SimpleTable = Template.bind({});

SimpleTable.args = {
    items: items,
    fields: fields,
};

export const TableWithBatchSelect = Template.bind({});

TableWithBatchSelect.args = {
    items: items,
    fields: fields,
    batchSelect: true,
};
