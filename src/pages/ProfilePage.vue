<template>
<div class="w-full flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-0 sm:py-7 lg:py-9 sm:px-8 lg:px-0">
    
    <div class="w-full lg:w-[60rem]">
        
        <div :class="`w-full h-[64rem] sm:h-[42rem] lg:h-[53rem] ${ isEditMode && 'h-[74rem] sm:h-[49rem] lg:h-[60rem]'} 
            flex flex-col shadow-[0rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] rounded-[0.625rem] relative overflow-hidden 
            bg-c1 lg:bg-c4`">
            <div class="lg:w-[55rem] lg:h-[55rem] bg-c1 absolute rounded-full -top-[15rem] -left-[12.6rem]"></div>
            <div class="lg:w-[30rem] lg:h-[30rem] bg-[#4A658D] absolute top-0 rounded-lg -right-[17.2rem]"></div>
            <div :class="`z-[2] absolute w-[11rem] h-[11rem] lg:w-[12rem] lg:h-[12rem] bg-white rounded-full left-1/2 
                -translate-x-1/2 sm:-translate-x-0 sm:left-[3.5rem] lg:left-[2.7rem] top-[12.2rem] sm:top-[5.7rem] 
                lg:top-[13.8rem] ${ isEditMode && 'top-[15.2rem] sm:top-[8rem] lg:top-[16.8rem]'} flex items-center justify-center border-0 hover:cursor-pointer overflow-hidden`">
                <div class="w-full h-full border-[0.2rem] rounded-full border-white z-[2] absolute">
                </div>
                <img src="/src/assets/images/jacquard.png" alt="user photo" class="bg-black">
            </div>
            <div class="w-full h-[30%] lg:h-[40%] bg-transparent bg-black"></div>
            <div class="z-[1] w-full h-[70%] lg:h-[60%] bg-white rounded-[0.625rem] border border-c1 px-4 lg:p-4">
                <div class="w-full flex flex-col-reverse sm:flex-col">
                    <div class="w-full flex justify-end items-center gap-4 mt-4 sm:mt-0 py-6">
                        <button v-if="isEditMode" @click="turnEditModeOff" class="rounded-full bg-c1 text-white h-[2.2rem]
                            sm:h-[2.5rem] px-6 sm:px-0 sm:w-[10rem] text-[1rem] active:scale-[99%]">
                            Save Changes
                        </button>
                        <div v-else class="h-[2.2rem] sm:h-[2.5rem] flex items-center mr-2 gap-2">
                            <EditProfileInfo @click="handleEdit"  class="w-[1.1rem] h-[1.1rem] hover:scale-125 cursor-pointer" />
                            <span @click="handleEdit"  class="hover:underline cursor-pointer">edit info</span>
                        </div>  
                    </div>
                    <div class="w-full flex flex-col items-start pt-2 mt-[4.4rem] sm:mt-0">
                        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                            <input :disabled="!isEditMode" type="text" ref="fullName"
                                v-model="userInfo.full_name.value" placeholder="Full Name"
                                @blur="validateInput('full_name')"
                                class="w-full h-full bg-transparent px-2 text-[1.75rem] focus:outline-none text-center 
                                sm:text-start placeholder:font-normal placeholder:italic">
                        </div>
                            <span v-if="userInfo.full_name.hasError" class="text-red-500 text-xs w-full text-center sm:text-start">
                                {{ userInfo.full_name.errorMessage }}</span>
                        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                            <input :disabled="!isEditMode" type="text" placeholder="College or Department"
                                v-model="userInfo.department.value" @blur="validateInput('department')"
                                class="w-full bg-transparent p-2 text-[1rem] italic text-c1 focus:outline-none text-center 
                                sm:text-start placeholder:font-normal placeholder:italic placeholder:opacity-75 placeholder:text-c1">
                        </div>
                            <span v-if="userInfo.department.hasError" class="text-red-500 text-xs w-full text-center     sm:text-start">
                                {{ userInfo.department.errorMessage }}</span>
                    </div>
                </div>
                <div class="w-full font-bold text-c1 text-[1.75rem] mt-[3rem] sm:mt-[3.5rem] sm:pl-2">About Me</div>
                <div class="w-full sm:h-[9rem] grid gap-4 sm:flex items-center sm:mt-[2rem] text-c1">
                    <div class="w-full sm:w-[40%] grid gap-4 py-2 border-b-2 sm:border-b-0 sm:border-r-2 border-black pr-4">
                        <div class="w-full">
                            <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                                <input :disabled="!isEditMode" v-model="userInfo.degree_program.value"
                                    @blur="validateInput('degree_program')"
                                    type="text" class="w-full bg-transparent text-[1.1rem] placeholder:italic p-2 text-c1 focus:outline-none" 
                                    placeholder="Degree Program">
                            </div>
                                <span v-if="userInfo.degree_program.hasError" class="text-red-500 text-xs w-full text-start">
                                    {{ userInfo.degree_program.errorMessage }}</span>
                        </div>
                        <div class="w-full">
                            <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                                <input :disabled="!isEditMode" v-model="userInfo.year_level.value"
                                    @blur="validateInput('year_level')"
                                    type="text" class="w-full bg-transparent text-[1.1rem] placeholder:italic p-2 text-c1 focus:outline-none" 
                                    placeholder="Year Level">
                            </div>
                                <span v-if="userInfo.year_level.hasError" class="text-red-500 text-xs w-full text-start">
                                    {{ userInfo.year_level.errorMessage }}</span>
                        </div>
                        <div class="w-full">
                            <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                                <input :disabled="!isEditMode" v-model="userInfo.student_id.value"
                                    @blur="validateInput('student_id')"
                                    type="text" class="w-full bg-transparent text-[1.1rem] placeholder:italic p-2 text-c1 focus:outline-none" 
                                    placeholder="Student ID">
                            </div>
                                <span v-if="userInfo.student_id.hasError" class="text-red-500 text-xs w-full text-start">
                                    {{ userInfo.student_id.errorMessage }}</span>
                        </div>
                    </div>
                    <div class="w-full sm:w-[60%] h-full sm:px-4">
                        <span v-if="userInfo.personal_description.hasError" class="text-red-500 text-xs w-full text-start">
                            {{ userInfo.personal_description.errorMessage }}</span>
                        <textarea :disabled="!isEditMode"
                                class="w-full min-h-[9rem] border p-2 focus:outline-none focus:border focus:border-c1
                                resize-none max-h-[9rem] text-[1rem] placeholder:font-light placeholder:italic"
                                ref="textarea" @blur="validateInput('personal_description')"
                                v-model="userInfo.personal_description.value"
                                placeholder="Write a brief description of yourself, including your academic goals, interests, and what you hope to gain from collaborative experiences."
                            />
                            
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="w-full lg:w-[60rem] shadow-[0rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] rounded-[0.625rem] bg-white p-4 border
         border-black flex flex-col md:grid md:grid-cols-2">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Experience
        </div>
        <JobTitleModal />
        <JobTitleModal />
        <JobTitleModal />
        <JobTitleModal />
        <div class="flex items-center py-4 italic opacity-45 hover:opacity-100 duration-200 cursor-pointer">
            <div class="border border-black rounded-xl min-w-[5.1rem] min-h-[5rem] sm:min-w-[9rem] sm:w-[9rem] sm:h-[7rem] active:scale-95 flex items-center justify-center">
                <PlusIcon class="w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem]" />
            </div>
            <div class="flex justify-center pl-4 flex-col">
                <p class="w-full text-[1.125rem] text-c1 font-bold uppercase">Job Title</p>
                <p class="w-full text-[0.90rem] text-c1 uppercase">ORGANIZATION</p>
                <p class="w-full text-[0.90rem] text-c1 uppercase">Start Date - End Date/Present</p>
            </div>
        </div>
    </div>


    <div class="w-full lg:w-[60rem] shadow-[0rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] rounded-[0.625rem] bg-white p-4 border
         border-black">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Skills
        </div>
        <div v-for="skill, index in userInfo.skills.value" :key="index"
            class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 border-b-2 border-b-black">
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 focus:outline-none text-center 
                sm:text-start" placeholder="Showcase your skills to demonstrate your suitability for new opportunities"
                v-model="userInfo.skills.value[index-1]">
        </div>
        <div class="py-4 w-full flex justify-center">
            <PlusIcon @click="addCount('skills')" class="w-[2.4rem] h-[2.4rem] opacity-45 cursor-pointer hover:opacity-100" />
        </div>
    </div>


    <div class="w-full lg:w-[60rem] shadow-[0rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] rounded-[0.625rem] bg-white p-4 border
         border-black">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Education
        </div>
        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 border-b-2 border-b-black">
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1
                focus:outline-none text-center sm:text-start" placeholder="Name of School" >
        </div>
        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 mt-2">
            <input type="text" class="w-full bg-transparent p-2 text-[0.90rem] italic text-c1
                focus:outline-none text-center sm:text-start" placeholder="Start Date - End Date/Present" >
        </div>
    </div>


    <div class="w-full lg:w-[60rem] shadow-[0rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] rounded-[0.625rem] bg-white p-4 border
         border-black">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Interest
        </div> 
        <div v-for="interest, index in userInfo.interest.value" :key="index" 
            class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 border-b-2 border-b-black">
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 focus:outline-none text-center 
                sm:text-start" placeholder="Share your hobbies and interests to help others find common ground with you."
                v-model="userInfo.interest.value[index-1]">
        </div>
        <div class="py-4 w-full flex justify-center">
            <PlusIcon @click="addCount('interest')" class="w-[2.4rem] h-[2.4rem] opacity-45 cursor-pointer hover:opacity-100" />
        </div>
    </div>

    <div class="w-full lg:w-[60rem] shadow-[0rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] rounded-[0.625rem] bg-white p-4 border
         border-black">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Contacts
        </div> 
        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 border-b-2 border-b-black flex items-center mb-2">
            <span class="pl-2">Facebook:</span>
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 focus:outline-none text-center 
                sm:text-start" placeholder="Facebook account"
                v-model="userInfo.facebook.value">
        </div>
        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 border-b-2 border-b-black flex items-center mb-2">
            <span class="pl-2">Gmail:</span>
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 focus:outline-none text-center 
                sm:text-start" placeholder="Gmail account"
                v-model="userInfo.gmail.value">
        </div>
        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 border-b-2 border-b-black flex items-center">
            <span class="pl-2 flex-grow">Mobile:</span>
            <input type="number" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 focus:outline-none text-center 
                sm:text-start" placeholder="Mobile number"
                v-model="userInfo.mobileNumber.value">
        </div>
    </div>

</div>
</template>

<script setup>
import EditProfileInfo from '../components/icons/EditProfileInfo.vue';
import JobTitleModal from '../components/modals/JobTitleModal.vue';
import PlusIcon from '../components/icons/PlusIcon.vue'
import { useTextareaAutosize, useFocus } from '@vueuse/core';
import * as yup from 'yup';
import { reactive, ref } from 'vue';
const { textarea, input } = useTextareaAutosize()

const fullName = ref()
const { focused } = useFocus(fullName)

const isEditMode = ref(false);
const turnEditModeOn = () => isEditMode.value = true;
const turnEditModeOff = () => isEditMode.value = false;

const handleEdit = () => {
    turnEditModeOn();
    setTimeout(() => focused.value = true, 50)
}

const userInfo = reactive({
    full_name: {value: '', hasError: false, errorMessage: ''},
    department: {value: '', hasError: false, errorMessage: ''},
    degree_program: {value: '', hasError: false, errorMessage: ''},
    year_level: {value: '', hasError: false, errorMessage: ''},
    student_id: {value: '', hasError: false, errorMessage: ''},
    personal_description: {value: '', hasError: false, errorMessage: ''},
    experience: {value: [{jobTitle: '', org: '', time_span: ''}], hasError: false, errorMessage: ''},
    skills: {value: [''], hasError: false, errorMessage: ''},
    education: {value: {school_name: '', time_span: ''}, hasError: false, errorMessage: ''},
    interest: {value: [''], hasError: false, errorMessage: ''},
    facebook: {value: '', hasError: false, errorMessage: ''},
    gmail: {value: '', hasError: false, errorMessage: ''},
    mobileNumber: {value: '', hasError: false, errorMessage: ''},
})

const skillsCount = ref(0)
const interestCount = ref(0)

const addCount = (type) => {
    switch(type) {
        case 'skills': {
            userInfo.skills.value.push('')
            skillsCount.value += 1;
        }
            break;
        case 'interest': {
            userInfo.interest.value.push('')
            interestCount.value += 1;
        }
            break;
        default: 
        break;
    }
}

const validationSchema = yup.object().shape({
    full_name: yup.string().required('Full name is required')
            .matches(/^[A-Za-z].*$/, 'This field must start with a letter'),
    department: yup.string().required('Department is required')
            .matches(/^[A-Za-z].*$/, 'This field must start with a letter'),
    degree_program: yup.string().required('Degree program is required')
            .matches(/^[A-Za-z].*$/, 'This field must start with a letter'),
    year_level: yup.string().required('Year level is required'),
    student_id: yup.string().required('Student ID is required'),
    personal_description: yup.string().required('Personal description is required')
            .matches(/^[A-Za-z].*$/, 'This field must start with a letter'),
});

const validateInput = (name) => {
    validationSchema
        .validateAt(name, { ...userInfo, [name]: userInfo[name].value })
        .then(() => {
            userInfo[name].hasError = false;
            userInfo[name].errorMessage = '';
        })
        .catch((err) => {
            userInfo[name].hasError = true;
            userInfo[name].errorMessage = err.message;
        });
}
</script>