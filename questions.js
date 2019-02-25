// firestore end game data
// ===================================================================
var USER;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
	USER = user;
  }
});
var db = firebase.firestore();
function storeresults() {
	var userRef = db.collection('users').doc(USER.email);
	var d = new Date();
	var dd = d.getDate();
	var mm = d.getMonth()+1;
	var yyyy = d.getFullYear();
	var today = dd + '-' + mm + '-' + yyyy;
	var docRef = userRef.collection('games');
	docRef.add({
		day: today,
		time: d.getTime(),
		score: totalscore
	})
	.then(function() {
		console.log("Document successfully written!");
	})
	.catch(function(error) {
		console.error("Error writing document: ", error);
	});
	}
// ===============================================================	

// Number of questions in quiz
const MAX = 10;
var countqn = 0;
var currqn;
//button id
var buttid = ['first','second','third','fourth'];
// init correct ans
var correctans;
var totalscore=0;
// initialize questions
var questions = [];
function getdata([qn, type]) {
	db.collection('questions').doc(qn).get()
	.then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
		if (type == 'ans') {
			console.log('set ans');
			this[qn].ans = doc.data().ans;
			this[qn].correct = doc.data().ans[0];
		}
		else if (type == 'desc') {
			console.log('set desc');
			this[qn].desc = doc.data().desc;
		}
	if (this[qn].ans && this[qn].desc) {
		questions.push(this[qn])
	}
	}		
	else {
        // doc.data() will be undefined in this case
        console.log("No such document!");		
	}
	});
}
var q1 = new Question('pics/canteen.JPG', ['q1', 'ans'],
'pics/canteenAns.JPG', ['q1', 'desc']);
var q2 = new Question('pics/paradesq.JPG', ['q2', 'ans'],
'pics/paradesqAns.JPG', ['q2', 'desc']);
var q3 = new Question('pics/platform.JPG', ['q3', 'ans'],
'pics/platformAns.JPG', ['q3', 'desc']);
var q4 = new Question('pics/zxy.JPG', ['q4', 'ans'],
'pics/zxyAns.JPG', ['q4', 'desc']);
var q5 = new Question('pics/bell.JPG', ['q5', 'ans'],
'pics/bellAns.JPG', ['q5', 'desc']);
var q6 = new Question('pics/gslswing.JPG', ['q6', 'ans'],
'pics/gslswingAns.JPG', ['q6', 'desc']);
var q7 = new Question('pics/bamboo.JPG', ['q7', 'ans'],
'pics/bambooAns.JPG', ['q7', 'desc']);
var q8 = new Question('pics/canteenswing.JPG', ['q8', 'ans'],
'pics/canteenswingAns.JPG', ['q8', 'desc']);
var q9 = new Question('pics/zxyshelter.JPG', ['q9', 'ans'],
'pics/zxyshelterAns.JPG', ['q9', 'desc']);
var q10 = new Question('pics/track.JPG', ['q10', 'ans'],
'pics/trackAns.JPG', ['q10', 'desc']);
var q11 = new Question('pics/bball.JPG', ['q11', 'ans'],
'pics/bballAns.JPG', ['q11', 'desc']);
//obj with properties pic, ans, anspic, desc, correct
function Question(pic, ans, anspic, desc) {
	this.pic = pic;
	getdata(ans);
	this.anspic = anspic;
	getdata(desc);
}

window.onload = animatestart();

function animatestart() {
	// Animate start
	var animate = document.getElementById('animate');
	var size = 5;
	on();
	var go = setInterval(grow, 5);
	function grow() {
		if (size > 19) {
			clearInterval(go);
			setTimeout(start,1000);
		} else {
			size += 0.1;
			animate.style.fontSize = size+'vw';
		}
	}
}
function start() {
	document.getElementById('animate').parentNode.removeChild(animate);
	document.getElementById('answers').style.zIndex = 3;
	document.getElementById('prompt').style.display = 'block';
	document.getElementById('desc').style.display = 'block';
	document.getElementById('anspic').style.display = 'block';
	document.getElementById('overlay').onclick = randQ;
	var pickqn = Math.floor(Math.random()*questions.length);
	currqn = questions[pickqn];
	document.getElementById('picture').src = currqn.pic;
	setTimeout(randQ(), 1000);
}
function endgame() {
	document.getElementById('answers').style.zIndex = 0;
	document.getElementById('anspic').src = '';
	document.getElementById('desc').innerHTML = 'End of game. Total score: ' + totalscore;
	document.getElementById('score').innerHTML = '';
	document.getElementById('overlay').onclick = '';
	on();
	storeresults();
}
function randQ() {
	// startqn
	for (var i=0; i < 4; i++) {
		var butt = document.getElementById(buttid[i]);
		butt.style.backgroundColor = 'white';
	}
	for (var i=0; i < 4; i++) {
		document.getElementById(buttid[i]).disabled = false;
	}
	// check end game
	if (countqn == MAX) {
		endgame();
	}
	// get qn
	else {
		countqn++;
		off();
		randA(currqn.ans);
		document.getElementById('desc').innerHTML = currqn.desc;
		document.getElementById('anspic').src = currqn.anspic;
		correctans = currqn.correct;
		// remove from array so there is no repetition of qn
		questions.splice(questions.indexOf(currqn), 1);
		countdown(10);
	}
}
function randA(ans) {
	var i;
	for (i = 4; i > 0; i--) {
		number = Math.floor(Math.random()*i);
		document.getElementById(buttid[i-1]).innerHTML = ans[number];
		ans.splice(number,1);
	}
}
function endqn() {
	// disable buttons
	for (var i=0; i < 4; i++) {
		document.getElementById(buttid[i]).disabled = true;
	}
	//highlight right ans in green
	for (var i=0; i < 4; i++) {
		if (correctans.includes(document.getElementById(buttid[i]).innerHTML)){
			document.getElementById(buttid[i]).style.backgroundColor = '#00e600';
		}
	}
	// pick next qn to change qn pic to prevent delay
	if (countqn != MAX) {
		var pickqn = Math.floor(Math.random()*questions.length);
		currqn = questions[pickqn];
		document.getElementById('picture').src = currqn.pic;
	}
}

// when answer button in html clicked, function called with the button(element) passed as parameter
function checkans(ans) {
	clearInterval(count);
	endqn();
	var time = document.getElementById('timer').innerHTML;
	var score = document.getElementById('score');
	if (ans.innerHTML = correctans) {
		//handles score
		if (time > 8) {
			score.innerHTML = 'Correct Answer! +1pt <br/> Time bonus! +2pt';
			totalscore += 3;
		} 
		else if (time > 5 && time < 9) {
			score.innerHTML = 'Correct Answer! +1pt <br/> Time bonus! +1pt';
			totalscore += 2;
		}
		else {
			score.innerHTML = 'Correct Answer! +1pt';
			totalscore++;
		}
		on();
	}
	else {
		ans.style.backgroundColor = 'red';
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
				endqn();
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
