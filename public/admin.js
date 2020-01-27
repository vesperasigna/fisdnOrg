/* ====================================================
// HELPER FUNCTIONS
======================================================= */
const renderLoader = parent => {
  const loader = `
        <div class="loader">
        <img src="/admin/assets/images/three-dots.svg" />
        </div>
    `;
  parent.insertAdjacentHTML("afterbegin", loader);
};
const isPressed = el => {
  if (el.classList.contains("button-pressed")) {
    return true;
  } else return false;
};
const changeButton = el => {
  if (isPressed(el)) {
    el.classList.remove("button-pressed");
    el.classList.add("button-unpressed");
  } else {
    el.classList.remove("button-unpressed");
    el.classList.add("button-pressed");
  }
};
const renderEl = (parent, el, className = "") => {
  el.setAttribute("class", className);
  parent.appendChild(el);
};
const createDefaultInputGroup = (className = "", id, pl) => {
  let formGroup = document.createElement("div");
  let label = document.createElement("label");
  let input = document.createElement("input");

  formGroup.setAttribute("class", "form-group");
  formGroup.setAttribute("id", `fGroup-${id}`);

  label.setAttribute("for", id);
  label.setAttribute("class", "default-label");
  label.setAttribute("id", "pointer");

  label.textContent = `${id} `;
  label.style.width = "18rem";

  input.setAttribute("type", "text");
  input.setAttribute('class', className);
  input.setAttribute("id", id);
  input.setAttribute("placeholder", pl);

  formGroup.appendChild(label);
  formGroup.appendChild(input);

  return formGroup;
};
const resetField = (formgroup) => {
  formgroup.querySelector(".default-input").value = "";
};
var promptTimeout;
const prompt = () => {
    renderEl(rigthCTerminal, rightCPrompt);
    promptTimeout = window.setTimeout(() => {
            if(rightCPrompt !== undefined)
            {rigthCTerminal.removeChild(rightCPrompt)};
            } , 500)
};
var logPrompt;
const unlogPrompt = (logPr) => {
    window.clearTimeout(promptTimeout);
    window.clearInterval(logPr);
}
const changeMainCFooter = () => {
  if(mainCFooter.classList.contains('main-c__footer__hidden'))
  {
    mainCFooter.classList.remove('main-c__footer__hidden');
    mainCFooter.classList.add('main-c__footer__visible');
  }
  else
  {
    mainCFooter.classList.remove('main-c__footer__visible');
    mainCFooter.classList.add('main-c__footer__hidden');
  }
}

/* ====================================================
// DATA HELPER FUNCTIONS
======================================================= */
const renderLast = () => {
  axios.get('http://fisdn.org/api/films/last')
  .then(response => {
    console.log(response);
    let footerInfo = document.querySelector('.main-footer__info');
    footerInfo.innerHTML = "";
    footerInfo.innerHTML = `
    Last saved film: <span class='main-footer__info-data'> ${response.data[0].filmEnglishTitle}</span> from <span class='main-footer__info-data'>${response.data[0].directorName}</span> (ID: <span class='main-footer__info-data'>${response.data[0].ID}</span>)
    `
  })
}

/* ====================================================
// PRINT LAST FILM AT OPENING
======================================================= */
renderLast();



/* ====================================================
// DOM ELEMENTS
======================================================= */
mainCContainer = document.querySelector("#main-c-container");
mainC = document.querySelector("#main-c");
mainCFooter = document.querySelector("#main-c__footer");
mainFooter = document.querySelector("#main-footer");
rightC = document.querySelector("#right-c-container");
rightCPrompt = document.createElement('span');
rightCPrompt.innerHTML = ">";
rightCMsg = document.createElement('div');
rigthCTerminal = document.querySelector("#right-c__terminal");


/* ====================================================
// LANDING-PAGE CONTENT
======================================================= */
mainCInfo = document.createElement('div');
mainCInfo.innerHTML = `
<p class="auto-label"> Welcome on the FISDN admin-page. </p>
<p>These links can help you to monitor your data : <br>
<span>Get all films : </span><a class="main-c__infoLink" href="http://fisdn.org/api/films" target="_blank">fisdn.org/api/films</a><br>
<span>Get all festivals : </span><a class="main-c__infoLink" href="http://fisdn.org/api/festivals" target="_blank">fisdn.org/api/festivals</a><br>
<span>Get all projections : </span><a class="main-c__infoLink" href="http://fisdn.org/api/projections" target="_blank">fisdn.org/api/projections</a><br>
</p>
<p>
<span>You can add "/id" to get a SINGLE object, e.g: <br></span>
<a class="main-c__infoLink" href="http://fisdn.org/api/films/1" target="_blank">fisdn.org/api/films/1</a><br>
<a class="main-c__infoLink" href="http://fisdn.org/api/festivals/1" target="_blank">fisdn.org/api/festivals/1</a><br>
<a class="main-c__infoLink" href="http://fisdn.org/api/projections/1" target="_blank">fisdn.org/api/festivals/1</a><br>
</p>
<p>This will provide you with a script designed to <br>
help you building new webpages, <br>
<span></span><a class="main-c__infoLink" href="" target="_blank">fisdn.org/api/tools/script</a><br>
</p>
<p>Need to keep an eye on the front-side ? <br>
<span></span><a class="main-c__infoLink" href="http://fisdn.org/archive" target="_blank">fisdn.org/archive</a><br>
</p>
`;
// Render this at start: 
renderEl(mainC, mainCInfo, "main-c__info");



