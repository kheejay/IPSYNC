<template>
    <div class="w-full min-h-[120rem] pb-[9rem] bg-white relative">
        <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
            class="absolute top-[1.35rem] -right-[2.25rem] w-[52rem] -rotate-90 h-auto">
        <img src="/src/assets/images/ProjectsBg.svg" alt="projectBg" 
            class="absolute bottom-[1rem] -left-[2.23rem] rotate-90 w-[55rem] h-auto">

        <div class="w-full px-[5.5rem] pt-[6rem]">  

            <p class="text-[4.2rem] font-bold tracking-[10%] text-c1 relative">Project Title</p>

            <div class="w-full relative mt-[1rem] flex flex-col gap-6 pl-12">
                <p class="text-[2.125rem] text-c1 font-bold">ROLE/POSITION: Role Here</p>
                <p class="text-[1.5rem] text-c6 font-bold">CONTACT INFORMATION:  
                    <span class="text-c3 font-normal px-2.5">Email address or phone number for applicants to reach you</span>
                </p>
                <p class="text-[1.5rem] text-c6 font-bold">NUMBER OF OPEN POSITIONS:  
                    <span class="text-c3 font-normal px-2.5">Number of candidates required</span>
                </p>
                <p class="text-[1.5rem] text-c6 font-bold">PROJECT TIMELINE:  
                    <span class="text-c3 font-normal px-2.5">Timeframe for the project or role</span>
                </p>
                <p class="text-[1.5rem] text-c6 font-bold">APPLICATION DEADLINE:  
                    <span class="text-c3 font-normal px-2.5">Deadline for submitting applications</span>
                </p>
                <p class="text-[1.5rem] text-c6 font-bold">COMPENSATION (IF APPLICABLE):  
                    <span class="text-c3 font-normal px-2.5">Enter the amount or range of compensation</span>
                </p>
            </div>

            <div class="w-full relative my-11 flex flex-wrap gap-4">
                <div v-for="x in 5" :key="x" class="px-8 w-max rounded-[1.75rem] text-white bg-c3 py-1.5">
                    Tag
                </div>
            </div>

            <div class="w-full px-8">
                <div class="text-c1 border border-c1 rounded-[0.95rem] mt-[4rem] relative">
                    <div class="uppercase pl-6 py-[0.75rem] font-bold text-[2.125rem] border-b border-b-c1">Project Description</div>
                    <div class="min-h-[20rem] pl-6 py-4 text-[1.25rem]">
                        <span class="text-zinc-400 italic">Brief overview and key information about the project.</span>
                    </div>
                </div>
            </div>

            <div class="w-full pl-[7rem] py-[2rem] mt-4">
                <p class="text-[3.25rem] font-bold tracking-[10%] text-c1 relative">APPLICANTS</p>
            </div>

            <div class="w-full flex justify-center">
                <div class="max-w-[65rem] w-[65rem] relative">

                    <div v-for="x in 5" :key="x" class="w-full h-[6rem] flex items-center justify-between border border-c1">
                        <div class="flex mx-6">
                            <img src="" alt="" class="w-[4.25rem] h-[4.25rem] rounded-full bg-c1">
                            <div class="pl-4">
                                <p class="text-[1.5rem] font-bold tracking-[10%] uppercase">USERNAME</p>
                                <p class="text-[0.90rem] font-light tracking-[10%] uppercase">ORGANIZATION</p>
                            </div>
                        </div>
                        <p class="text-c6 font-light mr-4">DATE APPLIED: 11/12/24</p>
                        <p class="absolute right-4 text-c6 italic bottom-1 text-[0.90rem]">Review Application</p>
                    </div>

                </div>
            </div>
            
            <div class="w-full flex justify-end py-4 mt-[4rem] pr-[2rem]">
                <button class="py-[0.75rem] px-8 text-c1 text-[1.25rem] font-extrabold drop-shadow rounded-[1.125rem] bg-white border border-black active:translate-y-[0.25rem] duration-200 active:shadow-none hover:bg-zinc-50">
                    BACK TO DASHBOARD
                </button>
            </div>

        </div>
    </div>
</template>


<script setup>

</script>