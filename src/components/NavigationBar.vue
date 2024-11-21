<template>
    <div class="z-[2] w-full max-w-[100rem] mx-auto flex justify-between items-center px-3 xl:px-12 sticky top-0 bg-white shadow">
        <div class="md:w-[9rem] h-[4rem] flex justify-center items-center">
            <IPSYNCLogo class="w-[3rem] md:w-[5rem]" />
        </div>
        <div :class="`hidden md:flex flex-grow lg:px-12 xl:px-0 
            ${ isAuthenticated ? 'justify-between' : 'justify-center gap-12 xl:gap-0'} xl:justify-center text-nowrap`">
            <RouterLink :to="{ name: 'Landing' }"
                :class="`text-[0.8rem] xl:text-[1rem] text-font ${ $route.name === 'Landing' ? 'font-bold underline' : '' } 
                    hover:font-bold hover:underline duration-200 w-[3rem] lg:w-[3.5rem] xl:w-[4rem] text-center`">
                HOME
            </RouterLink>
            <RouterLink v-if="isAuthenticated" :to="{ name: 'Dashboard' }"
                :class="`text-[0.8rem] xl:text-[1rem] text-font ${ $route.name === 'Dashboard' ? 'font-bold  underline' : '' } 
                    hover:font-bold hover:underline duration-200 w-[6rem] lg:w-[10rem] xl:w-[13rem] text-center`">
                DASHBOARD
            </RouterLink>
            <RouterLink v-if="isAuthenticated" :to="{ name: 'Projects' }"
                :class="`text-[0.8rem] xl:text-[1rem] text-font ${ $route.name === 'Projects' ? 'font-bold  underline' : '' } 
                    hover:font-bold hover:underline duration-200 w-[11.5rem] lg:w-[12rem] xl:w-[15rem] text-center`">
                INTERNSHIPS AND PROJECTS
            </RouterLink>
            <RouterLink :to="{ name: 'About' }"
                :class="`text-[0.8rem] xl:text-[1rem] text-font ${ $route.name === 'About' && 'font-bold  underline' }  
                    ${ !isAuthenticated && 'xl:w-[15rem]' }
                    hover:font-bold hover:underline duration-200 w-[5rem] lg:w-[9rem] xl:w-[12rem] text-center`">
                ABOUT US
            </RouterLink>
            <RouterLink :to="{ name: 'Contact' }"
                :class="`text-[0.8rem] xl:text-[1rem] text-font ${ $route.name === 'Contact' && 'font-bold  underline' } 
                    hover:font-bold hover:underline duration-200 w-[5.6rem] lg:w-[6.1rem] xl:w-[7rem] text-center`">
                CONTACT US
            </RouterLink>
        </div>
        <div v-if="isAuthenticated"
            class="w-[2.5rem] md:w-[9rem] hidden md:flex justify-center items-center relative">
            <div @mouseup="showDropDown = !showDropDown" class="relative">
                <img :src="userData.photoURL.value" alt="profile" 
                    class="bg-white w-9 h-9 rounded-full border-2 border-c1 cursor-pointer">
                <ArrowDown  class="absolute top-[65%] -right-[7%]"/> 
            </div>
            <div class="absolute right-0 top-[3.4rem] w-[21rem]">
                <div v-if="showDropDown" ref="target"
                    class="ml-[1.5rem] -bottom-[10.69rem] -left-[11.66rem] sm:-left-[8.2rem] h-max w-[16rem] bg-white 
                    rounded-[0.625rem] p-2 drop-shadow">
                    <div class="flex p-2 items-center">
                        <img :src="userData.photoURL.value" alt="user" 
                            class="w-11 h-11 rounded-full border-2 border-c1">
                        <div class=" flex-grow flex flex-col justify-center pl-2">
                            <p class="font-bold text-[1rem] ">{{ userData.full_name.value }}</p>
                            <p class="text-[0.90rem]">{{ userData.department.value }}</p>
                        </div>
                    </div>
                    <div class="w-11/12 mx-auto border-t border-black py-2">
                        <p @click="goToProfile"
                            class="text-[1rem]m py-1 cursor-pointer w-full mt-1">VIEW PROFILE</p>
                        <p @click="goToMessages"
                            class="text-[1rem]m py-1 cursor-pointer w-full">MESSAGES</p>
                        <p @mousedown="confirmActionLogout" class="text-[1rem] cursor-pointer 
                            pb-1 text-red-500 w-max mt-1.5">SIGN OUT</p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else 
            @mousedown="goTo('Login')"
            class="w-[2.5rem] md:w-[9rem] hidden md:flex justify-center items-center text-[1.125rem] text-c1 
            cursor-pointer hover:scale-105">
            SIGN IN
        </div>

        <RoundMenu @click="showMobileNav = true"
            :class="`flex md:hidden w-11 h-11 p-[0.125rem] rounded-sm active:text-white active:bg-c1 active:scale-95
            ${ showMobileNav ? 'text-white' : 'text-c1 bg-white'}`" />
        <Transition enter-active-class="transition-opacity duration-500" enter-from-class="opacity-0"
            enter-to-class="opacity-[0.65]" leave-active-class="transition-opacity duration-300" 
            leave-from-class="opacity-[0.65]" leave-to-class="opacity-0">        
            <div @click="showMobileNav = false"
                v-if="showMobileNav" class="absolute w-screen h-screen top-0 left-0 md:hidden bg-c2 opacity-50">
            </div>
        </Transition>
        <Transition enter-active-class="transition ease-out duration-500" enter-from-class="translate-x-full"
        enter-to-class="translate-x-0" leave-active-class="transition ease-in duration-300"
        leave-from-class="translate-x-0" leave-to-class="translate-x-full">
            <div v-if="showMobileNav" class="z-[2] fixed top-0 right-0 md:hidden h-screen bg-white w-[32rem] max-w-[80vw]
                flex flex-col justify-between p-4">
                <div class="flex-grow">
                    <RouterLink v-if="!isAuthenticated" :to="({ name: 'Login' })"
                        class="p-4 bg-c1 text-white rounded mb-4 flex items-center gap-2">
                        SIGN IN TO GET STARTED <LightArrowRight class="w-[1.75rem] h-[1.75rem]" />
                    </RouterLink>
                    <div v-if="isAuthenticated" 
                        :class="`w-full rounded`">
                        <div class="flex p-2">
                            <img :src="userData.photoURL.value" alt="" 
                                @mousedown="goToProfile"
                                class="bg-black w-11 h-11 rounded-full border-2 border-c1">
                            <div class=" flex-grow flex flex-col justify-center px-2">
                                <p class="font-bold text-[1rem]">Chicken Bilog</p>
                                <p class="text-[0.90rem]">STUDENT</p>
                            </div>
                        </div>
                        <div @mousedown="goToProfile" 
                            :class="`w-11/12 mx-auto border-black pl-2 py-1.5 
                            ${ $route.name === 'Profile' && 'bg-c4'} mt-2 active:bg-c4 duration-200`">
                            <p class="text-[1rem]m mb-1 cursor-pointer">VIEW PROFILE</p>
                        </div>
                        <div @mousedown="goToMessages" 
                            :class="`w-11/12 mx-auto border-black pl-2 py-1
                            ${ $route.name === 'Messages' && 'bg-c4'} active:bg-c4 duration-200`">
                            <p class="text-[1rem]m mb-1 cursor-pointer">MESSAGES</p>
                        </div>
                    </div>
                    <div class="w-full grid">
                        <div @mousedown="goTo('Landing')" 
                            :class="`w-full flex h-[4rem] gap-4 items-center pl-4 active:bg-c4 rounded
                                ${ $route.name === 'Landing' && 'bg-c4'}`">
                            <BaselineOutline class="text-font w-7 h-7" />
                            <div :class="`text-[1rem] text-font ${ $route.name === 'Landing' && 'font-bold underline'} 
                                    hover:font-bold hover:underline text-shadow`">
                                HOME
                            </div>
                        </div>
                        <div @mousedown="goTo('Dashboard')" 
                            v-if="isAuthenticated"
                            :class="`w-full flex h-[4rem] gap-4 items-center pl-4 active:bg-c4 rounded
                                ${ $route.name === 'Dashboard' && 'bg-c4'}`">
                            <DashboardIcon class="text-font w-7 h-7" />
                            <div :class="`text-[1rem] text-font ${ $route.name === 'Dashboard' && 'font-bold underline' } 
                                    hover:font-bold hover:underline text-shadow`">
                                DASHBOARD
                            </div>
                        </div>
                        <div @mousedown="goTo('Projects')" 
                            v-if="isAuthenticated"
                            :class="`w-full flex h-[4rem] gap-4 items-center pl-4 active:bg-c4 rounded
                                ${ $route.name === 'Projects' && 'bg-c4'}`">
                            <BaselineEngineering class="text-font w-7 h-7" />
                            <div :class="`text-[1rem] text-font ${ $route.name === '' ? 'font-bold underline' : '' } 
                                    hover:font-bold hover:underline text-shadow`">
                                INTERNSHIPS AND PROJECTS
                            </div>
                        </div>
                        <div @mousedown="goTo('About')" 
                            :class="`w-full flex h-[4rem] gap-4 items-center pl-4 active:bg-c4
                            ${ $route.name === 'About' && 'bg-c4'}`">
                            <BaselineGroups class="text-font w-7 h-7" />
                            <div :class="`text-[1rem] text-font ${ $route.name === 'About' && 'font-bold underline' } 
                                    hover:font-bold hover:underline text-shadow`">
                                ABOUT US
                            </div>
                        </div>
                        <div @mousedown="goTo('Contact')" 
                            :class="`w-full flex h-[4rem] gap-4 items-center pl-4 active:bg-c4
                            ${ $route.name === 'Contact' && 'bg-c4'}`">
                            <BaselinePhone class="text-font w-7 h-7" />
                            <div :class="`text-[1rem] text-font ${ $route.name === 'Contact' && 'font-bold underline' } 
                                    hover:font-bold hover:underline text-shadow`">
                                CONTACT US
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="isAuthenticated" @mousedown="confirmActionLogout" class="w-full text-end text-red-500 pr-4">
                    SIGN OUT
                </div>
                <div v-else @mousedown="goTo('Login')" class="w-full text-end text-c1 pr-4">SIGN IN</div>
            </div>
        </Transition>
        <ConfirmationModal v-if="confirmLogout"
            @confirm="handleLogout"
            @cancel="confirmLogout = false"
            :message="'Please confirm to logout.'" />
    </div>
</template>

<script setup>
import { onClickOutside, useDebounceFn } from "@vueuse/core";
import { inject, onBeforeMount, onUnmounted, ref } from "vue";
import IPSYNCLogo from "./IPSYNCLogo.vue";
import ArrowDown from './icons/ArrowDown.vue';
import RoundMenu from './icons/RoundMenu.vue';
import BaselineOutline from './icons/BaselineHouse.vue';
import DashboardIcon from './icons/DashboardIcon.vue'
import BaselineEngineering from './icons/RoundEngineering.vue';
import BaselineGroups from './icons/BaselineGroups.vue';
import BaselinePhone from './icons/BaselinePhone.vue';
import LightArrowRight from '../components/icons/LightArrowRight.vue';
import ConfirmationModal from "./modals/ConfirmationModal.vue";

import { RouterLink, useRouter } from "vue-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "../functions/toast";
const { userData, emptyUserData } = inject('userData')
const showDropDown = ref(false)

const router = useRouter()

const target = ref(null)
onClickOutside(target, event => showDropDown.value = false)

const showMobileNav = ref(false)
const confirmLogout = ref(false)

const goToProfile = useDebounceFn(() => {
    router.push({ name: 'Profile'})
    showMobileNav.value = false
    showDropDown.value = false
}, 150)
const goToMessages = useDebounceFn(() => {
    router.push({ name: 'Messages'})
    showMobileNav.value = false
    showDropDown.value = false
}, 150)

const goTo = useDebounceFn((name) => {
    router.push({ name: name})
    showMobileNav.value = false
    toast('Please sign in to get started!', "center", "3000", "#184c95", "#1c58ab")
}, 150)

const handleLogout = () => {
    signOut(auth).then(() => {
    // Sign-out successful.
    toast("Logout successful!")
    emptyUserData()
    router.push({ name: 'Landing' })
    confirmLogout.value = false;
    }).catch((error) => {
    // An error happened.
    console.log(error)
    });
}

const confirmActionLogout = useDebounceFn(() => {
    confirmLogout.value = true;
    showMobileNav.value = false;
}, 150)

const { isAuthenticated } = inject('userData')

const unsubscribeAuth = ref(null)

const listenAuth = () => {
    unsubscribeAuth.value = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            isAuthenticated.value = true;
            const uid = user.uid;
            console.log(uid)
            // ...
        } else {
            // User is signed out
            // ...
            isAuthenticated.value = false;
        }
    });
}

onBeforeMount(async () => {
    listenAuth()
})

onUnmounted(() => {
    if(unsubscribeAuth.value) {
        unsubscribeAuth.value()
    }
})
</script>
