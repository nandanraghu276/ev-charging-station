//SIGNIN LOGIC BY FIREBASE AND JS



async function signup(e){
    e.preventDefault()
    const email = document.querySelector("#email")
    const password = document.querySelector("#password")
    const message = document.querySelector("#message")
    console.log(email.value, password.value)

    try{
    const result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    

    console.log(result);
    message.textContent = `welcome ${email.value} `;
       message.style.color = "green"
       var timer = setTimeout(function() {
        window.location='login.html'
    }, 2000);

    }

    catch(err){
        console.log(err)
        message.textContent = err.message;
       message.style.color = "red"
    }
    email.value = ""
    password.value = ""



}
//LOGIN LOGIC BY FIREBASE AND JS


  

async function signin(e){
    e.preventDefault()
    const email = document.querySelector("#loginemail")
    const password = document.querySelector("#loginpassword")
    const message = document.querySelector("#mess")
    console.log(email.value, password.value)

    try{
    const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value)

    console.log(result);
    message.textContent = `welcome ${email.value} `;
       mess.style.color = "green"
       var timer = setTimeout(function() {
        window.location='doc.html'
    }, 2000);
       

    }

    catch(err){
        console.log(err)
        message.textContent = err.message;
       mess.style.color = "red"

    }
    email.value = ""
    password.value = ""


}
//LOGOUT LOGIC BY FIREBASE AND JS

function logout(){
    const signoutsuccess = document.querySelector("#signoutsuccess")
    firebase.auth().signOut()
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user)
        } else {
          console.log("signout success")
          signoutsuccess.textContent = "logout successful"
          signoutsuccess.style.color = "green"


        }
      });
    }
      
        //   Import the functions you need from the SDKs you need
          import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
          import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
          import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGnG1zEiVpnUaC55CuwaAUQPlHSFxx6l4",
  authDomain: "governmentportal-a7ea9.firebaseapp.com",
  projectId: "governmentportal-a7ea9",
  storageBucket: "governmentportal-a7ea9.appspot.com",
  messagingSenderId: "628596351774",
  appId: "1:628596351774:web:151ae4434215dbcd689f0f",
  measurementId: "G-HTYFGJ932S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

        function render() {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
            recaptchaVerifier.render();
        }

        function phoneAuth(e) {
            e.preventDefault();
            const phoneNumber = document.getElementById('phonenum').value;
            const appVerifier = window.recaptchaVerifier;

            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    alert("OTP sent");
                })
                .catch((error) => {
                    alert(error.message);
                });
        }

        function verifycode(e) {
            e.preventDefault();
            const code = document.getElementById('otp').value;

            window.confirmationResult.confirm(code).then(function() {
                alert("OTP verified");
                setTimeout(() => {
                    window.location = 'register.html'; // Redirect after a delay
                }, 1000);
            }).catch(function() {
                alert("OTP not correct");
            });
            function register(){
                var form=document.getElementById('form')
                alert:'raghu'

            }
        
        
        render(); // Call render to initialize reCAPTCHA
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
               
                const form = document.getElementById('profile-form');
                form.addEventListener('submit', submit);
                
                function submit(e) {
                    e.preventDefault();
                    const firstname1 = document.getElementById('firstname').value;
                    const lastname1 = document.getElementById('lastname').value;
                    const gender1 = document.getElementById('gender').value;
                    const date1 = document.getElementById('date').value;
                    const age1 = document.getElementById('age').value;
                    const country1 = document.getElementById('country').value;
                    const state1 = document.getElementById('state').value;
                    const city1 = document.getElementById('city').value;
                    const aadharNumber1 = document.getElementById('aadharNumber').value;
                    const email1 = document.getElementById('email').value;
        
                    db.collection('users').doc(aadharNumber1).set({
                        Firstname: firstname1,
                        Lastname: lastname1,
                        Email: email1,
                        Gender: gender1,
                        Date: date1,
                        Age: age1,
                        Country: country1,
                        State: state1,
                        City: city1,
                    })
                    .then(() => {
                        document.getElementById('message').innerText = "Profile information submitted successfully!";
                        document.getElementById('message').style.color = "green";
                        displayProfile(aadharNumber1);
                    })
                    .catch((error) => {
                        console.error("Error storing profile information: ", error);
                        document.getElementById('message').innerText = "Error submitting profile information.";
                        document.getElementById('message').style.color = "red";
                    });
                }
        
                function displayProfile(aadharNumber1) {
                    db.collection('users').doc(aadharNumber1).get().then((doc) => {
                        if (doc.exists) {
                            const profile = doc.data();
                            document.getElementById('profile-details').innerHTML = `
                                <h2>Profile Details</h2>
                                <p><strong>First Name:</strong> ${profile.Firstname}</p>
                                <p><strong>Last Name:</strong> ${profile.Lastname}</p>
                                <p><strong>Aadhaar:</strong> ${aadharNumber1}</p>
                                <p><strong>Email:</strong> ${profile.Email}</p>
                                <p><strong>Gender:</strong> ${profile.Gender}</p>
                                <p><strong>DOB:</strong> ${profile.Date}</p>
                                <p><strong>Age:</strong> ${profile.Age}</p>
                                <p><strong>Country:</strong> ${profile.Country}</p>
                                <p><strong>State:</strong> ${profile.State}</p>
                                <p><strong>City:</strong> ${profile.City}</p>
                            `;
                        } else {
                            document.getElementById('profile-details').innerHTML = 'No profile found';
                        }
                    }).catch((error) => {
                        console.error('Error getting profile: ', error);
                    });
                }

