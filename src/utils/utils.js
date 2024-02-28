import { collection, query, where, getDocs, getDoc, doc, updateDoc, arrayUnion, setDoc, onSnapshot, orderBy, limit, startAfter } from 'firebase/firestore';
import { firestore } from "../../firebaseConfig";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

export function randomID() {
  // Generar un número aleatorio entre 0 y 9999
  const numeroAleatorio = Math.floor(Math.random() * 10000);

  // Asegurarse de que el número tenga 4 cifras
  const numeroConCeros = numeroAleatorio.toString().padStart(4, '0');

  return numeroConCeros;
}



import { useUserStore } from '../store/user'
import { useSelectContactStore } from '../store/selectedContact'


export const searchAndAddContact = async (unicName) => {
  try {
    const userStore = useUserStore();
    const $toast = useToast();

    const usersRef = collection(firestore, "users");
    const querySnapshot = await getDocs(query(usersRef, where("unicName", "==", unicName)));

    if (querySnapshot.empty) {
      console.log("No se encontró ningún usuario con el unicName especificado");
      $toast.info('User Not Found', {
        position: "bottom-left"
      })
      return;
    }

    // Obtener el documento del usuario encontrado
    const userDoc = querySnapshot.docs[0];

    //TODO: NECESITO QUE EL USER ESTE DISPONIBLE DE MANERA GLOBAL EN LA APP
    // Obtener el documento del usuario logueado
    const currentUserDocRef = doc(usersRef, userStore.user.email);
    const currentUserDocSnapshot = await getDoc(currentUserDocRef);

    // Verificar si el usuario ya está en la lista de contactos del usuario logueado
    if (currentUserDocSnapshot.data().contacts.includes(userDoc.id)) {
      console.log("El usuario ya está en la lista de contactos");
      $toast.info('User already in contacts', {
        position: "bottom-left"
      })
      return;
    }

    // Agregar el usuario a la lista de contactos del usuario logueado
    await updateDoc(currentUserDocRef, {
      contacts: arrayUnion(userDoc.id)
    });

    // Agregar el usuario logueado a la lista de contactos del usuario encontrado
    await updateDoc(userDoc.ref, {
      contacts: arrayUnion(currentUserDocRef.id)
    });

    console.log("Usuario agregado a la lista de contactos");
    $toast.success('User Added', {
      position: "bottom-left"
    })
  } catch (error) {
    $toast.error('Search Error', {
      position: "bottom-left"
    })
    console.log("Error al buscar y agregar contacto:", error);
  }
};




export const getContactList = async () => {
  try {
    const userStore = useUserStore();
    const contactsInfoList = [];

    // Obtener la referencia al documento del usuario logueado
    const currentUserDocRef = doc(collection(firestore, "users"), userStore.user.email);
    const currentUserDocSnapshot = await getDoc(currentUserDocRef);

    // Obtener los documentos de los contactos del usuario logueado
    const contactsRefs = currentUserDocSnapshot.data().contacts.map((contactId) =>
      doc(collection(firestore, "users"), contactId)
    );
    const contactsSnapshots = await Promise.all(contactsRefs.map((ref) => getDoc(ref)));

    // Construir la lista de información de contactos
    contactsSnapshots.forEach((contactSnapshot) => {
      const contactData = contactSnapshot.data();
      const contactInfo = {
        name: contactData.name,
        unicName: contactData.unicName,
        avartarImg: contactData.avartarImg
      };
      contactsInfoList.push(contactInfo);
    });

    console.log("dentro el getContacts: ", contactsInfoList)
    return contactsInfoList;
  } catch (error) {
    console.log("Error al obtener la información de los contactos:", error);
    return [];
  }
};


export const addMessage = async (message) => {
  try {
    const userStore = useUserStore();
    const $toast = useToast();
    const existingselectContact = JSON.parse(localStorage.getItem('selectedContact'));

    const selectContactStore = useSelectContactStore();

    const usersRef = collection(firestore, "users");

    const contactQuerySnapshot = await getDocs(query(usersRef, where("unicName", "==", existingselectContact.unicName)));

    if (contactQuerySnapshot.empty) {
      console.log("No se encontró ningún usuario con el unicName especificado");
      $toast.info('User Not Found', {
        position: "bottom-left"
      })
      return;
    }

    const contactUserDoc = contactQuerySnapshot.docs[0];
    //console.log(userDoc.id)


    if (!userStore.user || !userStore.user.email) {
      console.log("Datos de usuario o contacto no válidos");

      return;
    }

    const chatRef = doc(
      collection(firestore, "users", userStore.user.email, "chats"),
      contactUserDoc.id
    );

    const conatctChatRef = doc(
      collection(firestore, "users", contactUserDoc.id, "chats"),
      userStore.user.email
    );

    const currentUserChatsSnapshot = await getDoc(chatRef);
    if (!currentUserChatsSnapshot.exists()) {
      // El documento del chat no existe, crear la colección "chats" y el documento del chat
      await setDoc(chatRef, {});
    }

    const currentContactChatsSnapshot = await getDoc(conatctChatRef);
    if (!currentContactChatsSnapshot.exists()) {
      // El documento del chat no existe, crear la colección "chats" y el documento del chat
      await setDoc(conatctChatRef, {});
    }


    const newMessage = {
      message: message,
      timestamp: new Date(),
      sender: 'you',
    };

    const contactMessage = {
      message: message,
      timestamp: new Date(),
      sender: userStore.user.email,
      name: userStore.user.displayName
    }

    await updateDoc(chatRef, {
      messages: arrayUnion(newMessage),
    });

    await updateDoc(conatctChatRef, {
      messages: arrayUnion(contactMessage),
    });

  } catch (error) {
    console.log("Error al añadir el mensaje: ", error);
  }
}