/* ====================================================
// BUTTONS
======================================================= */

let buttonFilm = document.querySelector("#button-film");
let buttonFestival = document.querySelector("#button-festival");
let buttonProjection = document.querySelector("#button-projection");
let buttonCreate = document.querySelector("#left-c__buttonCreate");
let buttonDelete = document.querySelector("#left-c__buttonDelete");
let buttonUpdate = document.querySelector("#left-c__buttonUpdate");
let buttonReset = document.querySelector("#main-c__resetButton");
let buttonExec = document.querySelector("#main-c__execButton");
let buttonLogs = document.querySelector("#right-c__buttonLogs");
let buttonLogOut = document.querySelector('#main-footer__buttonLogOut');



/* ====================================================
// BUTTON'CLICK LOGIC
======================================================= */

buttonFilm.addEventListener("click", () => {
  changeButton(buttonFilm);
  if (isPressed(buttonFestival)) {
    changeButton(buttonFestival);
  }
  if (isPressed(buttonProjection)) {
    changeButton(buttonProjection);
  }
  if (isPressed(buttonCreate)) {
    changeButton(buttonCreate);
  }
  if (isPressed(buttonDelete)) {
    changeButton(buttonDelete);
  }
  if (isPressed(buttonUpdate)) {
    changeButton(buttonUpdate);
  }
});

buttonFestival.addEventListener("click", () => {
  changeButton(buttonFestival);
  if (isPressed(buttonFilm)) {
    changeButton(buttonFilm);
  }
  if (isPressed(buttonProjection)) {
    changeButton(buttonProjection);
  }
  if (isPressed(buttonCreate)) {
    changeButton(buttonCreate);
  }
  if (isPressed(buttonDelete)) {
    changeButton(buttonDelete);
  }
  if (isPressed(buttonUpdate)) {
    changeButton(buttonUpdate);
  }
});

buttonProjection.addEventListener("click", () => {
  changeButton(buttonProjection);
  if (isPressed(buttonFilm)) {
    changeButton(buttonFilm);
  }
  if (isPressed(buttonFestival)) {
    changeButton(buttonFestival);
  }
  if (isPressed(buttonCreate)) {
    changeButton(buttonCreate);
  }
  if (isPressed(buttonDelete)) {
    changeButton(buttonDelete);
  }
  if (isPressed(buttonUpdate)) {
    changeButton(buttonUpdate);
  }
});

buttonCreate.addEventListener("click", () => {
  if (
    isPressed(buttonFilm) ||
    isPressed(buttonFestival) ||
    isPressed(buttonProjection)
  ) {
    changeButton(buttonCreate);
    if (isPressed(buttonDelete)) {
      changeButton(buttonDelete);
    }
    if (isPressed(buttonUpdate)) {
      changeButton(buttonUpdate);
    }
  }
});

buttonDelete.addEventListener("click", () => {
  if (
    isPressed(buttonFilm) ||
    isPressed(buttonFestival) ||
    isPressed(buttonProjection)
  ) {
    changeButton(buttonDelete);
    if (isPressed(buttonCreate)) {
      changeButton(buttonCreate);
    }
    if (isPressed(buttonUpdate)) {
      changeButton(buttonUpdate);
    }
  }
});

buttonUpdate.addEventListener("click", () => {
  if (
    isPressed(buttonFilm) ||
    isPressed(buttonFestival) ||
    isPressed(buttonProjection)
  ) {
    changeButton(buttonUpdate);
    if (isPressed(buttonCreate)) {
      changeButton(buttonCreate);
    }
    if (isPressed(buttonDelete)) {
      changeButton(buttonDelete);
    }
  }
});


