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
                            @click="showPostNewProject"
                            class="drop-shadow flex justify-between items-center w-[15.25rem] sm:w-[19rem] xl:w-[23rem] py-[.9rem]
                            sm:py-[1.15rem] px-7 sm:px-9 border border-black rounded-[2.25rem] active:translate-y-[0.25rem] active:shadow-none duration-200 mt-5 xl:mt-7">
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
                <div class="flex-grow w-full h-[2.75rem] sm:h-[3.2rem] border-2 border-black bg-c1 flex 
                    focus-within:border-c6 focus-within:bg-c6 duration-200 hover:bg-c6 hover:border-c6">
                    <input type="text" class="focus:outline-none w-full h-full px-2 sm:px-4 md:px-8 placeholder:italic sm:text-[1.125rem]" 
                    placeholder="Search..." v-model="searchPattern" @input="handleFilterPosts">
                    <div class="w-max h-full bg-transparent flex items-center justify-center">
                        <MagnifyingGlass class="text-white w-[2rem] h-[2rem] sm:w-[2.8rem] sm:h-[2.8rem] mx-2" />
                    </div>
                </div>
                <div @click="showSortFilter" 
                    :class="`h-[2.75rem] sm:h-[3.2rem] w-max bg-white flex items-center gap-2 md:gap-6 border-2 border-c1 
                    text-c1 px-4 cursor-pointer ${ 'pointer-events-none' && openFilterSort } hover:text-c6 hover:border-c6
                    duration-200`">
                    <FilterSort class="w-5 h-5 sm:w-7 sm:h-7" />
                    <span class="text-[0.9rem] sm:text-[1rem] font-bold text-nowrap hover:scale-125 duration-200">
                        Filter & Sort
                    </span>
                    <div class="relative z-[1]">
                        <ArrowDownNoBg class="w-5 sm:w-7 h-5 sm:h-7 bg-white" />
                        <transition name="fade" mode="out-in">
                            <div v-if="openFilterSort" 
                                class="absolute flex flex-col -left-[8.635rem] top-[2.3rem] sm:-left-[15.1rem] sm:top-[2.8rem] 
                                w-[18rem] h-[22.5rem] bg-white border-2 border-c1 overflow-y-auto p-1 gap-1 no-scrollbar"
                                ref="targetSort">
                                <div v-for="tag, index in categoryTags" :key="index" 
                                    :class="`flex items-center gap-2 hover:bg-c1 py-2 rounded-sm hover:text-white delay-75
                                    ${ tag.selected && 'bg-c1 text-white' } cursor-pointer`"
                                    @click="tag.selected = !tag.selected">
                                    <input v-model="tag.selected" type="checkbox" class="border my-3 ml-3 w-4 h-4">
                                    {{ tag.value }}
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex justify-center py-11 sm:py-20">
            <div v-if="shapedPostShallow == false && shapedPostsCopy == false" class="flex flex-col gap-6 text-c1 items-center">
                <span class="text-xs">Fetching posts for you...</span>
                <BarsSpin class="w-9 h-9" />
            </div>
            <div v-else-if="shapedPostShallow == false && shapedPostsCopy != false" class="flex flex-col gap-6 text-c1 items-center">
                <span class="text-xs">No match for this request</span>
            </div>
            <div v-else class="grid xl:grid-cols-2 gap-7 sm:gap-16">
                <transition-group name="fadeComponent" mode="out-in">
                    <PostComponent v-for="post, index in shapedPostShallow" :key="index"
                    @previewPost="handleShowPreviewPost" :post="post" />
                </transition-group>
            </div>
        </div>
        <transition name="fadeComponent" mode="out-in">
            <PostAProjectModal v-if="postNewProject"
            @close="hidePostNewProject" />
        </transition>
        <transition name="fadeComponent" mode="out-in">
            <PreviewPostModal v-if="previewPost" 
            @close="handleHidePreviewPost"
            :post="previewPostLoad"/>
        </transition>
    </div>
</template>

<script setup>
import EditPen from '../components/icons/EditPen.vue';
import BarsSpin from '../components/icons/BarsSpin.vue';
import MagnifyingGlass from '../components/icons/MagnifyingGlass.vue';
import FilterSort from '../components/icons/FilterSort.vue';
import ArrowDownNoBg from '../components/icons/ArrowDownNoBg.vue'
import PostComponent from '../components/modals/PostComponent.vue'
import PostAProjectModal from '../components/modals/PostAProjectModal.vue';
import PreviewPostModal from '../components/modals/PreviewPostModal.vue';
import { computed, inject, ref, watch } from 'vue';
import { onClickOutside, useDebounceFn } from '@vueuse/core';

const { categoryTags, filterData, filterByCategoryTags, shapedPostShallow, shapedPostsCopy } = inject('userData')

const postNewProject = ref(false)
const previewPost = ref(false)
const previewPostLoad = ref(null)
const openFilterSort = ref(false) 

const targetSort = ref(null)
onClickOutside(targetSort, event => closeFilterSort())

const showSortFilter = () => {
    openFilterSort.value = true;
}

const closeFilterSort = useDebounceFn(() => {
    openFilterSort.value = false;
}, 150)

const showPostNewProject = useDebounceFn(() => {
    postNewProject.value = true;
}, 150)

const hidePostNewProject = useDebounceFn(() => {
    postNewProject.value = false;
}, 150)
const showPreviewPost = useDebounceFn(() => {
    previewPost.value = true;
}, 150)
const hidePreviewPost = useDebounceFn(() => {
    previewPost.value = false;
}, 150)

const handleHidePreviewPost = () => {
    hidePreviewPost();
}

const handleShowPreviewPost = (load) => {
    previewPostLoad.value = {...load};
    showPreviewPost();
}

const searchPattern = ref('')

const handleFilterPosts = useDebounceFn(() => {
    filterData(searchPattern.value);
}, 300)

const tags = computed(() => {
    return categoryTags.value
        .filter(tag => tag.selected) // Only keeps selected tags
        .map(tag => tag.value); // Maps to `tag.value`
});

const handleFilterByCategoryTags = useDebounceFn(() => {
    filterByCategoryTags(tags.value)
}, 300)

watch(tags, () => {
    handleFilterByCategoryTags()
})
</script>

<style scoped>
.fade-enter-active {
    transition: opacity 100ms;
}
.fade-enter-from {
    opacity: 0;
}
.fadeComponent-enter-active {
    transition: opacity 300ms;
}
.fadeComponent-enter-from {
    opacity: 0;
}
.fadeComponent-leave-to {
    opacity: 0;
    transition: opacity 150ms;
}
.fadeComponent-leave-from {
    opacity: 1;
}
.bg-image {
    background-image: url('/src/assets/images/ProjectsBg.svg');
    background-repeat: no-repeat;
    background-position-y: bottom;
    background-position-x: 45rem;
    background-size: calc(50rem / var(--scale-factor));
    user-select: none;
}

@media (max-width: 80rem) {
    .bg-image {
        background-position-x: 32rem;
    }
}
@media (max-width: 65rem) {
    .bg-image {
        background-position-x: 18rem;
    }
}
@media (max-width: 48rem) {
    .bg-image {
        background-position-x: 2rem;
    }
}
@media (max-width: 37.5rem) {
    .bg-image {
        background-position-x: 1rem;
    }
}
</style>