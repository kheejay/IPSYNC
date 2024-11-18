<template>
    <div class="z-[2] w-screen h-screen fixed top-0 left-0 flex items-center justify-center px-[1rem] overflow-y-auto pt-[12rem] pb-[6rem]">
        <div class="bg-c1 opacity-80 w-full h-full fixed left-0 top-0">

        </div>
        <div class="z-[3] drop-shadow max-w-[55rem] w-[55rem] min-h-[38rem] bg-white rounded-[2.4rem] relative">
            <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
                class="absolute bottom-0 right-0 w-[25rem] h-auto rounded-[2.4rem] select-none">
            <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
                class="absolute top-0 left-0 w-[25rem] h-auto rounded-[2.4rem] rotate-180 select-none">

                <XIcon class="w-9 h-8 text-black absolute right-[1.25rem] top-[1.25rem] z-[2] cursor-pointer" />

            <div class="text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] font-bold relative w-full text-center text-c6 sm:text-c1 pt-[3.5rem] tracking-[0.015rem]">
                Project <span class="text-c6">Posting Form</span>
            </div>

            <div class="w-full relative mt-[1.25rem] md:mt-[1.8rem] pb-6 md:pb-9 px-[1.5rem] md:px-[2.75rem] flex flex-col gap-2 sm:gap-4 md:gap-6">

                <div class="flex flex-col md:flex-row justify-between gap-2 sm:gap-4 md:gap-6">
                    <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] flex-grow border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                        <input type="text" placeholder="Project Title"
                        class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent">
                    </div>
                    <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] w-full sm:w-[17rem] border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                        <input type="text" placeholder="Number of Open Postions"
                        class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent">
                    </div>
                </div>

                <div class="flex flex-col md:flex-row justify-between gap-2 sm:gap-2 md:gap-6">
                    <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] flex-grow border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                        <input type="text" placeholder="Company or Organization Name"
                        class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent">
                    </div>
                    <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] w-full sm:w-[20rem] border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                        <input type="text" placeholder="Role/Position"
                        class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent">
                    </div>
                </div>

                <div class="flex flex-col md:flex-row justify-between gap-2 sm:gap-4 md:gap-6">
                    <div class="flex flex-col sm:flex-row md:flex-col md:w-max gap-2 md:gap-6 w-full">
                        <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] w-full sm:w-1/2 md:w-[17rem] border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black h-fit">
                            <input type="text" placeholder="Category/Tags"
                            class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent">
                        </div>
                        <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] w-full sm:w-1/2 md:w-[17rem] border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black h-fit">
                            <input type="text" placeholder="Compensation (if applicable)"
                            class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent">
                        </div>
                    </div>

                    <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] flex-grow border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                        <textarea type="text" placeholder="Project Description"
                        class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent resize-none" />
                    </div>
                </div>

                <div class="flex flex-col md:flex-row justify-between gap-2 sm:gap-4 md:gap-6">
                    <div class="flex flex-col sm:flex-row md:flex-col gap-2 md:gap-6">
                        <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] w-full md:w-[14rem] border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                            <input type="text" placeholder="Application Deadline"
                            class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent">
                        </div>
                        <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] w-full md:w-[14rem] border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                            <input type="text" placeholder="Project Timeline"
                            class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent">
                        </div>
                    </div>
                    <div class="drop-shadow rounded-[0.9rem] text-[0.9rem] flex-grow border border-c1 px-4 sm:px-[1.4rem] py-[0.675rem] bg-white focus-within:border-black">
                        <input type="text" placeholder="Contact Information"
                        class="w-full h-full focus:outline-none placeholder:italic placeholder:font-light bg-transparent">
                    </div>
                </div>

                <div class="w-full flex justify-end py-2">
                    <button class="drop-shadow font-[800] text-white bg-c1 px-11 py-[0.75rem] text-[1rem] rounded-[1rem] active:scale-[99%] duration-75">
                        SUBMIT</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
import XIcon from '../icons/XIcon.vue'
</script>