<script setup>
import { Icon } from '@iconify/vue';
import { useSelectContactStore } from '../store/selectedContact'
import ChatInput from './ChatInput.vue';
import Chat from './Chat.vue';
import { watchEffect, computed } from 'vue';


const selectContactStore = useSelectContactStore();
const existingselectContact = JSON.parse(localStorage.getItem('selectedContact'));

watchEffect(()=>{
    existingselectContact
})

const chatHeight = computed(()=>{
        return {
            'height': !selectContactStore.selectedContact ? '100%' : 'auto'
        }
})

</script>

<template>
    <section class="chatColumn">
        <div class="header">
            <div class="header--avatar">
                <img :src="existingselectContact ? existingselectContact.avartarImg : selectContactStore.selectedContact?.avartarImg">
                <div class="avatar--user">
                    <h4 style="margin: 0">{{existingselectContact ? existingselectContact.name : selectContactStore.selectedContact?.name || ''  }}</h4>
                    <span class="online">{{existingselectContact ? existingselectContact.unicName : selectContactStore.selectedContact ? selectContactStore.selectedContact.unicName : '' }}</span>
                </div>
            </div>
            
            <div class="header--buttons">
                <Icon class="icon" icon="mingcute:phone-fill" color="#82b08c" width="25px"/>
                <Icon class="icon" icon="wpf:video-call" color="#82b08c" width="25px"/>
                <Icon class="icon" icon="ant-design:message-twotone" color="#82b08c" width="25px"/>
            </div>
        </div>
        <div class="bg">
            <div :style="chatHeight" class="chat">
                <Chat :isContactSelected="selectContactStore.selectedContact ? true : false"/>
                <ChatInput/>
            </div>
        </div>
        
    </section>
</template>

<style lang="sass" scoped>

    .chatColumn
        padding: 0px 10px 0 10px
        border-right: 1px solid #090909
        border-left: 1px solid #090909
        display: flex
        flex-direction: column
        .header
            padding: 10px 20px
            display: flex
            align-items: center
            justify-content: space-between
            gap: 10px
            background-color: #fff
            min-height: 7rem
            .header--avatar
                display: flex
                gap: 10px
                img
                    width: 50px
                    border-radius: 50%
            
                .avatar--user
                    display: flex
                    flex-direction: column
                    justify-content: center
                    .online
                        font-size: .7rem
                        color: green
            .header--buttons
                display: flex
                gap: 25px
                .icon
                    &:hover
                        cursor: pointer
        .chat
            position: relative
            overflow: auto
            max-height: 86vh
            display: flex
            align-items: center
            flex: 1
            flex-direction: column
            /* background-color: #F8F8F8 */
            

        .bg
            width: 100%
            height: 100%
            display: flex
            align-items: end
            border-radius: 15px 15px 0 0
            justify-content: center
            background-size: 300% 300%
            background-image: linear-gradient(-45deg, #F8F8F8 0%, #F8F8F8 25%, #F8F8F8 51%, #e3e1e1 100%)
            -webkit-animation: AnimateBG 20s ease infinite
            animation: AnimateBG 20s ease infinite
            @-webkit-keyframes AnimateBG
                0%
                    background-position: 0% 50%

                50%
                    background-position: 100% 50%

                100%
                    background-position: 0% 50%

            @keyframes AnimateBG
                0%
                    background-position: 0% 50%

                50%
                    background-position: 100% 50%

                100%
                    background-position: 0% 50%
            
               
                
                
</style>