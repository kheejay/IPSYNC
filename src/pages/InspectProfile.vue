<template>
<div class="w-full flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-0 sm:py-7 lg:py-9 sm:px-8 lg:px-0">
    
    <div class="w-full lg:w-[60rem]">
        
        <div class="drop-shadow w-full h-[64rem] sm:h-[42rem] lg:h-[53rem] flex-col rounded-[0.625rem] relative overflow-hidden 
            bg-c1 lg:bg-c4">
            <div class="lg:w-[55rem] lg:h-[55rem] bg-c1 absolute rounded-full -top-[15rem] -left-[12.6rem]"></div>
            <div class="lg:w-[30rem] lg:h-[30rem] bg-[#4A658D] absolute top-0 rounded-lg -right-[17.2rem]"></div>
            <div class="z-[2] absolute w-[11rem] h-[11rem] lg:w-[12rem] lg:h-[12rem] bg-white rounded-full left-1/2 
                -translate-x-1/2 sm:-translate-x-0 sm:left-[3.5rem] lg:left-[2.7rem] top-[12.2rem] sm:top-[5.7rem] 
                hover:cursor-pointer lg:top-[13.8rem] flex items-center justify-center border-0 overflow-hidden object-cover">
                <div @click="showProfile"
                    class="w-full h-full border-[0.2rem] rounded-full border-white z-[2] absolute hover:bg-c1 opacity-20 
                    cursor-pointer">
                </div>
                <img :src="userInfo.photoURL.value" alt="photo" 
                    :class="`w-full h-auto border-0 ${'scale-' + userInfo.photoURL.scale}`">
            </div>
            <div class="w-full h-[30%] lg:h-[40%] bg-transparent"></div>
            <div class="z-[1] w-full h-[70%] lg:h-[60%] bg-white rounded-[0.625rem] border border-c1 px-4 lg:p-4 relative">
                <div class="w-full flex flex-col-reverse sm:flex-col">
                    <div class="w-full grid md:flex justify-center sm:justify-end items-center gap-4 mt-4 sm:mt-0 py-6">
                        <button v-if="dashboardBackToUser" @click="$router.push({name: 'Dashboard'})"
                            class="rounded-full bg-white text-c1 h-[2.2rem]
                            sm:h-[2.5rem] px-6 sm:px-0 sm:w-[10rem] text-[1rem] active:scale-[99%] border border-black hover:bg-zinc-50">
                            Back to user!
                        </button>
                        <button @click="handleCreateRoom"
                            class="rounded-full bg-c1 text-white h-[2.2rem]
                            sm:h-[2.5rem] px-6 sm:px-0 sm:w-[10rem] text-[1rem] active:scale-[99%]">
                            Message
                        </button>
                    </div>
                    <div class="w-full flex flex-col items-start pt-2 mt-[4.4rem] sm:mt-0">
                        <div class="w-full flex items-center flex-col sm:flex-row">
                            <div class="`h-full bg-transparent px-2 py-1.5 text-[1.5rem] sm:text-start">{{ userInfo.full_name.value }}</div>
                            <VerifiedTag v-if="!isEditMode && verifiedUsers.includes($route.params.id)" />
                        </div>
                        <div class="w-full">
                            <input disabled type="text" placeholder="College or Department"
                                :value="userInfo.department.value"
                                class="w-full bg-transparent px-2 py-2 sm:py-0 text-[1rem] italic text-c1 
                                text-center sm:text-start placeholder:font-normal placeholder:italic placeholder:opacity-75
                                placeholder:text-c1">
                        </div>
                    </div>
                </div>
                <div class="w-full font-bold text-c1 text-[1.75rem] mt-[3rem] sm:mt-[3.5rem] sm:pl-2">About Me</div>
                <div class="w-full sm:h-[9rem] grid gap-4 sm:flex items-center sm:mt-[2rem] text-c1">
                    <div class="w-full sm:w-[40%] grid gap-2 border-b-2 sm:border-b-0 sm:border-r-2 border-black pr-4">
                        <div class="w-full">
                            <div class="w-full">
                                <input disabled :value="userInfo.degree_program.value"
                                    type="text" class="w-full bg-transparent text-[1.1rem] placeholder:italic p-2 
                                    text-c1" 
                                    placeholder="Degree Program">
                            </div>
                        </div>
                        <div class="w-full">
                            <div class="w-full">
                                <input disabled :value="userInfo.year_level.value"
                                    type="text" class="w-full bg-transparent text-[1.1rem] placeholder:italic p-2 
                                    text-c1" 
                                    placeholder="Year Level">
                            </div>
                        </div>
                        <div class="w-full">
                            <div class="w-full">
                                <input disabled :value="userInfo.student_id.value"
                                    type="text" class="w-full bg-transparent text-[1.1rem] placeholder:italic p-2 
                                    text-c1" 
                                    placeholder="Student ID">
                            </div>
                        </div>
                    </div>
                    <div class="w-full sm:w-[60%] h-full sm:px-4">
                        <textarea disabled
                                class="w-full min-h-[9rem] border p-2 resize-none max-h-[9rem] text-[1rem] placeholder:font-light placeholder:italic bg-transparent"
                                ref="textarea"
                                :value="userInfo.personal_description.value"
                                placeholder="Write a brief description of yourself, including your academic goals, interests, and what you hope to gain from collaborative experiences."
                            />
                            
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="w-full lg:w-[60rem] drop-shadow rounded-[0.625rem] bg-white p-4 border
         border-black flex flex-col md:grid md:grid-cols-2 overflow-hidden">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Experience
        </div>
        <div v-if="!userInfo.experience.value.length" class="flex items-center py-4 italic opacity-45 hover:opacity-100 duration-200 cursor-pointer">
            <div class="border border-black rounded-xl min-w-[5.1rem] min-h-[5rem] sm:min-w-[9rem] sm:w-[9rem] sm:h-[7rem] active:scale-95 flex items-center justify-center">
                <JobTitleIcon class="w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem]" />
            </div>
            <div class="pl-4 overflow-hidden">
                <p class="w-full text-[0.90rem] text-c1 uppercase">No Job or Experience to show</p>
            </div>
        </div>
        <JobTitleModal v-for="experience, index in userInfo.experience.value" :key="index" 
            :experience="experience" :index="index"/>
    </div>

    <div class="w-full lg:w-[60rem] drop-shadow rounded-[0.625rem] bg-white p-4 border
         border-black overflow-hidden">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Skills
        </div>
        <div v-for="skill, index in userInfo.skills.value" :key="index"
            class="w-full border-b-2 border-b-black mb-2">
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 text-center 
                sm:text-start" placeholder="Showcase your skills to demonstrate your suitability for new opportunities"
                :value="userInfo.skills.value[index]" disabled>
        </div>
    </div>


    <div class="w-full lg:w-[60rem] drop-shadow rounded-[0.625rem] bg-white p-4 border
         border-black overflow-hidden">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Education
        </div>
        <div class="w-full border-b-2 border-b-black">
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1
                text-center sm:text-start" placeholder="Name of School" disabled 
                :value="userInfo.education.value.school_name">
        </div>
        <div class="w-full mt-2">
            <input type="text" class="w-full bg-transparent p-2 text-[0.90rem] italic text-c1
                text-center sm:text-start" placeholder="Start Date - End Date/Present" 
                :value="userInfo.education.value.time_span"
                disabled>
        </div>
    </div>


    <div class="w-full lg:w-[60rem] drop-shadow rounded-[0.625rem] bg-white p-4 border
         border-black overflow-hidden">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Interest
        </div> 
        <div v-for="interest, index in userInfo.interest.value" :key="index" 
            class="w-full border-b-2 border-b-black relative mb-2">
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 text-center 
                sm:text-start" placeholder="Share your hobbies and interests to help others find common ground with you."
                :value="userInfo.interest.value[index]" disabled>
        </div>
    </div>

    <div class="w-full lg:w-[60rem] drop-shadow rounded-[0.625rem] bg-white p-4 border
         border-black overflow-hidden">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Contacts
        </div> 
        <div :class="`w-full flex items-center mb-1`">
            <div class="flex items-center py-2 gap-1.5">
                <FacebookIcon class="w-7 h-7" />
                <span class="pl-2">Facebook:</span>
            </div>
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 text-start" 
            placeholder="Facebook account" disabled
                :value="userInfo.facebook">
        </div>
        <div class="w-full flex items-center mb-1">
            <div class="flex items-center py-2 gap-1.5">
                <MailIcon class="w-7 h-7" />
                <span class="pl-2">Gmail:</span>
            </div>
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 text-start" 
            placeholder="Gmail account" disabled
                :value="userInfo.gmail">
        </div>
        <div class="w-full flex items-center">
            <div class="flex items-center py-2 gap-1.5">
                <PhoneIcon class="w-7 h-7" />
                <span class="pl-2">Mobile:</span>
            </div>
            <input type="number" class="w-full bg-transparent p-2 text-[1rem] italic text-c1 text-start" placeholder="Mobile number" disabled
                :value="userInfo.mobileNumber">
        </div>
    </div>
    <transition name="fade" mode="out-in">
        <div v-if="previewProfile" 
            class="w-screen h-screen fixed top-0 left-0 z-[4] flex items-center justify-center shadow px-12 sm:px-0">
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
import JobTitleModal from '../components/modals/JobTitleModal.vue';
import FacebookIcon from '../components/icons/FacebookIcon.vue';
import MailIcon from '../components/icons/MailIcon.vue';
import PhoneIcon from '../components/icons/PhoneIcon.vue';
import JobTitleIcon from '../components/icons/JobTitleIcon.vue';
import VerifiedTag from '../components/VerifiedTag.vue';
import { useTextareaAutosize, onClickOutside, useDebounceFn } from '@vueuse/core';
import { inject, onMounted, reactive, ref, } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoadingScreen from '../components/LoadingScreen.vue';
import { toast } from '../functions/toast';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
const { textarea, input } = useTextareaAutosize()

