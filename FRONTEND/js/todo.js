var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

var todos = document.querySelectorAll("input[type=checkbox]");

function updateTodo(id, completed) {
  // revisen si completed es booleano o string
  json_to_send = {
    "completed" : completed
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      url: 'https://examenwebjesus.herokuapp.com/todos' + id,
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("UPDATE!!")
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}


function loadTodos() {
  $.ajax({
    url: 'https://examenwebjesus.herokuapp.com/todos',
    // url: 'https://tuapp.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        console.log(data[i].description)
        // algo asi:
        // addTodo(data[i]._id, data[i].description, data[i].completed)
        addTodo(data[i]._id, data[i].description, data[i].completed)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://examenwebjesus.herokuapp.com/todos',
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)

      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})


var newTask = document.getElementById('newitem')
var unfinished = document.getElementById("unfinished-list");
var finished = document.getElementById("finished-list");
var checkCounter=0;

function addTodo(id, todoText, completed) {

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
var newTnode = document.createTextNode(todoText);
newSpan.appendChild(newTnode);
newLi.appendChild(newIndex);
newLi.appendChild(newSpan);

if(completed){
  finished.appendChild(newLi);
}else{
  unfinished.appendChild(newLi);
}

}

function crossoutHandler(checkbox) {
  if(checkbox.checked == false){
    document.getElementById("span"+checkbox.value).classList.remove("done");
  }
  else{
    document.getElementById("span"+checkbox.value).classList.add("done");
  }
}