/* ====================================================
// INTERFACES FILM
// INPUT FACTORY
======================================================= */
let filmEnglishTitleInputGroup = createDefaultInputGroup(
  "default-input",
  "filmEnglishTitle",
  "at least 4 char, required"
);
let directorNameInputGroup = createDefaultInputGroup(
  "default-input",
  "directorName",
  "at least 4 char, required"
);
let filmYearInputGroup = createDefaultInputGroup(
  "default-input",
  "filmYear",
  "e.g 2020, required"
);
let filmImageInputGroup = createDefaultInputGroup(
  "default-input",
  "filmImage",
  "e.g pattern.png (or enter: null)"
);
let filmIdInputGroup__delete = createDefaultInputGroup(
  "default-input",
  "filmID",
  "Be sure you get the correct ID, no rollback..."
);


/* ====================================================
// INTERFACE CREATE FILM
======================================================= */
buttonCreate.addEventListener("click", () => {
  if (!isPressed(buttonCreate) || !isPressed(buttonFilm)) {
    mainC.innerHTML = "";
    renderEl(mainC, mainCInfo, "main-c__info");


  } else {
    if (isPressed(buttonFilm)) {
      mainC.innerHTML = "";
      // renderEl(mainC, mainCFooter, "form-group");
      renderEl(mainC, filmEnglishTitleInputGroup, "form-group");
      renderEl(mainC, directorNameInputGroup, "form-group");
      renderEl(mainC, filmYearInputGroup, "form-group");
      renderEl(mainC, filmImageInputGroup, "form-group");
      renderEl(mainC, mainCFooter, "main-c__footer__visible")
    }
  }
});

/* ====================================================
// INTERFACE DELETE FILM
======================================================= */
buttonDelete.addEventListener("click", () => {

  if (!isPressed(buttonDelete) || !isPressed(buttonFilm)) {
    mainC.innerHTML = "";
    renderEl(mainC, mainCInfo, "main-c__info");
  } 
  else 
  {
    if (isPressed(buttonFilm)) 
    {
      mainC.innerHTML = "";
      //renderEl(mainC, mainCFooter, "form-group");
      renderEl(mainC, filmIdInputGroup__delete, "form-group");
      renderEl(mainC, mainCFooter, "main-c__footer__visible")
    }
  }
});
/* ====================================================
// OTHER INTERFACES
======================================================= */
buttonFilm.addEventListener("click", () => {
  if (!isPressed(buttonFilm)) {
    mainC.innerHTML = "";
    renderEl(mainC, mainCInfo, "main-c__info");
  }
});

buttonFestival.addEventListener("click", () => {
  if (isPressed(buttonFestival)) {
    mainC.innerHTML = "";
  }
});

buttonProjection.addEventListener("click", () => {
  if (isPressed(buttonProjection)) {
    mainC.innerHTML = "";
  }
});
/* deleted for dev on DELETE FILM INTERFACE
buttonDelete.addEventListener("click", () => {
  if (isPressed(buttonDelete)) {
    mainC.innerHTML = "";
  }
});
*/

buttonUpdate.addEventListener("click", () => {
  if (isPressed(buttonUpdate)) {
    mainC.innerHTML = "";
  }
});

/* ====================================================
// RESET-EVENT AND EXECUTE-EVENT
======================================================= */
// RESET CREATE FILM
buttonReset.addEventListener("click", () => {
  if(isPressed(buttonFilm) && isPressed(buttonCreate))
  {
    resetField(filmEnglishTitleInputGroup);
    resetField(directorNameInputGroup);
    resetField(filmYearInputGroup);
    resetField(filmImageInputGroup);
  }
});

