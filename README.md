# Where@DHS
## Development workflow
### Requirements

#### **Firebase:**
+ Authentication
+ Firestore
### Setup

```
clone this repository on github
```

### Firebase
1. Visit https://firebase.google.com/
2. Log in and go to firebase console
3. Add a new project with your own project name
4. Go to Authentication tab and click on web setup
5. Copy the code (var config...) between the second script tags and replace the one in app.js
6. Enable google authentication at sign-in method tab and add your domain to the authorized domain at the bottom of that tab
7. Paste this into the rules for your firestore database
``` 
service cloud.firestore {
  match /databases/{database}/documents {
    // Make sure the uid of the requesting user matches name of the user
    // document. The wildcard expression {userId} makes the userId variable
    // available in rules.
    match /users/{userEmail}/games/{game} {
      allow read, update: if request.auth.token.email == userEmail;
      allow create: if request.auth.uid != null;
    }
    match /questions/{question} {
    	allow read: if true;
    }
    match /leaderboard/leaderboard {
    	allow read, write: if request.auth.uid != null;
    }
  }
}
```
