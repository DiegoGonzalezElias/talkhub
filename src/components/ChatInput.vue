<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { addMessage } from '../utils/utils'

const newMessage = ref('');

const sendMessage = async () => {
    if (newMessage.value.replace(/\s/g, "") === "") {
        return
    }
    const message = newMessage.value
    console.log(message)
    addMessage(message);
    newMessage.value=""

}

</script>

<template>
    <div>
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="send a message...">
        <button  @click="sendMessage">
            <Icon icon="fluent:send-20-filled" color="fff" width="20" height="20" />
        </button>
    </div>
</template>


<style lang="sass" scoped>

    div
        position: sticky
        bottom: 5px
        width: 90%
        display: flex
        gap: 10px
        flex-wrap: nowrap
        
        input
            padding-left: 5px
            width: 100%
            font-size: 1rem
            border: 1px solid #191A1E
            border-radius: 10px
        button
            padding: 10px 20px
            display: flex
            justify-content: center
            align-items: center
            background-color: #191A1E
            border-radius: 10px
            &:hover
                cursor: pointer


</style>