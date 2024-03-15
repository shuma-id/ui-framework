import { ref } from "vue";

export function useDropdown(array, selectOptionCallback, performActionCallback) {
    const selectedIndex = ref(-1);
    const isFocused = ref(false);
    const filteredQuery = ref("");
    const isActive = ref(false);

    const handleKeydown = function (e) {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                selectedIndex.value = (selectedIndex.value + 1) % array.value.length;
                break;
            case "ArrowUp":
                e.preventDefault();
                selectedIndex.value =
                    (selectedIndex.value - 1 + array.value.length) % array.value.length;
                break;
            case "Enter":
                setTimeout(() => {
                    selectOptionCallback(array.value[selectedIndex.value]);
                    performActionCallback(array.value[selectedIndex.value]);
                }, 0);
                break;
        }
    };

    return { selectedIndex, isFocused, filteredQuery, isActive, handleKeydown };
}
