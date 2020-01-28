const loginButton = document.querySelector('#loginButton');
const loginBlock = document.querySelector('.login-block')
const signupBlock = document.querySelector('.signup-block')



loginButton.addEventListener('click', () => {

let email = document.querySelector('#email').value;
let password = document.querySelector('#password').value;

// simulating a POST form (url-encoded) as explained in AXIOS doc: 
    let params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    loginBlock.innerHTML = "";
    signupBlock.innerHTML = "";

    renderLoader(loginBlock);

    axios.post('https://fisdn.org/admin/login', params)
    .then((response) => {

        if(!response.data.message)
	{
        window.setTimeout(() => {
            loginBlock.innerHTML = "";
            let successButton = document.createElement('button');
            successButton.setAttribute('class', 'button');
            successButton.textContent = 'Access Denied';
            loginBlock.appendChild(successButton);
            window.setTimeout(() => {
                window.location.replace("https://fisdn.org/admin");
            }, 1000);
            }, 2000);
	}
	else
	{
        window.setTimeout(() => {
            loginBlock.innerHTML = "";
            let successButton = document.createElement('button');
            successButton.setAttribute('class', 'button');
            successButton.textContent = response.data.message;
            loginBlock.appendChild(successButton);
            window.setTimeout(() => {
                window.location.replace("https://fisdn.org/admin");
            }, 1000);
            }, 2000);
	}
    })
})


const renderLoader = parent => {
    const loader = `
          <div class="loader">
          <img src="https://fisdn.org/admin/assets/images/three-dots.svg" />
          </div>
      `;
    parent.insertAdjacentHTML("afterbegin", loader);
  };