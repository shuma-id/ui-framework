<template>
    <table width="100%" class="table table-auto w-full">
        <thead class="table-header">
        <tr>
            <th
                class="table-cell __header"
                v-for="(field, index) in fields"
                :class="{
                        __first: index == 0,
                    }"
                :key="field.key"
            >
                {{ field.label }}
            </th>
        </tr>
        </thead>
        <tbody id="table">
        <template v-if="items">
            <template v-for="item in items" :key="item.id">
                <tr class="dm-row" v-if="item.is_dm">
                    <td :colspan="fieldsLength()"></td>
                </tr>
                <tr
                    v-else
                    :id="item.id"
                    class="row"
                    :class="{
                            'with-error': item.hasErrors === true,
                            highlighted: item.highlighted === true,
                        }"
                >
                    <td
                        class="table-cell __row"
                        v-for="(key, index) in displayedFieldKeys"
                        :key="index"
                        :class="{
                                __actions: key == 'actions',
                                __first: index == 0,
                                '__valign-top': vAlign == 'top',
                            }"
                    >
                        <div v-if="index == 0" class="status"></div>
                        <slot :name="`cell(${key})`" :value="item[key]" :item="item">
                            {{ item[key] }}
                        </slot>
                    </td>
                </tr>
            </template>
            <tr v-if="items.length === 0">
                <td class="empty-row" :colspan="fieldsLength()">No content</td>
            </tr>
        </template>
        <template v-else>
            <tr class="row" v-for="i in 3" :key="i">
                <td :colspan="fieldsLength()">
                    <div v-if="i == 0" class="status"></div>
                    <VPlaceholder class="row-placeholder" />
                </td>
            </tr>
        </template>
        </tbody>
    </table>
</template>

<script setup>
import { computed, defineProps } from "vue";

import { VPlaceholder } from "../../VPlaceholder";

const props = defineProps({
    vAlign: { type: String, default: "middle" },
    fields: { type: Array, default: () => [] },
    items: { type: Array, default: () => [] },
    className: { type: String, default: "" },
    detailedRowId: { type: String },
    editedId: { type: String },
});

const displayedFieldKeys = computed(() => {
    return Object.entries(props.fields).map(([_key, value]) => value.key);
});

const fieldsLength = () => {
    return props.fields.length;
};
</script>

<style scoped>
.table {
}

.table-cell {
    box-sizing: border-box;
    text-align: left;
    padding: 12px 12px;
    line-height: 24px;
    border-bottom: 1px #ebebeb solid;
    border-right: 1px #ebebeb solid;
}

.table-cell.__header {
    font-weight: normal;
    background: #fafafa;
}

.table-cell.__header:first-child {
    border-top-left-radius: 12px;
}

.table-cell.__header:last-child {
    border-top-right-radius: 12px;
}

.table-cell.__row:last-child {
    border-right: 0px;
}

tr {
    position: relative;
}

.highlighted td {
    background: #f2f2f2;
}

tr:hover .table-cell {
    background: #fafafa;
}

.row-placeholder {
    height: 46px;
    border: 0px;
}
</style>
