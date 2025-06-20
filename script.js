let notes = [];

fetch("coffee.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("splash").innerHTML = html;
  });


window.onload = function () {
  setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("main-app").style.display = "block";
    loadNotes(); 
  }, 5000);
};


function loadNotes() {
  const saved = localStorage.getItem("myNotes");
  if (saved) notes = JSON.parse(saved);
  renderNote();
}
function saveToLocalStorage(){
    localStorage.setItem("myNotes",JSON.stringify(notes));
}
function addNote(){
    const noteInput=document.getElementById("noteInput").value.trim();
    if(noteInput==="") return;
    notes.push(noteInput);
    document.getElementById("noteInput").value="";
    saveToLocalStorage();
    renderNote();

}
function renderNote(){
    const container =document.getElementById("noteList");
    container.innerHTML="";
    notes.forEach((note,index)=>{
        const div=document.createElement("div");
        div.innerHTML=`
        <p>${note}</p>
        <button class="button-85" onClick="editNote(${index})">edit</button>
        <button class="button-85" onClick="deleteNote(${index})">delete</button>
        `;
        container.appendChild(div);

    })

}

function editNote(index){
    const updated=prompt("update note",notes[index]);
    
    if(updated!==null){
    notes[index]=updated;
    saveToLocalStorage();
    renderNote();   }
}
function deleteNote(index){
notes.splice(index,1);
saveToLocalStorage()
renderNote();
}