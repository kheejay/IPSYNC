<template>
<div class="z-[2] fixed w-screen h-screen top-0 left-0 bg-c1 opacity-65"></div>
<div class="z-[2] flex flex-col gap-4 sm:gap-6 p-6 bg-c4 shadow-[0rem_0.25rem_0.25rem_black] border border-black w-[90%] sm:w-max
    fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="w-full sm:w-[20rem]">{{ message ?? 'Please confirm to do this action.' }}</div>
    <div class="w-full flex items-center gap-4">
        <button @click="$emit('cancel')" class="bg-white p-2 sm:p-4 text-xs sm:text-[0.90rem]">Cancel</button>
        <button @click="$emit('confirm')" class="bg-c1 text-white p-2 sm:p-4 text-xs sm:text-[0.90rem]">Confirm</button>
    </div>
</div>
</template>

<script setup>
const { message } = defineProps(['message'])
const { cancel, confirm } = defineEmits(['cancel', 'confirm'])
</script>