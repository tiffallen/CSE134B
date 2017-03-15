Vue.use(VueFire);

var app = firebase.initializeApp(config);
var db = app.database()
var refUsers = db.ref('data/users')

window.addEventListener('load', function() {
    var vm = new Vue({
        el: "#app",

        beforeCreate: function() {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    window.location.href = '/home.html';
                }
            }.bind(this))
        },

        data: {
            userSignup: {
                email: "",
                password: "",
                confirm_password: ""
            },
            userLogin: {
                email: "",
                password: ""
            }
        },

        methods: {

            processError: function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            },

            signupUser: function() {
                if (this.userSignup.password !== this.userSignup.confirm_password) {
                    alert("Passwords dont match!");
                    return;
                }

                var self = this;
                firebase.auth().createUserWithEmailAndPassword(this.userSignup.email, this.userSignup.password).catch(function(error) {
                    self.processError(error);
                });
            },

            login: function() {
                var self = this;
                var userId = this.userLogin.email;
                console.log("Normal email: " + userId);
                firebase.auth().signInWithEmailAndPassword(this.userLogin.email, this.userLogin.password).catch(function(error) {
                    self.processError(error);
                });
            },

            googleAuth: function() {
                
                var provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('https://www.googleapis.com/auth/plus.login');
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    var user = result.user;
                    var userId = result.user.email;
                    console.log("Google email: " + userId);
                    window.location.href = '/home.html';
                }).catch(function(error) {
                    alert(error);
                    console.log(error);
                });

            }

        }
    });
})
