<template>
    <div
        class="v-dropdown"
        :class="{ __active: isActive }"
        @keydown="handleKeydown"
        @blur="hideDropdown"
        tabindex="0"
    >
        <div class="toggle-button" @click="toggleDropdown">
            <span v-for="n in 3" :key="n" class="point"></span>
        </div>
        <div class="action__list" v-if="isActive">
            <div
                class="action__item"
                v-for="(action, index) in actions"
                :key="index"
                @click="performAction(action)"
                :class="{ selected: index === selectedIndex }"
                @mouseover="highlightAction(index)"
            >
                {{ action.label }}
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { useDropdown } from "../../../composables/useDropdown.js";

export default {
    name: "VDropdown",
    props: {
        actions: Array,
    },
    setup(props) {
        const isActive = ref(false);
        const array = ref(props.actions);

        const performAction = (action) => {
            isActive.value = false;
            action.callback();
        };

        const { selectedIndex, handleKeydown } = useDropdown(array, performAction);

        return { selectedIndex, isActive, performAction, handleKeydown };
    },
    methods: {
        toggleDropdown() {
            this.isActive = !this.isActive;
        },
        hideDropdown() {
            this.isActive = false;
        },
        highlightAction(index) {
            this.selectedIndex = index;
        },
    },
};
</script>

<style scoped lang="scss">
.v-dropdown {
    position: relative;
    outline: none;

    .toggle-button {
        width: 48px;
        height: 48px;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3px;

        background: #f7f6f5;
        border-radius: 12px;
        outline: none;
        cursor: pointer;

        &:hover {
            background: #333;

            .point {
                background: #fff;
            }
        }

        .point {
            width: 4px;
            height: 4px;
            background: #000;
            border-radius: 100%;
        }
    }

    .action__list {
        position: absolute;
        z-index: 1;
        top: 54px;
        right: 0px;

        background: #fff;
        box-sizing: border-box;
        padding: 24px 12px;
        border-radius: 12px;
        box-shadow: 0px 3px 15px rgba(76.5, 76.5, 76.5, 0.25);

        .action__item {
            width: 100%;

            box-sizing: border-box;
            padding: 11px 12px;
            border-radius: 8px;

            font-size: 16px;
            font-weight: 400;
            color: #000;
            cursor: pointer;
            white-space: nowrap;

            &.selected {
                background: #f7f7f7;
            }
        }
    }
}

.__active.v-dropdown .toggle-button {
    background: #000;

    .point {
        background: #fff;
    }
}
</style>
