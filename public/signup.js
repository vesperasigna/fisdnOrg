const signupButton = document.querySelector('#signup-button');
const signupBlock = document.querySelector('.signup-block');
const signupCheck = document.querySelector('.signup-check');
const signupPar = document.querySelector('.signup-par');


const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#password-confirm');

let validEmail = "";
let validPassword = "";

const is_valid_email = (email) => {
    return email.length < 256 && /^[^@]+@[^@]{2,}\.[^@]{2,}$/.test(email) }

const renderLoader = parent => {
    const loader = `
          <div class="loader">
          <img src="/admin/assets/images/three-dots.svg" />
          </div>
      `;
    parent.insertAdjacentHTML("afterbegin", loader);
  };

// INPUT EVENTS
email.addEventListener('input', (e) => {

    let emailCheck = is_valid_email(email.value)

    if(!emailCheck)
    {
        signupPar.textContent = "";
        signupPar.textContent = "This email is not valid"
        validEmail = "";
    }
    else
    {
        signupPar.textContent = "";
        email.value = e.target.value.trim();
        validEmail = email.value;
    }

})

password.addEventListener('input', (e) => {

    if(!validEmail)
    {
        signupPar.textContent = "";
        signupPar.textContent = "First fill in your email."
        validPassword = "";
    }
    else
    {
        if(password.value.length < 8)
        {   
            signupPar.textContent = "";
            signupPar.textContent = "This password is not valid"
            validPassword = "";
        }
        else
        {
            signupPar.textContent = "";
            validPassword = "";
        }
    }
    
    
})

passwordConfirm.addEventListener('input', (e) => {

    if (password.value.length < 8)
    {
        signupPar.textContent = "";
        signupPar.textContent = "First choose a password"
        validPassword = "";
    }
    else
    {
        if(password.value !== passwordConfirm.value)
        {
            signupPar.textContent = "";
            signupPar.textContent = "Password not verified yet.";
            validPassword = "";
        }
        else
        {
            signupPar.textContent = "";
            signupPar.textContent = "Password verified.";
            validPassword = passwordConfirm.value;
    
        }
    }
    
})


// SUBMIT EVENT
signupButton.addEventListener('click', () => {
    if(validEmail != "")
    {
        if(validPassword != "")
        {
            let params = new URLSearchParams();
            params.append('email', validEmail);
            params.append('password', validPassword);

            signupBlock.innerHTML = "";
            signupCheck.innerHTML = "";


            renderLoader(signupBlock);
    
            axios.post('https://fisdn.org/admin/signup', params)
            .then((response) => {  
            
                window.setTimeout(() => {

                    signupBlock.innerHTML = "";

                    let successButton = document.createElement('button');
                    successButton.setAttribute('class', 'button');
                    successButton.textContent = response.data.message;
                    signupBlock.appendChild(successButton);
                
                    let infoText = document.createElement('p');
                    infoText.setAttribute('class', 'signup-par');
                    infoText.innerHTML = `
                    <a class='infoLink' href="https://fisdn.org/admin/login">Now you can login here.</a>
                    `

                    signupBlock.appendChild(infoText);

                }, 2000)
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else
        {
            signupPar.textContent = "";
            signupPar.textContent = "Choose valid email and password";
        }
    }
    else
    {
        signupPar.textContent = "";
        signupPar.textContent = "Choose valid email and password";
    }
})