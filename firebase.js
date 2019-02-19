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

firebase.auth().onAuthStateChanged(function(user) {
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
	var signinbutton = document.getElementById('signinbutton');
	signinbutton.style.display = 'none';
	document.getElementById('greeting').innerHTML = 'Hello, <br />' + displayName;
	document.getElementById('greeting').style.display('block');
  } else {
    // User is signed out.
    // ...
  }
});
