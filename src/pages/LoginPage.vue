<template>
    <div class="flex items-center justify-center w-screen h-screen bg-c1 overflow-auto px-4 sm:px-0">
        <div v-if="!resetPassword" 
            class="shadow-[0rem_0.25rem_0.25rem_black] border border-black bg-white px-2 sm:px-4 py-7 
                w-full sm:w-[80%] md:w-[68%] flex flex-col items-center justify-center max-w-[62rem]">
            <div class="w-full flex justify-start pl-2 pb-2">
                <IPSYNCLogo class="w-14 h-9 md:w-20 md:h-12"/>
            </div>
            <div class="text-c1 font-bold text-[2rem] sm:text-[2.5rem]
                px-2">
                Sign In to IPSync
            </div>
            <div class="text-xs sm:text-[0.8rem]">
                Welcome back! Please sign in to continue.
            </div>
            <div class="flex flex-col items-center w-full sm:w-[20rem] md:w-[24rem] gap-3 md:gap-4 py-4 px-4 sm:px-0 mt-1">
                <div @click="loginGoogle"
                    class="flex items-center justify-center border border-black w-full text-[0.90rem] sm:text-[1rem] 
                        py-3 md:py-4 relative shadow cursor-pointer">
                    <GoogleIcon @click="loginGoogle" class="w-[1.12rem] h-[1.25rem] sm:w-[1.5rem] sm:h-[1.5rem] md:w-[1.75rem] 
                        md:h-[1.75rem] absolute left-3 top-1/2 -translate-y-1/2" /> 
                    signin with Google
                </div>
                <div @click="loginGithub"
                    class="flex items-center justify-center border border-black w-full text-[0.90rem] sm:text-[1rem]   
                        py-3 md:py-4 relative shadow cursor-pointer">
                    <GithubIcon @click="loginGoogle" class="w-[1.12rem] h-[1.25rem] sm:w-[1.5rem] sm:h-[1.5rem] md:w-[1.75rem] 
                        md:h-[1.75rem] absolute left-3 top-1/2 -translate-y-1/2" /> 
                    signin with Github
                </div>
                <div class="flex items-center justify-center w-full sm:my-1">
                    <span class="border-b border-black flex-grow"></span>
                    <div class="px-2 md:px-4 text-xs sm:text-[1rem]">
                        or
                    </div>
                    <span class="border-b border-black flex-grow"></span>
                </div>
                <div class="w-full flex flex-col items-end justify-center gap-3 md:gap-4">
                    <div class="w-full">
                        <input type="text" v-model="user.email.value" @blur="validateInput('email')"
                            @focus="hasError.value = false"
                        class="w-full py-3 border border-black focus:outline-none px-4 text-[0.90rem] sm:text-[1rem]
                            placeholder:font-light shadow"
                            placeholder="Email Address">
                        <span v-if="user.email.hasError" class="text-red-500 text-xs w-full text-start">
                            {{ user.email.errorMessage }}</span>
                    </div>
                    <div class="w-full">
                        <div class="relative w-full">
                            <input :type="showPass ? 'text' : 'password'" 
                                v-model="user.password.value" @blur="validateInput('password')"
                                @input="hasError.value = false"
                                class="w-full py-3 border border-black focus:outline-none px-4 text-[0.90rem] 
                                    sm:text-[1rem] placeholder:font-light shadow"
                                placeholder="Password">
                            <VisibilityOutline v-if="showPass" @click="showPass = false" 
                                class="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 cursor-pointer" />
                            <VisibilityOffOutline v-else @click="showPass = true" 
                            class="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 cursor-pointer" />
                        </div>
                        <span v-if="user.password.hasError" class="text-red-500 text-xs w-full text-start">
                            {{ user.password.errorMessage }}</span>
                        <span v-if="hasError.value" class="text-red-500 text-xs w-full text-start">
                            {{  hasError.message }}
                        </span>
                        <div class="w-full flex justify-start text-xs sm:text-[0.80rem] gap-1 mt-3">
                            Forgot your password? 
                            <span @click="resetPassword = true" 
                                class="font-bold text-c1 cursor-pointer hover:underline">Reset</span>
                        </div>
                    </div>
                    <div class="w-full">
                        <button @click="handleLogin" 
                            class="rounded-[1.87rem] bg-c1 text-white py-[0.4rem] sm:py-[0.5rem] md:py-[0.75rem] my-3 
                            w-full text-[0.90rem] sm:text-[1rem] font-semibold active:scale-[99%]">
                            LOGIN
                        </button>
                        <div class="w-full text-center text-xs sm:text-[0.80rem]">
                            Don’t have an account? 
                            <span @click="$router.push({ name: 'Signup' })" class="font-bold text-c1 cursor-pointer hover:underline">Sign up</span>
                        </div>
                    </div>
                </div>       
            </div>
        </div>
        <div v-if="resetPassword"
            class="flex flex-col gap-4 p-4 sm:p-8 bg-white shadow-[0rem_0.25rem_0.25rem_black] border border-black w-full sm:w-max">
            Enter email address
            <div class="w-full sm:w-[24rem]">
                <input type="text" v-model="user.email.value" @blur="validateInput('email')"
                    class="w-full py-3 border border-black focus:outline-none px-4 text-[0.90rem] sm:text-[1rem]
                        placeholder:font-light shadow"
                        placeholder="Email Address">
                <span v-if="user.email.hasError" class="text-red-500 text-xs w-full text-start">
                    {{ user.email.errorMessage }}</span>
            </div>
            <div class="w-full flex flex-col items-center gap-2">
                <button @click="handleResetPassword" 
                    class="rounded-[1.5rem] bg-c1 text-white py-[0.4rem] sm:py-[0.5rem] md:py-[0.75rem] mt-1 md:mt-3 
                    w-[10rem] text-[0.90rem] sm:text-[1rem] font-semibold active:scale-[99%]">
                    Send
                </button>
                <span @click="resetPassword = false" 
                    class="text-xs sm:text-[0.80rem] w-full text-start">Back to 
                    <span class="text-c1 font-semibold cursor-pointer hover:underline">Login</span>
                </span>
            </div>
        </div>
        <LoadingScreen :loadingPrompt="'Authenticating User'" v-if="isLoading" />
    </div>
