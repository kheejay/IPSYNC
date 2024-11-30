<template>
    <div class="w-full min-h-[120rem] pb-[9rem] bg-white relative overflow-hidden">
        <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
            class="absolute top-[1.35rem] -right-[2.25rem] w-[52rem] -rotate-90 h-auto">
        <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
            class="absolute bottom-[1rem] -left-[2.23rem] rotate-90 w-[55rem] h-auto">

        <div class="w-full px-[1rem] sm:px-[5.5rem] pt-[6rem]">  

            <p class="text-[3rem] sm:text-[4.2rem] font-bold tracking-[10%] text-c1 relative">{{ props.post.projectTitle }}</p>

            <div class="w-full relative mt-[1rem] flex flex-col gap-2.5 sm:gap-6 pl-6 sm:pl-12">
                <p class="text-[1.75rem] sm:text-[2.125rem] text-c1 font-bold">ROLE/POSITION: {{ props.post.rolePosition }}</p>
                <p class="text-[1.125rem] sm:text-[1.5rem] text-c6 font-bold">CONTACT INFORMATION:  
                    <span class="text-c3 font-normal px-2.5">{{ props.post.contactInformation }}</span>
                </p>
                <p class="text-[1.125rem] sm:text-[1.5rem] text-c6 font-bold">NUMBER OF OPEN POSITIONS:  
                    <span class="text-c3 font-normal px-2.5">{{ props.post.numOfOpenPositions }}</span>
                </p>
                <p class="text-[1.125rem] sm:text-[1.5rem] text-c6 font-bold">PROJECT TIMELINE:  
                    <span class="text-c3 font-normal px-2.5">{{ props.post.projTimeline }}</span>
                </p>
                <p class="text-[1.125rem] sm:text-[1.5rem] text-c6 font-bold">APPLICATION DEADLINE:  
                    <span class="text-c3 font-normal px-2.5">{{ props.post.deadline }}</span>
                </p>
                <p class="text-[1.125rem] sm:text-[1.5rem] text-c6 font-bold">COMPENSATION (IF APPLICABLE):  
                    <span class="text-c3 font-normal px-2.5">{{ props.post.compensation }}</span>
                </p>
            </div>

            <div class="w-full relative my-7 sm:my-11 flex flex-wrap gap-2 sm:gap-4">
                <div v-for="tag, index in props.post.categoryTags" :key="index" class="px-8 w-max rounded-[1.75rem] text-white bg-c3 py-1.5">
                    {{ tag.value }}
                </div>
            </div>

            <div class="w-full sm:px-8">
                <div class="text-c1 border border-c1 rounded-[0.95rem] mt-[2rem] sm:mt-[4rem] relative bg-white">
                    <div class="uppercase text-center sm:text-start sm:pl-6 py-[0.75rem] font-bold text-[1.5rem] xs:text-[1.75rem] sm:text-[2.125rem] border-b border-b-c1">Project Description</div>
                    <div class="min-h-[20rem] px-2 sm:pl-6 py-2 sm:py-4 text-[1rem] sm:text-[1.25rem]">
                        <!-- <span class="text-zinc-400 italic">Brief overview and key information about the project.</span> -->
                         {{ props.post.projDescription }}
                    </div>
                </div>
                <div class="w-full py-[2rem] mt-4">
                    <p class="text-[2.75rem] sm:text-[3.25rem] font-bold tracking-[10%] text-c1 relative">APPLICANTS</p>
                </div>
            </div>


            <div class="w-full flex justify-center">
                <div class="max-w-[65rem] w-[65rem] relative">

                    <div v-for="applicant, index in props.post.applicants" :key="index" class="w-full h-[5.5rem] sm:h-[6rem] flex items-center justify-between border border-c1 relative bg-white">
                        <div class="flex mx-1 xs:mx-2 sm:mx-6">
                            <img :src="applicant.photoURL.value" alt="" class="w-[3.5rem] h-[3.5rem] xs:w-[4rem] xs:h-[4rem] sm:w-[4.25rem] sm:h-[4.25rem] rounded-full cursor-pointer">
                            <div class="pl-2 sm:pl-4">
                                <p class="text-[1.125rem] xs:text-[1.25rem] sm:text-[1.5rem] font-bold tracking-[10%] uppercase">{{ applicant.full_name }}</p>
                                <p class="text-[0.8rem] xs:text-[0.85rem] sm:text-[0.90rem] font-light tracking-[10%] uppercase">{{ applicant.department }}</p>
                            </div>
                        </div>
                        <p class="text-c6 font-light mr-1 xs:mr-2 sn:mr-4 text-xs sm:text-base">DATE APPLIED: {{ applicant.dateApplied }}</p>
                        <p @click="handleOpenApplicantPopUp(applicant)" class="absolute right-2 sm:right-4 text-c6 italic bottom-[0.05rem] text-[0.8rem] xs:text-[0.85rem] sm:text-[0.90rem] cursor-pointer hover:underline duration-200 hover:font-bold">Review Application</p>
                    </div>

                </div>
            </div>
            
            <div class="w-full flex justify-end py-4 mt-[4rem] sm:pr-[2rem]">
                <button @click="$emit('close')" class="py-[0.75rem] px-6 xs:px-8 text-c1 xs:text-[1.25rem] font-extrabold drop-shadow rounded-[1.125rem] bg-white border border-black active:translate-y-[0.25rem] duration-200 active:shadow-none hover:bg-zinc-50">
                    BACK TO DASHBOARD
                </button>
            </div>

        </div>

        <transition name="fadeComponent" mode="out-in">
            <ViewApplicantsPopUp v-if="openApplicantPopUp" 
                :applicantData="applicantData" 
                @close="handleCloseApplicantPopUp" 
                @handleAddMember="handleAddMember"
                @handleDecline="handleDecline"/>
        </transition>
    </div>
</template>


<script setup>
const emit = defineEmits(['close', 'handleDecline', 'handleAddMember'])
const props = defineProps(['post'])

import { useDebounceFn } from '@vueuse/core';
import ViewApplicantsPopUp from './ViewApplicantsPopUp.vue';
import { ref } from 'vue';
import { toast } from '../functions/toast';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const applicantData = ref({})
const openApplicantPopUp = ref(false)

const handleOpenApplicantPopUp = useDebounceFn((applicant) => {
    applicantData.value = applicant
    openApplicantPopUp.value = true
}, 150)

const handleCloseApplicantPopUp = useDebounceFn(() => {
    openApplicantPopUp.value = false
}, 150)

const buttonLock = ref(false)

const handleDecline = async (applicantId) => {
    if(buttonLock.value) {
        return
    }
    try {
        buttonLock.value = true

        const currentApplicants = Array.isArray(props.post.applicants) ? props.post.applicants : [];
        const updatedApplicants = currentApplicants.map((applicant) => applicant.userId == applicantId ? {...applicant, status: 'Declined'} : applicant )

        const docRef = doc(db, 'posts', props.post.postId);
        const updatePost = await updateDoc(docRef, {
            applicants: updatedApplicants
        });

        toast('Application has been declined')
        handleCloseApplicantPopUp()
        
    } catch (error) {
        toast('Error occurred while declining user application.')
    }  finally {
        buttonLock.value = false
    }
}

const handleAddMember = async () => {
    // if no members yet create a group chat plus welcome toast else just add the member to current gc
}

</script>