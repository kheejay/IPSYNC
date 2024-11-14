import { createWebHistory, createRouter } from 'vue-router'
import { auth } from '../firebase'

import LoginPage from '../pages/LoginPage.vue'
import SignupPage from '../pages/SignupPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import LandingPage from '../pages/LandingPage.vue'

import page404 from '../page404.vue'
import { onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [    
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/signup',
            name: 'Signup',
            component: SignupPage
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: DashboardPage
        },
        {
            path: '/profile',
            name: 'Profile',
            component: ProfilePage
        },
        {
            path: '/',
            name: 'Landing',
            component: LandingPage
        },
        {
            path: "/:pathMatch(.*)*",
            name: 'not-found',
            component: page404
        },
        
    ],

    scrollBehavior (to, from, savePosition) {
        return savePosition || new Promise((resolve) => {
            // resolve({ top: 0, behavior: 'smooth' })
            setTimeout(() =>  resolve({ top: 0 }), 300)
        })
    }

})

// const getCurrentUser = () => {
//     return new Promise((resolve, reject) => {
//         const unsubscribe = onAuthStateChanged(
//             auth,
//             (user) => {
//                 console.log(user)
//                 unsubscribe()
//                 resolve(user)
//             },
//             reject
//         ) 
//     })
// }
  
// router.beforeEach(async (to) => {
//     if (to.meta.requiresAuth && !(await getCurrentUser())) {
//         return '/login'
//     } else if ((to.name === 'Login' || to.name === 'Signup') && (await getCurrentUser())) {
//         return '/'
//     } else if(to.name === 'Auth') {
//         return '/'
//     }
// })
// router.beforeEach(async (to) => {
//     if (!(await getCurrentUser())) {
//         // restrict authenticated functions
//     } else if ((await getCurrentUser())) {
//         // update user data
//     }
//     if(to.name === 'Auth') {
//         return '/login'
//     }
// })

export default router