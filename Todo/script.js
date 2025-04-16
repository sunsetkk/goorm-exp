

// 추가 btn 기능
const addBtn = document.querySelector('.add-btn');
const inputWrapper = document.querySelector('.todo-input-wrapper');
const inputTodo = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');


addBtn.addEventListener('click', () => {
    inputWrapper.style.display = 'block';
})

// 할 일 등록 btn
const subBtn = document.querySelector('.submit-btn');


subBtn.addEventListener('click', () => {
    const todoText = inputTodo.value.trim();
    if(todoText !== ''){
        createTodoElement(todoText);    // list 추가
        inputTodo.value = '';           // 입력 창 초기화
        inputWrapper.style.display = 'none';
    }
})

function createTodoElement(text){
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.setAttribute('data-category', 'active');

    // 정렬을 위해 현재 시간도 함께 저장
    li.setAttribute('data-date', Date.now());

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.className = 'delete-button';

    // 체크박스 완료 처리
    checkbox.addEventListener('change', () => {
        span.classList.toggle('completed');
        inputChecked(checkbox, li);
    });

    // 삭제 버튼 처리
    deleteBtn.addEventListener('click', () => {
        todoList.removeChild(li);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

// 체크박스 data-filter
function inputChecked(checkbox, li) {
    if(checkbox.checked){
        console.log('완료되었습니다');
        li.setAttribute('data-category', 'completed');
    }else{
        console.log('진행중입니다.');
        li.setAttribute('data-category', 'active');
    }
}

// filter
const filterBtns = document.querySelectorAll(".filter-btn");



filterBtns.forEach(button => {
    button.addEventListener("click", () =>{
        const filter = button.getAttribute("data-filter");
        const todoItems = document.querySelectorAll(".todo-list li");


        todoItems.forEach(item => {
            const filterAttr = item.getAttribute("data-category");
            console.log("filterAttr : " + filterAttr);
            const matches = filter === "all" || filterAttr.includes(filter);    // 전체 이거나 

            item.style.display = matches ? "flex" : "none";
        });
    });
});

// sort

let isRecentFirst = true;

document.querySelector('.sort-btn').addEventListener('click', () => {
    const items = Array.from(document.querySelectorAll('.todo-list li'));

    items.sort((a, b) => {
        const aTime = parseInt(a.getAttribute('data-date'));
        const bTime = parseInt(b.getAttribute('data-date'));

        return isRecentFirst ? bTime - aTime : aTime - bTime;
    });

    const list = document.querySelector('.todo-list');
    items.forEach(item => list.appendChild(item));

    isRecentFirst = !isRecentFirst;
});

const sortBtn = document.querySelector('.sort-btn');
sortBtn.addEventListener('click', () => {
    // ...정렬 로직
    sortBtn.textContent = isRecentFirst ? '오래된 순' : '최신 순';
});

// 수정
