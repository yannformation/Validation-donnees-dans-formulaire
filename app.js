//validité des inputs
const inputsValidity = {
    user: false,
    email:false,
    password:false,
    passwordConfirmation:false
}

const form = document.querySelector("form");
const container = document.querySelector(".container");

form.addEventListener("submit", handleForm);

let isAnimating =false;
function handleForm(e){
    e.preventDefault()

    const keys = Object.keys(inputsValidity)
    const failedInputs = keys.filter(key => !inputsValidity[key])
    
    // console.log(failedInputs);

    if(failedInputs.length && !isAnimating){
        isAnimating=true;
        container.classList.add("shake");
        setTimeout(() =>{
            container.classList.remove("shake")
            isAnimating =false;
        }, 400)

        failedInputs.forEach(input => {
            const index = keys.indexOf(input)
            showValidation({index:index, validation:false})
        })
    }
    else{
        alert("Données envoyées avec succès !")
        const formEmpty = document.querySelector("form")
        form.reset()
        
    }
}

function showValidation({index, validation}){
    if(validation){
        validationIcons[index].style.display = "inline";
        validationIcons[index].src = "ressources/check.svg";
        if(validationTexts[index])  validationTexts[index].style.display = "none";
    }
    else{
        validationIcons[index].style.display = "inline";
        validationIcons[index].src = "ressources/error.svg";
        if(validationTexts[index])  validationTexts[index].style.display = "block";
    }
}


//Acquisitions des icones
const validationIcons = document.querySelectorAll(".icone-verif");
//Acquisitions des messages d'erreur
const validationTexts = document.querySelectorAll(".error-msg");

//Acquisition de l'input nom utilisateur
const userInput = document.querySelector(".input-group:nth-child(1) input");


// à l'écoute de  l'événement "blur"
userInput.addEventListener("blur", userValidation);
userInput.addEventListener("input", userValidation);
// validation de l'input user
function userValidation(){
    if(userInput.value.length >= 3){
        // validationIcons[0].style.display = "inline";
        // validationIcons[0].src = "ressources/check.svg";
        // validationTexts[0].style.display = "none";
        showValidation({index:0, validation:true})
        inputsValidity.user = true;
    }
    else{
        // validationIcons[0].style.display = "inline";
        // validationIcons[0].src = "ressources/error.svg";
        // validationTexts[0].style.display = "block"; 
        showValidation({index:0, validation:false})
        inputsValidity.user = false;
    }
}



//Acquisition de l'input Email
const mailInput = document.querySelector(".input-group:nth-child(2) input");


// à l'écoute de  l'événement "blur"
mailInput.addEventListener("blur", mailValidation);
mailInput.addEventListener("input", mailValidation);

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
function mailValidation(){
    if(regexEmail.test(mailInput.value)){
        // validationIcons[1].style.display = "inline";
        // validationIcons[1].src = "ressources/check.svg";
        // validationTexts[1].style.display = "none";
        showValidation({index:1, validation:true})
        inputsValidity.email = true;
    }
    else{
        // validationIcons[1].style.display = "inline";
        // validationIcons[1].src = "ressources/error.svg";
        // validationTexts[1].style.display = "block";
        showValidation({index:1, validation:false}) 
        inputsValidity.email = false;
    }
}

//Acquisition de l'input mot de passe
const pswInput = document.querySelector(".input-group:nth-child(3) input");


// à l'écoute de  l'événement "blur"
pswInput.addEventListener("blur", passwordValidation);
pswInput.addEventListener("input", passwordValidation);

const passwordVerification = {
    length:false,
    symbol:false,
    number:false
}

const regexList = {
    symbol: /[^a-zA-Z0-9\s]/, //tout ce qui n'est pas symbole
    number: /[0-9]/
}

let passwordValue;

function passwordValidation(e){
    passwordValue = pswInput.value;
    let validationResult = 0;
    for(const prop in passwordVerification){
        // console.log(prop);
        if(prop === "length"){
            if(passwordValue.length < 6){
                passwordVerification.length = false;
            }
            else{
                passwordVerification.length = true;
                validationResult++;
            }
            continue;
        }
        if(regexList[prop].test(passwordValue)){
            passwordVerification[prop] = true;
            validationResult++;
        }else{
            passwordVerification.length = false;
        }
    }
    // console.log(passwordVerification);
    // console.log(validationResult);

    if (validationResult !==3){
        showValidation({index:2, validation:false})
        inputsValidity.password = false;
    }
    else{
        showValidation({index:2, validation:true})
        inputsValidity.password = true;
    }

    passwordStrength()
}

const lines = document.querySelectorAll(".lines div")

function passwordStrength(){
    const passwordLength = pswInput.value.length;

    if(!passwordLength){
        addlines(0)
    }
    else if(passwordLength > 9 && passwordVerification.symbol && passwordVerification.number){
        addlines(3)
    }
    else if(passwordLength > 6 && passwordVerification.symbol || passwordVerification.number){
        addlines(2)
    }
    else{
        addlines(1)
    }

    function addlines(numberOfLines){
        lines.forEach((el, index) => {
            if(index < numberOfLines){
                el.style.display = "block"
            }
            else{
                el.style.display ="none"
            }
        })
    }
    if(validationIcons[3].style.display ==="inline"){
        confirmPassword()
    }
}

//Acquisition de l'input mot de passe
const confirmInput = document.querySelector(".input-group:nth-child(4) input");


// à l'écoute de  l'événement "blur"
confirmInput.addEventListener("blur", confirmPassword);
confirmInput.addEventListener("input", confirmPassword);

function confirmPassword(){
    const confirmValue = confirmInput.value;

    if(!confirmValue && !passwordValue){
        validationIcons[3].style.display = "none";
    }
    else if(confirmValue !==passwordValue){
        showValidation({index:3, validation:false})
        inputsValidity.passwordConfirmation = false;
    }
    else{
        showValidation({index:3, validation:true})
        inputsValidity.passwordConfirmation = true;
    }
}


