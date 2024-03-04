<template>
    <div class="v-select" :class="{'__focused': isFocused, '__complete': isComplete}">
        <div class="select__wrapper">
            <input type="text" id="VSelect" readonly @click="toggleList" :value="selectedLabel" @keydown="onKeyDown"> 
            <label for="VSelect" class="placeholder">{{ placeholder }}</label>
            <img class="arrow-icon" src="./arrow-icon.svg" alt="Arrow icon image" >
        </div>
        <div class="list__сontainer" v-if="isFocused">
            <div class="row" v-for="(option, index) in currencyOptions" :key="option.value" @click="selectOption(option)"
                :class="{selected: index === selectedIndex}">
                {{ option.label }}  
            </div>
        </div>
    </div>
</template>
    
<script>
export default {
    name: 'VSelect',
    props: {
        placeholder: {type: String, default: 'Label'},
    },
    data() {
        return {
            isFocused: false,
            selectedLabel: '',
            modelValue: '',
            selectedIndex: -1,
            currencyOptions: [
                {value: "rub", label: "Russian Ruble"},
                {value: "usd", label: "US Dollar"},
                {value: "idr", label: "Indonesian Rupiah"},
                {value: "eur", label: "Euro"}, 
            ],
        };
    },
    methods: {
        selectOption(option) {
            this.selectedLabel = option.label;
            this.isFocused = false;
        },
        toggleList() {
            this.isFocused = !this.isFocused;
        },
        onKeyDown(event) {
            switch (event.key) {
                case 'ArrowDown':
                    this.navigateDown();
            break;
                case 'ArrowUp':
                    this.navigateUp();
            break;
                case 'Enter':
                    this.selectCurrentIndex();
            break;
            }
        },
        navigateDown() {
            if (this.selectedIndex < this.currencyOptions.length - 1) {
                this.selectedIndex++;
            }
        },
        navigateUp() {
            if (this.selectedIndex > 0) {
                this.selectedIndex--;
            }
        },
        selectCurrentIndex() {
            if (this.selectedIndex >= 0 && this.selectedIndex < this.currencyOptions.length) {
                this.selectOption(this.currencyOptions[this.selectedIndex]);
            }
        },
    },
    computed: {
        isComplete() {
            return this.selectedLabel.trim().length > 0;
        }
    },
}
</script>  
    
<style scoped lang="scss">
.v-select {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .select__wrapper {
        position: relative;
        width: 100%;
        
        display: flex;
        flex-direction: row;
        justify-content: flex;
        align-items: center;

        input {
            width: 100%;
            height: 64px;
            margin-right: -36px;

            box-sizing: border-box;
            padding: 18px 42px 18px 18px;   
            border-radius: 12px;
            background: transparent;
            border: 1px solid #7000FF;
            outline: none;

            font-size: 18px;
            font-weight: 400;
            color: #000;
            cursor: default;
        }

        .placeholder {
            position: absolute;
            top: 0;
            left: 18px;

            font-size: 18px;
            font-weight: 400;
            color: #A6A6A6;
            pointer-events: none;

            transform: translate3D(0, 22px, 0);
            transition: 0.3s;
        }

        .arrow-icon {
            position: relative;
            top: 0;
            left: 0;
            transition: 0.3s;
            pointer-events: none; 
        }
    }

    .list__сontainer {
        width: 100%;
        margin-top: 6px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        background: #fff;
        border-radius: 12px;
        box-shadow: 0px 3px 15px rgba(76.50, 76.50, 76.50, 0.25);
        box-sizing: border-box;
        padding: 24px 12px;

        .row {
            width: 100%;
            box-sizing: border-box;
            padding: 9px 12px;

            font-size: 18px;
            font-weight: 400;
            color: #000;
            border-radius: 8px;
            cursor: pointer;

            &:hover,
            &.selected {
                background: #F7F7F7;
                transition: 0.3s;
            }
        }        
    }
}

.__focused.v-select {
    input {
        box-sizing: border-box;
        padding: 18px 42px 6px 18px;
    }

    .placeholder {
        font-size: 14px;
        transform: translate3D(0, 12px, 0);
        transition: 0.3s;
    }

    .arrow-icon {
        transform: rotate(180deg);
        transition: transform 0.2s ease-in-out;
        transition: 0.3s;
    } 
}

.__complete.v-select {
    .select__wrapper {
        input {
            padding: 18px 42px 6px 18px;
        }

        .placeholder {
            font-size: 14px;
            transform: translate3D(0, 12px, 0);
        }   
    }
}
</style>