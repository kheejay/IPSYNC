<template>
    <div class="w-full max-w-[100rem] mx-auto flex flex-col px-3 xl:px-12 sticky top-0 bg-c5 shadow">
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
        <div class="w-full h-fit md:h-[18rem] py-11 pl-[1rem] sm:pl-[7rem] text-[1rem]">
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
    </div>
</template>

<script setup>
import IPSYNCLogo from './IPSYNCLogo.vue';
import fb from './icons/socmed/fb.vue';
import ig from './icons/socmed/ig.vue';
import x from './icons/socmed/x.vue';
import yt from './icons/socmed/yt.vue';
</script>