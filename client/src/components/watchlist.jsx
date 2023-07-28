import {useState,useEffect,useContext} from 'react'
import { userContext } from '../authentication/useContext'
import Movie from "../assets/Movie.svg"
import arrowl from '../assets/arrow-left.svg'
import arrowr from '../assets/arrow-right.svg'

const Watchlist=(props)=>{
    const [watched,setWatched]=useState([])
    const [watchLater,setWatchLater]=useState([])
    const [user,setUser]=useContext(userContext)
    useEffect(()=>{
       let watch=[]
       let unwatch=[]
       if(user!=null){
           user.movies.forEach(mv => {
               if(mv.watched){
                   watch.push(mv)
                }
                else{
                    unwatch.push(mv)
                }
            }); 
            setWatched(watch)
            setWatchLater(unwatch)
            console.log(watched)
            console.log(watchLater)


        }
    },[user])
    const [listName,setListName]=useState(0)
    const genre={"All":0,"Action":28,"Comedy":35,"Drama":18,"Family":10751,"Fantasy":14,"History":36,"Romance":10749,"Science Fiction":878}
    const movieList=["All","Action","Comedy","Drama","Science Fiction","Romance","Fantasy"].map((ls,index)=>{
        return (<p onClick={()=>{setListName(genre[ls])}} className={`relative shadow-xl cursor-pointer text-white text-center py-[0.3rem] px-[3vw] text-[0.9rem] rounded-full ${(listName==genre[ls])?"bg-[#A931F3]":"bg-[#383639] inline"} `} key={index}>{ls}</p>)
    })
    const watch=watched.map((mv,ind)=>{
        const bgs={
            backgroundImage:`url('https://image.tmdb.org/t/p/original${mv.poster_path}')`,
            backgroundSize:"cover",
            backgroundPosition:"center"
        }
        const bgl={
            backgroundImage:`url('https://image.tmdb.org/t/p/original${mv.backdrop_path}')`,
            backgroundSize:"cover",
            backgroundPosition:"center"
        }
        if(ind==-1){
            return (<div key={ind} style={bgl} className="min-w-[44%] mx-[2%] h-[150%] rounded-lg  opacity-100 "></div>)
        }
        return (<div key={ind} style={bgs}  className="min-w-[12%] mx-[2%] h-[150%] rounded-lg  opacity-100"></div>)
    })
    const watchl=watchLater.map((mv,ind)=>{
        const bgs={
            backgroundImage:`url('https://image.tmdb.org/t/p/original${mv.poster_path}')`,
            backgroundSize:"cover",
            backgroundPosition:"center"
        }
        const bgl={
            backgroundImage:`url('https://image.tmdb.org/t/p/original${mv.backdrop_path}')`,
            backgroundSize:"cover",
            backgroundPosition:"center"
        }
        if(ind==0){
            return (<div key={ind} style={bgl} className="min-w-[44%] mx-[2%] h-[150%] rounded-lg  opacity-100 "></div>)
        }
        return (<div key={ind} style={bgs}  className="min-w-[12%] mx-[2%] h-[150%] rounded-lg  opacity-100"></div>)
    })
    console.log(watch)

    return (
        <>
            <div className="w-[96%]  right-0 absolute overflow-hidden">
                <div className="fixed -z-20 right-0 w-[35rem] h-[35rem] bg-[#A931F3] rounded-[35rem]  translate-x-[40%] translate-y-[-40%] blur-[379px]"></div>
                <div className="fixed -z-10 right-0 w-[96%] h-screen  backdrop-blur-[200px]"></div>
                <div>
                    <p className=" font-bold text-white pt-5 pl-[4%] text-[3rem]">WatchList</p>
                   {(!user)&&( <p onClick={()=>{props.setSignHide(false)}} className="text-white rounded-full absolute top-[60%] left-[50%] underline cursor-pointer">Sign in!</p>)}
                    {(!user)&&(<img className="w-[60%] mx-auto bottom-[250px] relative " src={Movie}/>)}
                    {(user)&&<div className={`mx-[4%] mt-6 flex justify-between `}>
                        {movieList}
                    </div>}
                    {(user)&&(<div className="h-[77vh]">
                  
                    <div className="relative w-[100%] h-[27%] top-[2%]">
                    <p  className=" text-white text-[1.3vw] pl-[4%] pb-4 ">Watch Next</p>
                        <img src={arrowl} className=" absolute left-[1.5%] top-[92%] w-[1.5%]"/>
                        <div className=" flex translate-x-[%] duration-1000 transition-all w-[100%] h-[100%] mx-[2%] ">
                            {watchl}
                        </div>
                        <img src={arrowr} className="absolute right-[1.5%] top-[92%] w-[1.5%]"/>
                    </div>
                    

                    <div className="relative w-[100%] h-[27%] top-[25%]">
                    <p className=" text-white text-[1.3vw] pl-[4%] pb-3">Watched</p>
                        <img src={arrowl} className=" absolute left-[1.5%] top-[92%] w-[1.5%]"/>
                        <div className=" flex translate-x-[-96%] duration-1000 transition-all w-[100%] h-[100%] mx-[2%] ">
                            {watch}
                        </div>
                        <img src={arrowr} className="absolute right-[1.5%] top-[92%] w-[1.5%]"/>
                    </div>
                    
                    </div>)}
                </div>

            </div>
        </>
    )
}


export default Watchlist

