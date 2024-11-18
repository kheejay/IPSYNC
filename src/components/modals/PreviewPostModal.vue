<template>
    <div class="z-[2] w-screen h-screen fixed top-0 left-0 flex items-center justify-center px-[1rem] overflow-y-auto pt-[12rem] pb-[6rem] sm:pt-0 sm:pb-0 select-text">
        <div class="bg-c1 opacity-80 w-full h-full fixed left-0 top-0"></div>
        
        <div class="z-[3] drop-shadow max-w-[55rem] w-[55rem] min-h-[38rem] bg-white rounded-[2.4rem] relative px-[1.25rem] py-[1.5rem]">
            <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
                class="absolute bottom-[0.65rem] sm:bottom-[0.943rem] -left-[0.78rem] sm:-left-[1.08rem] w-[17.5rem] sm:w-[25rem] h-auto rounded-[2.4rem] rotate-90 select-none">
            <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
                class="absolute top-[0.65rem] sm:top-[0.98rem] -right-[0.75rem] sm:-right-[1.08rem] w-[17.5rem] sm:w-[25rem] h-auto rounded-[2.4rem] -rotate-[90deg] select-none">

            <XIcon class="w-8 h-8 text-black absolute right-[1.25rem] top-[1.25rem] z-[2] cursor-pointer active:translate-y-[0.1rem]" />

            <div class="flex w-full border-b border-c1 relative">
                <div class="flex xs:p-[0.75rem]">
                    <img src="https://i.ibb.co/LJPrkjQ/np.png" alt="photo" 
                    class="border-2 border-c1 rounded-full min-w-11 min-h-11 w-11 h-11">
                </div>
                <div class="flex-grow flex flex-col justify-center text-c1 pl-[0.5rem] xs:pl-0">
                    <span class="text-[1.125rem] font-bold uppercase">USERNAME SAMPLE</span>
                    <span class="uppercase">Department/Organization</span>
                </div>
            </div>
            <div class="uppercase font-bold text-c1 text-[2.25rem] relative pt-[1rem] pb-[0.25rem] leading-[2.85rem]">
                SOFTWARE ENGINEER
            </div>
            <div class="w-full pl-[0.75rem] sm:pl-[1.5rem] flex flex-col gap-2 relative">
                <div class="uppercase font-bold text-c1 text-[1.125rem]">ECCOMERCE WEB APPLICATION</div>
                <div class="text-[0.90rem] flex flex-wrap gap-2 text-c6"><span class="uppercase text-nowrap">Contact Information:</span>  
                    <span class="font-semibold">www.facebook.com/mr.recruiter123</span>
                </div>
                <div class="text-[0.90rem] flex gap-2 text-c6 flex-wrap"><span class="uppercase text-nowrap">Number of Open Positions:</span>  
                    <span class="font-semibold">1</span>
                </div>
                <div class="text-[0.90rem] flex gap-2 text-c6 uppercase flex-wrap"><span class="text-nowrap">Project Timeline:</span>  
                    <span class="font-semibold">January 7 - may 7 2025</span>
                </div>
                <div class="text-[0.90rem] flex gap-2 text-c6 uppercase  border-b border-c1 pb-4 flex-wrap"><span class="text-nowrap">Compensation (if applicable):</span>  
                    <span class="font-semibold uppercase">senior 56k - 80k, junior 25k - 38k</span>
                </div>
            </div>
            <div class="flex flex-col w-full xs:pl-[1.5rem] relative">
                <span class="text-c1 font-bold text-[1.125rem] pt-4 pb-2">Project Description</span>
                <div class="drop-shadow bg-c4 w-full min-h-[7rem] p-2 text-[0.90rem] text-font rounded-[0.25rem] overflow-auto no-scrollbar">
                    Project Description
                </div>
            </div>
            <div class="w-full flex justify-center sm:justify-end pt-8 sm:pr-8 ">
                <button class="drop-shadow px-12 py-1 text-[1.125rem] bg-c1 text-white rounded-full active:translate-y-[0.1rem] duration-100">
                    APPLY NOW
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import ArrowDownNoBg from '../icons/ArrowDownNoBg.vue';
import XIcon from '../icons/XIcon.vue';
</script>