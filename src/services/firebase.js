import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey:            "AIzaSyBaGVcM7DT-drrTTlIN5m99lZVdhqrJT0k",
  authDomain:        "authentication-8d22c.firebaseapp.com",
  projectId:         "authentication-8d22c",
  storageBucket:     "authentication-8d22c.firebasestorage.app",
  messagingSenderId: "824076656454",
  appId:             "1:824076656454:web:410d4ac33362655c728f47",
  measurementId:     "G-BJZEDN1ME7"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

auth.settings.appVerificationDisabledForTesting = true

export const analytics = getAnalytics(app)