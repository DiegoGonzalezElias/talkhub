<script setup>
import { Icon } from '@iconify/vue';
import { useUserStore } from '../store/user'
import { ref, onMounted, watchEffect } from 'vue';
import { getLoggedUnicName } from "../utils/utils"

const userStore = useUserStore();

const userUnicName = ref(null);

onMounted(async () => {
  try {
    const result = await getLoggedUnicName();
    if (result) {
      userUnicName.value = result;
    }
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
  }
});

</script>


<template>
    <section class="profileColumn">
        <img :src="userStore.user.photoURL">
        <h1 style="margin: 0;">{{userStore.user.displayName}}</h1>
        <span style="color: green">{{ userUnicName }}</span>
        <div class="options">
            <div>
                <div class="circle">
                    <Icon icon="iconamoon:profile" width="20" height="20" />
                </div>
                <span>profile</span>
            </div>
            <div>
                <div class="circle">
                    <Icon icon="gridicons:not-visible" width="20" height="20" />
                </div>
                <span>visibility</span>
            </div>
            <div>
                <div class="circle">
                    <Icon icon="material-symbols:search" width="20" height="20"/>
                </div>
                <span>search</span>
            </div>
        </div>
        <div style="margin-top: 30px; border-bottom: none;" class="additionalOption">
            <p>search in conversation</p>
            <Icon class="search--icon" color="#707070" icon="material-symbols:search"/>
        </div>
        <div class="additionalOption">
            <p>change color mode</p>
            <Icon icon="gg:dark-mode" color="#82b08c" />
        </div>
    </section>
</template>



<style lang="sass" scoped>

    .profileColumn
        padding-top: 40px
        display: flex
        flex-direction: column
        align-items: center
        img
            width: 200px
            border-radius: 50%
        .options
            margin-top: 20px
            display: flex
            gap: 10px
            .circle
                display: flex
                justify-content: center
                align-items: center
                background-color: #F8F8F8
                width: 40px
                height: 40px
                border-radius: 50%
            span
                font-size: .7rem
        .additionalOption
            border-top: 1px solid #090909
            border-bottom: 1px solid #090909
            width:100%
            display: flex
            align-items: center
            justify-content: start
            gap: 10px
            p
                margin-left: 20px

</style>