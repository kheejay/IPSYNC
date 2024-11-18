<template>
    <div class="z-[2] w-screen h-screen fixed top-0 left-0 flex items-center justify-center px-[1rem] overflow-y-auto py-[36rem] sm:pt-0 sm:pb-0">
        <div class="bg-c1 opacity-80 w-full h-full fixed left-0 top-0">

        </div>
        <div class="z-[3] drop-shadow max-w-[55rem] w-[55rem] min-h-[38rem] bg-white rounded-[2.4rem] relative">
            <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
                class="absolute bottom-0 right-0 w-[25rem] h-auto rounded-[2.4rem] select-none">
            <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
                class="absolute top-0 left-0 w-[25rem] h-auto rounded-[2.4rem] rotate-180 select-none">

                <XIcon @click="$emit('close')"
                    class="w-9 h-8 text-black absolute right-[1.25rem] top-[1.25rem] z-[2] cursor-pointer active:translate-y-[0.1rem]" />

            <div class="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] font-bold relative w-full text-center text-c6 sm:text-c1 pt-[3.5rem] tracking-[0.015rem] text-wrap px-8">
                Project <span class="text-c1 sm:text-c6">Posting Form</span>
            </div>

            <div class="w-full relative mt-[1.25rem] md:mt-[1.8rem] pb-6 md:pb-9 px-[1.5rem] md:px-[2.75rem] flex flex-col gap-4 md:gap-6">

                <div class="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
                    <div class=w-full>
                        <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] flex-grow border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                            <input type="text" placeholder="Project Title" v-model="postSchema.projectTitle.value"
                            class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent"
                            @blur="validateInput('projectTitle')">
                        </div>
                        <span v-if="postSchema.projectTitle.hasError" class="text-red-500 text-xs w-full text-start pl-2">
                            {{ postSchema.projectTitle.errorMessage }}</span>
                    </div>
                    <div class="w-full sm:w-[22rem]">
                        <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                            <input type="text" placeholder="Number of Open Postions" v-model="postSchema.numOfOpenPositions.value"
                            class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent"
                            @blur="validateInput('numOfOpenPositions')">
                        </div>
                        <span v-if="postSchema.numOfOpenPositions.hasError" class="text-red-500 text-xs w-full text-start pl-2">
                            {{ postSchema.numOfOpenPositions.errorMessage }}</span>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
                    <div class="flex-grow">
                        <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                            <input type="text" placeholder="Company or Organization Name" v-model="postSchema.orgName.value"
                            class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent"
                            @blur="validateInput('orgName')">
                        </div>
                        <span v-if="postSchema.orgName.hasError" class="text-red-500 text-xs w-full text-start pl-2">
                            {{ postSchema.orgName.errorMessage }}</span>
                    </div>
                    <div class=" w-full sm:w-[20rem]">
                        <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                            <input type="text" placeholder="Role/Position" v-model="postSchema.rolePosition.value"
                            class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent"
                            @blur="validateInput('rolePosition')">
                        </div>
                        <span v-if="postSchema.rolePosition.hasError" class="text-red-500 text-xs w-full text-start pl-2">
                            {{ postSchema.rolePosition.errorMessage }}</span>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
                    <div class="flex flex-col sm:flex-row md:flex-col md:w-max gap-4 md:gap-6 w-full">
                        <div class="w-full sm:w-1/2 md:w-[17rem]">
                            <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] w-full border border-c1 pl-4 sm:pl-[1.4rem] py-[0.675rem] bg-white focus-within:border-black h-fit flex relative z-[1]">
                                <input type="text" placeholder="Category/Tags" v-model="postSchema.categoryTags.value"
                                class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent"
                                @blur="validateInput('categoryTags')">
                                <div class="bg-transparent w-9 cursor-pointer relative">
                                    <ArrowDownNoBg class="text-black w-6 h-auto" @click="toggleCategoryTags" />
                                    <div v-if="openCategoryTags" 
                                        class="absolute hidden sm:flex flex-col -right-[18.2rem] -top-[0.8rem] w-[18rem] h-[22.5rem] bg-white border border-c1 rounded-[0.8rem] overflow-y-auto py-3 px-2.5 no-scrollbar" >
                                        <div v-for="tag, index in categoryTags" :key="index" 
                                            @click="tag.selected = !tag.selected"
                                            class="flex items-center gap-2 hover:bg-c5 duration-100 py-2">
                                            <input v-model="tag.selected" type="checkbox" class="border ml-2 my-2 mx-1.5 w-4 h-4">
                                            {{ tag.value }} 
                                        </div>
                                    </div>
                                    <!-- <div class="absolute flex md:hidden -left-[17rem] sm:-left-[19.96rem] top-[2.4rem] w-[19rem] sm:w-[22rem] h-[18rem] bg-white border-2 overflow-y-auto">
    
                                    </div> -->
                                </div>
                                <div v-if="openCategoryTags" 
                                    class="absolute flex flex-col sm:hidden right-0 top-[3.1rem] w-full xs:w-[18rem] h-[20rem] bg-white overflow-y-auto border border-c1 rounded-[0.8rem] p-3">
                                    <div v-for="tag, index in categoryTags" :key="index" class="flex items-center hover:bg-c5 duration-100 py-2 gap-2" 
                                        @click="tag.selected = !tag.selected">
                                        <input v-model="tag.selected" type="checkbox" class="border ml-2 w-4 h-4 my-2 mx-1">
                                        {{ tag.value }}  
                                    </div>
                                </div>
                            </div>
                            <span v-if="postSchema.categoryTags.hasError" class="text-red-500 text-xs w-full text-start pl-2">
                                {{ postSchema.categoryTags.errorMessage }}</span>
                        </div>
                        <div class="w-full sm:w-1/2">
                            <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] w-full md:w-[17rem] border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black h-fit">
                                <input type="text" placeholder="Compensation (if applicable)" v-model="postSchema.compensation.value"
                                class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent"
                                @blur="validateInput('compensation')">
                            </div>
                            <span v-if="postSchema.compensation.hasError" class="text-red-500 text-xs w-full text-nowrap pl-2">
                                {{ postSchema.compensation.errorMessage }}</span>
                        </div>
                    </div>

                    <div class="flex-grow">
                        <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] w-full h-full border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                            <textarea type="text" placeholder="Project Description" v-model="postSchema.projDescription.value"
                            class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent resize-none" @blur="validateInput('projDescription')" />
                        </div>
                        <span v-if="postSchema.projDescription.hasError" class="text-red-500 text-xs w-full text-start pl-2">
                            {{ postSchema.projDescription.errorMessage }}</span>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
                    <div class="flex flex-col sm:flex-row gap-4 md:gap-6">
                        <div class="w-full md:w-[14rem]">
                            <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] w-full border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                                <input type="text" placeholder="Application Deadline" v-model="postSchema.deadline.value"
                                class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent"
                                @blur="validateInput('deadline')">
                            </div>
                            <span v-if="postSchema.deadline.hasError" class="text-red-500 text-xs w-full text-start pl-2">
                                {{ postSchema.deadline.errorMessage }}</span>
                        </div>
                        
                        <div class="w-full md:w-[14rem]">
                            <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] w-full border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                                <input type="text" placeholder="Project Timeline" v-model="postSchema.projTimeline.value"
                                class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent"
                                @blur="validateInput('projTimeline')">
                            </div>
                            <span v-if="postSchema.projTimeline.hasError" class="text-red-500 text-xs w-full text-start pl-2">
                                {{ postSchema.projTimeline.errorMessage }}</span>
                        </div>
                    </div>
                    <div class="w-full h-fit">
                        <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] w-full h-full border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                            <input type="text" placeholder="Contact Information" v-model="postSchema.contactInformation.value"
                            class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent" @blur="validateInput('contactInformation')">
                        </div>
                        <span v-if="postSchema.contactInformation.hasError" class="text-red-500 text-xs w-full text-start pl-2">
                            {{ postSchema.contactInformation.errorMessage }}</span>
                    </div>
                </div>

                <div class="w-full flex justify-end py-2">
                    <button @click="handleSubmit" 
                        class="drop-shadow font-[800] text-white bg-c1 px-11 py-[0.75rem] text-[1rem] rounded-[1rem] active:translate-y-[0.1rem] duration-75 flex items-center justify-center gap-2">
                        <BarsSpin v-if="0" />
                        <span>SUBMIT</span>
                    </button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import ArrowDownNoBg from '../icons/ArrowDownNoBg.vue';
