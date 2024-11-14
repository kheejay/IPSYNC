<template>
    <NavigationBar v-if="isAuthPage" />
    <router-view class="max-w-[100rem] mx-auto" v-slot="{ Component }">
        <transition :name="`${ isAuthPage && 'fade' }`" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup>
import { computed } from 'vue';
import NavigationBar from './components/NavigationBar.vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const isAuthPage = computed(() => (route.name !== 'Login' && route.name !== 'Signup'))
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
