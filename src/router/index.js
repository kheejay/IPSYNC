import { createWebHistory, createRouter } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

import LoginPage from '../pages/LoginPage.vue'
import SignupPage from '../pages/SignupPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import LandingPage from '../pages/LandingPage.vue'
import AboutUs from '../pages/AboutUs.vue'
import ContactUs from '../pages/ContactUs.vue'
import { ref } from 'vue'
import Projects from '../pages/Projects.vue'
import InspectProfile from '../pages/InspectProfile.vue'
import Messages from '../pages/Messages.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [    
        {
            path: '/login',
            name: 'Login',
            component: LoginPage,
            meta: {
                isAuthPage: true
            }
        },
        {
            path: '/signup',
            name: 'Signup',
            component: SignupPage,
            meta: {
                isAuthPage: true
            }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: DashboardPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/projects',
            name: 'Projects',
            component: Projects,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: ProfilePage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/',
            name: 'Landing',
            component: LandingPage
        },
        {
            path: '/about',
            name: 'About',
            component: AboutUs
        },
        {
            path: '/contact',
            name: 'Contact',
            component: ContactUs
        },
        {   
            path: '/inspect-profile/:id',
            name: 'InspectProfile',
            component: InspectProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/messages',
            name: 'Messages',
            component: Messages,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: '/'
        },
        
    ],

    scrollBehavior (to, from, savePosition) {
        return savePosition || new Promise((resolve) => {
            setTimeout(() =>  resolve({ top: 0, behavior: 'smooth' }), 300)
        })
    }

})

const authenticatingUser = ref(false)

const getCurrentUser = () => {
    authenticatingUser.value = true
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                // console.log(user)
                unsubscribe()
                authenticatingUser.value = false;
                resolve(user)
            },
            reject
        ) 
    })
}

// router.beforeEach(async (to) => {
//     if (to.meta.requiresAuth && !(await getCurrentUser())) {
//         return '/'
//     }
// })

export {router, authenticatingUser }