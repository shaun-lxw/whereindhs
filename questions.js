function signin() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithRedirect(provider);
}
var questions = [q1, q2, q3];
const correctans = ['correct'];
var totalscore=0;
function randQ() {
	if (questions.length == 0) {
		console.log('end game');
		console.log('total score:' + totalscore);
		document.getElementById('score').innerHTML = 'End of game. Total score:' + totalscore;
		on();
	}
	else {
		off()
		countdown(10);
		var question = Math.floor(Math.random()*questions.length);
		questions[question]();
		questions.splice(question,1);
	}
}
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
function countdown(time) {
	document.getElementById('timer').innerHTML = time;
	time--;
	count = setInterval(function() {
			if (time > -1) {
				document.getElementById('timer').innerHTML = time;
				time -= 1;
			}
			else {
				clearInterval(count);
				document.getElementById('score').innerHTML = "Time's up! +0pt";
				on();
			}
	},1000, time);
}
function randA(ans) {
	buttid=['first','second','third','fourth'];
	var i;
	for (i = 4; i > 0; i--) {
		number = Math.floor(Math.random()*i);
		document.getElementById(buttid[i-1]).innerHTML = ans[number];
		ans.splice(number,1);
	}
}
function checkans(ans) {
	if (correctans.includes(ans)) {
		document.getElementById('score').innerHTML = 'Correct Answer! +1pt';
		if (document.getElementById('timer').innerHTML > 5) {
			document.getElementById('score').innerHTML = 'Correct Answer! +1pt <br/> Time bonus! +1pt';
			totalscore += 2;
		}
		else {
			document.getElementById('score').innerHTML = 'Correct Answer! +1pt';
			totalscore++;
		}
		on();
		clearInterval(count);
	}
	else {
		document.getElementById('score').innerHTML = 'Wrong Answer! +0pt';
		on();
		clearInterval(count);
	}
}
function on() {
  document.getElementById("overlay").style.display = "block";
}
function off() {
  document.getElementById("overlay").style.display = "none";
}
