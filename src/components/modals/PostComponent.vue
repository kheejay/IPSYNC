<template>
    <div class="drop-shadow post-wrapper bg-white relative overflow-hidden">

        <div class="z-[0] light-lg rounded-full bg-c3 absolute"></div>
        <div class="z-[2] dark-sm drop-shadow rounded-full bg-c1 absolute"></div>
        <div class="z-[1] light-sm rounded-full bg-c3 absolute"></div>
        <div class="dark-lg rounded-full bg-c1 absolute"></div>
        <div class="z-[2] lightest drop-shadow rounded-full bg-c5 absolute"></div>

        <div class="z-[1] flex w-full border-b border-c1 relative">
            <div class="pic-wrapper flex items-center justify-center">
                <img src="https://i.ibb.co/LJPrkjQ/np.png" alt="photo" 
                    class="pic border-c1 rounded-full">
            </div>
            <div class="flex-grow flex flex-col justify-center text-c1">
                <div class="font-bold pic-texts">USERNAME</div>
                <div class="pic-texts">ORGANIZATION/DEPARTMENT</div>
            </div>
        </div>

        <div class="texts-wrapper relative">
            <div class="title z-[2] relative font-bold text-c1">PROJECT TITLE</div>
            <div class=" looking-for z-[2] relative font-bold text-c6">LOOKING FOR: <span class="font-normal">ROLE HERE</span></div>
            <div class="deadline z-[2] relative font-bold text-c6">APPLICATION DEADLINE:<span class="font-normal">LAST DAY OF APP </span></div>
            <div class="shadow-subtle flex w-full flex-wrap">
                <div v-for="x in 3" :key="x"
                    class="shadow-lg sm:shadow-none sm:drop-shadow tags bg-c5 relative z-[2] text-center">TAGS</div>
            </div>
            <div class="w-full flex justify-end details-wrapper">
                <div @click="$emit('previewPost')"
                    class="flex justify-center items-center text-nowrap details text-c1 opacity-70 border-b">
                    VIEW MORE DETAILS 
                    <ArrowDownNoBg class="arrow" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import ArrowDownNoBg from '../icons/ArrowDownNoBg.vue';
const emit = defineEmits(['previewPost'])
</script>

<style scoped>

.shadow-subtle {
    box-shadow: -0.2rem 0.2rem 0.3rem 0rem rgba(0, 0, 0, 0.04);
    gap: calc(1rem / var(--scale-factor));
    padding-top: calc(1.5rem / var(--scale-factor));
    padding-bottom: calc(1.5rem / var(--scale-factor));
}

.post-wrapper {
    width: calc(36rem / var(--scale-factor));
    height: calc(24rem / var(--scale-factor));
    padding: calc(1rem / var(--scale-factor));
    border-radius: calc(1rem / var(--scale-factor));
    margin-left: calc(0.5rem / var(--scale-factor));
    margin-right: calc(0.5rem / var(--scale-factor));
}
.light-lg {
    width: calc(17rem / var(--scale-factor));
    height: calc(17rem / var(--scale-factor));
    top: calc(-3.3rem / var(--scale-factor));
    right: calc(-3.3rem / var(--scale-factor));
}

.light-sm {
    width: calc(11.5rem / var(--scale-factor));
    height: calc(11.5rem / var(--scale-factor));
    bottom: calc(-1rem / var(--scale-factor));
    left: calc(-3.7rem / var(--scale-factor));
}

.dark-lg {
    width: calc(15rem / var(--scale-factor));
    height: calc(15rem / var(--scale-factor));
    left: calc(0.5rem / var(--scale-factor));
    bottom: calc(-7rem / var(--scale-factor));
}

.dark-sm {
    width: calc(10.75rem / var(--scale-factor));
    height: calc(10.75rem / var(--scale-factor));
    right: calc(-4.5rem / var(--scale-factor));
    top: calc(-1.8rem / var(--scale-factor));
}

.lightest {
    width: calc(9.5rem / var(--scale-factor));
    height: calc(9.5rem / var(--scale-factor));
    left: calc(-1rem / var(--scale-factor));
    bottom: calc(-4.5rem / var(--scale-factor));
}

.pic-wrapper {
    width: calc(4rem / var(--scale-factor));
    height: calc(4rem / var(--scale-factor));
}

.pic {
    width: calc(2.75rem / var(--scale-factor));
    height: calc(2.75rem / var(--scale-factor));
    border-width: calc(0.125rem / var(--scale-factor));
}

.pic-texts {
    font-size: calc(1rem / var(--scale-factor));
    line-height: calc(1.75rem / var(--scale-factor));
    padding-left: calc(0.5rem / var(--scale-factor));
    padding-right: calc(0.5rem / var(--scale-factor));
}

.texts-wrapper {
    padding-left: calc(0.25rem / var(--scale-factor));
    padding-right: calc(0.25rem / var(--scale-factor));
    padding-top: calc(1.5rem / var(--scale-factor));
}

.title {
    font-size: calc(2.25rem / var(--scale-factor));
}

.looking-for {
    font-size: calc(1.35rem / var(--scale-factor));
    margin-top: calc(0.2rem / var(--scale-factor));
    margin-bottom: calc(0.2rem / var(--scale-factor));
}

.deadline {
    font-size: calc(1.125rem / var(--scale-factor));
}

.tags {
    font-size: calc(0.9rem / var(--scale-factor));
    padding-left: calc(2.25rem / var(--scale-factor));
    padding-right: calc(2.25rem / var(--scale-factor));
    padding-top: calc(0.1rem / var(--scale-factor));
    border-radius: calc(1.875rem / var(--scale-factor));
}

.details-wrapper {
    padding-top: calc(1.75rem / var(--scale-factor));
}

.details {
    padding-left: calc(0.5rem / var(--scale-factor));
    padding-right: calc(0.5rem / var(--scale-factor));
    font-size: calc(0.9rem / var(--scale-factor));
}

.arrow {
    width: calc(1.25rem / var(--scale-factor));
    height: calc(1.25rem / var(--scale-factor));
}
</style>