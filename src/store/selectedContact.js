import {defineStore} from 'pinia'

export const useSelectContactStore = defineStore("selectContact",{
    state: ()=>({
        selectedContact: null,
    }),
    actions: {
        changeSelectedContact(contact){         
            this.selectedContact = contact
        }
    }
})