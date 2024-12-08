<template>
    <div class="w-full">
        <div class="sm:h-[calc(100vh-4rem)] bg-image bg-[url('/src/assets/images/landingBg.png')] text-white">
            <div class="px-6 text-center md:text-left md:pl-[7.5rem] pt-[10rem] sm:pt-[12rem] tracking-widest">
                <div class="font-black text-[1.6rem] md:text-[3.25rem] md:w-[60%] sm:text-[3rem] leading-tight">
                    CONNECT, COLLABORATE, SUCCEED
                </div>
                <div class="font-extralight text-[1rem] md:text-[1.25rem] md:w-[40%] pt-3">
                    Bridging Learning and Real-World Experience for Career-Ready Taga-West Students
                </div>
                <div class="flex justify-center md:justify-start mt-6 md:mt-12">
                    <button 
                        @click="handlePush('Dashboard')" 
                        class="pl-6 pr-3 py-2 bg-[#EBF1FD] text-[#113567] font-bold rounded-3xl flex items-center uppercase">
                        {{ isAuthenticated ? 'Go to Dashboard' : 'GET STARTED' }}
                        <LightArrowRight class="w-[2rem] md:w-[3rem] h-[1.5rem] md:h-[2rem] ml-1 text-[#113567]" />
                    </button>
                </div>
            </div>
        </div>


        <div class="bg-[#113567] h-auto w-full text-white pb-12 md:h-auto">
            <div class="text-center text-[1rem] tracking-widest py-12">
                IN COLLABORATION WITH
            </div>
            <div class="flex flex-wrap justify-around gap-10 px-[3rem] md:px-[6rem]">
                <img src="/src/assets/images/googlelogo.png" alt="Google" class="h-[5rem] w-auto" />
                <img src="/src/assets/images/istio.png" alt="Istio" class="h-[5rem] w-auto" />
                <img src="/src/assets/images/jigsaw.png" alt="Jigsaw" class="h-[5rem] w-auto" />
                <img src="/src/assets/images/justaline.png" alt="Justaline" class="h-[5rem] w-auto" />
                <img src="/src/assets/images/pegman2.png" alt="Pegman" class="h-[5rem] w-auto" />
                <img src="/src/assets/images/nest2.png" alt="Nest" class="h-[5rem] w-auto" />
            </div>
        </div>


        <div class="mt-[5rem] md:mt-[10rem] px-6 md:px-[10%] text-center">
            <div class="text-[#113567] font-black text-[1.75rem] md:text-[3rem] leading-tight">
                IPSync is the bridge between academic learning and career success.
            </div>
            <div class="text-[#113567] font-medium text-[0.90rem] md:text-[1.25rem] mt-6">
                Our platform connects students, faculty, and industry partners, offering hands-on experience through internships and projects to help students gain real-world skills in their fields.
            </div>
            <div class="flex flex-wrap justify-center gap-4 mt-10 mb-14 md:mt-20 md:mb-20">
                <img src="/src/assets/images/register.png" alt="Register" class="h-[8rem] md:h-[12rem] w-auto" />
                <img src="/src/assets/images/explore.png" alt="Explore" class="h-[8rem] md:h-[12rem] w-auto" />
                <img src="/src/assets/images/experience.png" alt="Experience" class="h-[8rem] md:h-[12rem] w-auto" />
                <img src="/src/assets/images/achievement.png" alt="Achievement" class="h-[8rem] md:h-[12rem] w-auto" />
            </div>
        </div>

        <!-- Mission Section -->
        <div class="bg-[#113567] py-16 md:py-[6rem] px-6 md:px-[8rem] text-white text-center md:text-left">
            <div class="font-extrabold text-[1.75rem] md:text-[3rem] leading-tight">
                We want to build a world where candidates are considered equally on their merits.
            </div>
            <div class="font-light text-[0.90rem] md:text-[1.5rem] md:w-[70%] mt-4">
                We're here to ensure that your skills, grit, and drive are recognized and rewarded.
            </div>
            <div class="flex justify-center md:justify-start mt-6 md:mt-12">
                <button 
                    @click="handlePush('Projects')" 
                    class="pl-6 pLr-3 py-2 bg-[#EBF1FD] text-[#113567] font-bold rounded-2xl flex items-center uppercase">
                    {{  isAuthenticated ? 'Project Listings' : 'join now' }}
                    <LightArrowRight class="w-[2rem] md:w-[3rem] h-[1.5rem] md:h-[2rem] ml-1 text-[#113567]" />
                </button>
            </div>
        </div>

        <!-- Testimonial Section -->
        <div class="pt-10 md:pt-20 px-6 text-center bg-white">
            <div class="text-[#113567] font-black text-[1.75rem] md:text-[3rem] leading-tight">
                Too good to be true? Hear from real students.
            </div>
            <div class="flex flex-row flex-wrap justify-center gap-9 pt-[4rem] pb-[8rem]">
                <div class="h-[40rem] w-[24rem] bg-c4 rounded-[10px] drop-shadow">
                    <div :class="`w-full h-[60%] rounded-t-[10px] bg-image bg-[url('/src/assets/testimonials/jep.png')]`">

                    </div>
                    <div class="w-full h-[40%] border-x border-b border-c1 rounded-b-[10px] flex flex-col justify-between p-2">
                        <p class="flex-grow text-start text-[#666262]">
                            "You can’t have a say at the table if you don’t have a seat at the table. So these programs and these opportunities for people who look like me, act like me and think like me, are an opportunity to have a seat at the table so we can have a better future for the people behind us."
                        </p>
                        <div class="w-full text-start">
                            <p class="text-c1 font-bold">Jephone Piolo Padilla</p>
                            <p>CICT 3rd year student</p>
                        </div>
                    </div>
                </div>
                <div class="h-[40rem] w-[24rem] bg-c4 rounded-[10px] drop-shadow">
                    <div :class="`w-full h-[60%] rounded-t-[10px] bg-image bg-[url('/src/assets/testimonials/che.png')]`">
                    </div>
                    <div class="w-full h-[40%] border-x border-b border-c1 rounded-b-[10px] flex flex-col justify-between p-2">
                        <p class="flex-grow text-start text-[#666262]">
                            "All I can say is, I love the guy on the right."
                        </p>
                        <div class="w-full text-start">
                            <p class="text-c1 font-bold">Cherilyn Marie D. Torre</p>
                            <p>CICT Computer Science Head</p>
                        </div>
                    </div>
                </div>
                <div class="h-[40rem] w-[24rem] bg-c4 rounded-[10px] drop-shadow">
                    <div :class="`w-full h-[60%] rounded-t-[10px] bg-image bg-[url('/src/assets/testimonials/mark.png')]`">
                    </div>
                    <div class="w-full h-[40%] border-x border-b border-c1 rounded-b-[10px] flex flex-col justify-between p-2">
                        <p class="flex-grow text-start text-[#666262]">
                            "I hate them both."
                        </p>
                        <div class="w-full text-start">
                            <p class="text-c1 font-bold">Cutesy V. Demure</p>
                            <p>CICT Dean</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<style scoped>
.bg-image {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>

<script setup>
import { inject, onBeforeMount, ref } from 'vue';
import LightArrowRight from '../components/icons/LightArrowRight.vue';
import { useDebounceFn } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { toast } from '../functions/toast';
const { isAuthenticated, runAllNecessaryFunctions } = inject('userData')

const router = useRouter()
const handlePush = useDebounceFn((name) => {
    if(isAuthenticated.value) {
        router.push({ name: name })
    } else {
        router.push({ name: 'Login' })
        toast('Please sign in to get started!', "center", "3000", "#184c95", "#1c58ab")
    }
}, 150)

onBeforeMount(() => {
    runAllNecessaryFunctions()
})
</script>
