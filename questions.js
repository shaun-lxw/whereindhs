// Number of questions in quiz
const MAX = 10;
var countqn = 0;
// Array of correct answers
const correctans = ['correct'];
var totalscore=0;
// initialize questions
function Question(pic, ans) {
	this.pic = pic;
	this.ans = ans;
}
var q1 = new Question('pics/q1.jpg', ['correct', 'wrong1', 'wrong2', 'wrong3']);
var q2 = new Question('pics/q2.jpg', ['correct', 'wrong1', 'wrong2', 'wrong3']);
var q3 = new Question('pics/q3.png', ['correct', 'wrong1', 'wrong2', 'wrong3']);
var q4 = new Question('pics/q4.jpg', ['correct', 'wrong1', 'wrong2', 'wrong3']);
var q5 = new Question('pics/q5.jpg', ['correct', 'wrong1', 'wrong2', 'wrong3']);
var q6 = new Question('pics/q6.jpg', ['correct', 'wrong1', 'wrong2', 'wrong3']);
var q7 = new Question('pics/q7.png', ['correct', 'wrong1', 'wrong2', 'wrong3']);
var q8 = new Question('pics/q8.jpg', ['correct', 'wrong1', 'wrong2', 'wrong3']);
var q9 = new Question('pics/q9.jpg', ['correct', 'wrong1', 'wrong2', 'wrong3']);
var q10 = new Question('pics/q10.jpg', ['correct', 'wrong1', 'wrong2', 'wrong3']);
var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

window.onload = start();

function start() {
	randQ();
	// Animate start
	on();
	var score = document.getElementById('score');
	score.innerHTML = 'START!';
	var size = 100;
	var go = setInterval(grow, 5);
	function grow() {
		if (size == 1000) {
			clearInterval(go);
			setTimeout(function() {
				off();
				score.style.fontSize = '350%';
				countdown(10);
				document.getElementById('overlay').onclick = function () {
					if (countqn == MAX) {
						randQ(); 
					} else {
						randQ();
						countdown(10);
					}
				}
			},1000);
		} else {
			size += 5;
			score.style.fontSize = size+'%';
		}
	}
}
function randQ() {
	if (countqn == MAX) {
		document.getElementById('score').innerHTML = 'End of game. Total score: ' + totalscore;
		on();
	}
	else {
		countqn++;
		off();
		var pickqn = Math.floor(Math.random()*questions.length);
		document.getElementById('picture').src = questions[pickqn].pic;
		randA(questions[pickqn].ans);
		questions.splice(pickqn,1);
	}
}
function randA(ans) {
	var buttid=['first','second','third','fourth'];
	var i;
	for (i = 4; i > 0; i--) {
		number = Math.floor(Math.random()*i);
		document.getElementById(buttid[i-1]).innerHTML = ans[number];
		ans.splice(number,1);
	}
}
function checkans(ans) {
	clearInterval(count);
	var time = document.getElementById('timer').innerHTML;
	if (correctans.includes(ans)) {
		if (time > 8) {
			document.getElementById('score').innerHTML = 'Correct Answer! +1pt <br/> Time bonus! +2pt';
			totalscore += 3;
		} 
		else if (time > 5 && time < 9) {
			document.getElementById('score').innerHTML = 'Correct Answer! +1pt <br/> Time bonus! +1pt';
			totalscore += 2;
		}
		else {
			document.getElementById('score').innerHTML = 'Correct Answer! +1pt';
			totalscore++;
		}
		on();
	}
	else {
		score.innerHTML = 'Wrong Answer! -1pt';
		totalscore--
		on();
	}
}
function countdown(time) {
	document.getElementById('timer').innerHTML = time;
	time--;
	count = setInterval(function() {
			if (time > -1) {
				document.getElementById('timer').innerHTML = time;
				time--;
			}
			else {
				clearInterval(count);
				document.getElementById('score').innerHTML = "Time's up! +0pt";
				on();
			}
	}, 1000, time);
}
// overlay
function on() {
  document.getElementById("overlay").style.display = "block";
}
function off() {
  document.getElementById("overlay").style.display = "none";
}
