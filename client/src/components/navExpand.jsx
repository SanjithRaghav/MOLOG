import React, { useState, useContext } from "react";
import {signOut,getAuth} from "firebase/auth";
import { useNavigate,Link } from "react-router-dom";
  const NavExpand=(props)=>{    
    const [user,setUser]=[props.user,props.setUser]
    const [active,setActive]=[props.active,props.setActive]
    const navigate = useNavigate();
    const logout = async () => {
      try {
        props.setLoader(true)
        const auth = getAuth();
        await signOut(auth);
        console.log("logged out");
        setUser(null);
        props.setLoader(false)
      } catch (error) {
        console.log(error);
      }
    };

    return(<>
      <div className={`${props.navstate=="collapse"&&"hidden"} transition-all fixed w-[90%] z-20 right-0 bg-gradient-to-r from-black  h-screen`}></div>

        <div onMouseLeave={()=>{props.setNavstate("collapse")}} className={`${props.navstate=="collapse"?"hidden opacity-0":"opacity-100"} transition-opacity  z-20 fixed h-screen top-0 w-[21%] bg-black`}>
        <ul  className="text-white space-y-[1rem] mt-[2rem] px-2 select">
          <li
            data-value="HOME"
            onMouseEnter={props.hover}
            onClick={() => {
              navigate('/')
              setActive("home");

            }}
            className={`${
              active == "home" && "active"
            } font-black text-[2.5vw]  tracking-tight cursor-pointer pl-2 pr-6 inline-block`}
          >
            HOME
          </li>
          <li
            className={`${
              active == "home" ? "inline text-[#DBA1E9]" : "hidden"
            } text-[10px] left-1 bottom-[2.4vw] relative`}
          >
            00
          </li>
          <li
            data-value="WATCHLIST"
            onMouseEnter={props.hover}
            onClick={() => {
              navigate('/watchlist')
              setActive("watchlist");
            }}
            className={`${
              active == "watchlist" && "active"
            } font-black text-[2.5vw]  tracking-tight cursor-pointer pl-2 pr-6 inline-block`}
          >
            WATCHLIST
          </li>
          <li
            className={`${
              active == "watchlist" ? "inline text-[#DBA1E9]" : "hidden"
            } text-[10px] left-1 bottom-[2.4vw] relative`}
          >
            01
          </li>
          <li
            data-value="SEARCH"
            onMouseEnter={props.hover}
            onClick={() => {
              navigate('/search')
              setActive("search");
            }}
            className={`${
              active == "search" && "active"
            } font-black text-[2.5vw]  tracking-tight cursor-pointer pl-2 pr-6 inline-block`}
          >
            SEARCH
          </li>
          <li
            className={`${
              active == "search" ? "inline text-[#DBA1E9]" : "hidden"
            } text-[10px] left-1 bottom-[2.4vw] relative`}
          >
            02
          </li>
          <li
            data-value="SOCIAL"
            onMouseEnter={props.hover}
            onClick={() => {
              navigate('/social')
              setActive("social");
            }}
            className={`${
              active == "social" && "active"
            } font-black text-[2.5vw]  tracking-tight cursor-pointer pl-2 pr-6 inline-block`}
          >
            SOCIAL
          </li>
          <li
            className={`${
              active == "social" ? "inline text-[#DBA1E9]" : "hidden"
            } text-[10px] left-1 bottom-[2.4vw] relative`}
          >
            03
          </li>
          <li
            data-value={(user!=null)?"LOGOUT":"SIGNIN"}
            onMouseEnter={props.hover}
            onClick={() => {
              setActive("signin");
              if(user==null){
                props.setSignHide(false)
              }
              else{
                logout()
              }
              setActive("watchlist")
            }}
            className={`${
              active == "signin" && "active"
            } font-black text-[2.5vw]  tracking-tight cursor-pointer pl-2 pr-6 inline-block`}
          >
            {(user!=null)?"LOGOUT":"SIGNIN"}
          </li>
          <li
            className={`${
              active == "signin" ? "inline text-[#DBA1E9]" : "hidden"
            } text-[10px] left-1 bottom-[2.4vw] relative`}
          >
            04
          </li>
        </ul>
      </div>
    </>)
}

export default NavExpand