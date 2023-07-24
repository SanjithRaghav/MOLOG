import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"


const app= initializeApp({
    apiKey: "AIzaSyBKWgHLuSos4TuI6k_Hez4hC2GeNFpYgfs",
    authDomain: "lofty-hall-365414.firebaseapp.com",
    projectId: "lofty-hall-365414",
    storageBucket: "lofty-hall-365414.appspot.com",
    messagingSenderId: "241822501121",
    appId: "1:241822501121:web:30216d65c63c82b9f77300"
})

export const auth=getAuth(app);
export default app