import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { db, auth } from "./firebase.mjs";

const querySnapshot = await getDocs(collection(db, "posts"));
var posts = document.getElementById('posts');

document.getElementById('publish').addEventListener('click', async () => {
    var title = document.getElementById('title').value;
    var desc = document.getElementById('textArea').value;
    try {
        const uid = auth.currentUser.uid;
        await addDoc(collection(db, "posts"), {
            title: title,
            desc: desc,
            postedDate: new Date(),
            userId: uid
        });
        // this function will reload the page automatically, we don't need to refresh the page to show the result
        window.location.reload();
        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

const postDelete = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, "posts", id));
    // this function will reload the page automatically, we don't need to refresh the page to show the result of deleted item 
    window.location.reload();
}
window.postDelete = postDelete;

const postUpdate = async (id) => {
    console.log(id);
    const updateList = doc(db, "posts", id);
    var updatedTitle = prompt('Enter Your Updated Title');
    var updatedDesc = prompt('Enter Your Updated Description');
    // Set the "capital" field of the city 'DC'
    await updateDoc(updateList, {
        title: updatedTitle,
        desc: updatedDesc
    }).then(() => {
        // this function will reload the page automatically, we don't need to refresh the page to show the result of updated item 
        window.location.reload();
    });
}
window.postUpdate = postUpdate;

const user = auth.currentUser;
const userPostsQuery = query(collection(db, "posts"), where("userId", "==", user.uid));
const userPostsSnapshot = await getDocs(userPostsQuery);

userPostsSnapshot.forEach((doc) => {
    console.log(doc.data)
    posts.innerHTML += `
    <div class="row">
        <div class="col-md-12 d-flex flex-column">
            <div class="form mt-5 rounded">
                <div style="width: 100%;" class="mt-4 d-flex justify-content-center flex-column align-items-center">
                    <div class="mb-3 col-md-10  d-flex align-items-center">
                       <img style="width:15%; border-radius:100%" src="${'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'}"></img>
                        <h2 style='padding-left:10px'> ${doc.data().title}</h2>
                    </div>
                    <div class="mb-3 col-md-10">
                    <a href="../pages/profile.html" style="font-weight:bold;">Go To Profile</a>
                        <div class="mb-3">
                            ${doc.data().desc}
                        </div>
                        <div class="mb-3 ">
                            <strong>Posted Date:</strong> ${doc.data().postedDate.toDate().toLocaleDateString()}
                        </div>
                        <div style="display: flex;justify-content: flex-start;">
                            <button id="deleteBtn" style="border:none;outline:none; color:purple;" onclick='postDelete("${doc.id}")'>Delete</button>
                            <button id="updateBtn" style="border:none;outline:none; color:purple;" onclick='postUpdate("${doc.id}")'>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
});
