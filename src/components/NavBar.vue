
<script setup>
import { Icon } from '@iconify/vue';
import { auth } from '../../firebaseConfig'
import { useUserStore } from '../store/user'
import { useSelectContactStore } from '../store/selectedContact'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const userStore = useUserStore();
const selectContactStore = useSelectContactStore();

const logOut = ()=>{
    auth.signOut().then(()=>{
        localStorage.setItem('selectedContact', JSON.stringify(null));
        selectContactStore.changeSelectedContact(null)
        userStore.changeCurrentUser(auth.currentUser);    
    });
    

}

const addUserInfo = () => {
    const $toast = useToast();
   
    $toast.info('To add an user search for his unic Name like: JohnDoe#1111',{
        position: "bottom-left"
    })
    
}

</script>


<template>
    <nav class="navbar">
        <img class="logo" src="../assets/logo.webp">
        <div class="buttons">
            <Icon class="icon" icon="ic:outline-chat" color="#fff" width="30px"/>
            <Icon @click="addUserInfo" class="icon" icon="mingcute:group-fill" color="#707070" width="30px"/>
            <Icon class="icon" icon="lucide:coffee" color="#707070" width="30px"/>
            <Icon @click="logOut" class="icon" icon="solar:logout-2-outline" color="#707070" width="30px"/>
        </div>
        
    </nav>
</template>


<style lang="sass" scoped>
.navbar
  background-color: #191A1E
  display: flex
  flex-direction: column
  align-items: center
  .buttons
    display: flex
    flex-direction: column
    align-items: center
    gap: 30px
    margin-top: 50px
    .icon
        &:hover
            cursor: pointer
.logo
    max-width: 80px
    max-height: 80px
  

</style>