<template>
    <NavigationBar />
    <router-view class="max-w-[100rem] mx-auto" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue';
</script>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
