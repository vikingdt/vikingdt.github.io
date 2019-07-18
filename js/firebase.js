
function saveToFirebase() {
    document.getElementById("loginAlert").innerText = "";
    var email = document.getElementById("inputEmail").value;
    var pw = document.getElementById("inputPassword").value;
    var confPw = document.getElementById("confirmPassword").value;
    var checkEmail;

    var ref = firebase.database().ref('accounts');

    ref.on("value", function(snapshot) {
        console.log(snapshot.val());
        if(checkEmail !== email){
            checkEmail=snapshot.val().valueOf('email');
        }
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    if(pw===confPw && email !== checkEmail){
        var emailObject = {
            email: email,
            password: pw
        };
        firebase.database().ref('accounts').push().set(emailObject)
            .then(function(snapshot) {
                console.log('success'); // some success method
            }, function(error) {
                console.log('error' + error);
                error(); // some error method
            });
        document.getElementById("course").innerText = "Updated Lesson?";
    } else {
        document.getElementById("loginAlert").innerText = "Passwords do not match";
    }
}

function signup(){
    var email = document.getElementById("regEmail").value;
    var pw = document.getElementById("regPassword").value;
    var confPw = document.getElementById("confirmPassword").value;
    if(pw===confPw){
        firebase.auth().createUserWithEmailAndPassword(email, pw).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
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
    } else {
        document.getElementById("loginSpan").innerHTML = "Log in";
    }
}

function checkWebpage(){
    var user = firebase.auth().currentUser;

    if(user){
        console.log("access allowed");
    } else {
        window.location = 'login.html';
    }
}