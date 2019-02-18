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
	document.getElementById('go').innerHTML = 'Loading...';
	AUTH.signInWithRedirect(provider).then((result) => {
		console.log('[APP, Firebase] User Sign In Sucessful');
		console.log(result);
	}).catch((error) => {
		console.error('[App, Firebase] User Sign In Error', error);
	
		document.getElementById('go').innerHTML = 'Error... Sign In Again';
	})
}
  //This gives you a Google Access Token. You can use it to access the Google API.
  // var token = result.credential.accessToken;
  The signed-in user info.
  // var user = result.user;
  ...
// }).catch(function(error) {
  Handle Errors here.
  // var errorCode = error.code;
  // var errorMessage = error.message;
  The email of the user's account used.
  // var email = error.email;
  The firebase.auth.AuthCredential type that was used.
  // var credential = error.credential;
  ...
// });