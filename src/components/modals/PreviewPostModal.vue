<template>
    <div class="z-[2] w-screen h-screen fixed top-0 left-0 flex items-center justify-center px-[1rem] overflow-y-auto pt-[12rem] pb-[6rem] sm:pt-0 sm:pb-0 select-text">
        <div class="bg-c1 opacity-80 w-full h-full fixed left-0 top-0"></div>
        
        <div class="z-[3] drop-shadow max-w-[55rem] w-[55rem] min-h-[38rem] bg-white rounded-[2.4rem] relative px-[1.25rem] py-[1.5rem]">
            <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
                class="absolute bottom-[0.65rem] sm:bottom-[0.943rem] -left-[0.78rem] sm:-left-[1.08rem] w-[17.5rem] sm:w-[25rem] h-auto rounded-[2.4rem] rotate-90 select-none">
            <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
                class="absolute top-[0.65rem] sm:top-[0.98rem] -right-[0.75rem] sm:-right-[1.08rem] w-[17.5rem] sm:w-[25rem] h-auto rounded-[2.4rem] -rotate-[90deg] select-none">

            <XIcon @click="$emit('close')" 
                class="w-8 h-8 text-black absolute right-[1.25rem] top-[1.25rem] z-[2] cursor-pointer active:translate-y-[0.1rem]" />

            <div class="flex w-full border-b border-c1 relative">
                <div class="flex xs:p-[0.75rem] relative">
                    <img @click="$router.push(`/inspect-profile/${ props.post.authorId }`)" 
                    @mouseover="showPromptProfile = true"
                    @mouseleave="showPromptProfile = false"
                    :src="props.post.photoURL.value" alt="photo" 
                    :class="`border-2 border-c1 rounded-full min-w-11 min-h-11 w-11 h-11 scale-${ props.post.photoURL.scale }
                    hover:scale-125 duration-200 cursor-pointer`">
                    <span v-if="showPromptProfile"
                        class="text-xs absolute -top-[.90rem] left-1/2 -translate-x-1/2 rounded-lg shadow text-nowrap px-2 text-c1">
                        See user!
                    </span>
                </div>
                <div class="flex-grow flex flex-col justify-center text-c1 pl-[0.5rem] xs:pl-0">
                    <span class="text-[1.125rem] font-bold uppercase">{{ props.post.full_name }}</span>
                    <span class="uppercase">{{ props.post.department }}</span>
                </div>
            </div>
            <div class="uppercase font-bold text-c1 text-[2.25rem] relative pt-[1.5rem] sm:pt-[1rem] pb-[0.25rem] leading-[2.85rem]">
                {{ props.post.projectTitle }}
            </div>
            <div class="w-full pl-[0.75rem] sm:pl-[1.5rem] flex flex-col gap-2 relative">
                <div class="uppercase font-bold text-c1 text-[1.125rem] pt-[0.75rem] sm:pt-[0.5rem]">{{ props.post.rolePosition }}</div>
                <div class="text-[0.90rem] flex flex-wrap gap-2 text-c6"><span class="text-nowrap">CONTACT INFORMATION:</span>  
                    <span class="font-semibold">{{ props.post.contactInformation }}</span>
                </div>
                <div class="text-[0.90rem] flex gap-2 text-c6 flex-wrap uppercase"><span class="text-nowrap">NUMBER OF POSITIONS:</span>  
                    <span class="font-semibold">{{ props.post.numOfOpenPositions
                    }}</span>
                </div>
                <div class="text-[0.90rem] flex gap-2 text-c6 uppercase flex-wrap"><span class="text-nowrap">Project Timeline:</span>  
                    <span class="font-semibold">{{ props.post.projTimeline }}</span>
                </div>
                <div class="text-[0.90rem] flex gap-2 text-c6 uppercase border-b border-c1 pb-4 flex-wrap"><span class="text-nowrap">Compensation (if applicable):</span>  
                    <span class="font-semibold uppercase">{{ props.post.compensation }}</span>
                </div>
            </div>
            <div class="flex flex-col w-full xs:pl-[1.5rem] relative">
                <span class="text-c1 font-bold text-[1.125rem] pt-4 pb-2">Project Description</span>
                <div class="border bg-c4 w-full min-h-[7.7rem] p-2 text-[0.90rem] text-font rounded-[0.25rem] overflow-auto no-scrollbar">
                    {{  props.post.projDescription }}
                </div>
            </div>
            <div class="w-full flex justify-center sm:justify-end pt-8 sm:pr-8 ">
                <p class="text-c3 relative text-xs xs:text-base" v-if="props.post.applicants.some(((applicant) => applicant.uid == userData.uid))">You already applied. Wait for a response.</p>
                <button v-else @click="updateApplicants" class="flex items-center gap-2 drop-shadow px-12 py-1 text-[1.125rem] bg-c1 text-white rounded-full active:translate-y-[0.1rem] duration-100">
                    <BarsSpin v-if="isLoading" />
                    APPLY NOW
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import XIcon from '../icons/XIcon.vue';
import BarsSpin from '../icons/BarsSpin.vue';
import { toast } from '../../functions/toast';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
const props = defineProps(['post'])
const emit = defineEmits(['close'])
const showPromptProfile = ref(false)

const { userData } = inject('userData')

const buttonLock = ref(false)
const isLoading = ref(false)

const updateApplicants = async () => {
    if(userData.uid === props.post.authorId) {
        return toast('You cannot apply to a post you created.', "top", 1500, '#CB3D3D', '#B74242')
    }
    if(buttonLock.value) {
        return
    }
    try {
        buttonLock.value = true
        isLoading.value = true

        const currentApplicants = Array.isArray(props.post.applicants) ? props.post.applicants : [];
        const updatedApplicants = [...currentApplicants, { uid: userData.uid, status: 'Under Review', dateApplied: new Date().toISOString() }];
        
        const docRef = doc(db, 'posts', props.post.postId);
        const updatePost = await updateDoc(docRef, {
            applicants: updatedApplicants
        });

        toast('Application was sent. Wait for updates on your dashboard.', "top", 3000)
        emit('close')
        
    } catch (error) {
        toast('Error occurred while sending application.', "top", 1500, '#CB3D3D', '#B74242')
    } finally {
        isLoading.value = false
        buttonLock.value = false
    }
}
</script>