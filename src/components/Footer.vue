<template>
    <div class="w-full max-w-[120rem] mx-auto flex flex-col px-3 xl:px-12 sticky top-0 bg-c5 shadow">
        <div class="flex w-full h-[12rem] border-b-2 border-c1 pb-2 sm:pb-6">
            <div class="w-1/2 flex items-center h-full sm:pl-10 border">
                <IPSYNCLogo class="w-[5rem] h-[3rem]" />
            </div>
            <div class="w-1/2 flex items-end justify-end h-full sm:pr-10">
                <div class="flex gap-5 scale-75 sm:scale-90 md:scale-100">
                    <fb class="w-[2.5rem] h-[2.5rem] hover:scale-110" />
                    <ig class="w-[2.5rem] h-[2.5rem] hover:scale-110" />
                    <x class="w-[2.5rem] h-[2.5rem] hover:scale-110" />
                    <yt class="w-[3rem] h-[2.5rem] scale-125 hover:scale-[135%]" />
                </div>
            </div>
        </div>
        <div class="w-full h-fit md:h-[18rem] py-11 pl-[1rem] sm:pl-[7rem] text-[1rem] overflow-hidden">
            <div class="grid gap-2 md:gap-0 sm:flex w-full h-full">
                <div class="w-max sm:w-[18rem] md:w-[18rem]">
                    <p class="font-bold py-2 text-c1">HEAD OFFICE</p>
                    <p class="cursor-pointer hover:underline py-1">WVSU MAIN CAMPUS</p>
                    <p class="cursor-pointer hover:underline py-1">CICT BUILDING</p>
                    <p class="cursor-pointer hover:underline py-1">VILLA BAYBAY, BONIFACIO</p>
                </div>
                <div class="w-max sm:w-[18rem] md:w-[18rem]">
                    <p class="font-bold py-2 text-c1">CONTACT US</p>
                    <p class="cursor-pointer hover:underline py-1">START UPS</p>
                    <p class="cursor-pointer hover:underline py-1">BUSINESS PAYMENTS</p>
                    <p class="cursor-pointer hover:underline py-1">ENTERPRISE</p>
                </div>
                <div class="w-max sm:w-[18rem] md:w-[18rem]">
                    <p class="font-bold py-2 text-c1">SUPPORT</p>
                    <p class="cursor-pointer hover:underline py-1">HELP CENTER</p>
                    <p class="cursor-pointer hover:underline py-1">MY ACCOUNT</p>
                    <p class="cursor-pointer hover:underline py-1">CONTACT US</p>
                </div>
            </div>
        </div>
        <div v-if="backToTopArrow" @click="handleBackToTop" @mouseover="promptToTop = true" @mouseleave="promptToTop = false"
            class="drop-shadow flex items-center justify-center bg-c4 fixed bottom-[2rem] right-[2rem] sm:bottom-[4rem] sm:right-[4rem] rounded-full cursor-pointer opacity-70 w-[3rem] h-[3rem] sm:w-[5rem] sm:h-[5rem] hover:opacity-100 duration-200">
            <ArrowToTop class="w-11 h-11 sm:w-16 sm:h-16 text-black" />
            <div class="relative">
                <span v-if="promptToTop || $route.name == 'Profile'" class="absolute text-base left-1/2 -translate-x-[78%] -top-[3rem] sm:-top-[6rem] text-nowrap bg-c4 rounded-full py-1 px-4">Back to top</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import IPSYNCLogo from './IPSYNCLogo.vue';
import fb from './icons/socmed/fb.vue';
import ig from './icons/socmed/ig.vue';
import x from './icons/socmed/x.vue';
import yt from './icons/socmed/yt.vue';
import ArrowToTop from './icons/ArrowToTop.vue'
import { useWindowScroll } from '@vueuse/core';
import { useRoute } from 'vue-router';

const { y } = useWindowScroll({ behavior: 'smooth' })

const backToTopArrow = ref(false)
const promptToTop = ref(false)

const handleBackToTop = () => {
    y.value = 0;
}

const route = useRoute()

watch(y, (newValue) => {
    let threshold = route.name == 'Profile' ? 1400 : 1800;
    if(newValue > threshold) {
        backToTopArrow.value = true;
    } else if(newValue < threshold) {
        backToTopArrow.value = false;
        promptToTop.value = false;
    }
})
</script>