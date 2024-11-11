<template>
    <div class="w-screen h-screen bg-sky-950 flex items-center justify-center">
          <form
              @submit.prevent="createUserAccount" 
              class="p-4 bg-c1 text-c4 rounded w-80">
              <div class="pl-2 text-xl">User Create Account</div>
              <div class="grid p-2 gap-1">
                  <span class="text-xs">User Email:</span>
                  <input v-model="newUserEmail" required type="email" class="focus:outline-none text-lg p-2 rounded bg-c3">
              </div>
              <div class="grid p-2 gap-1">
                  <span class="text-xs">User Password:</span>
                  <input v-model="newUserPassword" required type="password" class="focus:outline-none text-lg p-2 rounded bg-c3">
              </div>
              <div class="grid p-2 gap-1">
                  <span class="text-xs">Re-enter Password:</span>
                  <input v-model="passwordConfirmation" :required="0" type="password" class="focus:outline-none text-lg p-2 rounded bg-c3">
              </div>
              <div class="w-full flex justify-center pt-2">
                  <button class="px-4 py-2 border">Create Account</button>
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
  import { ref } from "vue";
  import { auth, google, github } from '../firebase'
  import { createUserWithEmailAndPassword } from "firebase/auth";

  import { userState } from "../store/authState";
  const user = userState()
  
  const newUserEmail = ref('test@user.com')
  const newUserPassword = ref('testing123')
  const passwordConfirmation = ref('')
  
  const createUserAccount = () => {
      if(newUserPassword.value === passwordConfirmation.value) {
          createUserWithEmailAndPassword(auth, newUserEmail.value, newUserPassword.value)
          .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
  
              alert(user)
              // ...
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
          });
      } else {
          alert('password not matched')
      }
  }
  
  // import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";
  import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useRouter } from "vue-router";
  const router = useRouter()
  const loginGoogle = () => {

  signInWithPopup(auth, google)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
    //   const user = result.user;
      // alert(result.user.uid)
      console.log(result.user.displayName)
      user.setDisplayName(result.user.displayName)
      router.push({ name: 'Dashboard' })
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
        alert('error')
      // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
      // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(error.message)
      // ...
    });
  }
  
  const loginGithub = () => {
  
      signInWithPopup(auth, github)
      .then((result) => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
  
          // The signed-in user info.
        //   const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          console.log(result.user.displayName)
          user.setDisplayName(credential.displayName)
          router.push({ name: 'Dashboard' })
          // ...
      }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
          // ...
      });
  }
  </script>