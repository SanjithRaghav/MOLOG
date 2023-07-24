import { useState,useEffect,createContext } from 'react'
import Signin from './components/signin.jsx'
import {BrowserRouter, Routes,Route,Outlet} from 'react-router-dom'
import {userContext} from './authentication/useContext.js/'
import { getAuth, onAuthStateChanged } from "firebase/auth";




function App() {
  const [user,setUser]=useState("not logged in")
  const [signHide,setSignHide]=useState(true)

  const auth = getAuth();
  useEffect(()=>{
    try{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log(user)
          setUser(user.email)
          fetch(`http://localhost:3000/auth/find?email=${user.email}`).then((res)=>{
            return res.json()
          }).then((res)=>{
            setUser(res)
          }).catch((error)=>{
            console.log(error)
          })
        } else {
          console.log("no user");
        }
      });
    }catch(error){
      console.log(error)
    }
  },[])
 

  

  
 

 
  return (
    <>
    <button onClick={()=>{setSignHide(false)}} className="border-2 border-black p-2 rounded-md">{user.username}</button>
    <userContext.Provider value={[user,setUser]}>
      <BrowserRouter>
        <Routes>
          <Route index element={<h2>Hello</h2>} />
          <Route path="signin" element={<Signin type="signin" hide={signHide} setHide={setSignHide}/>} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
    </>
  )
}

export default App
