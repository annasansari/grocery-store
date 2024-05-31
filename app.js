import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8mDIQwrzdBA2cVU1lX95C2VAeOCU6muM",
  authDomain: "hackathone-3cd56.firebaseapp.com",
  projectId: "hackathone-3cd56",
  storageBucket: "hackathone-3cd56.appspot.com",
  messagingSenderId: "962176382131",
  appId: "1:962176382131:web:36cc05747eb718c6fe6cc6",
  measurementId: "G-K33GP5JN19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
  let addToCartBtn = document.getElementsByClassName('addToCartBtn');
  let itemNames = document.getElementsByClassName('item-name')
  let prices = document.getElementsByClassName('veg-img-price');

  // Convert HTMLCollection to an array
  addToCartBtn = Array.from(addToCartBtn);

  addToCartBtn.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
      try {
        const itemName = itemNames[index]?.textContent;
        const price = prices[index]?.textContent;

        const docRef = await addDoc(collection(db, "Orders"), {
          itemName: itemName,
          price: price,
          bookedAt: new Date()
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  });
});
