// Criando uma nova "linha" ou seja, nova linha na tabela para a atividade que posteriormente
// será acrescentada 

        const createNewLine = (task, id) => {
        const lineNewTask = document.createElement('tr');
        const contents = `
        
        
        <td class="td" data-td>${task} 
        </td>
        <td >
        <button class="edit-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg></button>
        <button class="delete-button"  data-id="${id}" > 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
        </svg>
        </button>
        </td>
        `;
        lineNewTask.innerHTML = contents;
        lineNewTask.dataset.id = id;
        
        return lineNewTask;
    };
//  continua o processo de criação de uma nova tarefa e para a div "expandir" junto com as novas atividades
    const tableBody = document.querySelector('[data-table]');

    const updateTaskList = (tasks) => {

        tableBody.innerHTML = '';
        tasks.forEach(task => {
        const newTaskLine = createNewLine(task.task, task.id);
        tableBody.appendChild(newTaskLine);
});
};

//  O get para que a API possa ser usada
    const getTasks = async () => {

    try {

    const response = await fetch('http://localhost:3000/list');

    const tasks = await response.json();

    updateTaskList(tasks);
} 
    catch (error) {
    console.error(error);
}
};
// 
    const formNewTask = document.getElementById('form-new-task');

    formNewTask.addEventListener('submit', (event) => {

    event.preventDefault();

    const inputNewTask = document.getElementById('input-new-task');

    const newTask = { task: inputNewTask.value };

    fetch('http://localhost:3000/list', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
},
    body: JSON.stringify(newTask)
})
    .then(response => response.json())

    .then(data => {

    console.log('New task added successfully:', data);
    inputNewTask.value = '';
    getTasks();
})
    .catch(error => console.error(error));
});

    window.addEventListener('load', () => {
    getTasks();
});

// etapa para que seja possivel deletar as atividades que já estão na API
const deleteTask = async (id) => {
    try {
    const response = await fetch(`http://localhost:3000/list/${id}`,
    { method: 'DELETE' });
    const data = await response.json();
    console.log(data.message);
      // atualiza a lista de tarefas após a exclusão
    updateTaskList(data.tasks);
    } catch (error) {
    console.error(error);
}
};

    tableBody.addEventListener('click', (event) => {
        // console.log('oii')
    if (event.target.classList.contains('delete-button')) {
    const id = event.target.dataset.id;
    deleteTask(id);
    }
});  

// Função para buscar uma tarefa pelo ID
    const getTaskById = async (id) => {
        try {
        const response = await fetch(`http://localhost:3000/list/${id}`);
        const data = await response.json();
        return data;
        } catch (error) {
        console.error(error);
        }
    }
    
    // Função para atualizar uma tarefa
    const editTask = async (task) => {
        try {
        const response = await fetch(`http://localhost:3000/list/${task.id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        const data = await response.json();
        console.log(data);
        } catch (error) {
        console.error(error);
        }
    }
    
    // Event listener para o botão de editar tarefa
    tableBody.addEventListener('click', async (event) => {
        // console.log("oii");
        if (event.target.classList.contains('edit-button')) {
        const id = event.target.dataset.id;
        const task = await getTaskById(id);
        // Abre um prompt para o usuário digitar o novo título da tarefa
        const newTitle = prompt('Digite o novo título da tarefa:', task.task);
        
        // Atualiza o título da tarefa e chama a função editTask para atualizá-la no banco de dados
        if (newTitle !== null && newTitle !== '') {
            task.task = newTitle;
            editTask(task);
        }
        }
    });
    


