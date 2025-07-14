
  
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

   import { getFirestore ,collection, addDoc, getDocs} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
 

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



document.getElementById('detailButton').addEventListener('click', function() {
  document.getElementById('searchInput').style.display = 'block';
  document.getElementById('searchInput').focus();
  document.getElementById('detailButton').style.display = 'none';
  document.getElementById('searchButton').style.display = 'block';
});


document.getElementById('searchButton').addEventListener('click', function() {
  const searchInput = document.getElementById('searchInput').value;
  const p = document.createElement('p');
  p.innerText = `Searching for CNIC: ${searchInput}`;
 
  alert(`Searching for CNIC: ${searchInput}`);
  
  if (searchInput) {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "SMIT STUDENT"));
      let found = false;
      querySnapshot.forEach((doc) => {
        if (doc.data().cnic === searchInput) {
         
          const record = doc.data();
          const parentDiv = document.createElement('div');
          parentDiv.className = 'record-container';
          const recordCard = document.createElement('div');
          recordCard.className = 'record-card';
          recordCard.innerHTML = `
            <h3>Name: ${record.name}</h3>
            <h3>Email: ${record.email}</h3>
            <h3>CNIC: ${record.cnic}</h3>
            <h3>DOB: ${record.dob}</h3>
            <h3>Address: ${record.address}</h3>
            <h3>Last Qualification: ${record.lastqualification}</h3>
            <h3>Laptop: ${record.laptop}</h3>
          `;
          document.body.appendChild(recordCard);
          console.log(`Record found: ${JSON.stringify(record)}`); 
          found = true;
          document.getElementById('searchInput').value = '';
          document.getElementById('searchInput').style.display = 'none';
          document.getElementById('searchButton').style.display = 'none';
          document.getElementById(`registrationForm`).style.display = 'none';
          const backButton = document.createElement('button');
          backButton.id = 'backButton';
          recordCard.appendChild(backButton);
          backButton.textContent = 'Back to Form';
          backButton.addEventListener('click', function() {
            document.getElementById('searchInput').style.display = 'none';
            document.getElementById('searchButton').style.display = 'none';
            document.getElementById('detailButton').style.display = 'block';
            document.getElementById(`registrationForm`).style.display = 'block';
            recordCard.remove();
          });
        }
      });
      if (!found) {
        alert(`No record found for CNIC: ${searchInput}`);
      }
    }
    getData();
  } else {
    alert("Please enter a CNIC to search.");
  }
});


