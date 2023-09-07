//I know i should put some components in their own module but accept my flaws for i am human but will get better....😭😭😭

//Random id generator
function generateRandomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  
  return id;
}

const boxShadows = [
  "0px 1px 10px #33FF57",   // Green
  "0px 1px 10px #5733FF",   // Blue
  "0px 1px 10px #FF33D0",   // Purple
  "0px 1px 10px #33FFC5",   // Teal
  "0px 1px 10px #FF5733",   // Orange
  "0px 1px 10px #33A4FF",   // Sky Blue
  "0px 1px 10px #FF33E0",   // Pink
  "0px 1px 10px #FF7733",   // Coral
  "0px 1px 10px #33FFA7",   // Mint Green
  "0px 1px 10px #FF33F2",   // Magenta
  "0px 1px 10px #33FF33",   // Lime Green
  "0px 1px 10px #FF33FF",   // Hot Pink
  "0px 1px 10px #337AFF",   // Cobalt Blue
  "0px 1px 10px #FFA733",   // Gold
  "0px 1px 10px #33FFA7",   // Aqua
  "0px 1px 10px #FF33FF",   // Fuchsia
  "0px 1px 10px #33A4FF",   // Light Blue
  "0px 1px 10px #FF33D0",   // Orchid
  "0px 1px 10px #33FFC5",   // Cyan
  "0px 1px 10px #FF5733"    // Vermilion
];

let previousBoxShadowIndex = -1; // Initialize to an invalid index

//Getting a random box shadow
function getRandomUniqueBoxShadow() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * boxShadows.length);
  } while (randomIndex === previousBoxShadowIndex); //To Ensure it's not the same as the previous one

  previousBoxShadowIndex = randomIndex; //To Store the current index as the previous one

  return boxShadows[randomIndex];
}

//Due date format for UI
function formatDateTime(dateTimeStr) {
            const options = { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
            };
            return new Date(dateTimeStr).toLocaleString(undefined, options);
        }

//Object for todo-items
class TodoItems {

    constructor( title, description, priority){

        this.id = generateRandomId();
        this.title = title;
        this.description = description;
        this.status = false;
        this.priority = priority;
    }

    setPriorityHigh() {
        const high = 'High';
        return high
    }

    setPriorityMedium() {
        const medium = 'Medium';
        return medium
    }

    setPriorityLow() {
        const low = 'Low';
        return low
    }

    SetStatusComplete() {
        return this.status = true;
    }

      SetStatusReset() {
        return this.status = false;
    }

    deleteItem() {
        this.remove()
    }

}

// Object for todo-group
class TodoGroup {
    static nextId = 1;
    
      constructor(name) {
          
          this.arr = [];
          this.name = name;
          this.id = TodoGroup.nextId++;
         }
       
      changeName(name) {
          this.name = name;
      }


      addTaskFxn(task) {
          this.arr.push(task)
      }

     deleteTask(taskId) {
        this.arr = this.arr.filter((task) => task.id !== taskId);
    }

}

