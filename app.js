const input = document.querySelector("#addtodo")
const form = document.querySelector(".add")
let ul = document.querySelector("ul")
let search = document.querySelector("#search")

function deleteTodo(id)
{
    let lstodos = localStorage.getItem("todos")
    if(lstodos)
    {
        lstodos = JSON.parse(lstodos)
        lstodos = lstodos.filter(todo => todo.id !== id);
        let t = JSON.stringify(lstodos)
        localStorage.setItem('todos',t)
        updateUI()
        search.value=""
    }
}

function updateUI()
{
    const lstodos = localStorage.getItem("todos")
    
    if(lstodos)
    {
        let todos = JSON.parse(lstodos)
        ul.innerHTML=''
        todos.forEach((t)=>{
            let {id,todo}=t
            let li = document.createElement('li')
            li.className=" list-group-item d-flex justify-content-between align-items-center"
            li.innerHTML=`<span>${todo}</span>
            <i class="far fa-trash-alt delete" onClick="deleteTodo(` +`'${id}'` +`)"></i>`
            ul.appendChild(li)
        })
    }

}

search.addEventListener("keyup",function(){
    if(!search.value)
    {
        updateUI()
    }
    else
    {
        const lstodos = localStorage.getItem("todos")
    
        if(lstodos)
        {
            let todos = JSON.parse(lstodos)
            ul.innerHTML=''
            todos.forEach((t)=>{
                let {id,todo}=t
                if (todo.toLowerCase().includes(search.value.toLowerCase())) 
                {
                    let li = document.createElement('li')
                    li.className=" list-group-item d-flex justify-content-between align-items-center"
                    li.innerHTML=`<span>${todo}</span>
                    <i class="far fa-trash-alt delete" onClick="deleteTodo(` +`'${id}'` +`)"></i>`
                    ul.appendChild(li)
                } 
                else 
                {
                    
                }
            })
        }
    }
})


form.addEventListener("submit",function(e){
    e.preventDefault()
    const todo = input.value
    let todos =[]
    const lstodos = localStorage.getItem("todos")
    if(!todo)
    {
        alert("No To Do item found")
        return false
    }
    
    const item = {
        id : uuidv4(),
        todo
    }
    
    todos.push(item)

    if(lstodos)
    {
        let t = JSON.parse(lstodos)
        t.push(item)
        t = JSON.stringify(t)
        localStorage.setItem("todos",t)
    }
    else
    {
        todos = JSON.stringify(todos)
        localStorage.setItem("todos",todos)

    }

    updateUI()
    this.reset()
})
updateUI()