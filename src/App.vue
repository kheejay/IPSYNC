<template>
    <NavigationBar v-if="!isAuthPage" />
    <router-view class="max-w-[100rem] mx-auto" v-slot="{ Component }">
        <transition :name="`${ !isAuthPage && 'fade' }`" mode="out-in">
            <component :is="Component" :class="`${ !isAuthPage && 'bg-c4' }`" />
        </transition>
    </router-view>
    <Footer v-if="!isAuthPage" />
</template>

<script setup>
import { computed, provide, ref } from 'vue';
import NavigationBar from './components/NavigationBar.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const isAuthPage = computed(() => route.meta.isAuthPage)

// USER
const userData = ref({})
const genericProfile = ref('https://i.imgur.com/L0RWDOY.png')
const userGmailName = ref('USER FULLNAME')

provide('userData', {
    userData,
    genericProfile,
    userGmailName
})

</script>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
