import { userContext } from "../authentication/useContext.js";
import React, { useState, useContext } from "react";
import home from "../assets/home.svg";
import userLogo from "../assets/user.svg";
import search from "../assets/search.svg";
import watchlist from "../assets/myMovies.svg";
import social from "../assets/chat.svg";
import NavExpand from './navExpand.jsx'
import NavCollapse from './navCollapse.jsx'
const Navbar = () => {
  const [user, setUser] = useContext(userContext);
  const [active, setActive] = useState("watchlist");
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
    }, 75);
  };
  return (
    <>
        <NavCollapse active={active} setActive={setActive} setNavstate={setNavstate} navstate={navstate} hover={hover} />

        <NavExpand active={active} setActive={setActive} setNavstate={setNavstate} navstate={navstate} hover={hover} />
      
    </>
  );
};

export default Navbar;
