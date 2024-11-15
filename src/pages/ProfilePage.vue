<template>
<div class="w-full flex justify-center">
    <div class="w-full lg:w-[60rem] py-2 sm:py-7 lg:py-9 sm:px-8 lg:px-0">
        
        <div class="w-full h-[58rem] sm:h-[40rem] lg:h-[53rem] flex flex-col shadow-[0rem_0.25rem_0.25rem_black] 
            rounded-[0.625rem] relative overflow-hidden bg-c1 lg:bg-c4">
            <div class="lg:w-[55rem] lg:h-[55rem] bg-c1 absolute rounded-full -top-[15rem] -left-[12.6rem]"></div>
            <div class="lg:w-[30rem] lg:h-[30rem] bg-[#4A658D] absolute top-0 rounded-lg -right-[17.2rem]"></div>
            <div class="z-[2] absolute w-[7rem] h-[7rem] sm:w-[9rem] sm:h-[9rem] lg:w-[12rem] lg:h-[12rem] bg-white rounded-full left-[1rem] sm:left-[2rem] lg:left-[4rem] top-[13.2rem] sm:top-[6.5rem] lg:top-[13.5rem] flex items-center 
                justify-center border border-c1 hover:cursor-pointer overflow-hidden">
                <div class="w-full h-full border-[0.2rem] rounded-full border-white z-[2] absolute"></div>
                <img src="/src/assets/images/jacquard.png" alt="user photo" class="bg-black">
            </div>
            <div class="w-full h-[30%] lg:h-[40%] bg-transparent bg-black"></div>
            <div class="z-[1] w-full h-[70%] lg:h-[60%] bg-white rounded-[0.625rem] ring-1 ring-inset ring-black px-4 lg:p-4">
                <div class="w-full flex justify-end items-center gap-4">
                    <button class="rounded-full bg-c1 text-white py-[0.2rem] md:py-[0.4rem]
                        my-3 px-2 sm:px-0 sm:w-[10rem] text-[0.80rem] sm:text-[1rem] active:scale-[99%]">
                        Save Changes
                    </button>
                    <EditProfileInfo class="w-[2rem] h-[2rem] cursor-pointer 
                        hover:scale-105 active:scale-95 duration-200" />
                </div>
                <div class="w-full flex flex-col items-start pt-2">
                    <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                        <input type="text" class="w-full h-full bg-transparent px-2 text-[1.75rem] 
                            focus:outline-none" value="Chicken Bilog Doe">
                    </div>
                    <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                        <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1
                            focus:outline-none" 
                            value="College of Senior High School">
                    </div>
                </div>
                <div class="w-full font-bold text-c1 text-[1.75rem] mt-[3.5rem]">About Me</div>
                <div class="w-full sm:h-[9rem] grid gap-4 sm:flex items-center mt-[2rem] text-c1">
                    <div class="w-full sm:w-[40%] grid gap-4 py-2 border-b-2 sm:border-r-2 border-black pr-4">
                        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                            <input type="text" class="w-full bg-transparent text-[1.1rem] placeholder:italic p-2 text-c1 focus:outline-none" 
                            placeholder="Degree Program">
                        </div>
                        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                            <input type="text" class="w-full bg-transparent text-[1.1rem] placeholder:italic p-2 text-c1 focus:outline-none" 
                            placeholder="Year Level">
                        </div>
                        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                            <input type="text" class="w-full bg-transparent text-[1.1rem] placeholder:italic p-2 text-c1 focus:outline-none" 
                            placeholder="Student ID">
                        </div>
                    </div>
                    <div class="w-full sm:w-[60%] h-full sm:px-4">
                        <textarea class="w-full min-h-[9rem] border p-2 focus:outline-none focus:border focus:border-c1
                                resize-none max-h-[9rem] text-[1rem]"
                                ref="textarea"
                                v-model="input"
                                placeholder="What's on your mind?"
                            />
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script setup>
import EditProfileInfo from '../components/icons/EditProfileInfo.vue'
import { useTextareaAutosize } from '@vueuse/core';
const { textarea, input } = useTextareaAutosize()
</script>