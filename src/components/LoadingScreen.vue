<template>
    <div class="z-[5] fixed w-screen h-screen top-0 left-0">
        <div class="fixed top-0 left-0 h-full w-full bg-c1 opacity-70"></div>
        <div class="z-[5] fixed top-0 left-0 h-full w-full flex-col gap-2 flex items-center justify-center">
            <span class="z-[5] text-white tracking-wider text-sm">{{ loadingPrompt }}</span>
            <SvgSpinnersBlocksShuffle3 class="text-white z-[5] w-[3rem] h-[3rem]" />
        </div>
    </div>
</template>

<script setup>
import SvgSpinnersBlocksShuffle3 from './icons/SvgSpinnersBlocksShuffle3.vue'
const { loadingPrompt } = defineProps(['loadingPrompt'])
</script>