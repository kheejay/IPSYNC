<template>
    <div class="wrapper bg-gray-100 relative overflow-hidden flex items-end drop-shadow">
        <div class="circle rounded-full absolute bg-c1 "></div>
        <div class="square absolute -top-0 bg-[#4A658D] "></div>
        <div class="w-full h-[62.5%] body z-[1] bg-white">
            <p class="project text-c1 xs:tracking-[1%] font-bold xs:pl-1">{{ props.post.projectTitle }}</p>
            <p class="text-c6 role xs:leading-[1rem] xs:tracking-[1%] font-bold pl-[0.05rem] xs:pl-[0.25rem]">{{ props.post.rolePosition }}</p>
            <div class="flex flex-col items-end justify-center w-full pr-[calc(0.25rem / var(--scale-project))]">
                <div class="relative">
                    <span v-show="showChat" class="absolute -top-5 left-[-0.2rem] text-[0.75rem] text-nowrap">Chat!</span>
                    <MailIcon @mouseover="openShowChat" @mouseleave="hideShowChat"
                        class="mail cursor-pointer font-bold text-c1 active:scale-95 duration-200" />
                </div>
                <p class="text text-c6 mt-2"><span class="font-bold">PROJECT TIMELINE:</span> {{ props.post.projTimeline}}</p>
                <p class="text text-c6 my-[0.125rem]"><span class="font-bold">APPLICATION DEADLINE:</span> {{ props.post.deadline}}</p>
            </div>
        </div>
    </div>    
</template>

<script setup>
import { ref } from 'vue';
import MailIcon from '../components/icons/MailIcon.vue'
import { useDebounceFn } from '@vueuse/core';
const props = defineProps(['post'])
const showChat = ref(false)

const hideShowChat = useDebounceFn(() => {
    showChat.value = false;
}, 150)

const openShowChat = useDebounceFn(() => {
    showChat.value = true;
}, 150)
</script>

<style scoped>
.wrapper {
    width: calc(20.32rem / var(--scale-project));
    height: calc(13.87rem / var(--scale-project));
    border-radius: calc(0.48rem / var(--scale-project));
}
.circle {
    width: calc(17rem / var(--scale-project));
    height: calc(17rem / var(--scale-project));
    top: calc(-6rem / var(--scale-project));
    left: calc(-5rem / var(--scale-project));
}
.square {
    width: calc(10rem / var(--scale-project));
    height: calc(7rem / var(--scale-project));
    border-radius: calc(0.25rem / var(--scale-project));
    right: calc(-4.6rem / var(--scale-project))
}
.body {
    border-top-left-radius: calc(0.45rem / var(--scale-project));
    border-top-right-radius: calc(0.45rem / var(--scale-project));
    padding: calc(0.625rem / var(--scale-project));
}
.project {
    font-size: calc(1.35rem / var(--scale-project));
}
.role {
    font-size: calc(0.80rem / var(--scale-project));
}
.mail {
    width: calc(1.5rem / var(--scale-project));
    height: calc(1.5rem / var(--scale-project));
}
.text {
    font-size: calc(0.7rem / var(--scale-project));
}
</style>