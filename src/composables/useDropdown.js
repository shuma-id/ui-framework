import { ref } from "vue";

export function useDropdown(props, selectOption, performAction) {
    const selectedIndex = ref(-1);
    const isFocused = ref(false);
    const filteredQuery = ref("");
    const isActive = ref(false);

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
                if (selectedIndex.value !== -1) {
                    if (typeof performAction === "function") {
                        performAction(array[selectedIndex.value]);
                    } else {
                        selectOption(array[selectedIndex.value]);
                    }
                }
                break;
        }
    };

    return { selectedIndex, isFocused, filteredQuery, isActive, handleKeydown };
}
