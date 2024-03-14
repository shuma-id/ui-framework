import { ref } from "vue";

export function useDropdown(props, selectOption) {
    const selectedIndex = ref(-1);
    const isFocused = ref(false);
    const filteredQuery = ref("");

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
            if (typeof selectOption.value === 'function') {
              selectOption.value(array[selectedIndex.value]);
            }
            break;
        }
    };     

    return { selectedIndex, isFocused, filteredQuery, handleKeydown };
}
