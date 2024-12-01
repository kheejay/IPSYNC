<template>
    <div class="z-[2] w-screen h-screen fixed top-0 left-0 flex items-start py-20 overflow-y-auto no-scrollbar justify-center bg-transparent select-none px-2 sm:px-4">
        <div @click="$emit('close')" class="bg-c1 opacity-80 w-full h-full fixed left-0 top-0"></div>
    
        <!-- 1.357784431137725 -->
         <div class="drop-shadow max-w-[50.84rem] w-[50.84rem] bg-white rounded-[1.125rem] relative py-12 px-4 sm:p-12">
            <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
                class="absolute top-[0.675rem] -right-[0.725rem] xs:top-[1rem] xs:-right-[1.1rem] sm:top-[1.4rem] sm:-right-[1.45rem] w-[18rem] xs:w-[26rem] sm:w-[36rem] -rotate-90 h-auto rounded-[1.125rem] z-[-1]">
            <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
                class="absolute bottom-[0.675rem] -left-[0.75rem] xs:bottom-[1rem] sm:bottom-[1.4rem] xs:-left-[1.1rem] sm:-left-[1.4575rem] rotate-90 w-[18rem] xs:w-[26rem] sm:w-[36rem] h-auto rounded-[1.125rem] z-[-1]">

            <XIcon @click="$emit('close')" class="w-7 h-7 sm:w-9 sm:h-9 text-black absolute right-[1rem] top-[1rem] sm:right-[1.5rem] sm:top-[1.5rem] z-[2] cursor-pointer active:translate-y-[0.1rem] duration-200 rounded-full" />
            
            <div class="font-bold tracking-[10%] text-c1 text-[2.25rem] md:text-[2.5rem] py-2 sm:py-0 sm:p-2">
                {{ props.post.projectTitle }}
            </div>

            <div class="w-full xs:px-6 sm:px-12">
                <p class="font-bold text-c1 tracking-[10%] text-[1.25rem] sm:text-[1.5em] sm:py-1">ROLE: <span class="font-light uppercase italic">{{ props.post.rolePosition }}</span></p>

                <div class="text-c1 border border-c1 rounded-[0.95rem] mt-2 bg-white">
                    <div class="uppercase pl-4 py-1.5 font-bold text-[1.125rem] border-b border-b-c1">Project Description</div>
                    <div class="min-h-[12rem] pl-4 py-2">
                        {{ props.post.projDescription }}
                    </div>
                </div>
                
                <div class="text-c1 border border-c1 rounded-[0.95rem] mt-8 bg-white">
                    <div class="uppercase py-1.5 font-bold text-[1.125rem] border-b border-b-c1 w-full flex">
                        <div class="pl-6 w-3/5">TEAM Members</div>
                        <div class="pl-6 w-2/5">ROLE</div>
                    </div>
                    <div class="px-1">
                        <div class="max-h-[14rem] h-[14rem] pr-2 pl-4 py-4 overflow-y-scroll thumb-scrollbar">
                            <div v-for="member, index in props.post.members" :key="index" :class="`w-full flex border-t border-t-c3 h-[4.5rem] ${ index == props.post.members.length - 1 && 'border-b border-b-c3'} hover:scale-[98%] hover:bg-zinc-50 duration-200`">
                                <div class="w-[64.5%] flex items-center gap-2.5">
                                    <img @click="$router.push(`/inspect-profile/${member.uid}`)" :src="member.photoURL.value ?? 'https://i.ibb.co/rfRCfwf/logo.png'" alt="" class="w-[3rem] h-[3rem] rounded-full cursor-pointer duration-200 hover:scale-105">
                                    <p class="uppercase">{{ member.full_name }}</p>
                                </div>
                                <div class="uppercase font-[300] flex items-center">
                                    {{ member.rolePosition }}
                                </div>
                            </div>
                            <div v-if="!props.post.members.length" class="w-full text-center mt-[4rem] text-c1">Project has not members yet </div>
                        </div>
                    </div>
                    <div class="py-[0.125rem] pr-6 border-t border-t-c1 flex justify-end">
                        <div class="relative">
                            <span v-show="showChat" class="absolute -top-5 left-[-3.5rem] text-[0.75rem] text-nowrap bg-white rounded-xl text-black shadow px-2">Open Group Chat!</span>
                            <MailIcon @mouseover="openShowChat" @mouseleave="hideShowChat" 
                                @click="handleMailClick"
                                class="w-[1.75rem] h-auto cursor-pointer active:scale-95 duration-200" />
                        </div>
                    </div>
                </div>

                <p class="sm:text-[1.125rem] font-bold text-c6 py-2 mt-4">DATE CREATED: <span class="font-light pl-2">{{ format(props.post.timestamp, ('MM/dd/yyyy'))}}</span></p>
                <p class="sm:text-[1.125rem] font-bold text-c6 py-1.5">DEADLINE: <span class="font-light pl-2">{{ props.post.deadline }}</span></p>

                <div class="w-full flex justify-end">
                    <button class="py-[0.5rem] mt-2 sm:py-[0.75rem] px-4 sm:px-8 text-c1 font-extrabold drop-shadow rounded-[1.125rem] bg-white border border-black active:translate-y-[0.25rem] duration-200 active:shadow-none hover:bg-zinc-50">
                        MARK AS COMPLETE
                    </button>
                </div>

            </div>

         </div>
    </div>
</template>


<script setup>
import XIcon from '../components/icons/XIcon.vue'
import MailIcon from '../components/icons/MailIcon.vue'
import { format } from 'date-fns';
import { useDebounceFn } from '@vueuse/core';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
const emit = defineEmits(['close'])
const props = defineProps(['post'])

const showChat = ref(false)

const openShowChat = useDebounceFn(() => showChat.value = true, 150)
const hideShowChat = useDebounceFn(() => showChat.value = false, 150)

const { fetchMessageRoom, selectedRoom, messagesRooms } = inject('userData')

const router = useRouter()

const handleMailClick = useDebounceFn((event) => {
    event.stopPropagation();
    if(!props.post?.roomId) {
        return toast('Project hasn\'t created a room yet')
    }
    selectedRoom.value = messagesRooms.value.find((room) => room.roomId == props.post.roomId)
    fetchMessageRoom()
    router.push({ name: 'Messages' })
}, 150)
</script>