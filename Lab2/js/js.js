
var parent = document.getElementById("todolist");

var newTask = document.getElementById('newitem')

var checkCounter = 5;

newTask.addEventListener("keyup", function(event){
  event.preventDefault();
  if(event.keyCode === 13 && newTask.value != ""){
    var newLi = document.createElement("li");
    var newIndex = document.createElement("input");
    newIndex.type = "checkbox";
    newIndex.name = "todo";
    checkCounter++;
    newIndex.value = checkCounter;
    newIndex.onchange = function(){
      crossoutHandler(this);
    };
    var newSpan = document.createElement("span");
    newSpan.id="span"+checkCounter;
    var newTnode = document.createTextNode(newTask.value);
    newSpan.appendChild(newTnode);
    newLi.appendChild(newIndex);
    newLi.appendChild(newSpan);
    parent.appendChild(newLi);
    newTask.value = "";
  }
});

function crossoutHandler(checkbox) {
  if(checkbox.checked == false){
    document.getElementById("span"+checkbox.value).classList.remove("done");
  }
  else{
    document.getElementById("span"+checkbox.value).classList.add("done");
  }
}
