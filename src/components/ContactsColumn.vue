<script setup>
import { Icon } from '@iconify/vue';
import { ref, watchEffect } from "vue";
import Contact from './Contact.vue';
import { searchAndAddContact, getContactList } from '../utils/utils'
import { useSelectContactStore } from '../store/selectedContact'


const isSelected = ref("");
const loading = ref(true);
const contacts = ref([]);

const selectContactStore = useSelectContactStore();

const existingselectContact = JSON.parse(localStorage.getItem('selectedContact'));



//const contacts = getContactList();
watchEffect(() => {
  loading.value = true; // Mostrar mensaje de carga mientras se obtienen los contactos
  getContactList().then((result) => {
    contacts.value = result; // Asignar los resultados a la variable contacts
    loading.value = false; // Ocultar mensaje de carga
  }).catch((error) => {
    console.log("Error al obtener la lista de contactos:", error);
    loading.value = false; // Ocultar mensaje de carga en caso de error
  });
});


const searchQuery = ref('');

const search = ()=>{
    searchAndAddContact(searchQuery.value).then(()=>{
        getContactList().then((result) => {
        contacts.value = result; // Asignar los resultados a la variable contacts
        loading.value = false; // Ocultar mensaje de carga
        }).catch((error) => {
            console.log("Error al obtener la lista de contactos:", error);
            loading.value = false; // Ocultar mensaje de carga en caso de error
        });
    })
    searchQuery.value ="";
} 


</script>


<template>
    <section class="contactsColumn">
        <h1 style="margin-top: 0;">MESSAGES
            <span class="messagesNumber">( 0 )</span>
        </h1>
        <div class="search">
            <input @keyup.enter="search" v-model="searchQuery" type="text" placeholder="add an user">
            <Icon @click="search" class="search--icon" color="#707070" icon="material-symbols:search"/>
        </div>
        <div class="contacts">
            <div v-if="loading && contacts.length === 0" class="loading">
                <Icon icon="line-md:loading-loop" width="30" height="30" />
            </div>
            <Contact :class="selectContactStore.selectedContact?.unicName  === contact.unicName && 'selectedContact'" v-for="contact in contacts" :contact="contact"/> 
        </div>
        
    </section>
</template>



<style lang="sass" scoped>

.selectedContact
    background-color: #191A1E
    color: #fff
    &:hover
        background-color: #191A1E

.contactsColumn
    padding: 40px 20px 0 20px
    display: flex
    flex-direction: column
    align-items: center
    .messagesNumber
        color: #82B08C
    .search
        position: relative
        display: inline-flex
        align-items: center
        input
            border-radius: 15px
            border: none
            background-color: #F8F8F8
            padding: 10px 34px 10px 10px
        
        .search--icon
            position: absolute
            right: 10px
            top: 50%
            transform: translateY(-50%)
            width: 24px
            height: 24px
            &:hover
                cursor: pointer
    .contacts
        display: flex
        flex-direction: column
        gap: 10px
        width: 100%
        margin-top: 20px
        .loading
            display: flex
            justify-content: center
            align-items: center

</style>