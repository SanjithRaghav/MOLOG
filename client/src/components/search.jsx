import {useState,useEffect,useContext} from 'react'
import { userContext } from '../authentication/useContext'
import { useNavigate } from 'react-router-dom' 
import searchLogo from "../assets/search.svg"
import searchIllustration from "../assets/searchIllustration.svg"
import AddWatchList from "./addWatchList.jsx"
import add from "../assets/add.svg"

const Search=(props)=>{
    const [watchHide,setWatchHide]=useState(true)
    const navigate=useNavigate()
    const [user,setUser]=useContext(userContext)
    const [movie,setMovie]=useState('')
    const [movieList,setMovieList]=useState([])
    const [pages,setPages]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [type,setType]=useState(true)
    const [addWatch,setAddWatch]=useState(0)
    const [watchMovie,setWatchMovie] =useState(null)
    useEffect(()=>{
        const url = `https://api.themoviedb.org/3/search/${(type?"movie":"tv")}?query=${movie}`; 
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWRjYjQ4NTkxMTM3YmIwZmU3NzE1Mzc0NGY2OTJjOCIsInN1YiI6IjYzMTBjY2JkN2ZjYWIzMDA3ZmJkZmVkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1iAei_v2-QvzugFcddbVx8DMcps500az92CxzsPlvf8'
        }
        }
        props.setLoader(true)
        fetch(url, options)
        .then(res => res.json())
        .then(json =>{ 
            setMovieList(json.results)
            props.setLoader(false)
            setCurrentPage(json.page)
            if(json.total_pages>1&&json.total_pages<=5){
                setPages(Array.from({ length: json.total_pages }, (_, index) => index + 1))
            }
            else if(json.total_pages>5){
                setPages(Array.from({ length: 5 }, (_, index) => index + 1))
            }
            else{
                setPages([])
            }
        })
        .catch(err => {console.error('error:' + err);props.setLoader(false)}) 

    },[movie,type])
    useEffect(()=>{
        try{
            const url = `https://api.themoviedb.org/3/search/${(type?"movie":"tv")}?query=${movie}&page=${currentPage}`; 
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWRjYjQ4NTkxMTM3YmIwZmU3NzE1Mzc0NGY2OTJjOCIsInN1YiI6IjYzMTBjY2JkN2ZjYWIzMDA3ZmJkZmVkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1iAei_v2-QvzugFcddbVx8DMcps500az92CxzsPlvf8'
                }
            }
            props.setLoader(true)
            fetch(url,options)
            .then((response)=>(response.json()))
            .then((json)=>{
                setMovieList(json.results)
                props.setLoader(false)
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            })  
            .catch((err)=>{
                console.log(err)
            })
            props.setLoader(false)
        }
        catch(error){
            console.log(error)
            props.setLoader(false)
        }  
    },[currentPage])
    useEffect(()=>{
            if(watchMovie){
                if(!user){
                    props.setSignHide(false)
                    setWatchMovie(null)
                   
                }
                else{
                    setWatchHide(false)
                }
            }
    },[watchMovie])

    const display=movieList.map((mv,ind)=>(
    <div  key={ind} onMouseLeave={()=>setAddWatch(0)} onMouseEnter={()=>{setAddWatch(mv.id)}} className='relative  h-[20rem]'>
        <div className="relative w-[70%] ">
            <img id={ind}  onError={(e)=>{e.target.parentNode.parentNode.style.display="none"}} className=" w-[100%]  rounded-md" src={`https://image.tmdb.org/t/p/original${mv.poster_path}`}/>
            <div className={`w-[100%] h-[100%] top-0 absolute z-10 transition-all duration-300 rounded-md bg-black opacity-0 ${(mv.id==addWatch)&&"opacity-70"}`}></div>
            <img onClick={()=>{setWatchMovie(mv)}} src={add} className={`cursor-pointer w-[30%] left-[35%] top-[35%] z-20 absolute hover:-rotate-[180deg] hover:bg-[#A931F3] rounded-full p-2 transition-all opacity-0 ${(mv.id==addWatch)&&"opacity-100"}`}/>
            {(mv.id==addWatch)&&<p className="absolute z-30 text-white bottom-[30%] left-[31%] text-[1vw]">WatchList</p>}
        </div>
    
    </div>
    ))
    const pageDisp=pages.map((pg,ind)=>(<p key={ind} onClick={(e)=>{ setCurrentPage(e.target.innerText)}} className={`text-white cursor-pointer transition-all ${(pg==currentPage)?"text-black bg-[#A931F3] px-2 rounded-full":"hover:-translate-y-1"}`}>{pg}</p>))
    return (
    <>
        {(!watchHide)&&<AddWatchList type={type} setHide={setWatchHide}  setWatchMovie={setWatchMovie} watchMovie={watchMovie} user={user} setUser={setUser}/>}
        <div className="w-[96%]  right-0 absolute">
            <div className="fixed -z-20 right-0 w-[35rem] h-[35rem] bg-[#A931F3] rounded-[35rem]  translate-x-[40%] translate-y-[-40%] blur-[379px]"></div>
            <div className="fixed -z-10 right-0 w-[96%] h-screen  backdrop-blur-[200px]"></div>
            <div className="flex justify-between pt-5 px-5">
                <p className=" font-bold text-white  text-[3rem]">Search</p>
                <div className=''>
                    <input onChange={(e)=>{setMovie(e.target.value)}} value={movie} type="text" className='text-white my-[12%] rounded-full bg-[#383639] border-2 border-[#A931F3] px-8 py-[0.1rem] focus:outline-none ' />
                    <img src={searchLogo} className="inline w-[7%] relative right-7 bottom-1"/>
                    <div className="flex justify-evenly items-center">
                        <p className="text-white inline">Movies</p>
                        <div onClick={()=>{setType((type)=>(!type))}} className="cursor-pointer w-[2.1rem] h-[1.125rem] bg-[#A931F3] rounded-[1.125rem] relative shadow-lg"><div className={`${(!type)&&"translate-x-[100%]"} transition-all duration-200 w-[1.125rem] absolute   h-[1.125rem] rounded-[1.125rem]  bg-white`}></div></div>
                        <p className="text-white inline">TV shows</p>
                         
                    </div>
                </div>
               
            </div>
            {display.length==0 && (<img src={searchIllustration} className='mx-auto w-[40%]'/>)}
            <div className="grid grid-cols-6    gap-y-10 mx-10 mt-5">
                    {display}
            </div>
            <div className="flex justify-evenly w-[10%] mx-auto my-8">
                        {pageDisp}
            </div>
        </div>
            
        
    </>)
}

export default Search