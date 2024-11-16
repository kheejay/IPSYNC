<template>
    <NavigationBar v-if="(!isAuthPage  && !authenticatingUser)" />
    <router-view class="max-w-[100rem] mx-auto" v-slot="{ Component }">
        <transition :name="`${ !isAuthPage && 'fade' }`" mode="out-in">
            <component :is="Component" :class="`${ !isAuthPage && 'bg-c4' }`" />
        </transition>
    </router-view>
    <Footer v-if="!isAuthPage && !authenticatingUser" />
</template>

<script setup>
import { computed, onBeforeMount, onUnmounted, provide, reactive, ref, watch } from 'vue';
import NavigationBar from './components/NavigationBar.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';

const route = useRoute()

const isAuthPage = computed(() => route.meta.isAuthPage)

// USER
const genericProfile = ref('https://i.ibb.co/LJPrkjQ/np.png')
const userGmailName = ref('User Fullname')
const currentUserId =  ref(localStorage.getItem('userId'))
const authenticatingUser = ref(false)
const users = ref([])
const userData = reactive({
    full_name: {value: userGmailName.value, hasError: false, errorMessage: ''},
    department: {value: '', hasError: false, errorMessage: ''},
    degree_program: {value: '', hasError: false, errorMessage: ''},
    year_level: {value: '', hasError: false, errorMessage: ''},
    student_id: {value: '', hasError: false, errorMessage: ''},
    personal_description: {value: '', hasError: false, errorMessage: ''},
    experience: {value: [{jobTitle: '', org: '', time_span: ''}], hasError: false, errorMessage: ''},
    skills: {value: [''], hasError: false, errorMessage: ''},
    education: {value: {school_name: '', time_span: ''}, hasError: false, errorMessage: ''},
    interest: {value: [''], hasError: false, errorMessage: ''},
    facebook: '',
    gmail: '',
    mobileNumber: '',
    uid: currentUserId.value,
    photoURL: { value: genericProfile.value, scale: 100}
})

const unsubscribeUser = ref(null)

const setUserData = () => {
    console.log('setUserData', currentUserId.value)
    const foundUser = users.value.find((user) => user.uid === currentUserId.value);
    if (foundUser) {
        for (const key in userData) {
            if (userData.hasOwnProperty(key) && foundUser.hasOwnProperty(key)) {
                // Check if the current property in userData is an object with a 'value' key
                if (typeof userData[key] === 'object' && userData[key].hasOwnProperty('value') && key !== 'photoURL') {
                    userData[key].value = foundUser[key];
                } else {
                    // Directly assign to userData if it's a primitive type property
                    userData[key] = foundUser[key];
                }
            }
        }
    }
}

const fetchUsers = () =>  {
    const q = query(collection(db, "users"));

    unsubscribeUser.value = onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
      const changes = snapshot.docChanges();
      console.log('user snapshot', snapshot);

      if (!changes.length) {
        //
      } else {
        changes.forEach((change) => {
            if(change.type === 'added') {
              users.value.push({...change.doc.data()});
            } 
            if(change.type == 'modified') {
              users.value = users.value.map(user => 
                user.uid === currentUserId.value ? {...change.doc.data()} : user
              );
            }
        });
      }
      setUserData();
    });
}

provide('userData', {
    userData,
    genericProfile,
    userGmailName,
    currentUserId,
    authenticatingUser,
    setUserData,
})

onBeforeMount(() => {
    fetchUsers();
})

watch(currentUserId, () => setUserData())

onUnmounted(() => {
    if(unsubscribeUser.value) {
        unsubscribeUser.value()
    }
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
