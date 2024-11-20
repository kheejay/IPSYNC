<template>
    <div class="w-full h-fit max-h-[calc(100vh-4rem)] flex">

        <div class="h-[calc(100vh-4rem)] w-[34rem] pl-4 py-4 pr-2 hidden lg:flex">
            <div class="w-full h-full flex flex-col gap-2 p-2 overflow-y-auto outline">
                <div v-for="x in 20" :key="x" class="w-full min-h-[5.2rem] outline">

                </div>
            </div>
        </div>

        <div class="flex-grow h-[calc(100vh-4rem)] w-full lg:h-auto lg:w-auto flex pl-2 py-4 pr-4">
            <div class="outline flex-grow">

            </div>
        </div>
        
    </div>
</template>