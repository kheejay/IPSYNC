<template>
    <div v-if="!openMyPostedProject" class="w-full p-4 sm:px-6 sm:pt-6 pb-12">

       <div class="flex flex-col lg:flex-row w-full gap-4">
            <div class="h-[22rem] sm:h-[25rem] lg:h-[38rem] w-full lg:w-[24rem] bg-c1 rounded-[0.75rem] shadow-glass backdrop-blur-[1.56rem] flex flex-col justify-center">
                <p class="text-[1.9rem] sm:text-[2.25rem] sm:leading-[3.25rem] w-full text-center font-bold text-white">Hello, {{ userData.full_name.value.split(" ")[0] + '!' }}</p>
                <p class="text-[0.90rem] sm:text-[1rem] underline sm:leading-[1.5rem] w-full text-center font-light tracking-wider underline-offset-2 text-white">{{ userData.gmail ?? userData.facebook ?? userData.mobileNumber }}</p>
                <div class="w-full flex justify-center my-[1.25rem]">
                    <img :src="userData.photoURL.value" alt="profile" :class="`w-[9rem] h-[9rem] sm:w-[11rem] lg:w-[12rem] sm:h-[11rem] lg:h-[12rem] rounded-full border-[0.35rem] border-white`">
                </div>
                <div class="flex w-full justify-center my-2">
                    <button @click="$router.push({ name: 'Profile' })" class="text-[0.90rem] sm:text-[1rem] font-bold border-[0.25rem] border-[#325F9D] py-1.5 px-14 rounded-[1.875rem] bg-white text-[#325F9D]">
                        View Profile
                    </button>
                </div>
            </div>
            <div class="flex-grow max-h-[38rem] border shadow-glass backdrop-blur-[1.56rem] bg-[#DFEAFF4D] bg-opacity-30 rounded-[0.75rem] p-2 sm:p-4 flex flex-col">
                <div class="text-[1.75rem] xs:text-[2rem] sm:text-[2.25rem] font-bold tracking-[1%] h-[4rem] w-full flex items-center border-b border-b-c1 relative p-4 sm:p-0">
                    ACTIVE PROJECTS
                    <Diamond class="w-[0.55rem] h-[0.55rem] absolute text-c1 -left-[0.33rem] -bottom-[0.35rem]" />
                    <Diamond class="w-[0.55rem] h-[0.55rem] absolute text-c1 -right-[0.33rem] -bottom-[0.35rem]" />
                </div>
                <div v-if="!activeProjects.length" class="w-full text-center mt-[10rem] text-c1">No active projects yet 🙂</div>
                <div class="flex-grow p-2 overflow-y-auto grid project-cards gap-4 mt-2.5 thumb-scrollbar">
                    <ActiveProjectsCard v-for="post, index in activeProjects" :key="index" 
                        :post="post" 
                        @showActiveProject="showActiveProject" />
                </div>
            </div>
       </div>

       <div class="flex flex-col lg:flex-row w-full mt-[5rem] gap-4">
            <div class="w-full lg:w-1/2 h-[28rem] shadow-glass backdrop-blur-[1.56rem] bg-[#DFEAFF4D] bg-opacity-40 rounded-[0.75rem] border flex flex-col">
                <div class="w-full text-[1.5rem] sm:text-[2rem] font-bold text-c1 tracking-[1%] py-4 pl-4 border-b border-c1 mb-6">POSTED PROJECTS</div>

                <div class="flex-grow px-2 sm:px-4 flex mb-4">
                    <div class="flex-grow overflow-y-auto thumb-scrollbar max-h-[20rem] px-2 sm:px-4">
                        <div @click="showMyPostedProject(post)" v-for="post, index in postedProjects" :key="index" :class="`w-full border-t border-c1 flex items-center h-[5.7rem] ${ index === postedProjects.length - 1 && 'border-b'} cursor-pointer hover:scale-[98%] duration-200`">
                            <img :src="post.postPhotoURL ?? post.photoURL.value ?? 'https://i.ibb.co/VmwCJxf/image.png'" alt="" class="w-[3rem] h-[3rem] sm:w-[3.75rem] sm:h-[3.75rem] rounded-full border-2 border-c1">
                            <div class="flex-grow flex justify-between items-center pr-2 sm:pr-8">
                                <div class="pl-2">
                                    <p class="sm:text-[1.25rem] text-c1 font-bold uppercase">{{ post.projectTitle
                                    }} </p>
                                    <p class="text-[0.7rem] sm:text-[0.75rem] text-c1 uppercase">{{ post.rolePosition}}</p>
                                </div>
                                <span class="w-5 h-5 text-xs rounded-full bg-c6 text-white flex items-center justify-center">1</span>
                            </div>
                        </div>
                        <div v-if="!postedProjects.length" class="w-full text-center mt-[8rem] text-c1">No posted projects yet 🙂</div>
                    </div>
                </div>

            </div>
            <div class="w-full lg:w-1/2 h-[28rem] shadow-glass backdrop-blur-[1.56rem] bg-[#DFEAFF4D] bg-opacity-40 rounded-[0.75rem] border flex flex-col">
                <div class="w-full text-[1.5rem] sm:text-[2rem] font-bold text-c1 tracking-[1%] py-4 pl-4 border-b border-c1 mb-6">MY APPLICATIONS</div>

                <div class="flex-grow px-2 sm:px-4 flex mb-4">
                    <div class="flex-grow overflow-y-auto thumb-scrollbar max-h-[20rem] px-2 sm:px-4">
                        <div @click="showApplicationStatus(post.applicants.find((applicant) => applicant.userId == userData.uid).status)" 
                            v-for="post, index in myApplications" :key="index" :class="`w-full border-t border-c1 flex items-center h-[5.7rem] relative ${ index === myApplications.length - 1 && 'border-b'} cursor-pointer hover:scale-[98%] duration-200`">
                            <img :src="post.postPhotoURL" alt="" class="w-[3rem] h-[3rem] sm:w-[3.75rem] sm:h-[3.75rem] rounded-full border border-c1">
                            <div class="flex-grow h-full flex justify-between items-center sm:pr-4 ">
                                <div class="pl-2">
                                    <p class="sm:text-[1.25rem] text-c1 font-bold uppercase">{{ post.projectTitle }}</p>
                                    <p class="text-[0.7rem] sm:text-[0.75rem] text-c1 uppercase">{{ post.rolePosition }}</p>
                                </div>

                                    <p class="font-light text-c6 text-[0.75rem] text-wrap">DATE APPLIED: {{ format(post.applicants.find((applicant) => applicant.userId == userData.uid).dateApplied, 'MM/dd/yyyy') }}</p>

                                    <p :class="`font-light text-[0.75rem] italic absolute right-2 sm:right-4 bottom-1 
                                    ${ post.applicants.find((applicant) => applicant.userId == userData.uid).status == 'Under Review' ? 'text-c1' : post.applicants.find((applicant) => applicant.userId == userData.uid).status == 'Accepted' ? 'text-green-500' : 'text-red-500'}`">{{
                                        post.applicants.find((applicant) => applicant.userId == userData.uid).status
                                    }}</p>
                            </div>
                        </div>
                        <div v-if="!myApplications.length" class="w-full text-center mt-[8rem] text-c1">No active applications yet 🙂</div>
                    </div>
                </div>
            
            </div>
       </div>

       <div class="w-full my-[3.5rem] border border-c1 shadow-[0px_0.2rem_0.2rem_rgba(0,0,0,0.15)]"></div>

       <div class="w-full rounded-b-[0.75rem]">
           <div class="w-full text-[1.5rem] sm:text-[2rem] font-bold text-c1 tracking-[1%] py-4 pl-1" style="text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);">COMPLETED PROJECTS</div>
           <div class="w-full rounded-b-[0.75rem] drop-shadow bg-[#DFEAFF4D] bg-opacity-40">
                <div class="w-full h-[30rem]">
                    <div class="h-[4rem] flex w-full bg-c1 text-white items-center">
                        <div class="font-normal text-sm sm:text-[1.25rem] text-start pl-2 sm:pl-8 w-[30%]">Project Name</div>
                        <div class="font-normal text-sm sm:text-[1.25rem] text-start w-[17%]">Role</div>
                        <div class="font-normal text-sm sm:text-[1.25rem] text-start w-[19%]">Date Created</div>
                        <div class="font-normal text-sm sm:text-[1.25rem] text-start w-[19%]">Date Finished</div>
                        <div class="font-normal text-sm sm:text-[1.25rem] text-start w-[15%]">Status</div>
                    </div>
                    <div class="w-full h-[25rem] overflow-y-auto thumb-scrollbar">
                        <div class="w-full" v-for="post, index in completedProjects" :key="index">
                            <div :class="`${x === 1 && 'mt-5'} px-4 w-full`">
                                <div class="w-full border-t border-c3"></div>
                            </div>
                            <div class="h-[5rem] items-center flex w-full text-wrap">
                                <div class="font-bold text-[0.65rem] sm:text-[1.125rem] uppercase text-c1 text-start pl-2 sm:pl-8 w-[30%] tracking-[1%]">{{ post.projectTitle }}</div>
                                <div class="text-font text-[0.5rem] sm:text-[1rem] font-bold uppercase text-start w-[17%]">{{ post.rolePosition }}</div>
                                <div class="text-font text-[0.5rem] sm:text-[1rem] font-bold text-start w-[19%]">{{ format(post.timestamp, 'MM/dd/yyyy') }}</div>
                                <div class="text-font text-[0.5rem] sm:text-[1rem] font-bold text-start w-[19%]">11/22/2024</div>
                                <div class="text-green-500 italic uppercase text-[0.5rem] sm:text-[1rem] font-light text-start w-[15%]">cOMPLETED</div>
                            </div>
                        </div>
                        <div v-if="!completedProjects.length" class="w-full text-center mt-[10rem] text-c1">No completed projects yet 🙂</div>
                    </div>
                </div>
            </div>
       </div>
       <transition name="fadeComponent" mode="out-in">
           <AcceptedPopUp v-if="applicationStatus == 'Accepted'" @close="closeStatusPopUp" />
        </transition>
        <transition name="fadeComponent" mode="out-in">
            <UnderReviewPopUp v-if="applicationStatus == 'Under Review'" @close="closeStatusPopUp" />
        </transition>
        <transition name="fadeComponent" mode="out-in">
            <DeclinePopUp v-if="applicationStatus == 'Declined'" @close="closeStatusPopUp" />
        </transition>
        <transition name="fadeComponent" mode="out-in">
            <ActiveProjectsPopUp v-if="openActiveProject" 
                @close="closeActiveProject"
                :post="activeProjectData"/>
        </transition>
    </div>
    <MyPostedProject v-else @close="hideMyPostedProject" :post="myPostedProjectData" />
</template>

<script setup>
import Diamond from '../components/icons/Diamond.vue';
import ActiveProjectsCard from '../components/ActiveProjectsCard.vue';
import ActiveProjectsPopUp from '../components/ActiveProjectsPopUp.vue';
import AcceptedPopUp from '../components/AcceptedPopUp.vue'
import DeclinePopUp from '../components/DeclinePopUp.vue'
import UnderReviewPopUp from '../components/UnderReviewPopUp.vue'
import MyPostedProject from '../components/MyPostedProject.vue';
import { inject, ref } from 'vue';
import { useDebounceFn, useWindowScroll } from '@vueuse/core';
import { format } from 'date-fns';

const { userData, activeProjects, completedProjects, myApplications, postedProjects } = inject('userData')

const applicationStatus = ref('')

const showApplicationStatus = useDebounceFn((status) => {
    applicationStatus.value = status
}, 150)

const closeStatusPopUp = useDebounceFn((fromAcceptedPopUp = false) => {
    applicationStatus.value = ''
    if(fromAcceptedPopUp) {
        handleBackToTop()
    }
}, 150)

const openMyPostedProject = ref(false)
const myPostedProjectData = ref({})

const { y } = useWindowScroll({ behavior: 'smooth' })

const handleBackToTop = () => {
    y.value = 0;
}

const showMyPostedProject = useDebounceFn((post) => {
    myPostedProjectData.value = post
    openMyPostedProject.value = true
    handleBackToTop()
}, 150)

const hideMyPostedProject = useDebounceFn(() => {
    openMyPostedProject.value = false
    handleBackToTop()
}, 150)

const openActiveProject = ref(false)
const activeProjectData = ref({})

const closeActiveProject = useDebounceFn(() => {
    openActiveProject.value = false
}, 150)

const showActiveProject = useDebounceFn((post) => {
    activeProjectData.value = post
    openActiveProject.value = true
}, 150)

</script>

<style scoped>
.project-cards {
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
}
@media (max-width: 1468px) {
    .project-cards {
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
    }
}
@media (max-width: 888px) {
    .project-cards {
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
    }
}
@media (max-width: 648px) {
    .project-cards {
        grid-template-columns: repeat(1, 1fr);
        justify-items: center;
    }
}
</style>