export const getMessages = async (updateMessages, updateLastMessageVisible) => {
  try {
    const userStore = useUserStore();
    const $toast = useToast();
    const existingselectContact = JSON.parse(localStorage.getItem('selectedContact'));

    if (!userStore.user || !userStore.user.email) {
      console.log("Datos de usuario o contacto no válidos");
      return;
    }


    const usersRef = collection(firestore, "users");

    const contactQuerySnapshot = await getDocs(query(usersRef, where("unicName", "==", existingselectContact.unicName)));

    if (contactQuerySnapshot.empty) {
      console.log("No se encontró ningún usuario con el unicName especificado");
      $toast.info('User Not Found', {
        position: "bottom-left"
      })
      return;
    }

    const contactUserDoc = contactQuerySnapshot.docs[0];


    //
    const q =
      query(collection(firestore, "users", userStore.user.email, "chats", contactUserDoc.id, "messages"), orderBy('timestamp', 'desc'), limit(8))
    const messagesSnapshot = await getDocs(q);

    console.log("q", q);
    console.log("messagesSnapshot", messagesSnapshot)

    const messageList = []
    messagesSnapshot.forEach((message) => {
      console.log(message.data())
      messageList.push(message.data())
    })

    const lastVisible = messagesSnapshot.docs[messagesSnapshot.docs.length - 1]
    console.log(lastVisible.data())

    updateLastMessageVisible(lastVisible)

    updateMessages(messageList.reverse());




    /* const chatRef = doc(
      collection(firestore, "users", userStore.user.email, "chats"),
      contactUserDoc.id
    );

    onSnapshot(chatRef, (snapshot) => {
      const messages = snapshot.data()?.messages || [];
      updateMessages(messages);
      // Actualizar el estado o la variable que contiene los mensajes en tu aplicación
      console.log("Nuevos mensajes:", messages);
    });
 */
  } catch (error) {

    console.log("Error al obtener los mensajes: ", error);
  }
}

export const getMoreOldMessages = async (lastVisible, updateMessages, messages) => {
  const userStore = useUserStore();
  const $toast = useToast();
  const existingselectContact = JSON.parse(localStorage.getItem('selectedContact'));

  if (!userStore.user || !userStore.user.email) {
    console.log("Datos de usuario o contacto no válidos");
    return;
  }


  const usersRef = collection(firestore, "users");

  const contactQuerySnapshot = await getDocs(query(usersRef, where("unicName", "==", existingselectContact.unicName)));

  if (contactQuerySnapshot.empty) {
    console.log("No se encontró ningún usuario con el unicName especificado");
    $toast.info('User Not Found', {
      position: "bottom-left"
    })
    return;
  }

  const contactUserDoc = contactQuerySnapshot.docs[0];

  const oldMessagesQuery = query(collection(firestore, "users", userStore.user.email, "chats", contactUserDoc.id, "messages"), orderBy('timestamp', 'desc'), startAfter(lastVisible), limit(8))

  const messagesSnapshot = await getDocs(oldMessagesQuery);

  const messageList = messages
  messagesSnapshot.forEach((message) => {
    console.log(message.data())
    messageList.push(message.data())
  })

  updateMessages(messageList.reverse());
}


export const getLoggedUnicName = async () => {
  const userStore = useUserStore();
  const usersRef = collection(firestore, 'users');

  try {
    // Obtener el documento del usuario logueado
    const userDoc = await getDoc(doc(usersRef, userStore.user.email));

    if (userDoc.exists()) {
      // Obtener el valor de la propiedad "unicName" del usuario
      const unicName = userDoc.data().unicName;
      console.log('Valor de unicName:', unicName);
      return unicName
    } else {
      // El documento del usuario no existe
      console.log('Documento del usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener el valor de unicName:', error);
  }

}