import { ref, computed, watch } from "vue";

export function useDropdown(options, filterable) {
    const isFocused = ref(false);
    const selectedIndex = ref(-1);
    const filteredQuery = ref("");
    const inputState = ref(false);
    const filterableRef = ref(filterable);

    const selectOption = function (option) {
        if (option.context && option.context.$emit) {
            option.context.$emit("update:modelValue", option.value);
        }
        isFocused.value = false;
        selectedIndex.value = -1;
        filteredQuery.value = option.label;
    };

    const focusHandler = function () {
        isFocused.value = true;
        inputState.value = false;
    };

    const blurHandler = function () {
        isFocused.value = false;
        inputState.value = true;
    };

    const highlightOption = function (index) {
        selectedIndex.value = index;
    };

    const clearInput = function () {
        if (!filterableRef.value) {
            filteredQuery.value = "";
        }
    };

    const filteredOptions = computed(() => {
        if (!filterableRef.value) {
            return options;
        }
        return options.filter((option) =>
            option.label.toLowerCase().startsWith(filteredQuery.value.toLowerCase())
        );
    });

    const isInputReadonly = computed(() => {
        return !filterableRef.value || inputState.value;
    });

    const filterableChanged = (newValue) => {
        inputState.value = newValue;
    };

    watch(filterableRef, filterableChanged);

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

    const handleKeydown = function (e) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            const optionsArray = filteredOptions.value || options;
            if (e.key === "ArrowDown") {
                selectedIndex.value = (selectedIndex.value + 1) % optionsArray.length;
            } else if (e.key === "ArrowUp") {
                selectedIndex.value =
                    (selectedIndex.value - 1 + optionsArray.length) % optionsArray.length;
            }
        } else if (e.key === "Enter") {
            const selectedOption = filteredOptions.value[selectedIndex.value];
            if (selectedOption) {
                selectOption(selectedOption);
                if (selectedOption.callback) {
                    selectedOption.callback();
                }
            }
        }
    };

    return {
        isFocused,
        selectedIndex,
        filteredQuery,
        inputState,
        selectOption,
        handleKeydown,
        focusHandler,
        blurHandler,
        highlightOption,
        clearInput,
        filterableChanged,
        isActive,
        toggleDropdown,
        hideDropdown,
        performAction,
        highlightAction,
        filteredOptions,
        isInputReadonly,
    };
}
