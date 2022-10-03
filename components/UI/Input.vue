<template>
    <div>

        <label class="block pl-3 ml-px text-sm font-medium text-gray-700" for="" v-if="props.label">
            {{props.label}}
        </label>
        <div class="mt1">
            <input :type="props.type" @input="event=>emits('update:modelValue', event.target.value )"
                :value="props.modelValue" class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500
    focus:border-blue-500 sm:text-sm" :placeholder="props.placeholder">

        </div>
    </div>


    <!-- dk 2:12 -->
</template>

<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    label: {
        type: String,
        default: null
    },
    modelValue:{
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    }
   
})
</script>

<style>

</style>