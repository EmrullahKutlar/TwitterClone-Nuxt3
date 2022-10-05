<template>
    <button class=" flex justify-center text-white bg-blue-400 rounded-full hover:bg-blue-500 font-sm
        disabled:bg-blue-300 disabled:cursor-not-allowed " :class="classes" :disabled="props.disabled"
        @click="handleClick">
        <span :class="textFontSize">
            <slot></slot>
        </span>
    </button>
</template>

<script setup>
const emits = defineEmits(['onClick'])
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'md'
    },
    liquid: {
        type: Boolean,
        default: false
    }
})
const PaddingClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'py-2 px-3'
        case 'lg':
            return 'px-4 py-3'
        default:
            return 'px-3 py-3'
    }
})
const textFontSize = computed(() => {
    switch (props.size) {
        case 'lg':
            return 'text-md'
        default:
            return 'text-sm'
    }
})

const defaultWidth = computed(() => {
    switch (props.size) {

        default:
            return 'w-min'
    }
})

const classes = computed(() => {
    return PaddingClasses.value + ' ' + (props.liquid ? 'w-full' : defaultWidth)
})

const handleClick = (event) => {
    emits('onClick', event)
}
</script>

<style>

</style>