// Creating the task elements
function createTaskInputs() {
    //due date input creation
    const dueDate = document.createElement('input');
    dueDate.id = 'due_date';
    dueDate.type = 'datetime-local';

    //calling a new group item class
    const todoGroup = new TodoGroup;
    todoGroup.name = prompt('Enter the group name');

     const groupWrapper = document.createElement('div');   // creating containers for the entire group of todo items
     groupWrapper.id = `${todoGroup.name}_id`;
     groupWrapper.classList.add('group_wrapper');
    const randomBoxShadow = getRandomUniqueBoxShadow();
    groupWrapper.style.boxShadow = randomBoxShadow;

    const groupTitle = document.createElement('h1');
    groupTitle.style.textAlign = 'center';
    groupTitle.textContent = todoGroup.name || 'click on Edit to enter a name';
    groupTitle.classList.add('title');
    
    // creating the container for the input elements of the todo items
    const addTaskWrapper = document.createElement('div');
    addTaskWrapper.classList.add('addTaskWrapperClass');
    addTaskWrapper.classList.add('addTaskWrapperClass2');

    //creating input elements to enter the todo items
    const frm = document.createElement('form');
    frm.id = `${todoGroup.name}_formId`;
    frm.classList.add('hidden');

    const enterTitle = document.createElement('input');
    enterTitle.setAttribute('maxlength', '35');
    enterTitle.setAttribute('autocomplete', 'off');
    enterTitle.type = 'text';
    enterTitle.id = `task_title_${todoGroup.id}`
    enterTitle.placeholder = 'task name or title';
    enterTitle.setAttribute('autocomplete', 'off');
    enterTitle.setAttribute('maxlength', '20');
  
    const enterDescription = document.createElement('input');
    enterDescription.placeholder = 'enter description';
    enterDescription.type = 'text';
    enterDescription.id = `task_description_${todoGroup.id}`;
    enterDescription.setAttribute('maxlength', '40');
    enterDescription.setAttribute('autocomplete', 'off');

    const priority = document.createElement('select');
    const priorityValue = document.createElement('p');
    priorityValue.id = 'priority_value';
   
    const highOption = document.createElement('option');
    highOption.value = 'high';
    highOption.text = 'High';

    const mediumOption = document.createElement('option');
    mediumOption.value = 'medium';
    mediumOption.text = 'Medium';

    const lowOption = document.createElement('option');
    lowOption.value = 'low';
    lowOption.text = 'Low';

    priority.appendChild(highOption);
    priority.appendChild(mediumOption);
    priority.appendChild(lowOption);

    const addBtn = document.createElement('button');
    addBtn.id = 'addbtn';
    addBtn.textContent = 'Add Task'; 
    //The add task Button to add the inputed items to the UI display and todo array
    addBtn.addEventListener('click', function (e) {
        e.preventDefault()
        const taskTitle = document.getElementById(`task_title_${todoGroup.id}`);
        const taskDesc = document.getElementById(`task_description_${todoGroup.id}`);
        if (!(taskTitle.value) || !(taskDesc.value)) {
            alert('cannot have empty inputs');
            return;
        }        
        const task = new TodoItems(); //create a new todo item task object.
        task.title = taskTitle.value;
        task.description = taskDesc.value;

        const selectedValue = priority.value;
        if (selectedValue === 'high') task.priority = task.setPriorityHigh();
        if (selectedValue === 'medium') task.priority = task.setPriorityMedium();
        if (selectedValue === 'low') task.priority = task.setPriorityLow();        

        const dueDateValue = formatDateTime(dueDate.value);// get the due date and format it

        todoGroup.addTaskFxn(task);
        addTask(task, groupWrapper, todoGroup, dueDateValue);

        taskTitle.value = '';
        taskDesc.value = '';

        document.getElementById(`${todoGroup.name}_id_btn`).classList.remove('hidden');
        frm.classList.add('hidden');
        console.log(todoGroup);
    });
    
    //adding the input fields to the form created
    frm.append(enterTitle);
    frm.append(enterDescription);
    frm.append(priority);
    frm.append(dueDate);
    frm.append(addBtn); 


    const toggleTasksButton = document.createElement('button');    //This is a toggle button that displays and hides all todo tasks. it is passed to the groupedit as an argument
    toggleTasksButton.textContent = 'Hide Tasks';    
    toggleTasksButton.addEventListener('click', function () {
        addNewBtn.classList.toggle('hidden')
        const taskWrappers = groupWrapper.querySelectorAll('.addTaskWrapperClass');
        taskWrappers.forEach((taskWrapper) => {
            taskWrapper.classList.toggle('hidden');
            if (taskWrapper.classList.contains('hidden')) toggleTasksButton.textContent = 'Show Tasks';
            if (!taskWrapper.classList.contains('hidden')) toggleTasksButton.textContent = 'Hide Tasks';

        });
    });
    

    const addNewBtn = document.createElement('div');     //btn for  displaying the form UI for adding new task
    addNewBtn.id = `${todoGroup.name}_id_btn`;
    addNewBtn.classList.add('add_new_btn');    
    addNewBtn.textContent = '+';
    addNewBtn.addEventListener('click', function () {
    document.getElementById(`${todoGroup.name}_id_btn`).classList.add('hidden');
    frm.classList.remove('hidden')
    })


    addTaskWrapper.append(frm);

    groupWrapper.append(groupTitle);
    groupWrapper.append(dateCreated()); // running the date created function for the todoGroup and appending to the;
    groupWrapper.append(groupEdit(groupWrapper, toggleTasksButton));
    groupWrapper.append(addTaskWrapper);
    groupWrapper.append(addNewBtn);
    
    return groupWrapper;

}

