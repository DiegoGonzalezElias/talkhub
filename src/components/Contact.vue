<script setup>
import { useSelectContactStore } from '../store/selectedContact';

const props = defineProps({
    contact: {
        type: Object,
        required: true,
    }
    });

const selectContactStore = useSelectContactStore();

const pickContact = () =>{
    selectContactStore.changeSelectedContact(props.contact)
    localStorage.setItem('selectedContact', JSON.stringify(props.contact));
    
}

//const emit = defineEmits(["selected-contact"])
//console.log("DENTRO DEL CONTACT COMPONENT: ",props.contact)

</script>

<template>
    <div class="contact" @click="pickContact">
        <img :src="contact.avartarImg" alt="avatar">
        {{ contact.name }}
        
    </div>
</template>



<style lang="sass" scoped>

.contact
    display: flex
    align-items: center
    gap: 10px
    //border: 1px solid black
    border-radius: 15px
    padding: 10px
    img
        width: 50px
        border-radius: 50%
    &:hover
        cursor: pointer
        background-color: #F8F8F8

</style>