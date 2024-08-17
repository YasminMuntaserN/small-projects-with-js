const ToDo ={
  ToDoName :'',
  dueDate:''
}
const ToDolistObject =CreateOrFillToDoList();

function CreateOrFillToDoList(){
   // Parse the stored to-do list, if it exists
  const sortedToDoList = localStorage.getItem('result');
  
    // If toDoList is null or falsy, set it to a default array
  let ToDolistObject =sortedToDoList ?JSON.parse(storedToDoList) :[{ name: '', dueDate: null }];

  return ToDolistObject;
}

function GetToDoName() {
  const toDoName = document.querySelector('.TodoName-input').value.trim();
  return toDoName ? toDoName : false;
}

function GetDueDate() {
  const dueDate = document.querySelector('.dueDate-input').value.trim();
  return dueDate ? dueDate : false;
}

//Display();

function Add(){
// Retrieve values from inputs
  const ToDoName = GetToDoName();
  const dueDate = GetDueDate();

  // Check if either field is missing
  if (!ToDoName || !dueDate) {
    alert('Please fill in both the To-Do Name and Due Date.');
    return; // Exit the function early
  }

  // Create a new ToDo object
  const newToDo = {
    ToDoName: ToDoName,
    dueDate: dueDate
  };

  // Add the new ToDo object to the list
  ToDolistObject.push({ ToDo: newToDo });

  //saveToDoListIntoLocalStorage
  localStorage.setItem('ToDolistObject', JSON.stringify(ToDo));

  Display();
}

function Display() {
  let Html = '';
  
  ToDolistObject.forEach(function(item , i){
    
    if (item && item.ToDo) {
      const toDoItem = item.ToDo;
      Html += `
      <div>${toDoItem.ToDoName}</div>
  
      <div>${toDoItem.dueDate}</div>
  
      <button class=" delete-btn" onclick="remove(${i});" > Delete 
      </button> `;
    }
  });
  document.querySelector('.result').innerHTML = Html;
}

function handleKeyDownInput(event) {
  if (event && event.key == 'Enter') {
    Add();
  }
}

function removeFromList(indexToDelete){
  return ToDolistObject.splice(indexToDelete, 1);
}

  function removeElementInToDoListFromLocalStorage(indexToDelete) {
  const storedToDoList = localStorage.getItem('result');

  if (!storedToDoList) {
    return;
  }

  const array = JSON.parse(storedToDoList);

  if (!array || indexToDelete >= array.length) {
    return;
  }

  array.splice(indexToDelete, 1);
  localStorage.setItem('result', JSON.stringify(array));
}

function remove(indexToDelete) {
   // Remove from the global array
  removeFromList(indexToDelete);

   // Remove from local storage
  removeElementInToDoListFromLocalStorage(indexToDelete);

  //efresh the display after removal
  Display();
}
