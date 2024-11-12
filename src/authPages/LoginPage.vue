<template>
    <div class="w-screen h-screen flex items-center justify-center">
        <div class="shadow-[0rem_0.25rem_0.25rem_black] border border-black rounded-[1.25rem] bg-c5 px-8 pb-12 p-9
            flex flex-col items-center justify-center">
            <span class="text-[1.5rem] w-full text-center">WELCOME BACK TAGA-WEST!</span>
            <IPSYNCLogo class="h-16" />
            <div class="rounded-[0.4375rem] border border-black py-2 px-12 bg-white text-[1rem] mt-9">
                Continue with <span class="text-c1 underline cursor-pointer">Google</span> or 
                <span class="text-c1 underline cursor-pointer">Github</span>
            </div>
            <div class="py-2 flex"><GoogleIcon class="w-9 h-9" /> <GithubIcon class="h-9 w-9" /></div>
            <div class="flex items-center">
                <span class="border-b border-black w-[7rem] sm:w-[12rem]"></span>
                <div class="text-c1 px-12 text-[1rem]">Log in to your IPsync account</div>
                <span class="border-b border-black w-[7rem] sm:w-[12rem]"></span>
            </div>
            <div>
                <div class="w-full flex flex-col items-end justify-center pt-6 text-[1rem]">
                    <span class="w-full text-start">Email <span class="text-red-500">*</span></span>
                    <input type="text" class="w-[32rem] sm:w-[36rem] py-2 rounded-[0.4375rem] border border-black 
                        focus:outline-none px-2">
                    <span class="w-full text-start mt-4">Password <span class="text-red-500">*</span></span>
                    <input type="password" class="w-[32rem] sm:w-[36rem] py-2 rounded-[0.4375rem] border border-black 
                        focus:outline-none px-2">
                    <button @click="nextStep" class="rounded-[0.7rem] bg-c1 text-white py-2 px-8 mt-7">
                        Continue
                    </button>
                </div>
            </div>
            <div class="w-full text-center mt-8 flex flex-col gap-8">
                <span class="border-b border-b-black w-full"></span>
                <span>Don’t have an IPsync account? 
                    <span class="text-c1 hover:underline cursor-pointer">Sign up</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";
import { auth, google, github } from '../firebase'
import { useRouter } from 'vue-router';
import { ref } from "vue";

import IPSYNCLogo from "../components/IPSYNCLogo.vue";
import GoogleIcon from "../components/icons/GoogleIcon.vue";
import GithubIcon from "../components/icons/GithubIcon.vue";
  
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