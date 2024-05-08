import { ref } from "vue";

export function useDropdown(array, callbackFunction) {
    const selectedIndex = ref(-1);

    const handleKeydown = function(e) {
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
                if (selectedIndex.value !== -1) {
                    callbackFunction(array.value[selectedIndex.value]);
                }
                break;
        }
    };

    return { selectedIndex, handleKeydown };
}
