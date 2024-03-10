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
                const response = await fetch('http://localhost:8000/logout/', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'X-CSRFToken': this.getCookie('csrftoken')
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to logout')
                }
                console.log("Logged Out")
                this.user = null
            } catch (error) {
                console.error('Failed to logout:', error)
            }
        },
        getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }
})