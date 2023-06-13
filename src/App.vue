<script setup>
import ChatColumn from './components/ChatColumn.vue';
import ContactsColumn from './components/ContactsColumn.vue';
import NavBar from './components/NavBar.vue';
import ProfileColumn from './components/ProfileColumn.vue';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../firebaseConfig";
import { ref, toRef, watch } from "vue"
import LogIn from './components/LogIn.vue';
import { collection, setDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { randomID } from './utils/utils'


import { useUserStore } from './store/user'



const userStore = useUserStore();


onAuthStateChanged(auth, (currentUser) => {
  userStore.changeCurrentUser(currentUser)

});

const googleProvider = new GoogleAuthProvider();

const googleLogin = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    //firestore registration
    const colRef = collection(firestore, "users");
    const userDocRef = doc(colRef, userStore.user.email);

     // Check if the user document already exists
    const docSnapshot = await getDoc(userDocRef);
    if (docSnapshot.exists()) {

      /////////////////////////////////
      // Filtrar los documentos por el campo "unicName"
      /* const querySnapshot = await getDocs(query(colRef, where("unicName", "==", "brisagutierrez#4650")));

      // Iterar sobre los resultados el conolse log devuelve el correo del usuario
      querySnapshot.forEach((doc) => {
        console.log("Correo del usuario:", doc.id);
      }); */
      /////////////////////////////////////

      
      return; // Salir de la función si el documento ya existe
    }

    const id =randomID()
    //userData
    const userData = {
      id,
      name:userStore.user.displayName,
      unicName: `${userStore.user.displayName.replace(/\s/g, "")}#${id}`,
      contacts: [],
      avartarImg: userStore.user.photoURL
    }
    //create the document
    const docRef = await setDoc(userDocRef,userData)


  } catch (error) {
    console.log(error);
  }
};

</script>

<template>

 <main v-if="userStore.user != null" class="distribution">
  {{ console.log("USER DESDE EL TEMPLATE DEL CHAT: ",userStore.user) }}
    <NavBar/>
    <ContactsColumn/>
    <ChatColumn/>
    <ProfileColumn/>
 </main>
 <LogIn v-else @log-in="googleLogin"/>
</template>

<style lang="sass" scoped>

.distribution
  height: 100vh
  max-height: 100vh
  width: 100%
  display: grid
  grid-template-columns: minmax(100px, 1fr) minmax(300px, 3fr) minmax(700px, 7fr) minmax(300px, 3fr)




</style>