</template>

<script setup>
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { auth, google, github, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { inject, reactive, ref } from "vue";

import IPSYNCLogo from "../components/IPSYNCLogo.vue";
import GoogleIcon from "../components/icons/GoogleIcon.vue";
import GithubIcon from "../components/icons/GithubIcon.vue";
import VisibilityOutline from '../components/icons/VisibilityOutline.vue'
import VisibilityOffOutline from '../components/icons/VisibilityOffOutline.vue'
import LoadingScreen from '../components/LoadingScreen.vue'

import { toast } from "../functions/toast";

const showPass = ref(false)
const hasError = reactive({
    value: false, message: 'An error occurred please try again.'
})
const buttonLock = ref(false)
const resetPassword = ref(false)
const isLoading = ref(false)

const { genericProfile, userGmailName, setUserData, currentUserId } = inject('userData')

const user = reactive({
    // first_name: { value: '', hasError: false, errorMessage: '' },
    // last_name: { value: '', hasError: false, errorMessage: '' },
    email: { value: 'test@user.com', hasError: false, errorMessage: '' },
    // email_confirmation: { value: '', hasError: false, errorMessage: '' },
    password: { value: 'testing123', hasError: false, errorMessage: '' },
    // password_confirmation: { value: 'testing123', hasError: false, errorMessage: '' },
    // confirmation_code: { value: '', hasError: false, errorMessage: '' },
})

const handleUserLogin = async (result) => {
    isLoading.value = true;
    try {
        const docRef = doc(db, "users", result.user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            isLoading.value = false;
            localStorage.setItem('userId', result.user.uid)
            currentUserId.value = result.user.uid;
            setUserData();
            redirectTo('Landing');
        } else {
            // docSnap.data() will be undefined in this case
            isLoading.value = false;
            localStorage.setItem('userId', result.user.uid)
            genericProfile.value = result.user.photoURL;
            userGmailName.value = result.user.displayName;
            currentUserId.value = result.user.uid
            console.log(result.user.displayName)
            console.log("No such document!");
            toast('Account is not registered, finish quick setup. Thank you!', "top", "5000")
            redirectTo('Profile');
        }
    } catch (error) {
        isLoading.value = false;
        hasError.value = true;
    }
}

const router = useRouter()
const redirectTo = (route) => {
    router.push({ name: route })
}
  
const login = () => {
    isLoading.value = true;
    signInWithEmailAndPassword(auth, user.email.value, user.password.value)
    .then((result) => {
        // Signed in 
        localStorage.setItem('userId', result.user.uid)
        currentUserId.value = result.user.uid
        isLoading.value = false;
        setUserData();
        redirectTo('Landing')
        // ...
    })
    .catch((error) => {
        isLoading.value = false;
        const errorCode = getErrorMessage(error.code)
        hasError.value = true;
        hasError.message = errorCode;
		buttonLock.value = false;
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log(error.code)
    });
}

const loginGoogle = async () => {

    signInWithPopup(auth, google)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // alert(result.user.displayName)
        handleUserLogin(result)
        // thisUser.setDisplayName(result.user.displayName)
        // redirectToDashboard();
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // alert(error)
        const errorCode = getErrorMessage(error.code)
        hasError.value = true;
        hasError.message = errorCode;
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
        // // const token = credential.accessToken;
        // console.log(result)
        // thisUser.setDisplayName(result.user.email)
        handleUserLogin(result);
        // console.log(result)
        // The signed-in user info.
        // const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        const errorCode = getErrorMessage(error.code)
        hasError.value = true;
        hasError.message = errorCode;
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

const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required')
        .matches(/^[^\s@]+@(?!.*\.\.)([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,}|com|wvsu\.edu\.ph)$/, 'Email must be a valid email address'),
    // email_confirmation: yup.string().required('Email confirmation is required')
    //     .test('emails-match', 'Emails must match', function (value) {
    //         return value === this.parent.email.value;
    //     }),
    // first_name: yup.string().required('First Name is required'),
    // last_name: yup.string().required('Last Name is required'),
    // confirmation_code: yup.string().required('Code is required')
    //     .length(8, 'Confirmation code is 8 characters long'),
    password: yup.string().required('Password is required')
        .min(8, 'Password must be at least 8 characters long'),
        // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        // .matches(/\d/, 'Password must contain at least one number'),
    // password_confirmation: yup.string().required('Password confirmation is required')
    //     .test('password-match', 'Password must match', function (value) {
    //         return value === this.parent.password.value;
    //     }),
});

