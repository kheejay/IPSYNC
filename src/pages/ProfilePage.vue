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
                hover:cursor-pointer lg:top-[13.8rem] ${ isEditMode && 'top-[15.2rem] sm:top-[8rem] lg:top-[16.8rem]'} flex items-center 
                justify-center border-0 overflow-hidden object-cover`">
                <div @click="showProfile"
                    :class="`w-full h-full border-[0.2rem] rounded-full border-white z-[2] absolute 
                    ${ !isEditMode ? 'hover:bg-c1 opacity-20 cursor-pointer' : 'cursor-default' }`">
                </div>
                <img :src="userInfo.photoURL.value" alt="user photo" 
                    :class="`w-full h-auto border-0 ${'scale-' + userInfo.photoURL.scale}`">
            </div>
            <div class="w-full h-[30%] lg:h-[40%] bg-transparent bg-black"></div>
            <div class="z-[1] w-full h-[70%] lg:h-[60%] bg-white rounded-[0.625rem] border border-c1 px-4 lg:p-4">
                <div class="w-full flex flex-col-reverse sm:flex-col">
                    <div class="w-full grid md:flex justify-end items-center gap-4 mt-4 sm:mt-0 py-6">
                        <div v-if="isEditMode" class="flex-col md:flex gap-2 text-c5">
                            <input type="file" class="border w-[16rem]" accept="image/*" @change="updateProfile">
                            <div class="w-full">
                                <button class="border w-1/2 bg-c2 h-full" @mousedown="decrementPhotoScale">Scale-</button>
                                <button class="border w-1/2 bg-c1 h-full" @mousedown="incrementPhotoScale">Scale+</button>
                            </div>
                        </div>
                        <button v-if="isEditMode" @click="handleSubmit" class="rounded-full bg-c1 text-white h-[2.2rem]
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
                                class="w-full h-full bg-transparent p-2 text-[1.5rem] focus:outline-none text-center 
                                sm:text-start placeholder:font-normal placeholder:italic">
                        </div>
                            <span v-if="userInfo.full_name.hasError" class="text-red-500 text-xs w-full text-center sm:text-start">
                                {{ userInfo.full_name.errorMessage }}</span>
                        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                            <input :disabled="!isEditMode" type="text" placeholder="College or Department"
                                v-model="userInfo.department.value" @blur="validateInput('department')"
                                :class="`w-full bg-transparent px-2 ${ isEditMode && 'py-2'} text-[1rem] italic text-c1 focus:outline-none 
                                text-center sm:text-start placeholder:font-normal placeholder:italic placeholder:opacity-75 placeholder:text-c1`">
                        </div>
                            <span v-if="userInfo.department.hasError" class="text-red-500 text-xs w-full text-center     sm:text-start">
                                {{ userInfo.department.errorMessage }}</span>
                    </div>
                </div>
                <div class="w-full font-bold text-c1 text-[1.75rem] mt-[3rem] sm:mt-[3.5rem] sm:pl-2">About Me</div>
                <div class="w-full sm:h-[9rem] grid gap-4 sm:flex items-center sm:mt-[2rem] text-c1">
                    <div :class="`w-full sm:w-[40%] grid ${ !isEditMode && 'gap-2'} py-2 border-b-2 sm:border-b-0 
                        sm:border-r-2 border-black pr-4`">
                        <div class="w-full">
                            <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                                <input :disabled="!isEditMode" v-model="userInfo.degree_program.value"
                                    @blur="validateInput('degree_program')"
                                    type="text" class="w-full bg-transparent text-[1.1rem] placeholder:italic p-2 
                                    text-c1 focus:outline-none" 
                                    placeholder="Degree Program">
                            </div>
                                <span v-if="userInfo.degree_program.hasError" class="text-red-500 text-xs w-full text-start">
                                    {{ userInfo.degree_program.errorMessage }}</span>
                        </div>
                        <div class="w-full">
                            <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                                <input :disabled="!isEditMode" v-model="userInfo.year_level.value"
                                    @blur="validateInput('year_level')"
                                    type="text" class="w-full bg-transparent text-[1.1rem] placeholder:italic p-2 
                                    text-c1 focus:outline-none" 
                                    placeholder="Year Level">
                            </div>
                                <span v-if="userInfo.year_level.hasError" class="text-red-500 text-xs w-full text-start">
                                    {{ userInfo.year_level.errorMessage }}</span>
                        </div>
                        <div class="w-full">
                            <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                                <input :disabled="!isEditMode" v-model="userInfo.student_id.value"
                                    @blur="validateInput('student_id')"
                                    type="text" class="w-full bg-transparent text-[1.1rem] placeholder:italic p-2 
                                    text-c1 focus:outline-none" 
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
            Experience <span v-if="isEditMode" class="text-font text-base font-light">(Optional)</span>
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
            Skills <span v-if="isEditMode" class="text-font text-base font-light">(Optional)</span>
        </div>
        <div v-for="skill, index in userInfo.skills.value" :key="index"
            :class="`w-full border-b-2 border-b-black mb-2
                ${isEditMode && ''}`">
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 focus:outline-none text-center 
                sm:text-start focus:rounded-lg" placeholder="Showcase your skills to demonstrate your suitability for new opportunities"
                v-model="userInfo.skills.value[index]" :disabled="!isEditMode">
        </div>
        <div class="py-4 w-full flex justify-center">
            <PlusIcon @click="addCount('skills')" class="w-[2.4rem] h-[2.4rem] opacity-45 cursor-pointer hover:opacity-100" />
        </div>
    </div>


    <div class="w-full lg:w-[60rem] shadow-[0rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] rounded-[0.625rem] bg-white p-4 border
         border-black">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Education <span v-if="isEditMode" class="text-font text-base font-light">(Optional)</span>
        </div>
        <div class="w-full border-b-2 border-b-black">
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1
                focus:outline-none text-center sm:text-start" placeholder="Name of School" :disabled="!isEditMode" 
                v-model="userInfo.education.value.school_name">
        </div>
        <div class="w-full mt-2">
            <input type="text" class="w-full bg-transparent p-2 text-[0.90rem] italic text-c1
                focus:outline-none text-center sm:text-start" placeholder="Start Date - End Date/Present" 
                v-model="userInfo.education.value.time_span"
                :disabled="!isEditMode">
        </div>
    </div>


    <div class="w-full lg:w-[60rem] shadow-[0rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] rounded-[0.625rem] bg-white p-4 border
         border-black">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Interest <span v-if="isEditMode" class="text-font text-base font-light">(Optional)</span>
        </div> 
        <div v-for="interest, index in userInfo.interest.value" :key="index" 
            class="w-full border-b-2 border-b-black">
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 focus:outline-none text-center 
                sm:text-start" placeholder="Share your hobbies and interests to help others find common ground with you."
                v-model="userInfo.interest.value[index]" :disabled="!isEditMode">
        </div>
        <div class="py-4 w-full flex justify-center">
            <PlusIcon @click="addCount('interest')" class="w-[2.4rem] h-[2.4rem] opacity-45 cursor-pointer hover:opacity-100" />
        </div>
    </div>

    <div class="w-full lg:w-[60rem] shadow-[0rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] rounded-[0.625rem] bg-white p-4 border
         border-black">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Contacts <span v-if="isEditMode" class="text-font text-base font-light">(Give at least one)</span>
        </div> 
        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 flex items-center mb-1">
            <span class="pl-2">Facebook:</span>
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 focus:outline-none text-center 
                sm:text-start" placeholder="Facebook account" :disabled="!isEditMode"
                v-model="userInfo.facebook"
                @blur="validateContacts">
        </div>
        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 flex items-center mb-1">
            <span class="pl-2">Gmail:</span>
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 focus:outline-none text-center 
                sm:text-start" placeholder="Gmail account" :disabled="!isEditMode"
                v-model="userInfo.gmail"
                @blur="validateContacts">
        </div>
        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 flex items-center">
        <span class="pl-2 flex-grow">Mobile:</span>
            <input type="number" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 focus:outline-none text-center 
                sm:text-start" placeholder="Mobile number" :disabled="!isEditMode"
                v-model="userInfo.mobileNumber"
                @blur="validateContacts">
        </div>
        <span v-if="contacts.hasError" class="text-red-500 text-xs w-full text-start">
            {{ contacts.errorMessage }}</span>
    </div>
    <transition name="fade" mode="out-in">
        <div v-if="previewProfile" 
            class="w-screen h-screen fixed top-0 left-0 z-[5] flex items-center justify-center shadow px-12 sm:px-0">
            <div class="fixed top-0 left-0 w-full h-full bg-c1 opacity-45 cursor-pointer"></div>
            <div ref="target" 
                class="w-full h-auto sm:h-[30rem] sm:w-[44rem] lg:h-[40rem] lg:w-[64rem] z-[1] bg-c5 flex justify-center relative py-8 rounded-lg overflow-hidden">
                <!-- <IPStamp class="absolute -left-2 top-4 sm:scale-[250%] lg:scale-[150%] -rotate-45 opacity-45" /> -->
                <!-- <IPStamp class="absolute left-8 bottom-4 sm:scale-[150%] lg:scale-[250%] -rotate-45 opacity-45" />
                <IPStamp class="absolute right-2 -top-4 sm:scale-[150%] lg:scale-[250%] -rotate-45 opacity-45" />
                <IPStamp class="absolute right-4 -bottom-4 sm:scale-[150%] lg:scale-[250%] -rotate-45 opacity-45" /> -->
                <img :src="userInfo.photoURL.value" alt="profile" class="h-full w-auto z-[5]">
            </div>
        </div>
    </transition> 
    <LoadingScreen :loadingPrompt="loadingPrompt" v-if="isLoading" />
</div>
</template>

<script setup>
import EditProfileInfo from '../components/icons/EditProfileInfo.vue';
import JobTitleModal from '../components/modals/JobTitleModal.vue';
import PlusIcon from '../components/icons/PlusIcon.vue';
import { useTextareaAutosize, useFocus, onClickOutside } from '@vueuse/core';
import { inject, reactive, ref, } from 'vue';
import * as yup from 'yup';
import { toast } from '../functions/toast';
import LoadingScreen from '../components/LoadingScreen.vue'
import uploadPhoto from '../functions/uploadPhoto';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
const { textarea, input } = useTextareaAutosize()

const fullName = ref()
const { focused } = useFocus(fullName)

const isEditMode = ref(false);
const turnEditModeOn = () => isEditMode.value = true;
const turnEditModeOff = () => isEditMode.value = false;
const previewProfile = ref(false)
const newProfileBucket = ref(null)
const isLoading = ref(false)
const loadingPrompt = ref('')

const showProfile = () => {
    if(!isEditMode.value) {
        previewProfile.value = true;
    }
}
const hideProfile = () => previewProfile.value = false;

const handleEdit = () => {
    turnEditModeOn();
    setTimeout(() => focused.value = true, 50)
}

const target = ref(null)
onClickOutside(target, event => hideProfile())

const { userData } = inject('userData') 

const userInfo = reactive( userData )

const updateProfile = (event) => {
    const file = event.target.files[0]
    if (file) {
        userInfo.photoURL.value = URL.createObjectURL(file);
        newProfileBucket.value = file;
    }
}

const skillsCount = ref(0)
const interestCount = ref(0)

const addCount = (type) => {
    if(!isEditMode.value) return;
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
            .matches(/^[A-Za-z].*$/, 'This field must start with a letter')
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

const contacts = reactive({
    hasError: false, errorMessage: 'At least one contact information is required'
})

const validateContacts = () => {
    if(userInfo.facebook == false && userInfo.gmail == false && userInfo.mobileNumber == false) {
        contacts.hasError = true;
    } else {
        contacts.hasError = false;
    }
}

const validateValues = () => {
    if(
        userInfo.full_name.value != false &&
        userInfo.department.value != false &&
        userInfo.degree_program.value != false && 
        userInfo.year_level.value != false &&
        userInfo.student_id.value != false &&
        (userInfo.facebook != false || userInfo.gmail != false || userInfo.mobileNumber != false)
    ) {
        return true;
    } else {
        return false;
    }
}

const scaleCount = ref(0)
const incrementPhotoScale = () => {
    if(scaleCount.value + 1 <= 3) {
        scaleCount.value++;
        userInfo.photoURL.scale = getPhotoScale(scaleCount.value);
    }
}
const decrementPhotoScale = () => {
    if(scaleCount.value - 1 >= -3) {
        scaleCount.value--;
        userInfo.photoURL.scale = getPhotoScale(scaleCount.value);
    }
}

const getPhotoScale = (scaleCount) => {
    switch(scaleCount) {
        case -3: 
            return 75;
        case -2: 
            return 90;
        case -1: 
            return 95;
        case -0: 
            return 100;
        case 1: 
            return 105;
        case 2: 
            return 110;
        case 3: 
            return 125;
        default:
            return userInfo.photoURL.scale;
    }
} 

const setNewUserData = async () => {
    if(userInfo.uid == null || userInfo.uid == false) {
        toast('User identity is missing')
        isLoading.value = false;
        return
    }
    try {
        console.log('topid', userInfo.uid)
        console.log('topuser', userInfo)
        loadingPrompt.value = 'Updating User Data';
        const userRef = doc(db, 'users', userInfo.uid);
        await setDoc(userRef, { 
            full_name: userInfo.full_name.value,
            department: userInfo.department.value,
            degree_program: userInfo.degree_program.value,
            year_level: userInfo.year_level.value,
            student_id: userInfo.student_id.value,
            personal_description: userInfo.personal_description.value,
            experience: userInfo.experience.value,
            skills: userInfo.skills.value,
            education: userInfo.education.value,
            interest: userInfo.interest.value,
            facebook: userInfo.facebook,
            gmail: userInfo.gmail,
            mobileNumber: userInfo.mobileNumber,
            uid: userInfo.uid,
            photoURL: userInfo.photoURL
        }, { merge: true });
        isLoading.value = false;
        console.log('bottm', userInfo.uid)
        console.log('btm', userInfo)
        toast('Information updated successfully!')
    } catch (error) {
        isLoading.value = false;
        toast(error)
        toast('Error occurred while updating user data.', "top", 1500)
    }
}

const handleSubmit = async () => {
    isEditMode.value = false;
    if(validateValues() && newProfileBucket.value != null) {
        turnEditModeOff();
        // alert('truthy')
        isLoading.value = true;
        loadingPrompt.value = 'Uploading user photo'
        const photoURL = await uploadPhoto(newProfileBucket.value);
        if(photoURL != false) {
            userInfo.photoURL.value = photoURL;
            setNewUserData();
        } else {
            isLoading.value = false;
            alert('error')
            toast('Error occurred. Please try again.')
        }
    } else if(validateValues()) {
        isLoading.value = true;
        setNewUserData();
    } else {
        toast('Opps, basic information is not filled out', "top", "1500");
        userInfo.photoURL.value = userInfo.photoURL.value;
        turnEditModeOff();
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 300ms;
}
.fade-enter, .fade-leave-to  {
    opacity: 0;
}
</style>