//Setting the date each group was created
// function dateCreated() {
//         const date = new Date();
//         const dateWrapper = document.createElement('div');
//         const dateTitle = document.createElement('h3');
//         const dateElement = document.createElement('span');
//         dateWrapper.classList.add('date_title');
//         dateElement.append(date);
//         dateTitle.textContent = 'Date Created:';
//         dateWrapper.append(dateTitle, dateElement);
//         return dateWrapper;
// }
function dateCreated() {
  const date = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  };

  const formattedDate = date.toLocaleDateString('en-US', options);

  const dateWrapper = document.createElement('div');
  const dateTitle = document.createElement('h3');
  const dateElement = document.createElement('span');

  dateWrapper.classList.add('date_title');
  dateElement.textContent = formattedDate;
  dateTitle.textContent = 'Date Created:';

  dateWrapper.append(dateTitle, dateElement);
  return dateWrapper;
}




//Creating the UI display and adding the input elements to the list
function addTask(tsk ,tskWrapper, todoGrp, dueDate) {     
    const taskWrapper = document.createElement('div');
    const idWrp = document.createElement('div');
    const titleWrp = document.createElement('div');
    const descWrp = document.createElement('div');
    const statusWrp = document.createElement('div');
    const priorityWrp = document.createElement('div');
    const dueDateWrp = document.createElement('div');

    idWrp.classList.add('taskWrapper');
    titleWrp.classList.add('taskWrapper');
    descWrp.classList.add('taskWrapper');
    statusWrp.classList.add('taskWrapper');
    priorityWrp.classList.add('taskWrapper');
    dueDateWrp.classList.add('taskWrapper');


    taskWrapper.classList.add('addTaskWrapperClass');

    const idName = document.createElement('P');
    const titelName = document.createElement('P');
    const descName = document.createElement('P');
     const titleUI = document.createElement('p');
     const idUI = document.createElement('p');
     const selectStatus = document.createElement('input');
     const priorityUI = document.createElement('p');
     const label = document.createElement('label');
     const descriptionUI = document.createElement('p');
     const deleteTask = document.createElement('button');
     const priorityName = document.createElement('p');
     const dueDateName = document.createElement('p');    
     const dueDateUi = document.createElement('p');

    
    priorityName.textContent='Priority:'
    idName.textContent = 'ID:';
    descName.textContent = 'Description:'
    titelName.textContent = 'Title:'
    dueDateName.textContent='Due Date:'
    label.textContent = 'Completed Task:';
    dueDateUi.textContent = dueDate;
    
    selectStatus.type = 'checkbox';
    descName.id = 'descName';
    titelName.id = 'titelName';
    label.id = 'labelName';
    label.setAttribute('for', 'selectStatusId');
    selectStatus.id = 'statusName';
    priorityName.id = 'priorityName';
    deleteTask.id = 'delTask';
    deleteTask.classList.add('deleteButton')
    deleteTask.textContent = 'click completed to delete ';
    deleteTask.disabled = true;
    
    taskWrapper.id = tsk.id;
    idUI.textContent = tsk.id;
    idUI.id = 'idName';    
    titleUI.textContent = tsk.title;
    titleUI.id="titleUi"
    descriptionUI.textContent = tsk.description;
    descriptionUI.id='descUi'
    priorityUI.textContent = tsk.priority;
    priorityUI.id = "priorityui";
    dueDateUi.id = 'due_date_ui'
      
    idWrp.append(idName);
    idWrp.append(idUI);
    titleWrp.append(titelName);
    titleWrp.append(titleUI);
    descWrp.append(descName);
    descWrp.append(descriptionUI);
    statusWrp.append(label);
    statusWrp.append(selectStatus); 
    priorityWrp.append(priorityName);
    priorityWrp.append(priorityUI);
    dueDateWrp.append(dueDateName);
    dueDateWrp.append(dueDateUi);


    taskWrapper.append(idWrp);
    taskWrapper.append(titleWrp);
    taskWrapper.append(descWrp);
    taskWrapper.append(statusWrp);     
    taskWrapper.append(priorityWrp);    
    taskWrapper.append(dueDateWrp); 
    taskWrapper.append(deleteTask); 

    tskWrapper.append(taskWrapper);
    
    
    selectStatus.addEventListener('change', function () {
    // If the checkbox is checked, enable the delete button; otherwise, disable it
    if (selectStatus.checked) {
        deleteTask.disabled = false;
        deleteTask.textContent = 'Delete Completed Task';
        deleteTask.style.backgroundColor = '#FF0000'; // Change the button's color
        } else {
            deleteTask.disabled = true;
            deleteTask.textContent = 'Completed Task must be checked'; // Change the button's text
            deleteTask.style.backgroundColor = ''; // Remove the background color
        }
    });

    deleteTask.addEventListener('click', function (e) {        
        const todoItem = e.target.closest('.addTaskWrapperClass');
    
        if (todoItem) {
            const delId = todoItem.getAttribute('id');
            todoItem.remove();            
            todoGrp.deleteTask(delId);
        }            
    });

    return tskWrapper;
}

