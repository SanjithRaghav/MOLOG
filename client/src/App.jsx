import { useState, useEffect, createContext } from "react";
import Signin from "./components/signin.jsx";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { userContext } from "./authentication/useContext.js/";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Navbar from './components/navbar.jsx' 
function App() {
  const [user, setUser] = useState("not logged in");
  const [signHide, setSignHide] = useState(false);
  const [loader, setLoader] = useState(false);

  const auth = getAuth();
  useEffect(() => {
    try {
      // setLoader(true);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // console.log(user)
          setUser(user.email);
          fetch(`http://localhost:3000/auth/find?email=${user.email}`)
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
          console.log("no user");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      
      <div className={`top-0 z-20 fixed w-screen ${!loader && "hidden"}`}>
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
      </div>
      <div>
      </div>
      <userContext.Provider value={[user, setUser]}>
        <Navbar/>

        <BrowserRouter>
          <Routes>
            <Route index element={<h2>Hello</h2>} />
            <Route
              path="signin"
              element={
                <Signin type="signin" hide={signHide} setHide={setSignHide} />
              }
            />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
