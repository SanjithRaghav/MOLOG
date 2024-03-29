import React from 'react'
import home from "/home.svg";
import userLogo from "/user.svg";
import search from "/search.svg";
import watchlist from "/myMovies.svg";
import social from "/chat.svg";
import logoutLogo from "/logout.svg";
import { useLocation } from "react-router-dom";
const NavCollapse=(props)=>{
    const location=useLocation()
    const [user,setUser]=[props.user,props.setUser]

    const [active,setActive,setNavstate,navstate]=[props.active,props.setActive,props.setNavstate,props.navstate]
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
    return (
        
    <>
        
        <div onMouseOver={()=>{setNavstate("expand")}} className="ease-in z-20 duration-300 fixed h-screen top-0 w-[4%] bg-[#1F2326]">
        <ul  className={`${navstate=="expand"&&"hidden"}  md:space-y-[1rem] lg:space-y-[2rem] mt-[2rem] px-2`}>
          <li
            onClick={() => {
              setActive("home");
              navigate('/')
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
              navigate('/watchlist')
            }}
            className={`${
              active == "watchlist" && "bg-[#383639]"
            } py-3 rounded-md cursor-pointer`}
          >
            <img className="w-[45%] mx-auto" src={watchlist} />
          </li>
          <li
            onClick={() => {
              navigate('/search')
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
              navigate('/social')
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
              if(user==null){
                props.setSignHide(false)
              }
              else{
                logout()
              }
            }}
            className={`${
              active == "signin" && "bg-[#383639]"
            } py-3 rounded-md cursor-pointer`}
          >
            <img className="w-[45%] mx-auto" src={(user!=null)?logoutLogo:userLogo} />
          </li>
        </ul>
      </div>
    </>)
}


export default NavCollapse