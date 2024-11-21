<template>
    <div class="w-full h-fit max-h-[calc(100vh-4rem)] flex">

        <div class="h-[calc(100vh-4rem)] w-[34rem] pl-4 py-4 pr-2 hidden lg:flex">
            <div class="w-full h-full flex flex-col gap-2.5 p-2 overflow-y-auto border border-c2">
                <div v-for="x in 20" :key="x" class="w-full min-h-[5.2rem] flex bg-white shadow-sm border cursor-pointer 
                hover:bg-c4">
                    <div class="h-full flex items-center px-4">
                        <img src="https://i.ibb.co/Rz329Dm/sad-dog.jpg" alt="" class="w-[3.5rem] h-[3.5rem] rounded-full
                            border-c6 border-2">
                    </div>
                    <div class="flex-grow pt-3">
                        <p class="font-bold text-c1 pt-1">Smaple Fullname</p>
                        <p class="text-c1 text-[0.90rem]">This is a long text a lil bit long...</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-grow h-[calc(100vh-4rem)] w-full lg:h-auto lg:w-auto flex p-2 sm:p-4 lg:p-0 lg:pl-2 lg:py-4 lg:pr-4">
            <div v-if="1" class="border border-c6 flex-grow flex flex-col">

                <div class="w-full min-h-[4rem] h-[4rem] flex justify-start bg-gradient-to-r from-c2 to-c6 drop-shadow">
                    <div class="h-full flex">
                        <div class="h-full flex lg:hidden items-center px-4">
                            <ArrowLeft class="w-8 h-8 text-c5" />
                        </div>
                        <div class="flex items-center lg:pr-2 lg:pl-4">
                            <img src="https://i.ibb.co/LJPrkjQ/np.png" alt="profile" class="w-11 h-11">
                        </div>
                        <div class="flex items-center px-4 lg:text-[1.125rem] text-white">
                            Sample Fullname
                        </div>
                    </div>
                </div>

                <div class="flex-grow flex flex-col p-2 overflow-y-scroll text-white gap-4 no-scrollbar">
                    <div v-for="x in 10" :key="x" :class="`w-full flex ${ x%2 == 0 ? 'justify-start' : 'justify-end' }`">
                        <div>
                            <div class="min-w-[10rem] max-w-[39rem] bg-c2 p-2">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque atque quod numquam natus rem est quaerat doloremque, culpa quasi nisi repudiandae eos iusto consequatur veniam reprehenderit incidunt pariatur voluptates ex.
                            </div>
                            <div class="text-xs text-c1 w-full text-center">
                                <span>11:01 PM</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full p-2 flex justify-start items-end bg-transparent to-c6 gap-4">
                    <textarea 
                        class="h-fit w-full focus:outline-none p-4 resize-none caret-c2 focus:ring focus:ring-c2 text-c1
                        hover:ring hover:ring-c3 duration-200 bg-c5"
                        v-model="input"
                        ref="textarea" 
                        placeholder="Hello!"
                        />
                    <div class="flex items-center h-full">
                        <PlusIcon class="w-9 h-9 cursor-pointer text-c2 hover:text-c6 hover:scale-105 
                        duration-200 active:translate-y-[0.125rem]" />
                    </div>
                    <button class="px-9 h-[3.25rem] bg-c6 text-white rounded hover:bg-[#386bb2] duration-75 
                    active:translate-y-[0.125rem]">
                        Send
                    </button>
                </div>

            </div>
            <div v-else class="outline flex-grow">
                    test
            </div>
        </div>
        
    </div>
</template>

<script setup>
import ArrowLeft from '../components/icons/ArrowLeft.vue';
import PlusIcon from '../components/icons/PlusIcon.vue'
import { useTextareaAutosize } from '@vueuse/core';
const { textarea, input } = useTextareaAutosize()
</script>