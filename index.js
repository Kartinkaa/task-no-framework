const ip_url = 'https://api.ipify.org/?format=json'
const base_url = 'http://localhost:3000'


//getting greeting and ip for home page
const header = fetch(ip_url)
.then(response => response.json())
.then(body => {
     document.getElementById('header').innerHTML = 
     (`<h1 class="centerHead1">WELCOME!</h1> <h3 class="centerHead2">Your IP is ${body.ip}</h3>`)
})
.catch(e => console.log(e))

//getting name from /profile
const getProfile = async () => {
    const response = await fetch(`${base_url}/profile`)
    const body = await response.json()
    document.getElementById('profile').innerHTML = (`This is your name: <bold>${body.name.toUpperCase()}</bold>`)
}
getProfile()

const changeName = () =>{
    const newName = document.getElementById('newName')
    const value = newName.value.trim()
    newName.value = ''
    fetch(`${base_url}/profile`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: value,
    })
}).then(response => response.json())

location.reload(true);
}




// fetch(`${base_url}/posts`, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(post)
// }).catch(e => alert(e))


// fetch(`${base_url}/comments/6`, {
//     method: 'PUT',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         body: 'updated comment',
//         id: 6,
//         postId: 6
//     })
// }).then(response => response.json())
// .then(data => console.log(data))

// fetch(`${base_url}/posts/6`, {
//     method: 'DELETE',
// }).then(response => response.json())
// .then(data => console.log(data))