const { dashboardBackToUser } = inject('userData')

const previewProfile = ref(false)
const isLoading = ref(false)
const loadingPrompt = ref('Processing request')
const buttonLock = ref(false)

const showProfile = useDebounceFn(() => {
    previewProfile.value = true;
}, 150)

const target = ref(null)
onClickOutside(target, event => previewProfile.value = false)

const { users, userData, messagesRooms, selectedRoom, findPreExistingRoom, fetchMessageRoom, verifiedUsers } = inject('userData') 

const userInfo = reactive({
    full_name: {value: '', hasError: false, errorMessage: ''},
    department: {value: '', hasError: false, errorMessage: ''},
    degree_program: {value: '', hasError: false, errorMessage: ''},
    year_level: {value: '', hasError: false, errorMessage: ''},
    student_id: {value: '', hasError: false, errorMessage: ''},
    personal_description: {value: '', hasError: false, errorMessage: ''},
    experience: {value: [], hasError: false, errorMessage: ''},
    skills: {value: [''], hasError: false, errorMessage: ''},
    education: {value: {school_name: '', time_span: ''}, hasError: false, errorMessage: ''},
    interest: {value: [''], hasError: false, errorMessage: ''},
    facebook: '',
    gmail: '',
    mobileNumber: '',
    uid: null,
    photoURL: { value: 'https://i.ibb.co/LJPrkjQ/np.png', scale: 100}
})

