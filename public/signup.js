const signupButton = document.querySelector('#signupButton');

signupButton.addEventListener('click', () => {

let email = document.querySelector('#email').value;
let password = document.querySelector('#password').value;
let passwordConfirm = document.querySelector('#password-confirm').value;

if(password === passwordConfirm)
{

}
else
{
    
}

// simulating a POST form (url-encoded) as explained in AXIOS doc: 
    let params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    axios.post('http://localhost:5050/admin/signup', params)
    .then(() => {
        window.location.replace("http://localhost:5050/login");    
    })
})