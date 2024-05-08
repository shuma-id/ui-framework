<template>
    <span :class="`v-arrow __${this.type} __${this.direction}`">
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0_84_3976)">
                <path
                    d="M6.48999 20.1301L8.25999 21.9001L18.16 12.0001L8.25999 2.1001L6.48999 3.8701L14.62 12.0001L6.48999 20.1301Z"
                    fill="black"
                />
            </g>
            <defs>
                <clipPath id="clip0_84_3976">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </span>
</template>

<script>
export default {
    name: "VArrow",
    props: {
        type: {
            type: String,
            default: "active",
        },
        direction: {
            type: String,
            default: "right",
        },
    },
};
</script>

<style scoped lang="scss">
.v-arrow {
    display: flex;
    align-items: center;
    height: 24px;
    width: 24px;

    svg path {
        fill: var(--color-main);
    }

    &.__active {
        svg path {
            fill: var(--color-main);
        }
    }

    &.__passive {
        svg path {
            fill: var(--color-main-grey);
        }
    }

    &.__bottom {
        transform: rotate(90deg);
    }

    &.__left {
        transform: rotate(180deg);
    }

    &.__top {
        transform: rotate(270deg);
    }
}
</style>
