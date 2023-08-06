import React, { useContext } from "react";
import * as firebase from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../authentication/firebase.js";
import { userContext } from "../authentication/useContext.js";
import removeImg from "../assets/remove.svg";
import googleLogo from "../assets/google.svg";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

export default function Forms(props) {
 
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = useContext(userContext);
  const provider = new GoogleAuthProvider();
  const [error, setError] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [type, setType] = React.useState(props.type);
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const register = (email, password) => {
    const auth = getAuth();
    setLoader(true);
    createUserWithEmailAndPassword(auth, email, password, username)
      .then((userCredential) => {
        return fetch(
          `https://molog.onrender.com/auth?email=${userCredential.user.email}&username=${username}`
        );
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setError("");
        setUser(res);
        setLoader(false);
        props.setHide(true);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
        // Handle Errors here.
        setError(`*${error.code}`);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signin = (email, password) => {
    const auth = getAuth();
    setLoader(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return fetch(
          `https://molog.onrender.com/auth/find?email=${userCredential.user.email}&username=${username}`
        );
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setError("");
        setUser(res);
        setLoader(false);
        props.setHide(true);
      })
      .catch((error) => {
         setLoader(false);
        // Handle Errors here.
        setError(`*${error.code}`);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

 

  const google = () => {
    const auth = getAuth();
    setLoader(true);
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        return fetch(
          `https://molog.onrender.com/auth?email=${userCredential.user.email}&username=${userCredential.user.displayName}`
        );
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setError("");
        setLoader(false);
        setUser(res);
        props.setHide(true);
      })
      .catch((error) => {
         setLoader(false);
        // Handle Errors here.
        setError(`*${error.code}`);
        console.log(error)
      });
  };

  return (  
    <div className={props.hide ? "hidden" : ""}>
      <div
        onClick={() => {
          props.setHide(true);
        }}
        className="fixed top-0 left-0 z-20 right-0 bottom-0 bg-black opacity-50"
      ></div>
      <div className="fixed translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] z-30 w-[25%] bg-[#4F2C87] rounded-md px-6 pb-6">
        <div className=" pt-6 flex justify-between  mb-[2rem]">
          <p className="text-[1.5rem] text-white font-bold tracking-wide uppercase">
            {type}
          </p>
          <img
            onClick={() => {
              props.setHide(true);
            }}
            src={removeImg}
            className=" cursor-pointer"
          />
        </div>
        {type == "register" && (
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className=" text-white mb-[1rem] py-1 placeholder-white font-light w-[100%] bg-[#4F2C87] border-b-[0.002rem] border-b-white focus:outline-none"
            placeholder="Username"
          />
        )}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" text-white py-1 placeholder-white font-light w-[100%] bg-[#4F2C87] border-b-[0.002rem] border-b-white focus:outline-none"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=" text-white mt-[1rem] py-1 placeholder-white font-light w-[100%] bg-[#4F2C87] border-b-[0.002rem] border-b-white focus:outline-none"
          placeholder="password"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            type == "register"
              ? register(email, password, username)
              : signin(email, password);
          }}
          className="w-full bg-white rounded-[0.5rem] text-center py-1.5 mt-10"
        >
          Get Started!
        </button>
        <hr className="mt-5 w-[10%] mx-auto" />
        <button
          onClick={(e) => {
            e.preventDefault();
            google(email, password);
          }}
          className="w-full bg-white rounded-[0.5rem] text-center py-1.5 mt-5"
        >
          <img src={googleLogo} className="inline mr-4" />
          Sign up With Google
        </button>
        {type == "register" && (
          <p
            onClick={() => {
              setType("signin");
            }}
            className="text-center mt-5 cursor-pointer underline text-[#A931F3]"
          >
            Signin?
          </p>
        )}
        {type == "signin" && (
          <p className="text-center mt-5">
            No account ,
            <span
              onClick={() => {
                setType("register");
              }}
              className="cursor-pointer underline text-[#A931F3]"
            >
              Register?
            </span>
          </p>
        )}
        <p className="text-red-500 text-center mt-2">{error}</p>
      </div>
    </div>
  );
}
