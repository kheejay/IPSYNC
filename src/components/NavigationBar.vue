<template>
    <div class="w-screen max-w-[100rem] mx-auto flex justify-between items-center px-12 sticky top-0 bg-white shadow">
        <div class="w-[9rem] py-2 flex justify-center items-center">
            <IPSYNCLogo class="w-[6.3rem] h-14" />
        </div>
        <div class="flex gap-[4rem]">
            <RouterLink :to="{ name: 'Dashboard' }"
                class="font-bold underline text-font text-[1rem] w-max border">
                HOME
            </RouterLink>
            <RouterLink :to="{ name: 'Dashboard' }"
                :class="`text-[1rem] text-font ${ false ? 'font-bold  underline' : '' } hover:font-bold hover:underline`">
                DASHBOARD
            </RouterLink>
            <RouterLink :to="{ name: 'Landing' }"
                :class="`text-[1rem] text-font ${ false ? 'font-bold  underline' : '' } hover:font-bold hover:underline`">
                INTERNSHIPS AND PROJECTS
            </RouterLink>
            <RouterLink :to="{ name: '' }"
                :class="`text-[1rem] text-font ${ false ? 'font-bold  underline' : '' } hover:font-bold hover:underline`">
                ABOUT US
            </RouterLink>
            <RouterLink :to="{ name: 'Dashboard' }"
                :class="`text-[1rem] text-font ${ false ? 'font-bold  underline' : '' } hover:font-bold hover:underline`">
                CONTACT US
            </RouterLink>
        </div>
        <div class="w-[9rem] flex justify-center items-center relative">
            <div @click="showDropDown = !showDropDown" class="relative">
                <img src="../assets/images/jacquard.png" alt="profile" 
                    class="bg-black w-9 h-9 rounded-full border-2 border-c1 cursor-pointer">
                <ArrowDown  class="absolute top-1/2 -right-1"/> 
            </div>
            <div  v-if="showDropDown" ref="target"
                class="absolute -bottom-[10.3rem] -left-[8.2rem] h-[9rem] w-[14rem] bg-white rounded-[0.625rem] p-2">
                <div class="flex p-2">
                    <img src="../assets/images/jacquard.png" alt="" 
                        class="bg-black w-11 h-11 rounded-full border-2 border-c1">
                    <div class=" flex-grow flex flex-col justify-center px-2">
                        <p class="font-bold text-[1rem]">Chicken Bilog</p>
                        <p class="text-[0.90rem]">STUDENT</p>
                    </div>
                </div>
                <div class="w-11/12 mx-auto border-t border-black p-2">
                     <p class="text-[1rem]m mb-1 cursor-pointer">VIEW PROFILE</p>
                     <p class="text-[1rem] cursor-pointer text-red-500">SIGN OUT</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import IPSYNCLogo from "./IPSYNCLogo.vue";
import ArrowDown from './icons/ArrowDown.vue'
const showDropDown = ref(false)

const target = ref(null)
onClickOutside(target, event => showDropDown.value = false)
</script>
