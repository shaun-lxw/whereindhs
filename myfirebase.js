// Initialize Firebase
var config = {
	apiKey: "AIzaSyCvpA372tjk1E7lOAks4STgllDxwPdQy1Y",
	authDomain: "whereindhs.firebaseapp.com",
	databaseURL: "https://whereindhs.firebaseio.com",
	projectId: "whereindhs",
	storageBucket: "whereindhs.appspot.com",
	messagingSenderId: "642970983978"
};
firebase.initializeApp(config);
var AUTH = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
function signin() {
	document.getElementById('signinbutton').innerHTML = 'Loading...';
	AUTH.signInWithRedirect(provider).then((result) => {
		console.log('[APP, Firebase] User Sign In Sucessful');
		console.log(result);
	}).catch((error) => {
		console.error('[App, Firebase] User Sign In Error', error);
	
		document.getElementById('signinbutton').innerHTML = 'Error... Sign In Again';
	})
}
function signout() {
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	  console.log('User signed out');
	}).catch(function(error) {
	  // An error happened.
	  console.log('Error signing out:' + error);
	});
}
var db = firebase.firestore();
AUTH.onAuthStateChanged(function(user) {
  if (user) {
	// User is signed in.
	var displayName = user.displayName;
	var email = user.email;
	var emailVerified = user.emailVerified;
	var photoURL = user.photoURL;
	var isAnonymous = user.isAnonymous;
	var uid = user.uid;
	var providerData = user.providerData;
	// ...
	if (document.getElementById('signinbutton')) {
		document.getElementById('signinbutton').style.display = 'none';
		document.getElementById('greeting').innerHTML = 'Hello, <br />' + displayName;
		document.getElementById('greeting').style.display = 'block';
		document.getElementById('signoutbutton').style.display = 'block';
		document.getElementById('start').style.display = 'block';
		document.getElementById('qn').style.display = 'block';
	}
  } else {
    // User is signed out.
    // ...
	if (document.getElementById('signinbutton')) {
		document.getElementById('greeting').style.display = 'none';
		document.getElementById('signoutbutton').style.display = 'none';
		document.getElementById('start').style.display = 'none';
		document.getElementById('qn').style.display = 'none';
		document.getElementById('signinbutton').style.display = 'block';
		document.getElementById('signinbutton').disabled = false;
		document.getElementById('signinbutton').innerHTML = 'Sign in with Gmail!';
	}
  }
});

