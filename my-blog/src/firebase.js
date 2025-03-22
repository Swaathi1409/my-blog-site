import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQkoLxIjXDfSdFe8oiouAfn1Oc505cPE4",
  authDomain: "blog-weaver.firebaseapp.com",
  projectId: "blog-weaver",
  storageBucket: "blog-weaver.firebasestorage.app",
  messagingSenderId: "530067862838",
  appId: "1:530067862838:web:7519c0b8ffbfa7256faf97",
  measurementId: "G-SC4451D57W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app;
