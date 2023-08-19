import { db,auth,storage } from "./firebase.mjs";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword   }  from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

window.signup = () => {
    const name = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const Re_password = document.getElementById("re-password").value;
    if(password!==Re_password){
        alert('please enter the correct password')
        return;
    }

createUserWithEmailAndPassword(auth, email, password)
.then(async(userCredential) => {
    const user = userCredential.user;
    await setDoc(doc(db,"users", user.uid), {
        name:name,
        lname:lname,
        email:email,
        uid:user.uid
    });
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        icon: 'success',
        title: 'Signup successfully'
    }).then(()=>{
        location.replace('login.html');
    })
    
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        icon: 'error',
        title: errorMessage
    })
});
}



// Login
window.login=()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        icon: 'success',
        title: 'Login successfully'
    }).then(()=>{  
        location.replace('dashboard.html');
    })
    
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        icon: 'error',
        title: errorMessage
    })
})

}
