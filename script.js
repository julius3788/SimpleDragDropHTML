const cards = document.querySelectorAll(".card")
const lists = document.querySelectorAll(".list")

for(const card of cards){
    card.addEventListener("dragstart",dragStart)
    card.addEventListener("dragend",dragEnd)
}

for(const list of lists){
    list.addEventListener("dragover",dragOver)
    list.addEventListener("dragenter",dragEnter)
    list.addEventListener("dragleave",dragLeave)
    list.addEventListener("drop",dragDrop)
}

function dragStart(e){
    e.dataTransfer.setData("text/plain",this.id)
}

function dragEnd(){
    console.log("Drag ended");
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();

    this.classList.add("over");
}


function dragDrop(e){
const id = e.dataTransfer.getData("text/plain")

const card =document.getElementById(id)

this.appendChild(card);

this.classList.remove("over");
}

function dragLeave(e) {
   this.classList.remove("over");

}

let cardCounter = 4;

function addCard() {
    const input = document.getElementById("newCardText");
    const text = input.value.trim();

    if (text === "") return;

    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("draggable", "true");

    newCard.id = "card" + cardCounter++;
    newCard.textContent = text;

    // tombol delete
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "×";

    newCard.appendChild(deleteBtn);

    // drag event
    newCard.addEventListener("dragstart", dragStart);
    newCard.addEventListener("dragend", dragEnd);

    document.getElementById("list1").appendChild(newCard);

    input.value = "";
}

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-btn")) {
        const card = e.target.parentElement;

        const confirmDelete = confirm("Are you sure you want to delete this card?");
        
        if (confirmDelete) {
            card.remove();
        }
    }
});

document.addEventListener("dblclick", function(e) {
    if (e.target.classList.contains("card")) {

        const card = e.target;

        // ambil text tanpa tombol delete
        const currentText = card.childNodes[0].nodeValue.trim();

        const newText = prompt("Edit your task:", currentText);

        if (newText !== null && newText.trim() !== "") {
            // update text tanpa menghapus tombol delete
            card.childNodes[0].nodeValue = newText + " ";
        }
    }
});