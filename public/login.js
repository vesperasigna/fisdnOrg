const loginButton = document.querySelector('#loginButton');

loginButton.addEventListener('click', () => {

let email = document.querySelector('#email').value;
let password = document.querySelector('#password').value;

// simulating a POST form (url-encoded) as explained in AXIOS doc: 
    let params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    axios.post('http://localhost:5050/admin/login', params)
    .then(() => {
        window.location.replace("http://localhost:5050/admin");    
    })
})