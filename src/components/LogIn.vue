<script setup>
import { Icon } from '@iconify/vue';
const emit = defineEmits(["log-in"])

</script>

<template>
   <main class="logIn">
        <div class="box">
            <img src="../assets/logo.webp">
            <h1>talkhub</h1>
            <button @click="emit('log-in')">
                <Icon icon="devicon:google" width="20" />
                Log In With Google
            </button>
        </div>
        
   </main>
</template>



<style lang="sass" scoped>

    .logIn
        width: 100%
        height: 100vh
        display: flex
        justify-content: center
        align-items: center
        .box
            display: flex
            flex-direction: column
            align-items: center
            transform: translateY(-100px)
            h1
                margin-top: 0
                color: #82b08c
            img
                width: 400px
                height: auto
            button
                display: flex
                justify-content: center
                align-items: center
                gap: 10px
                background-color: #191A1E
                color: white
                border: none
                padding: 10px 20px
                font-size: 16px
                border-radius: 5px
                cursor: pointer
                transition: background-color 0.3s ease-in-out
                &:hover
                    background-color: #444



</style>