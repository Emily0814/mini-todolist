// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가된다
// delete버튼을 클릭하면, 할일이 삭제된다
// check버튼은 클릭하면, 할일이 종료되면서 밑줄이 생성된다
// 1. check 버튼을 클릭하는 순간 false를 true로 변경한다
// 2. true면 완료로 간주하여 밑줄 생성한다
// 3. false면 미완료로 간주하여 변경하지 않는다

// 진행중 끝남 탭을 클릭하면, 언더바가 이동한다
// 끝남 탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이텝만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let taskList = []
addButton.addEventListener("click", addTask)

function addTask() {
    let taskContent = taskInput.value
    let task = {
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task)
    console.log(taskList)
    render();
}

function render() {
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++) {
        resultHTML += `<div class="task">
                    <div>${taskList[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete()">Check</button>
                        <button>Delete</button>
                    </div>
                </div>`
    }
    
    document.getElementById("task-board").innerHTML = resultHTML;
}

// 버튼에는 클릭이벤트가 있으며 방식은 두가지가 있다
// 1. addEventListener
// 2. onclick > 버튼에 직접 적용
function toggleComplete() {
    
}