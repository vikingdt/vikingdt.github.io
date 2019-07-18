
function saveToFirebase() {
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
    } else {
        document.getElementById("loginAlert").innerText = "Passwords do not match";
    }
}

function saveAccount(){
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
    }
}