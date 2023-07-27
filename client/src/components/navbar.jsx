import { userContext } from "../authentication/useContext.js";
import React, { useState, useContext } from "react";
import NavExpand from './navExpand.jsx'
import NavCollapse from './navCollapse.jsx'
import { useLocation } from "react-router-dom";
const Navbar = (props) => {
  const location=useLocation()
  const [user, setUser] = useContext(userContext);
  const [active, setActive] = useState((location.pathname=="/")?"home":location.pathname.slice(1));
  const [navstate,setNavstate]=useState("collapse")
  const hover = (event) => {
    const alphabet = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    let iter = 0;
    const interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((char, index) => {
          if (index < iter) {
            return event.target.dataset.value[index];
          }
          return alphabet[Math.floor(Math.random() * 26)];
        })
        .join("");
      if (iter == event.target.dataset.value.length) clearInterval(interval);
      iter++;
    }, 30);
    };
  return (
    <>
        <NavCollapse active={active} setActive={setActive} setNavstate={setNavstate} navstate={navstate} hover={hover} signHide={props.signHide} setSignHide={props.setSignHide} setLoader={props.setLoader} user={user} setUser={setUser}/>

        <NavExpand active={active} setActive={setActive} setNavstate={setNavstate} navstate={navstate} hover={hover} signHide={props.signHide} setSignHide={props.setSignHide} setLoader={props.setLoader} user={user} setUser={setUser}/>
      
    </>
  );
};

export default Navbar;
