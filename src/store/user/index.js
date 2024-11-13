import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const userInfo = defineStore('userInfo', () => {
    const userId = ref('')
    const userData = ref(localStorage.getItem('sessionUser'))
    const photoURL = ref(userData.value ? userData.value : 'src/assets/images/IcRoundAccountBox.png')

    const getUserPhotoURL = computed(() => userData.value)

    const clearUserId = () => {
        userId.value = ''
    }

    return { userId, clearUserId, photoURL, getUserPhotoURL }
})