<template>
    <div class="p-4 text-xl border">{{ 'Reflected value from store: ' + a }}</div>
    <div @click="$router.push({ name: 'Dashboard' })" class="p-4">Dashboard</div>
    <p class="p-4 bg-sky-400">{{ user.displayName }}</p>
</template>

<script setup>
import { ref } from 'vue';
import { useCounterMyVersion } from '../store/tests/counter';
import { userState } from '../store/authState'

const user = userState();

const counter = useCounterMyVersion();

const a = ref(counter.count)

</script>