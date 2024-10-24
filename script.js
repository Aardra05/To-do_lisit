const inputBox = document.getElementById("input-box");
const lisitContainer = document.getElementById("list-container");

function addTask()
{
    if(inputBox.value==' '){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML =inputBox.value;
        lisitContainer.appendChild(li);
        let span= document.createElement("span");
        span.innerHTML ="\u00d7";
        li.appendChild(span);
    }
    inputBox.value="";
    saveData();
} 
lisitContainer.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);
function saveData(){
    localStorage.setItem("data",lisitContainer.innerHTML);
}
function showTask(){
    localContainer.innerHTML =localStorage.getItem("data");
}
showTask()