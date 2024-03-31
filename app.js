let url = 'https://jsonplaceholder.typicode.com/todos?_limit=5'
const newTask = document.querySelector(".form-control")
const addTaskButton = document.querySelector(".addTaskButton")
const filterButton = document.querySelectorAll('[data-filter]')

function displayError(message) {
    if (!document.querySelector(".alert")){
        const alertElement = document.createElement("div");
        alertElement.classList.add('alert', 'alert-danger', 'm-2');
        alertElement.setAttribute('role', 'alert');
        alertElement.innerText = message;
        document.body.prepend(alertElement);
    }
}

function removeError() {
    const alertElement = document.querySelector('.alert');
    if (alertElement) {
        alertElement.remove();
    }
}

function createTaskElement(task) {
    const listItem = document.createElement("li");
    listItem.classList.add("todo", 'list-group-item', 'd-flex', 'align-items-center');

    const checkBox = document.createElement("input");
    checkBox.classList.add("form-check-input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", "todo-" + task.id);

    const label = document.createElement("label");
    label.classList.add("ms-2", "form-check-label");
    label.setAttribute("for", "todo-" + task.id);
    label.innerHTML = task.title;

    const label2 = document.createElement("label");
    label2.classList.add("ms-auto", "btn", "btn-danger", "btn-sm");

    const i = document.createElement("i");
    i.classList.add("bi-trash");

    label2.appendChild(i);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(label2);

    label2.addEventListener("click", function(event){
        listItem.remove()
    })

    return listItem;
}

async function getTask() {
    try {
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        })
        if (!res.ok) {
            throw new Error("Erreur lors de la récupération des tâches :", {Cause: res})
        }

        const task = await res.json()
        console.log(task)
        return task
    } catch(error) {
       displayError("Une erreur s'est produite lors de la récupération des tâches.")
       console.log({Cause: error})
    }
}

async function DisplayTasks() {
    const task = await getTask()
    const taskList = document.querySelector(".list-group")
    
    task.forEach(task => {
        const listItem = createTaskElement(task)
        taskList.appendChild(listItem)
    });
}

addTaskButton.addEventListener("click", function(event) {
    event.preventDefault() 
    const taskvalue = newTask.value.trim()
    if (taskvalue !== "") {
        const taskList = document.querySelector(".list-group")
        const taskId = taskList.children.length + 1; // ID de la nouvelle tâche
        const task = {id:taskId, title:taskvalue}
        const listItem = createTaskElement(task)
        taskList.insertBefore(listItem, taskList.firstChild)

        newTask.value = ""

        removeError()
    } else {
        displayError("Veillez entrer une tache !")
    }
})

filterButton.forEach(button => {
    button.addEventListener("click", function(){
        const filterValue = this.getAttribute('data-filter');
        const allTasks = document.querySelectorAll('.list-group-item');

        filterButton.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        console.log(filterValue)
        console.log(allTasks)


        for (const task of allTasks) {
            console.log(task)
        }

    });
});

DisplayTasks()