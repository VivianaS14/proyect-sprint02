// Variables
const inputs = document.querySelectorAll('input');
const inputEmail = document.querySelector('#email');
const divsError = document.querySelectorAll('.error');
const form = document.querySelector('#form');

// Funcion creador de elementos <li></li>
const createText = (_text) => {
    let _li = document.createElement("li");
    let _textNode = document.createTextNode(_text);
    _li.appendChild(_textNode);
    return _li;
};

// Funcion mostrar error
const errors = () => {
    inputs.forEach(input => {
        input.classList.add('input-error');
    })
    divsError.forEach(div => {
        div.classList.remove('no-error');
    })
    inputEmail.placeholder = 'email@example/com'
}

// Funcion eliminar error
const noErrors = () => {
    inputs.forEach(input => {
        input.classList.remove('input-error');
    })
    divsError.forEach(div => {
        div.classList.add('no-error');
    })
    inputEmail.placeholder = 'Email Address'
}

// Objeto con valor de los inputs
let newAnswer = {
    name: "",
    lastName: "",
    email: "",
    password: ""
}

// Evento keyup para capturar valor de los input
inputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
        newAnswer[e.target.attributes.name.value] = e.target.value;
    })
})

// Funcion mostrar respuestas en pantalla
const showReplies = () => {
    let container = document.querySelector('.replies');
    container.innerHTML = ''
    let answersJSON = localStorage.getItem('formReplies');
    let answers = JSON.parse(answersJSON);
    
    answers.forEach( e => {
        let ul = document.createElement('ul');
        ul.setAttribute('class', 'card');
    
        let name = createText('Name: ' + e.name);
        let lastName = createText('Last Name: ' + e.lastName);
        let email = createText('Email: ' + e.email);
        let password = createText('Password: ' + e.password);
        
        ul.appendChild(name);
        ul.appendChild(lastName);
        ul.appendChild(email);
        ul.appendChild(password);
        
        container.appendChild(ul);
    })
}

// Evento submit form
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Comprobamos respuestas anteriores del Local Storage
    let _returns = localStorage.getItem('formReplies');
    let answers;

    if (_returns == undefined) {
        answers = [];
    } else {
        answers = JSON.parse(_returns);
    }

    // Almacenamos en Local Storage validando los inputs
    let values = Object.values(newAnswer)
    let trueError = '';
    for (let i = 0; i < values.length; i++) {
        if (values[i] === "") {
            trueError = 'Hay error'
        } else {
            trueError = 'No hay error'
        }
    }

    if (trueError === "Hay error") {
        errors();
    } else {
        answers.push(newAnswer);
        noErrors();
    }

    // Pasamos el obj a JSON y setteamos a Local Storage
    let answersJSON = JSON.stringify(answers);
    localStorage.setItem("formReplies", answersJSON);

    form.reset();
    for (const property in newAnswer) {
        newAnswer[property] = "";
    }
    showReplies();
});