const API_URL = "https://jsonplaceholder.typicode.com/posts";
const postsContainer = document.getElementById("postsContainer");
const postForm = document.getElementById("postForm");

// fetch and display posts
async function getPosts() {
  try {
    const response = await fetch(API_URL + "?_limit=3"); // get first 3 for demo
    const posts = await response.json();
    displayPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// display post in htmml
function displayPosts(posts) {
  postsContainer.innerHTML = "";
  posts.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <small>User ID: ${post.userId}</small><br>
      <button class="edit-btn" onclick="editPost(${post.id})">Edit</button>
      <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
    `;
    postsContainer.appendChild(div);
  });
}

// add a new post 
postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newPost = {
    userId: 1,
    id: Date.now(), // generate unique id
    title: document.getElementById("title").value,
    body: document.getElementById("body").value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    });
    const data = await response.json();
    alert("Post created successfully!");
    console.log("Created Post:", data);
    postForm.reset();
    getPosts();
  } catch (error) {
    console.error("Error creating post:", error);
  }
});

// update post // put
async function editPost(id) {
  const newTitle = prompt("Enter new title:");
  const newBody = prompt("Enter new body:");

  if (!newTitle || !newBody) return;

  const updatedPost = { title: newTitle, body: newBody, userId: 1 };

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    });

    if (response.status === 200) {
      alert("Post updated successfully!");
      getPosts();
    } else {
      alert("Failed to update post.");
    }
  } catch (error) {
    console.error("Error updating post:", error);
  }
}

// delete post
async function deletePost(id) {
  const confirmed = confirm("Are you sure you want to delete this post?");
  if (!confirmed) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (response.status === 200) {
      alert("Post deleted successfully!");
      getPosts();
    } else {
      alert("Failed to delete post.");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

getPosts();
