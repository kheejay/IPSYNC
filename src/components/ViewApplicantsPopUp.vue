<template>
    <div class="z-[2] w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-transparent select-none">
        <div class="bg-c1 opacity-80 w-full h-full fixed left-0 top-0"></div>
    
        <!-- 1.357784431137725 -->
         <div class="drop-shadow max-w-[39.3rem] w-[39.3rem] min-h-[29rem] bg-white rounded-[3.125rem] relative p-2 flex items-center justify-center flex-col">
            <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
                class="absolute bottom-0 right-0 w-[26rem] h-auto rounded-[2.4rem] z-[-1]">
            <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
                class="absolute top-0 left-0 rotate-180 w-[26rem] h-auto rounded-[2.4rem] z-[-1]">

            <XIcon @click="$emit('close')" class="w-9 h-8 text-black absolute right-[1.5rem] top-[1.8rem] z-[2] cursor-pointer active:translate-y-[0.1rem] duration-200 rounded-full" />
            
            <img :src="props.applicantData.photoURL.value ?? 'https://i.ibb.co/kBxjQtb/chickenbilog.jpg'" alt="" class="w-[11rem] h-[11rem] rounded-full border-4 border-c1">

            <p class="text-[1.75rem] text-c1 font-extrabold tracking-[10%] py-2">
                {{ props.applicantData.full_name }}
            </p>

            <p @click="$router.push(`/inspect-profile/${ props.applicantData.uid }`)" class="underline text-c1 text-[1.25rem] cursor-pointer font-[400]">
                View Profile
            </p>
            
            <div class="w-full flex items-center justify-center gap-16 mt-10">
                <button v-if="applicantData.status == 'Under Review'" @click="$emit('handleDecline', props.applicantData.uid)" class="w-[10rem] py-2 text-[1.125rem] text-c1 font-extrabold drop-shadow rounded-[1rem] border border-black active:translate-y-[0.25rem] duration-200 active:shadow-none hover:bg-zinc-50 bg-white">
                    DECLINE
                </button>
                <button v-if="applicantData.status == 'Under Review'" @click="$emit('handleAddMemberAction', props.applicantData.uid)" class="w-[10rem] py-2 text-[1.125rem] text-white bg-c1 font-extrabold drop-shadow rounded-[1rem] border border-black active:translate-y-[0.25rem] duration-200 active:shadow-none hover:bg-[#0e2d58]">
                    ACCEPT
                </button>
                <p v-else-if="applicantData.status == 'Accepted'" class="text-[2rem] flex items-center gap-2 text-green-500">Accepted <Check class="w-11 h-11" /></p>
                <p v-else-if="applicantData.status == 'Declined'" class="text-[2rem] flex items-center gap-2 text-zinc-300">Declined <Close class="w-11 h-11" /></p>
            </div>
         </div>
    </div>
</template>


<script setup>
import XIcon from '../components/icons/XIcon.vue'
import Check from './icons/Check.vue';
import Close from '../components/icons/Close.vue'
const props = defineProps(['applicantData'])
const emit = defineEmits(['close', 'handleDecline', 'handleAddMemberAction'])
</script>