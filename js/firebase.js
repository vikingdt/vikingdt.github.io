
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

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    firebase.auth().signInWithEmailAndPassword(email, pw).then(user => {
    // Get the user's ID token as it is needed to exchange for a session cookie.
    return user.getIdToken().then(idToken => {
        // Session login endpoint is queried and the session cookie is set.
        // CSRF protection should be taken into account.
        // ...
        const csrfToken = getCookie('csrfToken'),
        return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken)
    });
    }).then(() => {
        // A page redirect would suffice as the persistence is set to NONE.
        res.redirect('/index.html');
        return firebase.auth().signOut();
    }).then(() => {
        window.location.assign('/profile');
    }).catch(function(error) {
        document.getElementById("loginAlert").innerText = "Wrong email or password";
      });;
}

function signOut(){
    app.post('/sessionLogout', (req, res) => {
        res.clearCookie('session');
        res.redirect('/login');
    });
}

function checkLogin(){
    var user = firebase.auth().currentUser;

    if (user) {
        document.getElementById("loginSpan").innerHTML = "Sign out"
        document.getElementById("loginButton").onclick = 
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
            }).catch(function(error) {
                // An error happened.
            });
    } else {
        document.getElementById("loginSpan").innerHTML = "Log in"
    }
}

checkLogin();