//Edit function for todo group
function groupEdit(el, elz) {
    const groupActions = document.createElement('div');
    groupActions.classList.add('editGroup');    
    groupActions.addEventListener('click', function () {
        deleteGroupBtn.classList.toggle('hidden');
        renameGroupBtn.classList.toggle('hidden');
        elz.classList.toggle('hidden')
        groupBtnMessage.textContent = groupBtnMessage.textContent === 'Edit'
        ? 'Hide' : 'Edit';
    })


    const groupBtnMessage = document.createElement('p');
    groupBtnMessage.innerHTML = 'Edit';
    groupBtnMessage.classList.add('msgBtn')


    const deleteGroupBtn = document.createElement('button');
    deleteGroupBtn.textContent = 'delete group';
    deleteGroupBtn.classList.add('hidden');
    deleteGroupBtn.classList.add('editBtn', 'btn');   
    deleteGroupBtn.addEventListener('click', function () {
        el.remove();

    })

    const renameGroupBtn = document.createElement('button');
    renameGroupBtn.classList.add('hidden');
    renameGroupBtn.classList.add('editBtn', 'btn');
    renameGroupBtn.textContent = 'rename group';
    renameGroupBtn.addEventListener('click', function () {
        const newName = prompt('Enter a new Group Name');
        //select the first h1 element which happens to be the group name
        const nameContainer = el.querySelector('h1');
        nameContainer.textContent=newName|| 'click group Edit to add a group name'

    })


    elz.classList.add('hidden');
    elz.classList.add('editBtn', 'btn');    

    groupActions.append(groupBtnMessage);
    groupActions.append(deleteGroupBtn);
    groupActions.append(renameGroupBtn);
    groupActions.append(elz);      
    
    return groupActions
        
    }


//Adding a taskcreation button
function createTaskButton() {
    const createTaskButton = document.createElement('button');
    createTaskButton.classList.add('createTaskButton')
    createTaskButton.innerHTML = 'create task group';
    createTaskButton.addEventListener('click', function () {
        const content = document.getElementById('content');
        content.append(createTaskInputs());        
        createTaskButton.classList.add('groupadded');
    })
 
  return  createTaskButton;
};


export { TodoItems, createTaskInputs, addTask, createTaskButton }

