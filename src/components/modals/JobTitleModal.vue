<template>
    <div class="w-full flex items-center py-4">
        <div class="p-4 sm:px-6 sm:py-4 border border-black rounded-xl">
            <JobTitleIcon class="w-[3rem] h-[3rem] sm:w-[6rem] sm:h-[6rem]" />
        </div>
        <div class="flex justify-center pl-4 flex-col">
            <input type="text" class="w-full text-[1.125rem] text-c1 font-bold uppercase" value="STUDENT / TEACHER / EMPLOYED">
            <input type="text" class="w-full text-[0.90rem] text-c1 uppercase" value="N/A">
            <input type="text" class="w-full text-[0.90rem] text-c1 uppercase" value="2020 - 2024">
        </div>
    </div>
</template>

<script setup>
import JobTitleIcon from '../icons/JobTitleIcon.vue'
</script>