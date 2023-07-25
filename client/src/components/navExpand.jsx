import React,{useState} from 'react'

const NavExpand=(props)=>{
    const [active,setActive]=[props.active,props.setActive]
    return(<>
        <div onMouseLeave={()=>{props.setNavstate("collapse")}} className={`${props.navstate=="collapse"?"hidden opacity-0":"opacity-100"} transition-opacity  z-10 fixed h-screen top-0 w-[22%] bg-black`}>
        <ul  className="text-white space-y-[1rem] mt-[2rem] px-2 select">
          <li
            data-value="HOME"
            onMouseEnter={props.hover}
            onClick={() => {
              setActive("home");

            }}
            className={`${
              active == "home" && "active"
            } font-black text-[2.5vw]  tracking-tight cursor-pointer pl-2 pr-6 inline-block`}
          >
            HOME{" "}
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
            data-value="SIGNIN"
            onMouseEnter={props.hover}
            onClick={() => {
              setActive("signin");
            }}
            className={`${
              active == "signin" && "active"
            } font-black text-[2.5vw]  tracking-tight cursor-pointer pl-2 pr-6 inline-block`}
          >
            SIGNIN
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
      <div className={`${props.navstate=="collapse"&&"hidden"} fixed w-[90%] right-0 bg-gradient-to-r from-black  h-screen`}></div>
    </>)
}

export default NavExpand