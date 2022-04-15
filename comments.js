const getComments = async() => {
    const comments = []
    const response = await fetch(`${base_url}/comments`)
    const body = await response.json()
    body.forEach(el => comments.push(el))
        
    document.getElementById('comments').innerHTML = comments.map(comment => 
        `<div class="post-card">
            <h2>Comment ID: ${comment.id}</h2>
            <p>body: ${comment.body}</p>
            <p>postId: ${comment.postId}</p>
        </div>`
    ).join(' ')
}
getComments()

const addComment = () => {
    const newComment = document.getElementById('newComment')
    const value = newComment.value.trim()
    const commentFields = []
    commentFields.push(value.split(','))
    newComment.value = ''
    
    fetch(`${base_url}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body: commentFields[0][0],
            postId: commentFields[0][1]
        })
    }).catch(e => alert(e))

    getComments()
}

const updateComment = () => {
    const idEdit = document.getElementById('edit')
    const value = idEdit.value.trim()
    console.log(value)
    const commentFields = []
    commentFields.push(value.split(','))
    console.log(commentFields)
    const id = parseInt(commentFields[0][0])
    console.log(id)
    idEdit.value = ''

    fetch(`${base_url}/comments/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body: commentFields[0][1],
            postId: parseInt(commentFields[0][2])
        })
    }).then(response => response.json())
    .then(data => console.log(data))
    getComments()
}

const deleteComment = () => {
    const idDel = document.getElementById('del')
    const value = idDel.value.trim()
    idDel.value = ''

    fetch(`${base_url}/comments/${value}`, {
        method: 'DELETE',
    }).then(response => response.json())
    .then(data => console.log(data))
    .catch(e => console.log(e))
    
    getComments()
}
