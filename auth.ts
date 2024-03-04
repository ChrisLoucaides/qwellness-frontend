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
        }
    }
})