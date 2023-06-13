import {defineStore} from 'pinia'

export const useUserStore = defineStore("user",{
    state: ()=>({
        user: null,
    }),
    actions: {
        changeCurrentUser(currentUser){         
            this.user = currentUser
        }
    }
})

