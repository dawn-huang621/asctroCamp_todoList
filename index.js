
const addInput = document.querySelector(".add-input")
const addBtn = document.querySelector(".add-btn")
const isFinished = document.querySelector("li input")
const ul = document.querySelector("ul")
const edit = document.querySelector(".edit-btn")

const rightMouse = document.querySelector(".context-menu")
const reliveList = document.querySelector(".relive-list")

const data = JSON.parse(localStorage.getItem("todos")) || []

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
    ul.innerHTML = ""
    if(data){
        let str = ''
        data.forEach((item , index)=> {
            if(item.finished){
                str += 
                `<li class="${index}" id="finished-line">
                    <input type="checkbox" class="is-checked" checked>
                    ${item.text}
                    <div class="btn-all">
                        <button type="button" class="edit-btn btn btn-primary">編輯</button>
                        <button type="button" class="del-btn btn btn-primary">刪除</button>
                    </div>
                </li>`
            }else{
                str += 
                `<li class="${index}">
                    <input type="checkbox" class="is-checked">
                    ${item.text}
                    <div class="btn-all">
                        <button type="button" class="edit-btn btn btn-primary">編輯</button>
                        <button type="button" class="del-btn btn btn-primary">刪除</button>
                    </div>
                </li>`
            }
        });
        addInput.value = ''
        ul.insertAdjacentHTML("beforeend", str) 
    }
}


ul.addEventListener("click",(e)=>{
    
    if(e.target.className.includes("is-checked")){
        data.forEach((item, index)=>{
            id = Number(e.target.parentNode.className)
            if(index === id){
                item.finished = !item.finished
                localStorage.setItem("todos", JSON.stringify(data))
                showList (data)
                // console.log(e.target.parentNode.checked)
                
                // console.log(item.finished)
            }
        })
    }
    if(e.target.className.includes("del-btn")){
        if(index === Number(e.target.parentNode.parentNode.className)){
            data.splice(index, 1)
            localStorage.setItem("todos", JSON.stringify(data))
            showList (data)
        }
    }    
    if(e.target.className.includes("edit-btn")){
        let content = prompt("請輸入更改內容")
        console.log(content)
        // console.log(e.target.parentNode.parentNode.className)
        data.forEach((item, index)=>{
            if(index === Number(e.target.parentNode.parentNode.className)){
                item.text = content
                localStorage.setItem("todos", JSON.stringify(data))
                showList (data)
            }
        })
    }

    data.forEach(item =>{
        item.finished
    })
})



document.addEventListener("contextmenu",(e)=>{
    e.preventDefault()
    rightMouse.style.display = "block"
    rightMouse.style.left= e.pageX + "px"
    rightMouse.style.top= e.pageY + "px"
})
reliveList.addEventListener("click",(e)=>{
    // e.stopPropagation()
    console.log(e.target)
})