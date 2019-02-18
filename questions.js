var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
const correctans = ['correct'];
var totalscore=0;
window.onload = randQ();
function randQ() {
	if (questions.length == 0) {
		document.getElementById('score').innerHTML = 'End of game. Total score: ' + totalscore;
		on();
	}
	else {
		off();
		countdown(10);
		var question = Math.floor(Math.random()*questions.length);
		questions[question]();
		questions.splice(question,1);
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
//questions
function q1() {
	document.getElementById('picture').src = 'pics/q1.jpg';
	ans = ['correct', 'wrong1', 'wrong2', 'wrong3'];
	randA(ans);
}
function q2() {
	document.getElementById('picture').src = 'pics/q2.jpg';
	ans = ['correct', 'wrong1', 'wrong2', 'wrong3'];
	randA(ans);
}
function q3() {
	document.getElementById('picture').src = 'pics/q3.png';
	ans = ['correct', 'wrong1', 'wrong2', 'wrong3'];
	randA(ans);
}
function q4() {
	document.getElementById('picture').src = 'pics/q4.jpg';
	ans = ['correct', 'wrong1', 'wrong2', 'wrong3'];
	randA(ans);
}
function q5() {
	document.getElementById('picture').src = 'pics/q5.jpg';
	ans = ['correct', 'wrong1', 'wrong2', 'wrong3'];
	randA(ans);
}
function q6() {
	document.getElementById('picture').src = 'pics/q6.jpg';
	ans = ['correct', 'wrong1', 'wrong2', 'wrong3'];
	randA(ans);
}
function q7() {
	document.getElementById('picture').src = 'pics/q7.png';
	ans = ['correct', 'wrong1', 'wrong2', 'wrong3'];
	randA(ans);
}
function q8() {
	document.getElementById('picture').src = 'pics/q8.jpg';
	ans = ['correct', 'wrong1', 'wrong2', 'wrong3'];
	randA(ans);
}
function q9() {
	document.getElementById('picture').src = 'pics/q9.jpg';
	ans = ['correct', 'wrong1', 'wrong2', 'wrong3'];
	randA(ans);
}
function q10() {
	document.getElementById('picture').src = 'pics/q10.jpg';
	ans = ['correct', 'wrong1', 'wrong2', 'wrong3'];
	randA(ans);
}
