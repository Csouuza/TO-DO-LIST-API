
        const table = document.querySelector('[data-table]');
        const inputNewTask = document.querySelector('#input-new-task');
        const buttonNewTask = document.querySelector('#button-new-task');

        function createNewLine(id, task) {
            const lineNewTask = document.createElement('tr');
            const contents = `
                <td class="td" data-td>${task}</td>
                <td>
                    <ul class="table__buttons-controll">
                        <li><button class="button-simple button-simple--edit" type="button" data-id="${id}" data-task="${task}">Editar</button></li>
                        <li><button class="button-simple button-simple--delete" type="button" data-id="${id}">Excluir</button></li>
                    </ul>
                </td> 
            `;
            lineNewTask.innerHTML = contents;
            return lineNewTask;
        }

        function clearInput() {
            inputNewTask.value = '';
            inputNewTask.focus();
        }

        async function loadTasks() {
            try {
                const response = await fetch('http://localhost:3000/list');
                const data = await response.json();

                data.forEach(element => {
                    table.appendChild(createNewLine(element.id, element.task));
                });
            } catch (error) {
                console.error(error);
            }
        }

        const buttonNewTask = document.querySelector('#button-new-task');
        const inputNewTask = document.querySelector('#input-new-task');
        
        buttonNewTask.addEventListener('click', () => {
        const newTaskValue = inputNewTask.value;
        
        fetch('http://localhost:3000/list', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: newTaskValue })
        })
        .then(response => response.json())
        .then(data => {
            const newTask = createNewLine(data.id, data.task);
            table.appendChild(newTask);
            inputNewTask.value = '';
        })
        .catch(error => console.error(error));
        });
        

        async function editTask(event) {
            const buttonEdit = event.target;
            const id = buttonEdit.dataset.id;
            const task = buttonEdit.dataset.task;

            const newTask = prompt('Editar tarefa', task);
            if (!newTask) return;

            try {
                const response = await fetch('http://localhost:3000/list')
                  } catch (error) {
                    console.error(error);
                  }
                  
                  const table = document.querySelector('[data-table]');
                  const form = document.querySelector('#form-new-task');
                  
                  const http = new XMLHttpRequest();
                  http.open('GET', 'http://localhost:3000/list');
                  http.send();
                  
                  http.onload = () => {
                    const data = JSON.parse(http.response);
                    data.forEach(elemento => {
                      table.appendChild(createNewLine(elemento.id, elemento.task));
                    });
                  };
                  
                  form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const inputNewTask = document.querySelector('#input-new-task');
                    const httpPost = new XMLHttpRequest();
                    httpPost.open('POST', 'http://localhost:3000/add');
                    httpPost.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
                    httpPost.send(JSON.stringify({task: inputNewTask.value}));
                  
                    httpPost.onload = () => {
                      const newTask = JSON.parse(httpPost.response);
                      table.appendChild(createNewLine(newTask.id, newTask.task));
                      inputNewTask.value = '';
                    };
                  });
                  
                  table.addEventListener('click', (event) => {
                    const elementClicked = event.target;
                  
                    if (elementClicked.classList.contains('button-simple--delete')) {
                      const taskId = elementClicked.closest('[data-task]').dataset.task;
                      const httpDelete = new XMLHttpRequest();
                      httpDelete.open('DELETE', `http://localhost:3000/delete/${taskId}`);
                      httpDelete.send();
                  
                      httpDelete.onload = () => {
                        const taskLine = elementClicked.closest('[data-task]');
                        taskLine.remove();
                      };
                    }
                  });
                  
