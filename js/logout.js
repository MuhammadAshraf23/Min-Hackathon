import { auth } from "./firebase.mjs";
import { signOut  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
document.getElementById("logout").addEventListener("click",()=>{
    signOut(auth).then(() => {
        location.replace('../index.html');
      }).catch((error) => {
console.log(error);
    });
})