const getComments = async () => {
  const comments = [];
  try {
    const response = await fetch(`${BASE_URL}/comments`);
    const body = await response.json();
    if (body !== "") {
      body.forEach((el) => comments.push(el));

      document.getElementById("comments").innerHTML = comments
        .map(
          (comment) =>
            `<div class="post-card">
            <h2>Comment ID: ${comment.id}</h2>
            <p>body: ${comment.body}</p>
            <p>postId: ${comment.postId}</p>
        </div>`
        )
        .join(" ");
    } else {
      alert(`Something went wrong: ${error}`);
    }
  } catch (error) {
    alert(`Something went wrong: ${error}`);
  }
};
getComments();

const addComment = () => {
  const newComment = document.getElementById("newComment");
  const value = newComment.value.trim();
  const commentFields = [];
  if (value !== "") {
    commentFields.push(value.split(","));
    newComment.value = "";
    try {
      fetch(`${BASE_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: commentFields[0][0],
          postId: commentFields[0][1],
        }),
      }).catch((e) => alert(e));
    } catch (error) {
      alert(`Something went wrong: ${error}`);
    }
    getComments();
  } else {
    alert(`Something went wrong: ${error}`);
  }
};

const updateComment = () => {
  const idEdit = document.getElementById("edit");
  const value = idEdit.value.trim();
  const commentFields = [];
  if (value !== "") {
    commentFields.push(value.split(","));
    const id = parseInt(commentFields[0][0]);
    idEdit.value = "";
    try {
      fetch(`${BASE_URL}/comments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: commentFields[0][1],
          postId: parseInt(commentFields[0][2]),
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      getComments();
    } catch (error) {
      alert(`Something went wrong: ${error}`);
    }
  } else {
    alert(`Something went wrong: ${error}`);
  }
};

const deleteComment = () => {
  const idDel = document.getElementById("del");
  const value = idDel.value.trim();
  idDel.value = "";
  if (value !== "") {
    try {
      fetch(`${BASE_URL}/comments/${value}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((e) => console.log(e));

      getComments();
    } catch (error) {
      alert(`Something went wrong: ${error}`);
    }
  } else {
    alert(`Something went wrong: ${error}`);
  }
};
