import React from 'react'
import home from "../assets/home.svg";
import userLogo from "../assets/user.svg";
import search from "../assets/search.svg";
import watchlist from "../assets/myMovies.svg";
import social from "../assets/chat.svg";
const NavCollapse=(props)=>{
    const [active,setActive,setNavstate,navstate]=[props.active,props.setActive,props.setNavstate,props.navstate]
    return (
        
    <>
        
         <div onMouseOver={()=>{setNavstate("expand")}} className="ease-in duration-300 fixed h-screen top-0 w-[4rem] bg-[#1F2326]">
        <ul  className={`${navstate=="expand"&&"hidden"}  md:space-y-[1rem] lg:space-y-[2rem] mt-[2rem] px-2`}>
          <li
            onClick={() => {
              setActive("home");
            }}
            className={`${
              active == "home" && "bg-[#383639]"
            } py-3 rounded-md cursor-pointer`}
          >
            <img className="w-[45%] mx-auto" src={home} />
          </li>
          <li
            onClick={() => {
              setActive("watchlist");
            }}
            className={`${
              active == "watchlist" && "bg-[#383639]"
            } py-3 rounded-md cursor-pointer`}
          >
            <img className="w-[45%] mx-auto" src={watchlist} />
          </li>
          <li
            onClick={() => {
              setActive("search");
            }}
            className={`${
              active == "search" && "bg-[#383639]"
            } py-3 rounded-md cursor-pointer`}
          >
            <img className="w-[45%] mx-auto" src={search} />
          </li>
          <li
            onClick={() => {
              setActive("social");
            }}
            className={`${
              active == "social" && "bg-[#383639]"
            } py-3 rounded-md cursor-pointer`}
          >
            <img className="w-[45%] mx-auto" src={social} />
          </li>
          <li
            onClick={() => {
              setActive("signin");
            }}
            className={`${
              active == "signin" && "bg-[#383639]"
            } py-3 rounded-md cursor-pointer`}
          >
            <img className="w-[45%] mx-auto" src={userLogo} />
          </li>
        </ul>
      </div>
    </>)
}


export default NavCollapse