import { ref, computed } from "vue";

export function useDropdown(props, emit, options) {
    const isFocused = ref(false);
    const selectedIndex = ref(-1);
    const filteredQuery = ref("");
    const inputState = ref(!props.filterable);

    const selectOption = function (option) {
        emit("update:modelValue", option.value);
        isFocused.value = false;
        selectedIndex.value = -1;
        filteredQuery.value = option.label;
        // понять как правильно передать
        // this.$refs.input.blur();
    };

    const focusHandler = function () {
        isFocused.value = true;
        inputState.value = false;
    };

    const blurHandler = function () {
        isFocused.value = false;
        inputState.value = true;
        clearInput();
    };

    const handleKeydown = function (e) {
        const array = props.options || props.actions;
        switch (e.key) {
            case "ArrowDown":
                selectedIndex.value = (selectedIndex.value + 1) % array.length;
                break;
            case "ArrowUp":
                selectedIndex.value = (selectedIndex.value - 1 + array.length) % array.length;
                break;
            case "Enter":
                if (selectedIndex.value >= 0 && selectedIndex.value < array.length) {
                    const item = array[selectedIndex.value];
                    if (props.options) {
                        selectOption(item);
                    } else {
                        performAction(item);
                    }
                }
                break;
        }
    };

    const highlightOption = function (index) {
        selectedIndex.value = index;
    };

    const clearInput = function () {
        if (filteredOptions.value.length === 0) {
            filteredQuery.value = "";
        }
    };

    const filteredOptions = computed(() => {
        if (!props.filterable) {
            return options;
        }

        return options.filter((option) =>
            option.label.toLowerCase().startsWith(filteredQuery.value.toLowerCase())
        );
    });

    const isInputReadonly = computed(() => {
        return !props.filterable || inputState.value;
    });

    const isActive = ref(false);

    const toggleDropdown = function () {
        isActive.value = !isActive.value;
    };

    const hideDropdown = function () {
        isActive.value = false;
    };

    const performAction = function (action) {
        isActive.value = false;
        selectedIndex.value = -1;
        action.callback();
    };

    const highlightAction = function (index) {
        selectedIndex.value = index;
    };

    return {
        isFocused,
        selectedIndex,
        filteredQuery,
        inputState,
        selectOption,
        focusHandler,
        blurHandler,
        highlightOption,
        clearInput,
        filteredOptions,
        isInputReadonly,
        isActive,
        toggleDropdown,
        hideDropdown,
        performAction,
        highlightAction,
        handleKeydown,
    };
}
