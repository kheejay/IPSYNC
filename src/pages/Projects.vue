<template>
    <div class="w-full h-fit max-h-[100rem px-[2.8rem] bg-image bg-white pt-10 pb-[10rem]">

        <div class="w-full">

            <div class="w-full flex flex-col-reverse md:flex-row">
                <img src="/src/assets/images/WestPeople.svg" alt="Group Photo" class="w-[30rem] md:w-1/2 h-auto">
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
                            <button class="flex justify-between items-center w-[15.25rem] sm:w-[19rem] xl:w-[23rem] py-[.9rem]
                            sm:py-[1.15rem] px-5 sm:px-7 border border-black rounded-[2.25rem] shadow-[0rem_0.25rem_0.25rem_black] active:translate-y-[0.25rem] active:shadow-none duration-200 mt-5 xl:mt-7 ">
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

            <img src="/src/assets/images/ElsReycel.svg" alt="Photo">
            <img src="/src/assets/images/ElsReycel.svg" alt="Photo">
        </div>

    </div>
</template>

<script setup>
import EditPen from '../components/icons/EditPen.vue'
</script>

<style scoped>
.bg-image {
    background-image: url('/src/assets/images/ProjectsBg.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: bottom;
    background-position-x: 45rem;
    background-size: 50rem;
}
</style>