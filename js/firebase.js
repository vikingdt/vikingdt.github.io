
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

function signup(){
    var email = document.getElementById("regEmail").value;
    var pw = document.getElementById("regPassword").value;
    var confPw = document.getElementById("confirmPassword").value;
    if(pw===confPw){
        firebase.auth().createUserWithEmailAndPassword(email, pw).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            document.getElementById("loginAlert").innerText = "Account already exists with this email";
            // ...
        });
    } else {
        document.getElementById("loginAlert").innerText = "Passwords don't match"
    }
}

function login(){
    var email = document.getElementById("loginEmail").value;
    var pw = document.getElementById("loginPassword").value;

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
        document.getElementById("loginAlert").innerText = "Wrong email or password";
        console.log(error);
    });

    var user = firebase.auth().currentUser;

    if (user) {
        window.location = 'index.html';
    }
}

function signOut(){
    var user = firebase.auth().currentUser;

    if (user) {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("signed out");
            window.location = 'index.html';
        }).catch(function(error) {
            // An error happened.
            console.log(error);
        });
    } else {
        console.log("no user");
        window.location='login.html'
    }
}

function checkLogin(){
    var user = firebase.auth().currentUser;

    if (user) {
        document.getElementById("loginSpan").innerHTML = "Sign out";
    }
}

function checkWebpage(){
    var user = firebase.auth().currentUser;

    if(user){
        console.log("access allowed");
    } else {
        console.log("no user");
        window.location = 'login.html';
    }
}