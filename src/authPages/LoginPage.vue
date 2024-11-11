<template>
    <div class="w-screen h-screen bg-sky-950 flex items-center justify-center">
          <form
              @submit.prevent="login" 
              class="p-4 bg-c1 text-c4 rounded w-80">
              <div class="pl-2 text-xl">User Login</div>
              <div class="grid p-2 gap-1">
                  <span class="text-xs">User Email:</span>
                  <input v-model="newUserEmail" required type="email" class="focus:outline-none text-lg p-2 rounded bg-c3">
              </div>
              <div class="grid p-2 gap-1">
                  <span class="text-xs">User Password:</span>
                  <input v-model="newUserPassword" required type="password" class="focus:outline-none text-lg p-2 rounded bg-c3">
              </div>
              <div class="w-full flex justify-center pt-2">
                  <button class="px-4 py-2 border">Login</button>
              </div>
          </form>
          <button 
              @click="loginGoogle"
              class="bg-yellow-400 p-4">
              Google Go
          </button>
          <button 
              @click="loginGithub"
              class="bg-zinc-900 text-white p-4">
              Github Go
          </button>
    </div>
</template>

<script setup>
import { signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";
import { auth, google, github } from '../firebase'
import { useRouter } from 'vue-router';
import { ref } from "vue";
  
const newUserEmail = ref('test@user.com')
const newUserPassword = ref('testing123')

const router = useRouter()
const redirectToDashboard = () => {
    router.push({ name: "Dashboard" })
}
  
const login = () => {
    signInWithEmailAndPassword(auth, newUserEmail.value, newUserPassword.value)
    .then((userCredential) => {
        // Signed in 
        redirectToDashboard()
        // ...
    })
    .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
    });
}


const loginGoogle = () => {

    signInWithPopup(auth, google)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // alert(result.user.uid)
        redirectToDashboard();
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   // The email of the user's account used.
        //   const email = error.customData.email;
        // The AuthCredential type that was used.
        //   const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}
  
const loginGithub = () => {
  
    signInWithPopup(auth, github)
    .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        redirectToDashboard();
        // The signed-in user info.
        // const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GithubAuthProvider.credentialFromError(error);
        // ...
    });
}
</script>