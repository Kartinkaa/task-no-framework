const getPosts = async () => {
  try {
    const posts = [];
    const response = await fetch(`${BASE_URL}/posts`);
    const body = await response.json();
    if (body !== "") {
      body.forEach((el) => posts.push(el));

      document.getElementById("posts").innerHTML = posts
        .map(
          (post) => `<div class="post-card">
                <h2>Post ID: ${post.id}</h2>
                <p>title: ${post.title}</p>
                <p>author: ${post.author}</p>
            </div>
            `
        )
        .join(" ");
    } else {
      alert(`Something went wrong: ${error}`);
    }
  } catch (error) {
    alert(`Something went wrong: ${error}`);
  }
};
getPosts();

const addPost = () => {
  const newPost = document.getElementById("newPost");
  const value = newPost.value.trim();
  const postFields = [];
  if (value !== "") {
    postFields.push(value.split(","));
    newPost.value = "";
    try {
      fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: postFields[0][0],
          author: postFields[0][1],
        }),
      });
      getPosts();
    } catch (error) {
      alert(`Something went wrong: ${error}`);
    }
  } else {
    alert(`Something went wrong: ${error}`);
  }
};

const updatePost = () => {
  const idEdit = document.getElementById("idEdit");
  const value = idEdit.value.trim();
  idEdit.value = "";
  const postFields = [];
  if (value !== "") {
    postFields.push(value.split(","));
    try {
      fetch(`${BASE_URL}/posts/${postFields[0][0]}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: postFields[0][1],
          author: postFields[0][2],
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      getPosts();
    } catch (error) {
      alert(`Something went wrong: ${error}`);
    }
  } else {
    alert(`Something went wrong: ${error}`);
  }
};

const deletePost = () => {
  const idDel = document.getElementById("idDel");
  const value = idDel.value.trim();
  idDel.value = "";
  if (value !== "") {
    try {
      fetch(`${BASE_URL}/posts/${value}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
      getPosts();
    } catch (error) {
      alert(`Something went wrong: ${error}`);
    }
  } else {
    alert(`Something went wrong: ${error}`);
  }
};
