import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { db } from "./firebase.mjs";

const displayPosts = (querySnapshot) => {
    var postsContainer = document.getElementById('Allposts');

    querySnapshot.forEach((doc) => {
        const postDiv = document.createElement("div");
        postDiv.className = "row";
        postDiv.innerHTML = `
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
                                <button class="deleteBtn" data-id="${doc.id}" style="border:none;outline:none; color:purple;">Delete</button>
                                <button class="updateBtn" data-id="${doc.id}" style="border:none;outline:none; color:purple;">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        
        postsContainer.appendChild(postDiv);
    });

    // Attach event listeners to the dynamically generated buttons
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    const updateButtons = document.querySelectorAll('.updateBtn');

    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => postDelete(button.getAttribute("data-id")));
    });

    updateButtons.forEach((button) => {
        button.addEventListener('click', () => postUpdate(button.getAttribute("data-id")));
    });
};

const querySnapshot = await getDocs(collection(db, "Allposts"));
displayPosts(querySnapshot);
