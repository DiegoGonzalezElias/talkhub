<script setup>
import { computed } from '@vue/reactivity';

    const props = defineProps({
    message: {
        type: Object,
        required: true,
    }
    });

    const messageAlign = computed(()=>{
        return {
            'justify-content': props.message.sender === 'you' ? 'end' : 'start',
            'text-align': props.message.sender === 'you' ? 'end' : 'start'
        }
    })

</script>

<template>
    <div class="messageRow" :style="messageAlign">
        <div class="messageBox" :class="{'youMessage' : message.sender === 'you'}">
            <div>
                <span class="userName">{{ message.name ? message.name : message.sender }}</span>
                {{ message.timestamp.toDate().getHours()+':'+message.timestamp.toDate().getMinutes() }}
                <p>
                    {{ message.message }}
                </p>
                </div>
            </div>
    </div>
    
</template>



<style lang="sass" scoped>

    
    
    .messageRow
        width: 100%
        display: flex
        .messageBox
            border-radius: 0 10px 10px 10px
            width: 50%
            padding: 10px
            display: flex
            flex-direction: column
            justify-content: end
            height: fit-content
            background-color: #fff
            margin: 10px 0
            .userName
                font-weight: 700

        .youMessage
            background-color: #E0EDE4
            align-items: end
            border-radius: 10px 0px 10px 10px

</style>