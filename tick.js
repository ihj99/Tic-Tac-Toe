//모든 버튼 지정
let grids = document.querySelectorAll('#grid');
//플레이어 ox 선택
let player_select;
//start 버튼
const start = document.querySelector('button');
//input 태그들 처리
let check1 = document.querySelector('#o');
let check2 = document.querySelector('#x');
let select = document.querySelectorAll('.input');
// 확인 처리할 배열
let arr = new Array(8);
let player = new Array(8);
let non_player = new Array(8);
//플레이어 승리 조건 배열
const winConditions = [
    //가로 연결
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //세로 연결
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //대각선 연결
    [0,4,8],
    [2,4,6]
];

//플레이어 표시 모양 선택 함수
function choice() {
    if (check1.checked === true) {
        player_select = "O";
    } else if (check2.checked === true) {
        player_select = "X";
    } else {
        alert('아무 것도 선택되지 않았습니다!');
        alert('확정 후에 다시 시작하세요!');
    }
}


//버튼에 ox 적용 함수
grids.forEach((element, index) => {
    element.addEventListener('click',function () {
        if (player_select === "O") {
            //플레이어 선택 처리
            element.innerText = "O";
            arr[index]='O';
            //플레이어 선택 처리 - 플레이어 승패 처리 배열
            player[index]=true;
            //컴퓨터 선택 처리
            let enemy = computer();
            grids[enemy].innerText = "X";
            arr[enemy]='X';
            //컴퓨터 선택 처리 - 컴퓨터 승패 처리 배열
            non_player[enemy]=true;
        } else if (player_select === "X") {
            //플레이어 선택 처리
            element.innerText = "X";
            arr[index]='X';
            //플레이어 선택 처리 - 플레이어 승패 처리 배열
            player[index]=true;
            //컴퓨터 선택 처리
            let enemy = computer();
            grids[enemy].innerText = "O";
            arr[enemy]='O';
            //컴퓨터 선택 처리 - 컴퓨터 승패 처리 배열
            non_player[enemy]=true;
        } else {
            alert('표기법을 먼저 선택해주세요!');
        }
    });
});

//컴퓨터 처리 함수
function computer() {
    //컴퓨터가 선택 가능한 배열
    let blank=[];
    // 아직 클릭 안 한 배열들의 index값을 담은 배열 생성
    for (let i = 0; i<arr.length; i++) {
        if (arr[i] === undefined) {
            blank.push(i);
        }
    }
    if (blank.length === 0) {
        win_and_lose();
    } else {
        let random = Math.floor(Math.random()*blank.length);
        return blank[random];
    }
    
}

//승패 처리
function win_and_lose() {
    let player_win = false, computer_win = false;
    let computer_select = player_select === "O" ? "X" : "O";
    for (let abc of winConditions) {
        const [a, b, c] = abc;
        if (arr[a] === player_select && arr[b] === player_select && arr[c] === player_select) {
            player_win = true;
        }
        if (arr[a] === computer_select && arr[b] === computer_select && arr[c] === computer_select) {
            computer_win = true;
        }
    }
    if (player_win === true && computer_win === false) {
        alert('플레이어의 승리입니다!');
        
    } else if (player_win === false && computer_win === true) {
        alert('컴퓨터의 승리입니다!');
    } else {
        alert('무승부입니다!');
    }
    console.log(player_win);
    console.log(computer_win);
}

//start 버튼에 이벤트
start.addEventListener('click',choice);
