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

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs a");
let mode = 'all';
let taskList = [];
let filterList = [];

addButton.addEventListener("click", addTask);

//기존 코드 제거
// for(let i=1; i<tabs.length; i++) { //시작을 1부터 하는 이유? underline때문에
//     tabs[i].addEventListener("click", function(event){filter(event)})
// }

// 새로운 이벤트 리스너 설정
tabs.forEach(tab => {
    tab.addEventListener("click", function(event){
        event.preventDefault(); // href="#" 의 기본 동작 방지
        filter(event);
    });
});


//console.log(tabs)
/*
function render() {
    // 1. 내가 선택한 탭에 따라서
    let list = [];
    if (mode === 'all') {
        // all > taskList
        list = taskList;
    } else if (mode === 'ongoing') {
        // ongoing, done > filterList    
        list = filterList;
    } else if (mode === 'done') {
        list = doneList;
    }
    // 2. 리스트를 달리 보여준다
    
    let resultHTML = '';
    for(let i=0; i<list.length; i++) {
        if(taskList[i].isComplete == true) {
            resultHTML += `<div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`
        } else {
            resultHTML += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`
        }

    }
    
    document.getElementById("task-board").innerHTML = resultHTML;
} */
    function addTask() {
        if (taskInput.value.trim() === "") {
            alert("📝할 일을 입력하세요!");
            return;
        }
    
        // 새로운 task 생성
        let task = {
            id: randomIDGenerate(),
            taskContent: taskInput.value,
            isComplete: false,
        };
    
        // task를 taskList에 추가
        taskList.push(task);
        taskInput.value = ''; // 입력창 초기화
        console.log(taskList);
    
        // render() 호출하여 화면 업데이트
        render();
    }
    
    function render() {
        let list = [];
    
        // 1. 내가 선택한 탭에 따라서
        // 모드에 따라 필터링된 리스트 선택
        if (mode === 'all') {
            list = taskList;  // 전체 리스트
        } else if (mode === 'ongoing' || mode === 'done') {
            list = filterList;  // 진행 중인 리스트
        } 
    
        // 2. 리스트를 달리 보여준다
        let resultHTML = '';
        // task 리스트를 HTML로 변환
        for (let i = 0; i < list.length; i++) {
            let task = list[i];
            resultHTML += `
                <div class="task">
                    <div class="${task.isComplete ? 'task-done' : ''}">${task.taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${task.id}')">Check</button>
                        <button onclick="deleteTask('${task.id}')">Delete</button>
                    </div>
                </div>
            `;
        }
    
        // task-board에 결과 출력
        document.getElementById("task-board").innerHTML = resultHTML;
    }


// 버튼에는 클릭이벤트가 있으며 방식은 두가지가 있다
// 1. addEventListener
// 2. onclick > 버튼에 직접 적용
function toggleComplete(id) {
    console.log("id: ", id);
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;   //스위치처럼 왔다갔다 할 경우 이런 식으로 코드를 작성
            break;
        }
    }
    // 현재 모드에 따라 filterList 업데이트
    updateFilterList();
    render();
    console.log(taskList);
}

function deleteTask(id) {
    console.log("delete id: ", id);
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id === id) {
            taskList.splice(i, 1)
            break;
        }
    }
    // 현재 모드에 따라 filterList 업데이트
    updateFilterList();
    render();   //값이 업데이트가 되면 반드시! UI도 업데이트를 해줘야 함 > 귀찮으면, 자동 업데이트가 되려면 react를 사용해야 함
    //console.log(taskList)
}

// 필터링 로직을 분리한 새로운 함수
function updateFilterList() {
    if (mode === 'all') {
        filterList = [...taskList];
    } else if (mode === 'ongoing') {
        filterList = taskList.filter(task => !task.isComplete);
    } else if (mode === 'done') {
        filterList = taskList.filter(task => task.isComplete);
    }
}

function filter(event) {
    
    //console.log("filter", event.target.id)
    //클릭된 탭의 id를 가져와 mode를 업데이트
    mode = event.target.id
    console.log("클릭된 탭: ", mode); // 현재 모드 출력 (디버깅용)

    // 모든 탭에서 active 클래스를 제거하고 클릭된 탭에 active 클래스를 추가
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    //filterList 초기화
    filterList = [];

    //선택된 mode에 따라 taskList를 필터링하고 render() 호출
    /*
    if (mode === 'all') {
        //전체 리스트를 보여준다
        render();

    } else {
        filterList = [];    //진행중 또는 완료일 경우에만 filterList 초기화

        //진행중인 아이템만 필터링하여 filterList 초기화
        if(mode === 'ongoing') {
            //진행중인 아이템을 보여준다
            //task.isComplete = false
            for (let i=0; i<taskList.length; i++) {
                if (taskList[i].isComplete === false) {
                    filterList.push(taskList[i])
                }
            }
            console.log("진행중", filterList);
        //완료된 아이템만 필터링하여 filterList에 담기
        } else if(mode === 'done') {
            //끝나는 케이스를 보여준다
            //task.isComplete = true
            for (let i=0; i<taskList.length; i++) {
                if (taskList[i].isComplete === true) {
                    filterList.push(taskList[i])
                }
            }
            console.log("완료", filterList);
        }*/

         // 각 모드에 맞게 filterList 업데이트
    if (mode === 'all') {
        filterList = [...taskList]; // taskList의 복사본 생성
        console.log("전체 목록:", filterList);
    } else if (mode === 'ongoing') {
        filterList = taskList.filter(task => !task.isComplete);
        console.log("진행중 목록:", filterList);
    } else if (mode === 'done') {
        filterList = taskList.filter(task => task.isComplete);
        console.log("완료 목록:", filterList);
    }
   
     render();
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

//[과제]
//1. 메뉴 슬라이드 만들기 > O
//2. 진행중, 끝남 탭에서도 삭제가 바로 되게 하기
//3. todoList app 디자인하기 (모바일 버전까지 신경쓰기) > ing
//*** 최소 3번은 연습하기

let underLine = document.getElementById("under-line");
let underLineMenus = document.querySelectorAll("nav:first-child a");
console.log(underLineMenus);

underLineMenus.forEach(menu=>menu.addEventListener("click", (e)=>horizontalIndicator(e)));

function horizontalIndicator(e) {
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}

// 페이지 로드 시 기본으로 첫 번째 탭에 대해 #under-line 설정
window.addEventListener('load', () => {
    const firstTab = underLineMenus[0]; // 첫 번째 탭
    underLine.style.left = firstTab.offsetLeft + "px"; // 첫 번째 탭의 위치
    underLine.style.width = firstTab.offsetWidth + "px"; // 첫 번째 탭의 너비
    underLine.style.top = firstTab.offsetTop + firstTab.offsetHeight + "px"; // 첫 번째 탭의 아래쪽
    firstTab.classList.add('active'); // 기본적으로 첫 번째 탭 활성화
});