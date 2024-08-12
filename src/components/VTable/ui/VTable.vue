<template>
    <table
        width="100%"
        class="table table-auto w-full"
        :class="{ 'user-select-none': mouseMoveSelectionMode }"
    >
        <thead class="table-header">
            <tr>
                <th
                    class="table-cell __header"
                    v-for="(field, index) in tableFields()"
                    :class="{
                        __first: index == 0,
                    }"
                    :key="field.key"
                >
                    <VCheckbox v-if="field.key == 'selectCheckbox'" v-model="selectAll" />
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
                        @mousemove="selectItem(item)"
                        @mousedown="enableMouseMoveSelection"
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
                                __checkbox: key == 'selectCheckbox',
                                '__valign-top': vAlign == 'top',
                            }"
                        >
                            <div v-if="index == 0" class="status"></div>
                            <VCheckbox
                                @mousemove.stop
                                v-if="key == 'selectCheckbox'"
                                v-model="selectedItems[item.id]"
                            />
                            <slot
                                v-if="key != 'selectCheckbox'"
                                :name="`cell(${key})`"
                                :value="item[key]"
                                :item="item"
                            >
                                {{ item[key] }}
                            </slot>
                        </td>
                    </tr>
                </template>
                <tr v-if="items.length === 0">
                    <td class="empty-row" :colspan="fieldsLength()">{{ emptyListMessage }}</td>
                </tr>
            </template>
            <template v-if="!items || progress">
                <tr class="row" v-for="i in 9" :key="i">
                    <td class="td-placeholder" :colspan="fieldsLength()">
                        <div v-if="i == 0" class="status"></div>
                        <VPlaceholder class="placeholder" />
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script setup>
import { computed, defineProps, ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";

import { VPlaceholder } from "../../VPlaceholder";
import { VCheckbox } from "../../VCheckbox";

const props = defineProps({
    emptyListMessage: { type: String, default: "No content" },
    progress: { type: Boolean, default: false },
    vAlign: { type: String, default: "middle" },
    fields: { type: Array, default: () => [] },
    items: { type: Array, default: () => [] },
    className: { type: String, default: "" },
    detailedRowId: { type: String },
    editedId: { type: String },
    batchSelect: { type: Boolean, default: false },
});

const displayedFieldKeys = computed(() => {
    const entries = Object.entries(props.fields).map(([_key, value]) => value.key);
    if (props.batchSelect) return ["selectCheckbox", ...entries];
    return entries;
});

const fieldsLength = () => {
    if (props.batchSelect) return props.fields.length + 1;
    return props.fields.length;
};
const tableFields = () => {
    if (props.batchSelect) return [{ key: "selectCheckbox" }, ...props.fields];
    else return props.fields;
};

const emit = defineEmits(["selectChanged"]);

const selectedItems = reactive({});
const selectAll = ref(false);

const clearSelection = () => {
    selectAll.value = false;
    Object.keys(selectedItems).map((k) => (selectedItems[k] = false));
};

const handleSelectAll = () => {
    props.items.forEach((i) => (selectedItems[i.id] = true));
};

watch(selectAll, async () => {
    if (selectAll.value) {
        handleSelectAll();
    } else {
        clearSelection();
    }
});

watch(selectedItems, async () => {
    const si = Object.keys(selectedItems).reduce((acc, k) => {
        if (selectedItems[k]) acc.push(k);
        return acc;
    }, []);
    emit("selectChanged", si);
});

defineExpose({ clearSelection, handleSelectAll });

// Mouse move selection mode
const mouseMoveSelectionMode = ref(false);

onMounted(() => {
    window.addEventListener("mouseup", disableMouseMoveSelection);
    window.addEventListener("keydown", clearAllOnEsc);
});

onBeforeUnmount(() => {
    window.removeEventListener("mouseup", disableMouseMoveSelection);
    window.removeEventListener("keydown", clearAllOnEsc);
});

function enableMouseMoveSelection() {
    mouseMoveSelectionMode.value = true;
}

function disableMouseMoveSelection() {
    mouseMoveSelectionMode.value = false;
}

function selectItem(item) {
    if (!mouseMoveSelectionMode.value) return false;
    selectedItems[item.id] = true;
}

function clearAllOnEsc(e) {
    if (e.keyCode === 27) clearSelection();
}
</script>

<style scoped>
.user-select-none {
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.table-cell,
.empty-row {
    box-sizing: border-box;
    text-align: left;
    padding: 12px 12px;
    line-height: 24px;
    border-bottom: 1px #ebebeb solid;
    border-right: 0px;
}

.table-cell.__header {
    font-weight: normal;
    background: #fafafa;
}

.table-cell.__checkbox {
    width: 10px;
}

.table-cell.__header:first-child {
    border-top-left-radius: 12px;
}

.table-cell.__header:last-child {
    border-top-right-radius: 12px;
    border-right: 0px!important;
}

.table-cell.__row:last-child {
    border-right: 0px;
}

.table tr:last-child td {
    border-bottom: 0px;
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

.placeholder {
    height: 46px;
    border: 0px;
}
.td-placeholder {
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
}
tr:first-child .td-placeholder .placeholder {
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
}
</style>
