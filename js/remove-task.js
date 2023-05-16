// import { deleteTask} from '../js/task'


// table.addEventListener('click', async (evento)=> {
//     let ehBotaoDeDeleta = evento.target.className === 'delete-button'
//     if(ehBotaoDeDeleta){
//         try {
//             const lineTask = evento.target.closest('[data-id]')
//             let id = lineTask.dataset.id
//             await task.removeCliente(id)
//             lineTask.remove()
//         }
//         catch(erro){
//             console.log(erro)
//             window.location.href="../telas/erro.html"
//         }
//     }
// })


// const render = async () =>  {
//     try {
//         const listaClientes = await clienteService.listaClientes()
//         listaClientes.forEach(elemento => {
//             table.appendChild(criaNovaLinha(elemento.task, elemento.id))
//     })
//     }
//     catch(erro){
//         console.log(erro)
//         window.location.href="../telas/erro.html"
//     }
    
// }

// render()