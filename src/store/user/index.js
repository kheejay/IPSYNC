import { defineStore } from "pinia";

export const userInfo = defineStore('userInfo', () => {
    const userId = ref('')

    const clearUserId = () => {
        userId.value = ''
    }

    return { userId, clearUserId }
})