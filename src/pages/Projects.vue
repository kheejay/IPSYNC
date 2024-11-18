<template>
    <div class="w-full px-[1.5rem] sm:px-[2rem] lg:px-[2.8rem] bg-image bg-white pt-10 pb-[12rem]">

        <div class="w-full">

            <div class="w-full flex flex-col-reverse md:flex-row">
                <img src="/src/assets/images/WestPeople.svg" alt="Group Photo" class="w-full md:w-1/2 h-auto">
                <div class="flex-grow flex items-center pb-[3rem]">
                    <div class="w-full flex flex-col items-center xl:max-w-[42rem]">
                        <div class="w-full text-[1.75rem] xl:text-[2rem] font-extrabold text-c1">
                            TAGA-WEST
                        </div>
                        <div class="w-full text-[2rem] xl:text-[2.50rem] font-semibold text-c6 mt-1.5 xl:mt-6 leading-[2.25rem]">
                            Looking to post a project?
                        </div>
                        <div class="text-[1rem] sm:text-[1.25rem] xl:text-[1.50rem] text-c6 xl:text-start mt-4">
                            Have an internship or project that needs fresh talent? Post it here to connect with skilled and enthusiastic candidates ready to make a difference!
                        </div>
                        <div class="w-full">
                        <button 
                            class="drop-shadow flex justify-between items-center w-[15.25rem] sm:w-[19rem] xl:w-[23rem] py-[.9rem]
                            sm:py-[1.15rem] px-5 sm:px-7 border border-black rounded-[2.25rem] active:translate-y-[0.25rem] active:shadow-none duration-200 mt-5 xl:mt-7">
                            <span class="text-[1.125rem] sm:text-[1.25rem] xl:text-[1.50rem] font-bold text-c1">Post a project!</span>
                            <EditPen class="h-6 w-6" />
                        </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full flex flex-col md:flex-row">
                <div class="flex-grow flex items-center pb-[3rem] md:translate-x-[4rem] mt-12">
                    <div class="w-full flex flex-col items-center xl:max-w-[42rem]">
                        <div class="w-full text-[3rem] xl:text-[4rem] font-bold text-c1 leading-[3rem] xl:leading-[4rem]">
                            <span class="text-c6">Find the</span> Perfect Job
                        </div>
                        <div class="text-[1rem] sm:text-[1.35rem] xl:text-[1.50rem] text-c1 xl:text-start pr-[5rem] mt-[0.8rem]">
                            Discover internships and projects seeking talent like you—each is a chance to grow, build skills, and gain hands-on experience!
                        </div>
                        <div class="w-full text-[1.25rem] pr-[5rem] text-c6">
                            Scroll down to view the latest opportunities and find a role that fits your career path.
                        </div>
                    </div>
                </div>
                <img src="/src/assets/images/ElsReycel.svg" alt="Group Photo" class="w-full md:w-1/2 h-auto">
            </div>
        </div>

        <div class="mt-20 sm:mt-32 w-full md:px-[4rem] xl:px-[6rem]">
            <div class="w-full items-start flex-col sm:flex-row flex gap-2 lg:gap-4 xl:gap-9 justify-between">
                <div class="flex-grow w-full h-[2.75rem] sm:h-[3.2rem] border-2 border-black flex">
                    <input type="text" class="focus:outline-none w-full h-full px-2 sm:px-4 md:px-8 placeholder:italic sm:text-[1.125rem]" 
                    placeholder="Search...">
                    <div class="w-max h-full bg-c1 flex items-center justify-center">
                        <MagnifyingGlass class="text-white w-[2rem] h-[2rem] sm:w-[2.8rem] sm:h-[2.8rem] mx-2" />
                    </div>
                </div>
                <div class="h-[2.75rem] sm:h-[3.2rem] w-max bg-white flex items-center gap-2 md:gap-6 border-2 border-c1 text-c1 px-4">
                    <FilterSort class="w-5 h-5 sm:w-7 sm:h-7" />
                    <span class="text-[0.9rem] sm:text-[1rem] font-bold text-nowrap">Filter & Sort</span>
                    <ArrowDownNoBg class="w-5 sm:w-7 h-5 sm:h-7 bg-white text-c1" />
                </div>
            </div>
        </div>
        <div class="w-full flex justify-center py-11 sm:py-20">
            <div class="grid xl:grid-cols-2 gap-7 sm:gap-16">
                <PostComponent v-for="x in 8" :key="x" />
            </div>
        </div>
    </div>
</template>

<script setup>
import EditPen from '../components/icons/EditPen.vue';
import MagnifyingGlass from '../components/icons/MagnifyingGlass.vue';
import FilterSort from '../components/icons/FilterSort.vue';
import ArrowDownNoBg from '../components/icons/ArrowDownNoBg.vue'
import PostComponent from '../components/PostComponent.vue'
// import { useWindowScroll } from '@vueuse/core';

// const { y } = useWindowScroll({ behavior: 'smooth' });
</script>

<style scoped>
.bg-image {
    background-image: url('/src/assets/images/ProjectsBg.svg');
    background-repeat: no-repeat;
    background-position-y: bottom;
    background-position-x: 45rem;
    background-size: 50rem;
}

@media (max-width: 1280px) {
    .bg-image {
        background-position-x: 28rem;
        background-size: 45rem;
    }
}
@media (max-width: 768px) {
    .bg-image {
        background-position-x: 9rem;
        background-size: 39rem;
    }
}
</style>