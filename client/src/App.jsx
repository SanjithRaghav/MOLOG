import { useState, useEffect, createContext } from "react";
import Signin from "./components/signin.jsx";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { userContext } from "./authentication/useContext.js/";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Navbar from './components/navbar.jsx' 
import Watchlist from "./components/watchlist.jsx";
import Search  from "./components/search.jsx";
import Home from './components/home.jsx'

function App() {
  const [user, setUser] = useState(null);
  const [signHide, setSignHide] = useState(true);
  const [loader, setLoader] = useState(false);
  
  const auth = getAuth();
  useEffect(() => {
    try {
      setLoader(true);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log(user)
          fetch(`https://molog.onrender.com/auth/find?email=${user.email}`)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              setUser(res);
              setLoader(false);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setLoader(false);
          console.log("no user");
        }
      });
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className={`top-0 z-50 fixed w-screen ${!loader && "hidden"}`}>
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      </div>
      <div>
      </div>
      <userContext.Provider value={[user, setUser]}>

        <BrowserRouter>
        <Navbar signHide={signHide} setSignHide={setSignHide} setLoader={setLoader}/>
        <Signin type="signin" hide={signHide} setHide={setSignHide} loader={loader} setLoader={setLoader} />
          <Routes>
            <Route index element={<Home signHide={signHide} setSignHide={setSignHide} setLoader={setLoader}/>} />
            <Route path="/watchlist" element={<Watchlist signHide={signHide} setSignHide={setSignHide} setLoader={setLoader}/>} />
            <Route path="/search" element={<Search signHide={signHide} setSignHide={setSignHide} setLoader={setLoader}/>} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
