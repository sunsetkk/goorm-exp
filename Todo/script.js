

// 추가 btn 기능
const addBtn = document.querySelector('.add-btn');
const inputWrapper = document.querySelector('.todo-input-wrapper');
const inputTodo = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');

const prioritySelect = document.querySelector('.priority-select');


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
    const priority = parseInt(prioritySelect.value);
    li.className = 'todo-item';
    li.setAttribute('data-category', 'active');

    // 정렬을 위해 현재 시간, 중요도 도 함께 저장
    li.setAttribute('data-date', Date.now());
    li.setAttribute('data-priority', priority);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const prioritySpan = document.createElement('span');
    prioritySpan.className = 'priority-text'
    prioritySpan.textContent = getPriorityEmoji(priority);


    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
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
    li.appendChild(prioritySpan);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    //수정
    span.addEventListener('dblclick', () => {

        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        input.className = 'edit-input';

        // 완료 상태 유지 (클래스 가져오기)
        if (span.classList.contains('completed')) {
            input.classList.add('completed');
        }

        // 텍스트 대신 input 보여주기
        li.replaceChild(input, span);
        input.focus();

        // 엔터 치거나 포커스 아웃하면 수정 완료
        const finishEdit = () => {
            if (input.value.trim() !== '') {
                span.textContent = input.value.trim();
            }
            li.replaceChild(span, input);
        };

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') finishEdit();
        });

        input.addEventListener('blur', finishEdit);
    });

}





// 중요도 표시
function getPriorityEmoji(priority) {
    return ['🟢', '🟡', '🔴'][priority - 1];
}

// 체크박스 data-filter
function inputChecked(checkbox, li) {
    if(checkbox.checked){
        li.setAttribute('data-category', 'completed');
    }else{
        li.setAttribute('data-category', 'active');
    }
}

// filter
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(button => {
    button.addEventListener("click", () =>{
        const filter = button.getAttribute("data-filter");
        const items = document.querySelectorAll(".todo-list li");


        items.forEach(item => {
            const filterAttr = item.getAttribute("data-category");
            console.log("filterAttr : " + filterAttr);
            const matches = filter === "all" || filterAttr.includes(filter);    // 전체 이거나 

            item.style.display = matches ? "flex" : "none";
        });
    });
});


// sort
let isRecentFirst = true;

document.querySelector('.sort-created-btn').addEventListener('click', () => {
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

const sortBtn = document.querySelector('.sort-created-btn');
sortBtn.addEventListener('click', () => {
    // ...정렬 로직
    sortBtn.textContent = isRecentFirst ? '오래된 순' : '최신 순';
});

// priority-sort
let isPriorityFirst = true;

document.querySelector('.sort-priority-btn').addEventListener('click', () => {
    const items = Array.from(document.querySelectorAll('.todo-list li'));

    items.sort((a, b) => {
        const aPriority = parseInt(a.getAttribute('data-priority'));
        const bPriority = parseInt(b.getAttribute('data-priority'));


        return isPriorityFirst ? bPriority - aPriority : aPriority - bPriority;
    });

    const list = document.querySelector('.todo-list');
    items.forEach(item => list.appendChild(item));

    isPriorityFirst = !isPriorityFirst;
});

const priorityBtn = document.querySelector('.sort-priority-btn');
priorityBtn.addEventListener('click', () => {
    // ...정렬 로직
    priorityBtn.textContent = isPriorityFirst ? '중요도 높은 순' : '중요도 낮은 순';
});