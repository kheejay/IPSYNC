<template>
<div class="w-full flex justify-center">
    <div class="w-full xl:w-[60rem] py-9">
        
        <div class="w-full min-h-[53rem] h-[53rem] flex flex-col shadow-[0rem_0.25rem_0.25rem_black] 
            rounded-[0.625rem] relative overflow-hidden">
            <div class="xl:w-[55rem] xl:h-[55rem] bg-c1 absolute rounded-full -top-[15rem] -left-[15.5rem]"></div>
            <div class="xl:w-[30rem] xl:h-[30rem] bg-[#4A658D] absolute top-0 rounded-lg -right-[15rem]"></div>
            <div class="z-[2] absolute w-[12rem] h-[12rem] bg-white rounded-full left-[4rem] top-[13rem] flex items-center 
            justify-center border border-c1 hover:cursor-pointer overflow-hidden">
                <div class="w-full h-full border-[0.2rem] rounded-full border-white z-[2] absolute"></div>
                <img src="/src/assets/images/jacquard.png" alt="user photo" class="bg-black">
            </div>
            <div class="w-full h-[40%] bg-transparent bg-black"></div>
            <div class="z-[1] w-full h-[60%] bg-white rounded-[0.625rem] ring-1 ring-inset ring-black p-4">
                <div class="w-full flex justify-end items-center gap-4">
                    <button class="rounded-full bg-c1 text-white py-[0.2rem] md:py-[0.4rem]
                        my-3 w-[10rem] text-[0.90rem] sm:text-[1rem] active:scale-[99%]">
                        Save Changes
                    </button>
                    <EditProfileInfo class="w-[2rem] h-[2rem] cursor-pointer 
                        hover:scale-105 active:scale-95 duration-200" />
                </div>
                <div class="w-full flex flex-col items-start">
                    <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                        <input type="text" class="w-full h-full bg-transparent px-2 text-[1.80rem] 
                            focus:outline-none" value="Chicken Bilog Doe">
                    </div>
                    <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                        <input type="text" class="w-full bg-transparent p-2 text-[1.1rem] italic text-c1
                            focus:outline-none" 
                            value="College of Senior High School">
                    </div>
                </div>
                <div class="w-full font-bold text-c1 text-[1.75rem] mt-[3.5rem]">About Me</div>
                <div class="w-full h-[9rem] flex items-center mt-[2rem]">
                    <div class="w-[40%] grid gap-4 py-2 border-r-2 border-black pr-4">
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
                    <div class="w-[60%] h-full px-4">
                        <textarea class="w-full min-h-[9rem] border p-2 focus:outline-none focus:border focus:border-c1
                                resize-none max-h-[9rem]"
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