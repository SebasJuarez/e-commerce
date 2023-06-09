  import { getAuth } from 'firebase/auth';
  import { getFirestore } from 'firebase/firestore';
  import { getStorage } from "firebase/storage";
  import { initializeApp } from 'firebase/app';
  import * as firebase from "@firebase/app";

  const firebaseConfig = {
      apiKey: "AIzaSyCBpGzihxEmYapNvfpRiLhqutI6V0beWQQ",
      authDomain: "ecommercesytw.firebaseapp.com",
      projectId: "ecommercesytw",
      storageBucket: "ecommercesytw.appspot.com",
      messagingSenderId: "58888006283",
      appId: "1:58888006283:web:2da95979cf53a2374f028e",
      measurementId: "G-PPDGSK7Z3R"
    };

    const firebaseApp=initializeApp(firebaseConfig);

    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);

    export {auth, db, storage}
