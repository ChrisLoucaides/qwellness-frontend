import {defineStore} from 'pinia';
import {User} from "./src/utils/models/User";


export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
    }),
    actions: {
        async fetchUser() {
            try {
                const response = await fetch('http://localhost:8000/get-user-info/', {credentials: 'include'})
                if (!response.ok) {
                    throw new Error('Failed to fetch')
                }
                const data = await response.json()
                this.user = data as User
            } catch (error) {
                console.error('Failed to fetch user:', error)
                this.user = null
            }
        },
        async logout() {
            try {
                this.user = null;
                Cookies.remove('user_id');
                const response = await fetch('http://localhost:8000/logout/', {method: 'POST', credentials: 'include'}) //TODO FYP-12: Add logout endpoint to backend
                if (!response.ok) {
                    throw new Error('Failed to logout')
                }
                console.log("Logged Out")
                this.user = null
            } catch (error) {
                console.error('Failed to logout:', error)
            }
        }
    }
})