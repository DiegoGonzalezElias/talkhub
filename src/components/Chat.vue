<script setup>
import MessageBubble from './MessageBubble.vue';
import { getMessages, getMoreOldMessages } from '../utils/utils'
import { ref, watchEffect } from 'vue'



const props = defineProps({
  isContactSelected: {
    type: Boolean,
    required: true,
  }
});

const messages = ref([]);
const lastVisible = ref(null)

// Función de devolución de llamada para actualizar los mensajes
const updateMessages = (newMessages) => {
  messages.value = newMessages;
};

const updateLastMessageVisible = (newVisible) => {
  lastVisible.value = newVisible
}


watchEffect(() => {
  if (props.isContactSelected) {
    getMessages(updateMessages, updateLastMessageVisible)
      .then((_) => {
        console.log('obteniendo siguientes mensajes')
        getMoreOldMessages(lastVisible.value, updateMessages, messages.value)
      });

  }
})


/* onMounted(() => {
  getMessages(updateMessages);
}); */

</script>


<template>
  <div class="chatGrid">
    <MessageBubble v-for="(message, index) in messages" :key="index" class="message" :message="message" />
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