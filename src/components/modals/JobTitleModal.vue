<template>
    <div class="w-full flex items-center py-4 gap-4">
        <div class="p-4 sm:px-6 sm:py-4 border border-black rounded-xl">
            <EducationIcon v-if="props.experience.icon == 1" class="w-[3rem] h-[3rem] sm:w-[6rem] sm:h-[6rem]" />
            <AwardIcon v-else-if="props.experience.icon == 2" class="w-[3rem] h-[3rem] sm:w-[6rem] sm:h-[6rem]" />
            <ProjectIcon v-else-if="props.experience.icon == 3" class="w-[3rem] h-[3rem] sm:w-[6rem] sm:h-[6rem]" />
            <JobTitleIcon v-else class="w-[3rem] h-[3rem] sm:w-[6rem] sm:h-[6rem] sm:p-1.5" />
        </div>
        <div class="flex justify-center pl-2 flex-col bg-zinc-50 py-3 rounded relative">
            <input disabled type="text" class="bg-transparent w-full sm:text-[1.125rem] text-c1 font-bold uppercase sm:p-1.5" 
                :value="props.experience.job_title != false ? props.experience.job_title : 'Job Title Not Set'">
            <input disabled type="text" class="bg-transparent w-full text-[0.75rem] sm:text-[0.90rem] text-c1 uppercase sm:p-1.5" 
            :value="props.experience.org != false ? props.experience.org : 'Organization Not Set'">
            <input disabled type="text" class="bg-transparent w-full text-[0.75rem] sm:text-[0.90rem] text-c1 uppercase sm:p-1.5" 
            :value="props.experience.time_span != false ? props.experience.time_span : 'Job Duration Not Set'">
            <Remove v-if="props.isEditMode" 
                @click="$emit('remove', index)"
                class="absolute top-1 right-1 w-7 h-7 hover:scale-105 cursor-pointer active:scale-95 text-font" />
        </div>
    </div>
</template>

<script setup>
import JobTitleIcon from '../icons/JobTitleIcon.vue'
import EducationIcon from '../icons/EducationIcon.vue'
import AwardIcon from '../icons/AwardIcon.vue'
import ProjectIcon from '../icons/ProjectIcon.vue'
import Remove from '../icons/Remove.vue'
const props = defineProps(['experience', 'index', 'isEditMode'])
const emit = defineEmits(['remove'])
</script>