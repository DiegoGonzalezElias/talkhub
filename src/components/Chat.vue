<script setup>
import MessageBubble from './messageBubble.vue';
import { getMessages } from '../utils/utils'
import { ref, onMounted, watchEffect } from 'vue'



const props = defineProps({
  isContactSelected: {
        type: Boolean,
        required: true,
    }
});

const messages = ref([]);

// Función de devolución de llamada para actualizar los mensajes
const updateMessages = (newMessages) => {
  messages.value = newMessages;
};


watchEffect(()=>{
  if(props.isContactSelected){
    getMessages(updateMessages);
  }
})


/* onMounted(() => {
  getMessages(updateMessages);
}); */

</script>


<template>
    <div class="chatGrid">
        <MessageBubble
        v-for="(message, index) in messages"
        :key="index"
        class="message"
        :message="message"
        />
    </div>
</template>



<style lang="sass" scoped>

    .chatGrid
        height: 90%
        width: 90%
        display: flex
        flex-direction: column
        justify-content: end
        

</style>