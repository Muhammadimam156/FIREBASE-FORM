
  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

   import { getFirestore ,collection, addDoc} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
 
 
  const firebaseConfig = {
    apiKey: "AIzaSyBOiCNjEfCgTXCvRAK2u99sBjTpALMuhOA",
    authDomain: "smit-form-fe91e.firebaseapp.com",
    projectId: "smit-form-fe91e",
    storageBucket: "smit-form-fe91e.firebasestorage.app",
    messagingSenderId: "931207064663",
    appId: "1:931207064663:web:02910d7f693918f004c712",
    measurementId: "G-2L8ZM3LJ39"
  };


  const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);



const form = document.querySelector('form');

async function submitForm(event) {
  event.preventDefault();
const countrySelect = document.getElementById('country').value;
const course = document.getElementById('course').value;
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const cnic = document.getElementById('cnic').value;
const dob = document.getElementById('dob').value;
const address = document.getElementById('address').value;
const lastqualification = document.getElementById('qualification').value;
const laptop = document.getElementById('laptop').value;



  try {
    const docRef = await addDoc(collection(db, "SMIT STUDENT"), {
      country: countrySelect,
      course: course,
      name: name,
      email: email,
      cnic: cnic,
      dob: dob,
      address: address,
      lastqualification: lastqualification,
      laptop: laptop
    });
    

    console.log("Document written with ID: ", docRef.id);
    form.reset(); 
  alert("Form submitted successfully!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

form.addEventListener('submit', submitForm);





