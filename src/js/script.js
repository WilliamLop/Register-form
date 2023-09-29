const form = document.getElementById('form');
const nombre = document.querySelector("#nombre");
const email = document.querySelector("#email");
const registerCard = document.querySelector("#register-container");
const topicsCard = document.querySelector("#topics-container");
const textError = document.querySelectorAll("#text-error");
const topicsCheckboxes = document.querySelectorAll('#topics-container input[type="checkbox"]');
const topicsError = document.getElementById('text-error-topics');
const dataContainer = document.getElementById('data-container');
const dataContent = document.getElementById('data-content');
const button = document.getElementById('button');
console.log(dataContent)

function isValid(field, regex) {
    return regex.test(field.value);
}

function showError(messageIndex, condition) {
    if (condition) {
        textError[messageIndex].classList.remove('hidden');
    } else {
        textError[messageIndex].classList.add('hidden');
    }
}

nombre.addEventListener('input', () => {
    let nameValid = isValid(nombre, /\S+/);
    showError(0, !nameValid); nombre
});

email.addEventListener('input', () => {
    let emailValid = isValid(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
    showError(1, !emailValid);
});
// Obtén todos los botones y círculos
const buttons = document.querySelectorAll('#set-btn'); 
const circles = document.querySelectorAll('#set-span');

// Guarda las clases iniciales de los botones en un array
const initialButtonClasses = Array.from(buttons).map(button => button.className);

// Guarda las clases iniciales de los círculos en un array
const initialCircleClasses = Array.from(circles).map(circle => circle.className);

// Función para restaurar el estado inicial de los botones
function restoreInitialButtonState() {
    buttons.forEach((button, index) => {
        button.className = initialButtonClasses[index];
    });
    circles.forEach((circle, index) => {
        circle.className = initialCircleClasses[index];
    });
}


let currentStep = 1;

// Función para actualizar el estado de los botones
function updateStepButtons() {


     // Remueve la clase 'bg-VeryViolet/30' de todos los botones
    buttons.forEach((button) => {
        button.classList.remove('bg-VeryViolet/30', 'p-1');
    });

    // Agrega la clase 'bg-VeryViolet/30' al botón correspondiente al paso actual
    buttons[currentStep - 1].classList.add('bg-VeryViolet/30', 'p-1');

    // Agrega la clase 'active' al botón y al círculo correspondiente según el paso actual
    buttons.forEach((button, index) => {
        if (index + 1 === currentStep) {
            button.classList.remove('bg-DesaturedGray/50');
            button.classList.add('bg-VeryViolet/30', 'p-1');
            circles[index].classList.add('bg-LightViolet');
        } 
    });
    
}

// Función para actualizar el número de step en el elemento <p>
function updateStepNumber() {
    const stepParagraph = document.getElementById('step-paragraph');
    stepParagraph.textContent = `Step ${currentStep} of 3`; // Cambia 3 al número total de pasos en tu formulario
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!registerCard.classList.contains('hidden')) {
        // Código para el contenedor de register
        let nameValid = isValid(nombre, /\S+/);
        let emailValid = isValid(email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);

        if (nameValid) {
            showError(0, false); // Ocultar el mensaje de error del nombre

        } else {
            showError(0, true); // Mostrar el mensaje de error del nombre
        }

        if (emailValid) {
            showError(1, false); // Ocultar el mensaje de error del correo
        } else {
            showError(1, true); // Mostrar el mensaje de error del correo
        }

        if (nameValid && emailValid) {
            registerCard.classList.add('hidden');
            topicsCard.classList.remove('hidden');
            currentStep = 2; // Avanzar al segundo paso
            updateStepNumber(); // Actualiza el número de ste
            updateStepButtons();
        }
            // ...
    } else if (!topicsCard.classList.contains('hidden')) {
        // Código para el contenedor de topics
        let atLeastOneTopicSelected = false;
        
        topicsCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                atLeastOneTopicSelected = true;
            }
        });
        
        if (atLeastOneTopicSelected) {
            topicsCard.classList.add('hidden');
            // Mostrar el siguiente contenedor aquí
            dataContainer.classList.remove('hidden');
            currentStep = 3; // Avanzar al segundo paso
            updateStepNumber(); // Actualiza el número de ste
            updateStepButtons();

        } else {
            topicsError.classList.remove('hidden');
        
        }
        
        const nameValue = nombre.value;
        const emailValue = email.value;
        const selectedTopics = [];
        
        topicsCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                selectedTopics.push(checkbox.value);
            }
        });
        
        dataContent.innerHTML = `
        <div class="grid gap-6 font-inter">

            <div class="grid gap-1 text-sm">
                <p class="text-DesaturedGray uppercase">Contact</p>
                <p class="text-DesaturedWhite pl-4">🐱‍👤 : ${nameValue}</p>
                <p class="text-DesaturedWhite pl-4">📩 : ${emailValue}</p>
            </div>

            <div class="grid gap-2 text-sm">
                <p class="text-DesaturedGray uppercase">Topics</p>
                <ul class="text-DesaturedWhite grid gap-1">
                ${
                    selectedTopics.map(topic => (
                        `
                        <li class="flex pl-4 items-center text-sm gap-1"><span>🔮</span> ${topic}</li>`                    
                    )).join('')
                }
                </ul>
            </div>
        </div>
        `;
            
        button.value = 'Confirm';
        // ...
        // Código para el contenedor de data
    } else if (!dataContainer.classList.contains('hidden')) {

        // Restablecer el estado de los botones y círculos
        updateStepButtons();

        // Restablecer las clases labelTopics y spanTopic
        labelTopics.forEach((labelTopic) => {
            labelTopic.classList.remove('bg-VeryViolet');
        });

        spanTopic.forEach((span) => {
            span.classList.remove('text-DesaturedWhite');
        });

        registerCard.classList.remove('hidden');
        dataContainer.classList.add('hidden');

        // Obtén todas las casillas de verificación de temas nuevamente
        const topicCheckboxes = document.querySelectorAll('input[type="checkbox"][name="topic"]');
        
        // Desmarca todas las casillas de verificación de temas
        topicCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        
        form.reset();

        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({});

        button.value ="Continue";

        currentStep = 1;
        updateStepNumber();
        restoreInitialButtonState()

    }

});


const labelTopics = document.querySelectorAll('#topic-label');
const spanTopic = document.querySelectorAll('#spanTopics');

labelTopics.forEach((labelTopic, i) => {
    labelTopic.addEventListener('click', (e) => {
        labelTopic.classList.toggle('bg-VeryViolet');

        spanTopic.forEach((span, j) => {
            if (i === j) {
                span.classList.toggle('text-DesaturedWhite');
            }
        })
    })
})


topicsCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
            topicsError.classList.add('hidden');
        }
    });
});


updateStepNumber();
updateStepButtons();