const getUserInformation = (userId) => {
    const user = users.value.find((user) => user.uid == userId);
    if(user.length || user != false) {
        
        if (user) {
            // Assigning properties one by one to maintain reactivity
            userInfo.full_name.value = user.full_name;
            userInfo.department.value = user.department;
            userInfo.degree_program.value = user.degree_program;
            userInfo.year_level.value = user.year_level;
            userInfo.student_id.value = user.student_id;
            userInfo.personal_description.value = user.personal_description;
            userInfo.experience.value = user.experience;
            userInfo.skills.value = user.skills;
            userInfo.education.value = user.education;
            userInfo.interest.value = user.interest;
            userInfo.facebook = user.facebook;
            userInfo.gmail = user.gmail;
            userInfo.mobileNumber = user.mobileNumber;
            userInfo.photoURL.value = user.photoURL.value;
            userInfo.photoURL.scale = user.photoURL.scale;
            userInfo.uid = user.uid
        }
    } else {
        stopLoading()
        toast('Error occurred while loading user data', "top", 5000, '#CB3D3D', '#B74242')
    }
    stopLoading()
}

const startLoading = (prompt = 'Processing request') => {
    isLoading.value = true;
    loadingPrompt.value = prompt;
}
const stopLoading = () => {
    isLoading.value  = false;
}

const route = useRoute()

onMounted(() => {
    if(users.value.length) {
        getUserInformation(route.params.id)
    } else {
        startLoading('Getting user data')
        let newInterval = setInterval(() => {
            if(users.value.length) {
                getUserInformation(route.params.id)
                stopLoading()
                return clearInterval(newInterval)
            }
        })
    }
})

const router = useRouter()
const currentUserId = ref(userData.uid)

const handleCreateRoom = async () => {
    const preExistingRoomId = findPreExistingRoom(route.params.id)
    if(preExistingRoomId != null) {
        selectedRoom.value = messagesRooms.value.find((room) => room.roomId === preExistingRoomId)
        if(selectedRoom.value) {
            fetchMessageRoom()
            router.push({ name: 'Messages' })
        }
    } else {
        startLoading('System is generating room')
        if(userInfo.uid && userInfo.uid !== currentUserId.value && !buttonLock.value) {
            buttonLock.value = true;
            try {
                const messageRoom = {
                    users: [
                        {uid: userInfo.uid, photoURL: userInfo.photoURL, full_name: userInfo.full_name.value},
                        {uid: userData.uid, photoURL: userData.photoURL, full_name: userData.full_name.value}
                    ],
                    type: "Private message",
                    isNew: true,
                }
                // Add a new document with a generated id.
                // two personed room
                const docRef = await addDoc(collection(db, "messagesRooms"), messageRoom)
                // const docRef = await addDoc(collection(db, "messagesRooms", "DWAAfvGQcQ09sr5Mcje8", "messages"), {
                //     value: "Whassupp ashkur",
                //     timestamp: new Date().toISOString()
                // }); 
                // console.log("Document written: ", docRef.id );
                const createdRoom = {...messageRoom, roomId: docRef.id}
                selectedRoom.value = createdRoom;
                router.push({ name: 'Messages' }); 
                stopLoading();
                buttonLock.value = false;
            } catch (error) {
                buttonLock.value = false;
                alert(error.message)
                toast('Error occurred while creating a room', "top", 5000, '#CB3D3D', '#B74242')
                stopLoading();
            }
        } else {
            stopLoading();
            toast('Error occurred while creating a room', "top", 5000, '#CB3D3D', '#B74242')
        }
    }
}
</script>

<style scoped>
.fade-leave-to {
    opacity: 0; /* Start state */
    transition: opacity 300ms;
}
.fade-leave-from {
    opacity: 100; /* Start state */
}
.fade-enter-active {
    transition: opacity 300ms;
}
.fade-enter-from {
    opacity: 0; /* End state */
}
</style>