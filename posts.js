
const getPosts = async() => {
    const posts = []
    const response = await fetch(`${base_url}/posts`)
    const body = await response.json()
    body.forEach(el => posts.push(el))
        
    document.getElementById('posts').innerHTML = posts.map(post => 
        (`<div class="post-card">
            <h2>Post ID: ${post.id}</h2>
            <p>title: ${post.title}</p>
            <p>author: ${post.author}</p>
        </div>
        `)
    ).join(' ')
}
getPosts()

const addPost = () => {
    const newPost = document.getElementById('newPost')
    const value = newPost.value.trim()
    const postFields = []
    postFields.push(value.split(','))
    newPost.value = ''
    
    fetch(`${base_url}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: postFields[0][0],
            author: postFields[0][1]
        })
    }).catch(e => alert(e))
    getPosts()
}

const updatePost = () => {
    const idEdit = document.getElementById('idEdit')
    const value = idEdit.value.trim()
    idEdit.value = ''
    const postFields = []
    postFields.push(value.split(','))
    console.log(postFields)

    fetch(`${base_url}/posts/${postFields[0][0]}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: postFields[0][1],
            author: postFields[0][2]
        })
    }).then(response => response.json())
    .then(data => console.log(data))
    getPosts()
}

const deletePost = () => {
    const idDel = document.getElementById('idDel')
    const value = idDel.value.trim()
    idDel.value = ''

    fetch(`${base_url}/posts/${value}`, {
        method: 'DELETE',
    }).then(response => response.json())
    .then(data => console.log(data))
    .catch(e => console.log(e))
    
    getPosts()
}