// EXECUTE CREATE FILM
buttonExec.addEventListener("click", () => {
    

    if(isPressed(buttonFilm) && isPressed(buttonCreate))
    {
      if(logPrompt)
      {unlogPrompt(logPrompt);}
      rigthCTerminal.innerHTML = "";
      
      let data = {};
      data.filmEnglishTitle = filmEnglishTitleInputGroup.querySelector(".default-input").value.trim();
      data.directorName = directorNameInputGroup.querySelector(".default-input").value.trim();
      if (data.filmEnglishTitle.length > 3 && data.directorName.length > 3) 
    {
        data.filmYear = filmYearInputGroup.querySelector(".default-input").value.trim();
        data.filmYear = parseInt(data.filmYear);
        data.filmImage = filmImageInputGroup.querySelector(".default-input").value.trim();

    // send POST request no need to JSON.stringify() - by the way, it won't work
        axios
        .post("http://fisdn.org/api/films", data)
        .then(function(response) {
            console.log(response);
            if (response.status == 200) {
                rightCMsg.innerHTML = `
                The film has just been stored,<br> 
                receiving the ID: ${response.data.insertId}.<br>
                See more info here :<br>
                <a style="color:#ffe66d" href="http://fisdn.org/api/films/${response.data.insertId}" target="_blank">
                fisdn.org/api/films/${response.data.insertId}</a>`;
                renderEl(rigthCTerminal, rightCMsg);

                resetField(filmEnglishTitleInputGroup);
                resetField(directorNameInputGroup);
                resetField(filmYearInputGroup);
                resetField(filmImageInputGroup);   

                renderLast();
              
            }
            if (res.status == 400) {
              rightCMsg.innerHTML = `
                The film has NOT been stored<br> 
                Please,<br> 
                be sure that your data is correct !<br>`;
                renderEl(rigthCTerminal, rightCMsg);

            }
            else
            {
              rightCMsg.innerHTML = `
                The film has NOT been stored: <br> 
                the server is down.<br>
                Please contact an admin.<br>
                status: ${res.status}, <br>
                statusText: ${res.statusText}
                `;
                renderEl(rigthCTerminal, rightCMsg);
          }
      })
        .catch(function(error) {
            let res = error.response;
            if (res.status == 400) {
                rightCMsg.innerHTML = `
                  The film has NOT been stored<br> 
                  Please,<br> 
                  be sure that your data is correct !<br>`;
                  renderEl(rigthCTerminal, rightCMsg);

            }
            else
            {
                rightCMsg.innerHTML = `
                  The film has NOT been stored: <br> 
                  the server is down.<br>
                  Please contact an admin.<br>
                  status: ${res.status}, <br>
                  statusText: ${res.statusText}
                  `;
                  renderEl(rigthCTerminal, rightCMsg);

            }
        });
      }
      else
      {
          rightCMsg.innerHTML = `
                    Please be sure <br> 
                    that your data is correct !<br>`;
                    renderEl(rigthCTerminal, rightCMsg);
  
      }
    }
    logPrompt = window.setInterval(prompt, 1000);
});
// RESET DELETE FILM
buttonReset.addEventListener("click", () => {
  if(isPressed(buttonFilm) && isPressed(buttonDelete))
  {
    resetField(filmIdInputGroup__delete);
  }
});
//EXECUTE DELETE FILM
buttonExec.addEventListener("click", () => {
  

  if(isPressed(buttonFilm) && isPressed(buttonDelete))
  {
    if(logPrompt)
    {unlogPrompt(logPrompt);}
    rigthCTerminal.innerHTML = "";

    let data = {};
    data.ID = filmIdInputGroup__delete.querySelector(".default-input").value.trim();
    console.log(data);
    if (data.ID.length)
    {
      axios.delete(`http://fisdn.org/api/films/${data.ID}`)
      .then(function (res) {
        console.log(res.data.msg);
        if (res.status == 200)
        {
          if (res.data.msg === "1") {
            rightCMsg.innerHTML = `
            OK, <br>
            the film ${data.ID}<br>
            has just been deleted.<br>`;
            renderEl(rigthCTerminal, rightCMsg);

            resetField(filmIdInputGroup__delete);
          }
          else
          {
            rightCMsg.innerHTML = res.data.msg;
            renderEl(rigthCTerminal, rightCMsg);
          }
        }
        else
        {
          rightCMsg.innerHTML = `
          The film has NOT been deleted: <br> 
          the server is down.<br>
          Please contact an admin.<br>
          status: ${res.status}, <br>
          statusText: ${res.statusText}
          `;
          renderEl(rigthCTerminal, rightCMsg);

        }
      })
      .catch(function (error) {
        console.log(error.response);
      });
    } 
  }
  logPrompt = window.setInterval(prompt, 1000);
});

/* ====================================================
// LOGS INTERFACE
======================================================= */
buttonLogs.addEventListener("click", () => {
  changeButton(buttonLogs);

  if(logPrompt != null)
  {unlogPrompt(logPrompt);}

  if (isPressed(buttonLogs)) {
    rigthCTerminal.classList.remove("right-c__terminalHidden");
    rigthCTerminal.classList.add("right-c__terminal");
  } else {
    rigthCTerminal.classList.remove("right-c__terminal");
    rigthCTerminal.classList.add("right-c__terminalHidden");
  }
  logPrompt = window.setInterval(prompt, 1000);
  });


  /* ====================================================
// LOG OUT EVENT
======================================================= */
buttonLogOut.addEventListener('click', () => {

  mainFooter.innerHTML = "";
  renderLoader(mainFooter);

  axios.get('http://fisdn.org/admin/logout')
  .then((response) => {

    window.setTimeout(() => {
      let successButton = document.createElement('button');
      successButton.setAttribute('class', 'button');
      successButton.textContent = response.data.message;
      mainFooter.innerHTML = "";
      mainFooter.appendChild(successButton);
      window.setTimeout(() => {
          window.location.replace("http://fisdn.org/admin/login");    
      }, 1000);
      }, 2000);
  })
})

