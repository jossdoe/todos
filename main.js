

document.querySelector(".add-todo").addEventListener("click", () => {
    document.querySelector(".overlay-background").classList.remove("hide");
})

document.querySelector(".cancel-overlay").addEventListener("click", () => {
    document.querySelector(".overlay-background").classList.add("hide");
})
document.querySelector(".submit-overlay").addEventListener("click", (addtodo));

function addtodo(){   
    var inp=document.querySelector("#overlay-input");
    
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

    document.querySelector("main").appendChild(article);
    document.querySelector(".overlay-background").classList.add("hide");
    inp.value = "";
    return;
};
