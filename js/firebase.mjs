import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCJrl976ubs_LBkWKF45lU85uEmf2lDlg8",
  authDomain: "new-project-d5376.firebaseapp.com",
  projectId: "new-project-d5376",
  storageBucket: "new-project-d5376.appspot.com",
  messagingSenderId: "1075626689088",
  appId: "1:1075626689088:web:395403de8c147b41b795a5",
  measurementId: "G-31GV35BM7N"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const storage=getStorage(app);
export {app,auth,db,storage};