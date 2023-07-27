import {useState,useEffect,useContext} from 'react'
import { userContext } from '../authentication/useContext'
import Movie from "../assets/Movie.svg"

const Watchlist=(props)=>{
    
    const [user,setUser]=useContext(userContext)
    const [listName,setListName]=useState(0)
    const genre={"All":0,"Action":28,"Comedy":35,"Drama":18,"Family":10751,"Fantasy":14,"History":36,"Romance":10749,"Science Fiction":878}
    const movieList=["All","Action","Comedy","Drama","Science Fiction","Romance","Fantasy"].map((ls,index)=>{
        return (<p onClick={()=>{setListName(genre[ls])}} className={`relative shadow-xl cursor-pointer text-white text-center py-[0.3rem] px-[5%] text-[0.9rem] rounded-full ${(listName==genre[ls])?"bg-[#A931F3]":"bg-[#383639] inline"} `} key={index}>{ls}</p>)
    })

    return (
        <>
            <div className="w-[96%]  right-0 absolute">
                <div className="fixed -z-20 right-0 w-[35rem] h-[35rem] bg-[#A931F3] rounded-[35rem]  translate-x-[40%] translate-y-[-40%] blur-[379px]"></div>
                <div className="fixed -z-10 right-0 w-[96%] h-screen  backdrop-blur-[200px]"></div>
                <div>
                    <p className=" font-bold text-white pt-5 pl-5 text-[3rem]">WatchList</p>
                    {!(user)&&<img className="w-[60%] mx-auto top-[-150%] left-[15%] absolute" src={Movie}/>}
                    {!(user)&&<p onClick={()=>{props.setSignHide(false)}} className="text-white rounded-full absolute top-[700%] left-[50%] underline cursor-pointer">Sign in!</p>}
                    {(user)&&<div className={`mx-5 mt-6 flex justify-between `}>
                        {movieList}
                    </div>}
                </div>
            </div>
        </>
    )
}


export default Watchlist

