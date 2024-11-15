<template>
<div class="w-full flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-0 sm:py-7 lg:py-9 sm:px-8 lg:px-0">
    
    <div class="w-full lg:w-[60rem]">
        
        <div class="w-full h-[64rem] sm:h-[42rem] lg:h-[53rem] flex flex-col shadow-[0rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] 
            rounded-[0.625rem] relative overflow-hidden bg-c1 lg:bg-c4">
            <div class="lg:w-[55rem] lg:h-[55rem] bg-c1 absolute rounded-full -top-[15rem] -left-[12.6rem]"></div>
            <div class="lg:w-[30rem] lg:h-[30rem] bg-[#4A658D] absolute top-0 rounded-lg -right-[17.2rem]"></div>
            <div class="z-[2] absolute w-[11rem] h-[11rem] lg:w-[12rem] lg:h-[12rem] bg-white rounded-full left-1/2 -translate-x-1/2 sm:-translate-x-0 sm:left-[3.5rem] lg:left-[2.7rem] top-[12.2rem] sm:top-[5.7rem] lg:top-[13.8rem] flex items-center 
                justify-center border-0 hover:cursor-pointer overflow-hidden">
                <div class="w-full h-full border-[0.2rem] rounded-full border-white z-[2] absolute">
                </div>
                <img src="/src/assets/images/jacquard.png" alt="user photo" class="bg-black">
            </div>
            <div class="w-full h-[30%] lg:h-[40%] bg-transparent bg-black"></div>
            <div class="z-[1] w-full h-[70%] lg:h-[60%] bg-white rounded-[0.625rem] border border-c1 px-4 lg:p-4">
                <div class="w-full flex flex-col-reverse sm:flex-col">
                    <div class="w-full flex justify-end items-center gap-4 mt-4 sm:mt-0">
                        <button class="rounded-full bg-c1 text-white sm:py-[0.4rem]
                            my-3 py-1.5 px-6 sm:px-0 sm:w-[10rem] text-[1rem] active:scale-[99%]">
                            Save Changes
                        </button>
                        <EditProfileInfo class="w-[2rem] h-[2rem] cursor-pointer 
                            hover:scale-105 active:scale-95 duration-200" />
                    </div>
                    <div class="w-full flex flex-col items-start pt-2 mt-[4.4rem] sm:mt-0">
                        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                            <input type="text" class="w-full h-full bg-transparent px-2 text-[1.75rem] 
                                focus:outline-none text-center sm:text-start" value="Chicken Bilog Doe">
                        </div>
                        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1">
                            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1
                                focus:outline-none text-center sm:text-start" 
                                value="College of Senior High School">
                        </div>
                    </div>
                </div>
                <div class="w-full font-bold text-c1 text-[1.75rem] mt-[3rem] sm:mt-[3.5rem] sm:pl-2">About Me</div>
                <div class="w-full sm:h-[9rem] grid gap-4 sm:flex items-center sm:mt-[2rem] text-c1">
                    <div class="w-full sm:w-[40%] grid gap-4 py-2 border-b-2 sm:border-b-0 sm:border-r-2 border-black pr-4">
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

    <div class="w-full lg:w-[60rem] shadow-[0rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] rounded-[0.625rem] bg-white p-4 border
         border-black flex flex-col md:grid md:grid-cols-2">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Experience
        </div>
        <JobTitleModal />
        <JobTitleModal />
        <JobTitleModal />
        <JobTitleModal />
        <div class="flex items-center py-4 italic opacity-45 hover:opacity-100 cursor-pointer">
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
        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 border-b-2 border-b-black
            focus-within:border-b-0">
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1
                focus:outline-none text-center sm:text-start" 
                value="College of Senior High School">
        </div>
        <div class="py-4 w-full flex justify-center">
            <PlusIcon class="w-[2.4rem] h-[2.4rem] opacity-45 cursor-pointer hover:opacity-100" />
        </div>
    </div>


    <div class="w-full lg:w-[60rem] shadow-[0rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] rounded-[0.625rem] bg-white p-4 border
         border-black">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Education
        </div>
        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 border-b-2 border-b-black
            focus-within:border-b-0">
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1
                focus:outline-none text-center sm:text-start" 
                value="College of Senior High School">
        </div>
        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 mt-2">
            <input type="text" class="w-full bg-transparent p-2 text-[0.90rem] italic text-c1
                focus:outline-none text-center sm:text-start" 
                value="2022-Present">
        </div>
    </div>


    <div class="w-full lg:w-[60rem] shadow-[0rem_0.25rem_0.25rem_rgba(0,0,0,0.25)] rounded-[0.625rem] bg-white p-4 border
         border-black">
        <div class="w-full font-bold text-c1 text-[1.75rem] py-4 col-span-2">
            Interest
        </div> 
        <div class="w-full ring-inset focus-within:ring-1 focus-within:ring-c1 border-b-2 border-b-black
            focus-within:border-b-0">
            <input type="text" class="w-full bg-transparent p-2 text-[1rem] italic text-c1
                focus:outline-none text-center sm:text-start" 
                value="College of Senior High School">
        </div>
        <div class="py-4 w-full flex justify-center">
            <PlusIcon class="w-[2.4rem] h-[2.4rem] opacity-45 cursor-pointer hover:opacity-100" />
        </div>
    </div>

</div>
</template>

<script setup>
import EditProfileInfo from '../components/icons/EditProfileInfo.vue';
import JobTitleModal from '../components/modals/JobTitleModal.vue';
import PlusIcon from '../components/icons/PlusIcon.vue'
import { useTextareaAutosize } from '@vueuse/core';
const { textarea, input } = useTextareaAutosize()
</script>