import { createTaskButton } from './taskObjects.js';

const date = new Date();
console.log(date)

function createHeader() {
    const head = document.createElement('header');
    const headTitle = document.createElement('h1');
    headTitle.textContent = 'your simple Todo application';
    head.id='header'
    head.append(headTitle);
    return head
    
}

export default function Finally() {
    const content = document.getElementById('content');
    content.append(createHeader());
    content.append(createTaskButton());

}



