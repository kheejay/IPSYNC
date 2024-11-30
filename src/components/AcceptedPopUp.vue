<template>
    <div class="z-[2] w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-transparent px-2 xs:px-4 md:px-0">

        <div @click="$emit('close')" class="bg-c1 opacity-80 w-full h-full fixed left-0 top-0"></div>

         <div class="drop-shadow max-w-[43rem] w-[43rem] h-max bg-white rounded-[2.5rem] md:rounded-[3.125rem] relative py-9 pb-[2.35rem] flex items-center justify-start flex-col">
            <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
                class="absolute -bottom-[0.06rem] -right-[0.05rem] w-[22rem] sm:w-[24rem] md:w-[26rem] h-auto rounded-[2.5rem] md:rounded-[3.35rem] select-none z-[-1]">
            
            <p class="text-[1.7rem] py-1 xs:text-[2rem] md:text-[2.5rem] font-bold text-c1 text-center tracking-[10%] uppercase">
                Application Status
            </p>
            <Accepted class="h-[10rem] md:h-[13rem] scale-[110%] w-auto" />
            <p class="pb-[1rem] text-sm sm:text-base px-4 text-center">                  
                You’ve been accepted! Find tasks and updates in Active Projects.
            </p>
            <button @click="$emit('close')" class="bg-white px-6 py-1.5 mt-1.5 mb-[0.75rem] sm:text-[1.125rem] text-c1 font-bold drop-shadow rounded-[1.75rem] border border-black active:translate-y-[0.25rem] duration-200 active:shadow-none hover:bg-zinc-50">
                BACK TO ACTIVE PROJECTS
            </button>
         </div>
    </div>
</template>


<script setup>
import Accepted from './icons/Accepted.vue'
const emit = defineEmits(['close'])
</script>