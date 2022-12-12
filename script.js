
const body=document.getElementById("view");

const fetchLS=()=>{
    const notes=JSON.parse(localStorage.getItem("LS"));
    notes.forEach((note)=>{add(note)});
}

const addBtn=document.getElementById("add");
addBtn.addEventListener("click",()=>{
    add();
});

const add= (str="")=>{
    const div=document.createElement("div");
    div.classList.add("note");
    div.innerHTML=`
    <div class="note_panel">
        <button class="editBtn" id="editBtn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="saveBtn hidden" id="saveBtn"><i class="fa-solid fa-floppy-disk"></i></button>
        <button class="deleBtn" id="deleBtn"><i class="fa-solid fa-trash"></i></button>
    </div>
    <div class="main"></div>
    <textarea class="text hidden">${str}</textarea>`;
    body.appendChild(div);

    const saveBtn= div.querySelector(".saveBtn");
    const editBtn= div.querySelector(".editBtn");
    const deleBtn= div.querySelector(".deleBtn");
    const main= div.querySelector(".main");
    const textArea= div.querySelector(".text");

    main.innerHTML=marked.parse(textArea.value);
    
    saveBtn.addEventListener("click",()=>{
        main.innerHTML=marked.parse(textArea.value);
        textArea.classList.toggle("hidden");
        main.classList.toggle("hidden");
        saveBtn.classList.toggle("hidden");
        editBtn.classList.toggle("hidden");
        updateLS();
    })
    editBtn.addEventListener("click",()=>{
        textArea.classList.toggle("hidden");
        main.classList.toggle("hidden");
        saveBtn.classList.toggle("hidden");
        editBtn.classList.toggle("hidden");
    })
    deleBtn.addEventListener("click",()=>{
        body.removeChild(div);
        updateLS();
    })
}
const updateLS=()=>{
    const text=document.querySelectorAll(".text");
    let notes=[];
    text.forEach((note)=>{notes.push(note.value)})
    localStorage.setItem("LS",JSON.stringify([...notes]))
}
fetchLS();