const validateInput = (name) => {
    validationSchema
        .validateAt(name, { ...user, [name]: user[name].value })
        .then(() => {
            user[name].hasError = false;
            user[name].errorMessage = '';
        })
        .catch((err) => {
            user[name].hasError = true;
            user[name].errorMessage = err.message;
        });
}

const handleLogin = () => {
    if(!user.email.hasError && !user.password.hasError && !buttonLock.value && user.email.value && user.password.value) {
        login();
        buttonLock.value = true;
    } else {
        validateInput('email')
        validateInput('password')
    }
}

const getErrorMessage = (error) => {
  switch (error) {
    case 'auth/invalid-email':
      return 'Invalid Email';
    case 'auth/missing-password':
      return 'Missing password';
    case 'auth/email-already-in-use':
      return 'Email already in use. Please sign in.';
    case 'auth/account-exists-with-different-credential':
      return 'Account exists with different credential';
    case 'auth/invalid-credential':
      return 'Invalid credential';
    case 'auth/too-many-requests':
      return 'Too many requests';
    case 'auth/popup-closed-by-user':
      return 'Popup closed by user';
    default:
      return 'An error occurred please try again.';
  }
}
const handleResetPassword = () => {
    validateInput('email')
    setTimeout(() => {
        if(!user.email.hasError) {
            sendPasswordResetEmail(auth, user.email.value)
            .then(() => {
                // Password reset email sent!
                // ..
                toast("Reset password link has been sent!");
                setTimeout(() => {
                    resetPassword.value = false
                }, 1600)
            })
            .catch((error) => {
                const errorCode = getErrorMessage(error.code)
                user.email.errorMessage = errorCode;
                user.email.hasError = true;
                // alert(error.code)
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // ..
            });
        }
    }, 50)
}
</script>