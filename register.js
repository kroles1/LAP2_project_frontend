const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', handleRegister);

async function handleRegister(e) {
    e.preventDefault()
    const email = e.target.remail.value
    const username = e.target.rusername.value
    const password = e.target.rpassword.value
    console.log(email, password, username)
    postUser(email, username, password)
}
const postUser = async (email, username, password) => {
    const findName =  await fetch(`http://localhost:3000/users/${username}`)
    console.log(findName.status)

    if(findName.status === 200){
        alert('Username is not available.');
        return;
    }

    await fetch(`http://localhost:3000/users`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "username": username,
            "password": password,
        })
    })
    console.log('posted user!')
}
