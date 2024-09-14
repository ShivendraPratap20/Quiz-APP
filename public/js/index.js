let quesArray = [];
let currentQuesIndex;
let totalScore = 0;

fetch('https://quiz-app-taoo.onrender.com/get_ques')
    .then(response => response.json())
    .then(data => quesArray = data)
    .catch(error => console.error('Error loading JSON:', error));

const startBtn          =   document.getElementById("start");
const control           =   document.getElementsByClassName("controls")[0];
const nextBtn           =   document.getElementById("next");
const quesContainer     =   document.getElementsByClassName("question_container")[0];
const quesElement       =   document.getElementById("question");
const optionContainer   =   document.getElementById("option_container");
const heading           =   document.getElementById("heading");
const scoreContainer    =   document.getElementById("score_container");
const score             =   document.getElementById("score");
const restart           =   document.getElementById("restart");

const cllBck = ()=>{
    currentQuesIndex=0;
    startGame();
};
const reset = (func)=>{
    scoreContainer.classList.add("hide");
    totalScore = 0;
    func();
}
startBtn.addEventListener("click",cllBck);
restart.addEventListener("click", ()=>{
    reset(cllBck);
});
nextBtn.addEventListener("click",()=>{ 
    //(currentQuesIndex<quesArray.length-1)? currentQuesIndex+=1:currentQuesIndex = 0;
    if(currentQuesIndex<quesArray.length-1){
        currentQuesIndex++;
    }else{
        scoreContainer.classList.remove("hide");
        score.innerHTML = totalScore;
        quesContainer.classList.add("hide");
        nextBtn.classList.add("hide");
    }
    resetOption();
    showQuestion(currentQuesIndex);
});

function showQuestion(currentQuesIndex){
quesElement.innerHTML = quesArray[currentQuesIndex].question;
optionGenerator(currentQuesIndex);
}
function startGame(){
    quesContainer.classList.remove("hide");
    nextBtn.classList.remove("hide");
    resetOption();
    showQuestion(currentQuesIndex);
    control.classList.add("hide");
    heading.innerHTML = "Quiz"
}
function optionGenerator(currentQuesIndex){
    let correctAnswer;
    for(var i=0;i<quesArray[currentQuesIndex].options.length;i++){
        correctAnswer = quesArray[currentQuesIndex].answer;
        const optBtn = document.createElement("button");
        const opt = document.createTextNode(quesArray[currentQuesIndex].options[i]);
        optBtn.appendChild(opt);
        optionContainer.appendChild(optBtn);
        optBtn.classList.add("col-12");
        optBtn.addEventListener('click', (e)=>{
            if(optBtn.innerHTML === correctAnswer){
                optBtn.classList.add("correct");
                totalScore++;
            } 
            else optBtn.classList.add("wrong");
            var i=0;
            while(i<optionContainer.children.length){
                optionContainer.children[i].disabled = true;
                i++;
            }
        });
    }
}
function resetOption(){
    while(optionContainer.firstChild) optionContainer.firstChild.remove();
}
