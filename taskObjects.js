
//random id generator
function generateRandomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  
  return id;
    }

//object for todo-items
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

// object for todo-group
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

    deleteME() {
        this.remove()
    }
}

// creating the task elements
function createTaskInputs() {
    //calling a new group item class
    const todoGroup = new TodoGroup;
    todoGroup.name = prompt('Enter the group name');    
    // console.log(todoGroup);
    
    // creating containers for the entire group of todo items
    const groupWrapper = document.createElement('div');
    groupWrapper.id = `${todoGroup.name}_id`;
    groupWrapper.classList.add('group_wrapper');

    // creating the container for the input elements of the todo items
    const addTaskWrapper = document.createElement('div');

    const groupTitle = document.createElement('h1');
    groupTitle.style.textAlign = 'center';
    groupTitle.textContent = todoGroup.name || 'click on Group Settings to enter a name';
    groupTitle.classList.add('title');

    addTaskWrapper.classList.add('addTaskWrapperClass');
    addTaskWrapper.classList.add('addTaskWrapperClass2');

    //creating input elements to enter the todo items
    const frm = document.createElement('form')
    const enterTitle = document.createElement('input');
    enterTitle.setAttribute('maxlength', '35');
    enterTitle.type = 'text';

    enterTitle.id = `task_title_${todoGroup.id}`
    enterTitle.placeholder = 'task name or title';
    
    const enterDescription = document.createElement('input');
    enterDescription.placeholder = 'enter description';
    enterDescription.type = 'text';
    enterDescription.id = `task_description_${todoGroup.id}`;
    enterDescription.setAttribute('maxlength', '35');


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
    const deleteBtn = document.createElement('button');

    addBtn.id = 'addbtn';
    deleteBtn.id = 'deletebtn';

    addBtn.textContent = 'Add Task';
    deleteBtn.textContent = 'Delete Group';
    

 //Button to call new todo items and add the inputed todo items to the UI display
    addBtn.addEventListener('click', function (e) {
        e.preventDefault()
        const taskTitle = document.getElementById(`task_title_${todoGroup.id}`);
        const taskDesc = document.getElementById(`task_description_${todoGroup.id}`);
        if (!(taskTitle.value) || !(taskDesc.value)) {
            alert('cannot have empty inputs');
            return;
        }
           
        const task = new TodoItems();

        task.title = taskTitle.value;
        task.description = taskDesc.value;

        const selectedValue = priority.value;

        if (selectedValue === 'high') task.priority = task.setPriorityHigh();
        if (selectedValue === 'medium') task.priority = task.setPriorityMedium();
        if (selectedValue === 'low') task.priority = task.setPriorityLow();
      
        todoGroup.addTaskFxn(task);
        addTask(task, groupWrapper, todoGroup);

        taskTitle.value = '';
        taskDesc.value = '';
        console.log(todoGroup);
    });

    //adding the input fields to the form created
    frm.append(enterTitle);
    frm.append(enterDescription);
    frm.append(priority);
    frm.append(addBtn);


    addTaskWrapper.append(frm);

    groupWrapper.append(groupTitle);
    groupWrapper.append(groupEdit(groupWrapper));
    groupWrapper.append(addTaskWrapper);
    
    return groupWrapper;

}

//creating the UI display and adding the input elements to the list
function addTask(tsk ,tskWrapper, todoGrp) {     
    const taskWrapper = document.createElement('div');
    const idWrp = document.createElement('div');
    const titleWrp = document.createElement('div');
    const descWrp = document.createElement('div');
    const statusWrp = document.createElement('div');
    const priorityWrp = document.createElement('div');

    idWrp.classList.add('taskWrapper');
    titleWrp.classList.add('taskWrapper');
    descWrp.classList.add('taskWrapper');
    statusWrp.classList.add('taskWrapper');
    priorityWrp.classList.add('taskWrapper');

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
    priorityName.textContent = 'Priority:';

    
    idName.textContent = 'ID:';
    descName.textContent = 'Description:'
    titelName.textContent='Title:'
    label.textContent = 'Status:';
    
    selectStatus.type = 'checkbox';
    descName.id = 'descName';
    titelName.id = 'titelName';
    label.id = 'labelName';
    label.setAttribute('for', 'selectStatusId');
    selectStatus.id = 'statusName';
    priorityName.id = 'priorityName';
    deleteTask.id = 'delTask';
    deleteTask.classList.add('deleteButton')
    deleteTask.textContent = 'delete';
    
    taskWrapper.id = tsk.id;
    idUI.textContent = tsk.id;
    idUI.id = 'idName';    
    titleUI.textContent = tsk.title;
    titleUI.id="titleUi"
    descriptionUI.textContent = tsk.description;
    descriptionUI.id='descUi'
    priorityUI.textContent = tsk.priority;
    priorityUI.id="priorityui"
      
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

    taskWrapper.append(idWrp);
    taskWrapper.append(titleWrp);
    taskWrapper.append(descWrp);
    taskWrapper.append(statusWrp);     
    taskWrapper.append(priorityWrp);    
    taskWrapper.append(deleteTask); 
    tskWrapper.append(taskWrapper);

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


function groupEdit(el) {
    const groupActions = document.createElement('div');
    const groupBtnMessage = document.createElement('p');
    const deleteGroupBtn = document.createElement('button');
    const renameGroupBtn = document.createElement('button'); 
    groupBtnMessage.innerHTML = 'Group Settings';

    groupBtnMessage.classList.add('msgBtn')
    groupActions.classList.add('editGroup');
    deleteGroupBtn.classList.add('hidden');
    deleteGroupBtn.classList.add('editBtn', 'btn');   
    renameGroupBtn.classList.add('hidden');
    renameGroupBtn.classList.add('editBtn', 'btn');
    

    groupActions.addEventListener('click', function () {
        deleteGroupBtn.classList.toggle('hidden');
        renameGroupBtn.classList.toggle('hidden');
        groupBtnMessage.textContent = groupBtnMessage.textContent === 'Group Settings'
        ? 'click to hide edit' : 'Group Settings';


    })

    deleteGroupBtn.textContent = 'delete group';
    renameGroupBtn.textContent = 'rename group';
    
    deleteGroupBtn.addEventListener('click', function () {
        el.remove();

    })
    
    renameGroupBtn.addEventListener('click', function () {
        const newName = prompt('Enter a new Group Name');
        //select the first h1 element which happens to be the group name
        const nameContainer = el.querySelector('h1');
        nameContainer.textContent=newName|| 'click group Setting to add a group name'

    })

    groupActions.append(groupBtnMessage);
    groupActions.append(deleteGroupBtn);
    groupActions.append(renameGroupBtn);
       
    
    return groupActions
        
    }

//adding a taskcreation button
function createTaskButton() {
    const createTaskButton = document.createElement('button');
    createTaskButton.classList.add('createTaskButton')
    createTaskButton.innerHTML = 'create a task group';
    createTaskButton.addEventListener('click', function () {
        const content = document.getElementById('content');
        content.append(createTaskInputs());    
    })
    
 
    
  return  createTaskButton;
};

export { TodoItems, createTaskInputs, addTask, createTaskButton }