<template>
    <div class="drop-shadow post-wrapper rounded-[1rem] border bg-white mx-2 p-4 relative overflow-hidden">

        <div class="z-[0] w-[17rem] h-[17rem] rounded-full bg-c3 -top-[3.3rem] -right-[3.3rem] absolute"></div>
        <div class="z-[2] drop-shadow w-[10.75rem] h-[10.75rem] rounded-full bg-c1 absolute -right-[4.5rem] -top-[1.80rem]"></div>
        <div class="z-[1] w-[11.5rem] h-[11.5rem] rounded-full bg-c3 absolute -bottom-[1rem] -left-[3.7rem]"></div>
        <div class="drop-shadow w-[15rem] h-[15rem] rounded-full bg-c1 absolute left-[0.5rem] -bottom-[7rem]"></div>
        <div class="z-[2] drop-shadow w-[9.5rem] h-[9.5rem] rounded-full bg-c5 absolute -left-[1rem] -bottom-[4.5rem]"></div>

        <div class=" z-[1] flex w-full border-b border-c1 relative">
            <div class="w-[4rem] h-[4rem] flex items-center justify-center">
                <img src="https://i.ibb.co/LJPrkjQ/np.png" alt="photo" 
                    class="w-11 h-11 border-2 border-c1 rounded-full">
            </div>
            <div class="flex-grow flex flex-col justify-center text-c1">
                <div class="font-bold px-2">USERNAME</div>
                <div class="px-2">ORGANIZATION/DEPARTMENT</div>
            </div>
        </div>

        <div class="px-1 pt-6 relative">
            <div class="z-[2] relative text-[2.25rem] font-bold text-c1">PROJECT TITLE</div>
            <div class="z-[2] relative text-[1.35rem] font-bold text-c6 my-[0.2rem]">LOOKING FOR: <span class="font-normal">ROLE HERE</span></div>
            <div class="z-[2] relative text-[1.125rem] font-bold text-c6">APPLICATION DEADLINE:<span class="font-normal">LAST DAY OF APP </span></div>
            <div class="flex w-full gap-4 py-6 flex-wrap border-b shadow-subtle">
                <div v-for="x in 3" :key="x"
                    class="drop-shadow text-[0.9rem] px-9 py-[0.1rem] bg-c5 relative z-[2] text-center rounded-[1.875rem]">TAGS</div>
            </div>
            <div class="w-full flex justify-end pt-7">
                <div class="flex justify-center items-center text-nowrap px-2 text-[0.9rem] text-c1 opacity-70 border-b">
                    VIEW MORE DETAILS 
                    <ArrowDownNoBg class="w-5 h-5" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import ArrowDownNoBg from './icons/ArrowDownNoBg.vue';
</script>

<style scoped>
.shadow-subtle {
    box-shadow: -0.2rem 0.2rem 0.25rem 0rem rgba(0, 0, 0, 0.04);
}

.post-wrapper {
    width: 36rem;
    height: 24rem;
}


</style>