const inp=document.querySelector("#overlay-input");

document.querySelector(".add-todo").addEventListener("click", () => {
    document.querySelector(".overlay-background").classList.remove("hide");
})

document.querySelector(".cancel-overlay").addEventListener("click", (canceloverlay))

function canceloverlay() {
    document.querySelector(".overlay-background").classList.add("hide");
    inp.value = "";
}

inp.addEventListener("keyup", (func));

document.querySelector(".submit-overlay").addEventListener("click", (addtodo));

function func(e){
if(e.keyCode === 13){
    addtodo();
}};

function addtodo(){   
    if(inp.value === ""){
        alert("please write something");
        return;
    }

    if(inp.value.length > 120){
        alert("too long");
        return;
    }

    const article=document.createElement("article");
    article.classList.add("todo-unchecked");

    const divt = document.createElement("div");
    divt.classList.add("todo-icon");
    article.appendChild(divt);

    const img = document.createElement("img");
    img.src="assets/checkmark.svg";
    img.alt="Checkmark";
    divt.appendChild(img);
    
    const divb = document.createElement("div");
    divb.classList.add("todo-description");
    divb.textContent=inp.value;
    article.appendChild(divb);

    const divtrash = document.createElement("div");
    divtrash.classList.add("trash-icon");
    article.appendChild(divtrash);
    
    const imgtrash = document.createElement("img");
    imgtrash.src="assets/trash.svg";
    imgtrash.alt="Checkmark";
    divtrash.appendChild(imgtrash);

    document.querySelector("main").appendChild(article);
    document.querySelector(".overlay-background").classList.add("hide");
    inp.value = "";
};