import XIcon from '../icons/XIcon.vue';
import BarsSpin from '../icons/BarsSpin.vue'
import { reactive, ref } from 'vue';
import * as yup from 'yup';
// import { onClickOutside } from '@vueuse/core';

const emit = defineEmits(['close'])

const openCategoryTags = ref(false);

const toggleCategoryTags = () => {
    openCategoryTags.value = !openCategoryTags.value;
}

// const targetTags = ref(null)
// onClickOutside(targetTags, () => openCategoryTags.value = false)

const categoryTags = ref([
    {value: 'Technology', selected: false},
    {value: 'Business & Finance', selected: false},
    {value: 'Healthcare & Life Sciences', selected: false},
    {value: 'Creative Arts & Design', selected: false},
    {value: 'Education & Research', selected: false},
    {value: 'Social Impact & Non-profit', selected: false},
    {value: 'Engineering & Manufacturing', selected: false},
    {value: 'Media & Communications', selected: false},
    {value: 'Science & Environment', selected: false},
    {value: 'Law & Governance', selected: false},
    {value: 'Technology', selected: false},
])

const postSchema = reactive({
    projectTitle: { value: '', hasError: false, errorMessage: '' },
    numOfOpenPositions: { value: '', hasError: false, errorMessage: '' },
    orgName: { value: '', hasError: false, errorMessage: '' },
    rolePosition: { value: '', hasError: false, errorMessage: '' },
    categoryTags: { value: [''], hasError: false, errorMessage: '' },
    compensation: { value: '', hasError: false, errorMessage: '' },
    projDescription: { value: '', hasError: false, errorMessage: '' },
    deadline: { value: '', hasError: false, errorMessage: '' },
    projTimeline: { value: '', hasError: false, errorMessage: '' },
    contactInformation: { value: '', hasError: false, errorMessage: '' } 
})

const validationSchema = yup.object().shape({
    projectTitle: yup.string().required('Project title is required'),
    numOfOpenPositions: yup.string().required('Number of positions is required'),
    orgName: yup.string().required('Organization is required'),
    rolePosition: yup.string().required('Role/Position is required'),
    categoryTags: yup.array().of(yup.string().required('Category/Tags is required')),
    compensation: yup.string().required('Compensation is required'),
    projDescription: yup.string().required('Project description is required'),
    deadline: yup.string().required('Application deadline is required'),
    projTimeline: yup.string().required('Project timeline is required'),
    contactInformation: yup.string().required('Contact information is required') 
});

const validateInput = (name) => {
    validationSchema
        .validateAt(name, { ...postSchema, [name]: postSchema[name].value })
        .then(() => {
            postSchema[name].hasError = false;
            postSchema[name].errorMessage = '';
        })
        .catch((err) => {
            postSchema[name].hasError = true;
            postSchema[name].errorMessage = err.message;
        });
}

const handleSubmit = () => {
    for(const key in postSchema) {
        validateInput(key)
        if(key.hasError) {
            return;
        }
    }
    alert(123)
}
</script>