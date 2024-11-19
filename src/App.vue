<template>
    <NavigationBar v-if="(!isAuthPage  && !authenticatingUser)" />
    <router-view class="max-w-[100rem] mx-auto" v-slot="{ Component }">
        <transition :name="`${ !isAuthPage && 'fade' }`" mode="out-in">
            <component v-if="!authenticatingUser" :is="Component" :class="`${ !isAuthPage && 'bg-c4' }`" />
        </transition>
    </router-view>
    <Footer v-if="!isAuthPage && !authenticatingUser" />
    <LoadingScreen v-if="authenticatingUser" :loadingPrompt="'Page is Loading'" />
</template>

<script setup>
import { computed, onMounted, onUnmounted, provide, reactive, ref } from 'vue';
import NavigationBar from './components/NavigationBar.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from './firebase';
import { authenticatingUser } from './router';

const route = useRoute()

const isAuthPage = computed(() => route.meta.isAuthPage)
const isAuthenticated = ref(false)

// USER
const genericProfile = ref('https://i.ibb.co/LJPrkjQ/np.png')
const userGmailName = ref('User fullname')
const users = ref([])
const userData = reactive({
    full_name: {value: userGmailName.value, hasError: false, errorMessage: ''},
    department: {value: '', hasError: false, errorMessage: ''},
    degree_program: {value: '', hasError: false, errorMessage: ''},
    year_level: {value: '', hasError: false, errorMessage: ''},
    student_id: {value: '', hasError: false, errorMessage: ''},
    personal_description: {value: '', hasError: false, errorMessage: ''},
    experience: {value: [], hasError: false, errorMessage: ''},
    skills: {value: [''], hasError: false, errorMessage: ''},
    education: {value: {school_name: '', time_span: ''}, hasError: false, errorMessage: ''},
    interest: {value: [''], hasError: false, errorMessage: ''},
    facebook: '',
    gmail: '',
    mobileNumber: '',
    uid: localStorage.getItem('userId'),
    photoURL: { value: genericProfile.value, scale: 100}
})

const unsubscribeUser = ref(null)

const setUserData = () => {
    console.log('setUserData', userData.uid)
    const foundUser = users.value.find((user) => user.uid === userData.uid);
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
                user.uid === userData.uid ? {...change.doc.data()} : user
              );
            }
        });
      }
      setUserData();
    });
}

const emptyUserData = () => {
    localStorage.setItem('userId', null)
    userData.full_name = { value: userGmailName.value, hasError: false, errorMessage: '' };
    userData.department = { value: '', hasError: false, errorMessage: '' };
    userData.degree_program = { value: '', hasError: false, errorMessage: '' };
    userData.year_level = { value: '', hasError: false, errorMessage: '' };
    userData.student_id = { value: '', hasError: false, errorMessage: '' };
    userData.personal_description = { value: '', hasError: false, errorMessage: '' };
    userData.experience = { value: [{ jobTitle: '', org: '', time_span: '' }], hasError: false, errorMessage: '' };
    userData.skills = { value: [''], hasError: false, errorMessage: '' };
    userData.education = { value: { school_name: '', time_span: '' }, hasError: false, errorMessage: '' };
    userData.interest = { value: [''], hasError: false, errorMessage: '' };
    userData.facebook = '';
    userData.gmail = '';
    userData.mobileNumber = '';
    userData.uid = null;
    userData.photoURL = { value: genericProfile.value, scale: 100 };
}

provide('userData', {
    userData,
    genericProfile,
    userGmailName,
    authenticatingUser,
    setUserData,
    emptyUserData,
    isAuthenticated
})

onMounted(() => {
    fetchUsers();
})

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
