<template>
    <div
        class="v-dropdown"
        :class="{ __active: isActive }"
        @keydown="handleKeydown"
        @blur="hideDropdown"
        tabindex="0"
    >
        <div class="toggleButton" @click="toggleDropdown">
            <span class="point"></span><span class="point"></span><span class="point"></span>
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
export default {
    name: "VDropdown",
    props: {
        actions: Array,
    },
    data() {
        return {
            isActive: false,
            selectedIndex: -1,
        };
    },
    methods: {
        toggleDropdown() {
            this.isActive = !this.isActive;
        },
        hideDropdown() {
            this.isActive = false;
        },
        performAction(action) {
            this.isActive = false;
            this.selectedIndex = -1;
            action.callback();
        },
        highlightAction(index) {
            this.selectedIndex = index;
        },
        handleKeydown(e) {
            if (!this.isActive) return;
            switch (e.key) {
                case "ArrowDown":
                    this.selectedIndex = (this.selectedIndex + 1) % this.actions.length;
                    break;
                case "ArrowUp":
                    this.selectedIndex =
                        (this.selectedIndex - 1 + this.actions.length) % this.actions.length;
                    break;
                case "Enter":
                    if (this.selectedIndex >= 0 && this.selectedIndex < this.actions.length) {
                        this.performAction(this.actions[this.selectedIndex]);
                    }
                    break;
            }
        },
    },
};
</script>

<style scoped lang="scss">
.v-dropdown {
    position: absolute;
    width: 100%;
    outline: none;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;

    .toggleButton {
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
            background: #6500e5;

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
        width: 100%;
        margin-top: 6px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

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

            &.selected {
                background: #f7f7f7;
            }
        }
    }
}

.__active.v-dropdown .toggleButton {
    background: #5a00cc;

    .point {
        background: #fff;
    }
}
</style>
