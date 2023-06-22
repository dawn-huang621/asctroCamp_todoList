
const addInput = document.querySelector(".add-input")
const addBtn = document.querySelector(".add-btn")
const isFinished = document.querySelector("li input")
const ul = document.querySelector("ul")
const edit = document.querySelector(".edit-btn")

const data = JSON.parse(localStorage.getItem("todos")) || []

// console.log(data)
showList (data)

addBtn.addEventListener("click",(e)=>{
    if(!addInput.value){
        alert("內容不得為空")
    }
    const item = {
            text: `${addInput.value}`,
            finished: false
    }
    data.push(item)
    // console.log(data)
    // console.log(item)
    localStorage.setItem("todos", JSON.stringify(data))
    showList(data)
})

function showList (data) {
    // console.log(data)
    ul.innerHTML = ""
    if(data){
        let str = ''
        data.forEach((item , index)=> {
            str += 
            `<li class="${index}">
                <input type="checkbox" class="is-checked">
                ${item.text}
                <div class="btn-all">
                    <button type="button" class="edit-btn btn btn-primary">編輯</button>
                    <button type="button" class="del-btn btn btn-primary">刪除</button>
                </div>
            </li>`
        });
        addInput.value = ''
        // console.log(str)
        ul.insertAdjacentHTML("beforeend", str) 
    }
}


ul.addEventListener("click",(e)=>{
    // console.log(e.target)
    // console.log(e.target.parentNode)
    // console.log(e.target.parentNode.className)
    // console.log(data)
    data.forEach((list, index) =>{
        let count = 0
        // console.log(index, Number(e.target.parentNode.className))
        id = Number(e.target.parentNode.className)
        if(index === id){
            list.finished = !list.finished
            // console.log(data)
            console.log(list.finished)
            if(list.finished){
                e.target.parentNode.style['text-decoration'] = 'line-through'
            } else {
                e.target.parentNode.style['text-decoration'] = 'none'
            }
        }
        // console.log(list.finished)
    
    // console.log(e.target.className.includes("edit-btn"))
        if(e.target.className.includes("del-btn")){
            if(index === Number(e.target.parentNode.parentNode.className)){
                data.splice(index, 1)
                localStorage.setItem("todos", JSON.stringify(data))
                showList (data)
            }
        }
    })
})
