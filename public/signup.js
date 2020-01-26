const signupButton = document.querySelector('#signupButton');

signupButton.addEventListener('click', () => {

let email = document.querySelector('#email').value;
let password = document.querySelector('#password').value;
let passwordConfirm = document.querySelector('#password-confirm').value;

if(password === passwordConfirm)
{
    let params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    axios.post('http://localhost:5050/admin/signup', params)
    .then((response) => {   
        console.log(response)    
    })
    .catch((err) => {
        console.log(err);
    })
}
else
{
    window.location.replace("http://localhost:5050/admin/signup");    

}
})