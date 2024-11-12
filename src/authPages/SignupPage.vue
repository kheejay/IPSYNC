<template>
    <div class="w-screen h-screen bg-white flex flex-col items-center">
		<div class="w-full flex items-end justify-center text-c1 pt-8 sm:pt-10 pb-12 relative">
			<IPSYNCLogo v-if="formStep > 1" 
				class="absolute left-0 md:left-1/2 -top-14 md:-top-11 md:-translate-x-1/2 scale-[20%] 
				md:scale-50 lg:left-24 lg:top-1/2  lg:-translate-y-1/2 lg:scale-90" />
			<div class="flex items-center justify-center text-xs sm:text-[1.25rem]">
				<span class="w-9 h-9 flex items-center justify-center rounded-full relative border-2 border-black 
					font-bold text-black">
					1
					<span class="absolute -bottom-7 font-normal">Signup</span>
				</span>
				<span :class="`${ formStep >= 2 ? 'border-b-2 border-black' : 'border-b border-c1'} w-12 xs:w-20 sm:w-36 h-0`"></span>
				<span :class="`w-9 h-9 flex items-center justify-center rounded-full relative
					${ formStep >= 2 ? 'border-2 border-black font-bold text-black' : 'border border-c1'}`">
					2
					<span class="absolute -bottom-7 font-normal text-nowrap">Personal Information</span>
				</span>
				<span :class="`${ formStep >= 3 ? 'border-b-2 border-black' : 'border-b border-c1'} w-12 xs:w-20 sm:w-36 h-0`"></span>
				<span :class="`w-9 h-9 flex items-center justify-center rounded-full relative
					${ formStep >= 3 ? 'border-2 border-black font-bold text-black' : 'border border-c1'}`">
					3
					<span class="absolute -bottom-7 font-normal">Education</span>
				</span>
				<span :class="`${ formStep === 4 ? 'border-b-2 border-black' : 'border-b border-c1'} w-12 xs:w-20 sm:w-36 h-0`"></span>
				<span :class="`w-9 h-9 flex items-center justify-center rounded-full relative
					${ formStep === 4 ? 'border-2 border-black font-bold text-black' : 'border border-c1'}`">
					4
					<span class="absolute -bottom-7 font-normal">Background</span>
				</span>
			</div>
		</div>
        <div v-if="formStep === 1"
			class="shadow-[0rem_0.25rem_0.25rem_black] border border-black rounded-[1.25rem] bg-c5 pt-4 pb-16 px-16 mt-2">
			<div class="flex flex-col items-center justify-center">
				<IPSYNCLogo />
				<div class="rounded-[0.4375rem] border border-black py-3 px-12 bg-white text-[1.125rem]">
					Continue with <span class="text-c1 underline">Google</span> or 
					<span class="text-c1 underline">Github</span>
				</div>
				<div class="py-2 flex"><GoogleIcon class="w-9 h-9" /> <GithubIcon class="h-9 w-9" /></div>
				<div class="flex items-center">
					<span class="border-b border-black w-[7rem] sm:w-[16rem]"></span>
					<div class="text-c1 px-12 text-[1rem]">Or signup with email</div>
					<span class="border-b border-black w-[7rem] sm:w-[16rem]"></span>
				</div>
				<div>
					<div class="w-full flex flex-col items-end justify-center py-4">
						<span class="w-full text-start text-lg">Email <span class="text-red-500">*</span></span>
						<input type="text" class="w-[32rem] sm:w-[38rem] py-3 rounded-[0.4375rem] border border-black 
							focus:outline-none px-2 text-[1.25rem]">
						<button @click="nextStep" class="rounded-[0.7rem] bg-c1 text-white py-2 px-8 mt-7 text-[1.25rem]">
							Continue
						</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="formStep === 2" class="text-6xl">{{'formstep = ' + formStep}}</div>
		<div v-if="formStep === 3" class="text-6xl">{{'formstep = ' + formStep}}</div>
		<div v-if="formStep === 4" class="text-6xl">{{'formstep = ' + formStep}}</div>
		<!-- <button @click="prevStep" class="rounded-[0.7rem] bg-c1 text-white py-2 px-8 mt-7 text-[1.25rem]">
			Back
		</button>
		<button @click="nextStep" class="rounded-[0.7rem] bg-c1 text-white py-2 px-8 mt-7 text-[1.25rem]">
			Next
		</button> -->
    </div>
</template>
  
<script setup>
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, google, github } from '../firebase'
import { reactive, ref } from "vue";
import * as yup from 'yup';
import { userInfo } from "../store/user";
import { useRouter } from "vue-router";

import IPSYNCLogo from '../components/IPSYNCLogo.vue'
import GoogleIcon from "../components/icons/GoogleIcon.vue";
import GithubIcon from '../components/icons/GithubIcon.vue'
 
const userData = userInfo()

const formStep = ref(1)

const nextStep = () => {
	switch(formStep.value) {
		case 1: {
			console.log(formStep.value)
			formStep.value += 1
		}
		break;
		case 2: {
			console.log(formStep.value)
			formStep.value += 1
		}
		break;
		case 3: {
			console.log(formStep.value)
			formStep.value += 1
		}
		break;
		default: {
			break;
		}
	}
}
const prevStep = () => {
	if(formStep.value > 1) {
		formStep.value -= 1
	}
}

const router = useRouter()
const redirectToDashboard = () => {
    router.push({ name: "Dashboard" })
}
const createUserAccount = () => {
    if(newUserPassword.value === passwordConfirmation.value) {
        createUserWithEmailAndPassword(auth, newUserEmail.value, newUserPassword.value)
        .then((userCredential) => {
            // Signed up 
            redirectToDashboard();
          	// ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // ..
        });
    } else {
        alert('password not matched')
    }
  }

const loginGoogle = () => {

  	signInWithPopup(auth, google)
    	.then((result) => {
		// This gives you a Google Access Token. You can use it to access the Google API.
		// const credential = GoogleAuthProvider.credentialFromResult(result);
		// const token = credential.accessToken;
		// The signed-in user info.
		redirectToDashboard();
		//   const user = result.user;
		// alert(result.user.uid)
		// console.log(result.user.displayName)
		// IdP data available using getAdditionalUserInfo(result)
		// ...
    }).catch((error) => {
        alert('error')
      	// Handle Errors here.
    	//   const errorCode = error.code;
    	//   const errorMessage = error.message;
    	// The email of the user's account used.
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
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
		redirectToDashboard();
        // The signed-in user info.
        //   const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GithubAuthProvider.credentialFromError(error);
        // ...
    });
}

const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required')
        .matches(/^[^\s@]+@(?!.*\.\.)([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,}|com|wvsu\.edu\.ph)$/, 'Email must be a valid email address'),
    email_confirmation: yup.string().required('Email confirmation is required')
        .test('emails-match', 'Emails must match', function (value) {
            return value === this.parent.email.value;
        }),
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required'),
    confirmation_code: yup.string().required('Code is required')
        .length(8, 'Confirmation code is 8 characters long'),
    password: yup.string().required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/\d/, 'Password must contain at least one number'),
    password_confirmation: yup.string().required('Password confirmation is required')
        .test('password-match', 'Password must match', function (value) {
            return value === this.parent.password.value;
        }),
});

const user = reactive({
    // first_name: { value: '', hasError: false, errorMessage: '' },
    // last_name: { value: '', hasError: false, errorMessage: '' },
    email: { value: '', hasError: false, errorMessage: '' },
    // email_confirmation: { value: '', hasError: false, errorMessage: '' },
    password: { value: '', hasError: false, errorMessage: '' },
    password_confirmation: { value: '', hasError: false, errorMessage: '' },
    // confirmation_code: { value: '', hasError: false, errorMessage: '' },
})

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

</script>