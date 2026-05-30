import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            "AIzaSyAWtjIAZ5yxQcwWtq4IAlXlrhVcs03DpSQ",
  authDomain:        "barkmate--org.firebaseapp.com",
  projectId:         "barkmate--org",
  storageBucket:     "barkmate--org.firebasestorage.app",
  messagingSenderId: "425570016182",
  appId:             "1:425570016182:web:fe774387a758d8cd42ff17",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
