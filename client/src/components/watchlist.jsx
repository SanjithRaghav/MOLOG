import {useState,useEffect,useContext} from 'react'
import { userContext } from '../authentication/useContext'
import Movie from "../assets/Movie.svg"
import arrowl from '../assets/arrow-left.svg'
import arrowr from '../assets/arrow-right.svg'
import notFound from '../assets/notfound.svg'
import { useNavigate } from 'react-router-dom'
import star from '../assets/star.svg'
import play from '../assets/play.svg'
const Watchlist=(props)=>{
    const [watched,setWatched]=useState([])
    const [watchLater,setWatchLater]=useState([])
    const [user,setUser]=useContext(userContext)
    const [rigA,setRigA]=useState(0)
    const [rigB,setRigB]=useState(0)
    const [expandCardA,setExpandCardA]=useState(-1)
    const [expandCardB,setExpandCardB]=useState(-1)
    const [leftA,setLeftA]=useState(false)
    const [leftB,setLeftB]=useState(false)
    const [rightA,setRightA]=useState(true)
    const [rightB,setRightB]=useState(true)
    const [listName,setListName]=useState(0)
    const [playRotate,setPlayRotate]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
       let watch=[]
       let unwatch=[]
       if(user!=null && user.movies!=null){
           user.movies.forEach(mv => {
               if(mv.watched && ((!listName) || mv.genre.includes(listName))){
                   watch.push(mv)
                }
                else if((!listName) || mv.genre.includes(listName)){
                    unwatch.push(mv)
                }
            }); 
            setWatched(watch)
            setWatchLater(unwatch)
            if(watch.length<=6){
                setRightB(false)
            }
            else{
                setRightB(true)
            }
            if(unwatch.length<=6){
                setRightA(false)
            }
            else{
                setRightA(true)
            }
            setRigA(0)
            setRigB(0)
            setLeftA(false)
            setLeftB(false)


        }
    },[user,listName])
    const genre={"All":0,"Action":28,"Comedy":35,"Drama":18,"Family":10751,"Fantasy":14,"History":36,"Romance":10749,"Science Fiction":878}
    const movieList=["All","Action","Comedy","Drama","Science Fiction","Romance","Fantasy"].map((ls,index)=>{
        return (<p onClick={()=>{setListName(genre[ls])}} className={`relative shadow-xl cursor-pointer text-white text-center py-[0.3rem] px-[3vw] text-[0.9rem] rounded-full ${(listName==genre[ls])?"bg-[#A931F3]":"bg-[#383639] inline"} `} key={index}>{ls}</p>)
    })

    const Expand=(list,ind,e)=>{
            if(list=="A"){
            setExpandCardA(ind)
            const tar=document.getElementById("watchlater")
            if((ind+1)%6==0){
               tar.style.transform=`translateX(${(rigA*(-96))-32}%)`
            }
            if((ind+2)%6==0){
               tar.style.transform=`translateX(${(rigA*(-96))-16}%)`
            }
        }
        else{
            setExpandCardB(ind)
            const tar=document.getElementById("watched")
            if((ind+1)%6==0){
                tar.style.transform=`translateX(${(rigB*(-96))-32}%)`
            }
            if((ind+2)%6==0){
               tar.style.transform=`translateX(${(rigB*(-96))-16}%)`
            }
        }
       
    }
    const Relax=(list,ind,e)=>{
        if(list=="A"){
            setExpandCardA(-1)
            const tar=document.getElementById("watchlater")
            
           
            if((ind+1)%6==0){
                tar.style.transform=`translateX(${rigA*(-96)}%)`
            }
            if((ind+2)%6==0){
                tar.style.transform=`translateX(${rigA*(-96)}%)`
                
            }
        }else{
            setExpandCardB(-1)
            const tar=document.getElementById("watched")

            if((ind+1)%6==0){
                tar.style.transform=`translateX(${rigB*(-96)}%)`
            }
            if((ind+2)%6==0){
                tar.style.transform=`translateX(${rigB*(-96)}%)`
            }
        }

        
    }

    
    const update=(movie,watch)=>{
        props.setLoader(true)
         const url="https://molog.onrender.com/movies/updateMovie"
         fetch(url,{
             method:"POST",
             body:JSON.stringify({
                 "email": user.email,
                 "movie": {
                         "id":movie.id,
                         "title": movie.title, 
                         "backdrop_path": movie.backdrop_path, 
                         "poster_path": movie.poster_path, 
                         "overview": movie.overview, 
                         "watched":watch,
                         "genre":movie.genre_ids,
                         "popularity":movie.popularity,
                         "year":movie.year,
                         "movieType":movie.movieType
                     }
             }),
             headers:{
                 "Content-type":"application/json ; charset=UTF-8"
             }
         }).then((res)=>{
 
             console.log("added")
             // setMovie(null)
             return res.json()
 
         }).then((json)=>{
             setUser(json)
             props.setLoader(false)
         }).catch((error)=>{
             console.log(error)
         });
     } 
     const remove=(movie)=>{
         props.setLoader(true)
          const url="https://molog.onrender.com/movies/removeMovie"
          fetch(url,{
              method:"POST",
              body:JSON.stringify({
                  "email": user.email,
                  "movie": {
                          "id":movie.id,
                          "title": movie.title, 
                          "backdrop_path": movie.backdrop_path, 
                          "poster_path": movie.poster_path, 
                          "overview": movie.overview, 
                          "watched":true,
                          "genre":movie.genre_ids,
                          "popularity":movie.popularity,
                          "year":movie.year,
                          "movieType":movie.movieType
                      }
              }),
              headers:{
                  "Content-type":"application/json ; charset=UTF-8"
              }
          }).then((res)=>{
  
              console.log("added")
              // setMovie(null)
              return res.json()
  
          }).then((json)=>{
              setUser(json)
              props.setLoader(false)
          }).catch((error)=>{
              console.log(error)
          });
      } 

    const watch=watched.map((mv,ind)=>{
        const bgs={
            backgroundImage:`url('https://image.tmdb.org/t/p/original${mv.poster_path}')`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            minWidth:"12%"
        }
        const bgl={
            backgroundImage:`url('https://image.tmdb.org/t/p/original${mv.backdrop_path}')`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            minWidth:"44%",

        }

        return (<div key={ind} onClick={(e)=>{Expand("B",ind,e)}} onMouseLeave={(e)=>{Relax("B",ind,e)}} style={(ind==expandCardB)?bgl:bgs}  className={`${(ind!=expandCardB)&&"cursor-pointer"} transition-all duration-1000 mx-[2%] h-[150%] rounded-lg  opacity-100`}>
            {(ind==expandCardB)&&
                <div  className="w-[100%] h-[100%] relative">
                    <a href={`https://www.themoviedb.org/${mv.movieType}/${mv.id}-${mv.title}/watch?locale=IN`} target='_blank'>
                    <div onMouseEnter={()=>{setPlayRotate(true)}} onMouseLeave={()=>{setPlayRotate(false)}} className='absolute right-4 top-4 z-10 transition-all duration-500 pl-3 p-2 rounded-[50%] hover:bg-black'>
                        <img className={`${(playRotate)&&"rotate-[360deg]"} transition-all duration-500`} src={play}/>
                    </div>
                    </a>

                    <div className="w-[100%] h-[100%] bg-black opacity-50 absolute rounded-lg"></div>
                    <div className='w-[95%] right-0 bottom-0 z-10 absolute'>
                        <p className="text-white text-[1.6rem] mb-5 font-medium">{mv.title}</p>
                        <p className='text-white text-[0.6rem] mb-5'>{mv.overview}</p>
                        <div className="flex items-center w-[40%] justify-between mb-4">
                            <p className='text-white text-[0.6rem] font-bold'>{mv.year}</p>
                            <div className='top-0 flex'>
                                <img className=" mt-0" src={star}/>
                                <p className="text-white  text-[0.6rem] mt-0">{mv.popularity.toFixed(1)}</p>
                            </div>
                            <p onClick={()=>{update(mv,false)}} className="text-black text-[0.6rem] px-3 py-1 rounded-full cursor-pointer transition-all  bg-white">watch Again</p>
                            <p onClick={()=>{remove(mv)}} className="text-white text-[0.6rem] px-3 py-1 rounded-full cursor-pointer transition-all  bg-slate-900">Remove</p>
                        </div>
                    </div>
                </div>}
        </div>)
    })




    const watchl=watchLater.map((mv,ind)=>{
        const bgs={
            backgroundImage:`url('https://image.tmdb.org/t/p/original${mv.poster_path}')`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            minWidth:"12%"
        }
        const bgl={
            backgroundImage:`url('https://image.tmdb.org/t/p/original${mv.backdrop_path}')`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            minWidth:"44%",
           
        }
        return (<div key={ind} onClick={(e)=>{Expand("A",ind,e)}} onMouseLeave={(e)=>{Relax("A",ind,e)}}   style={(ind==expandCardA)?bgl:bgs}  className={`${(ind!=expandCardA)&&"cursor-pointer"} transition-all duration-1000 min-w-[12%] mx-[2%] h-[150%] rounded-lg  opacity-100`}>
            {(ind==expandCardA)&&
                <div  className="w-[100%] h-[100%] relative">
                    <a href={`https://www.themoviedb.org/${mv.movieType}/${mv.id}-${mv.title}/watch?locale=IN`} target='_blank'>
                    <div onMouseEnter={()=>{setPlayRotate(true)}} onMouseLeave={()=>{setPlayRotate(false)}} className='absolute right-4 top-4 z-10 transition-all duration-500 pl-3 p-2 rounded-[50%] hover:bg-black'>
                        <img className={`${(playRotate)&&"rotate-[360deg]"} transition-all duration-500`} src={play}/>
                    </div>
                    </a>

                    <div className="w-[100%] h-[100%] bg-black opacity-50 absolute rounded-lg"></div>
                    <div className='w-[95%] right-0 bottom-0 z-10 absolute'>
                        <p className="text-white text-[1.6rem] mb-5 font-medium">{mv.title}</p>
                        <p className='text-white text-[0.6rem] mb-5'>{mv.overview}</p>
                        <div className="flex items-center w-[40%] justify-between mb-4">
                            <p className='text-white text-[0.6rem] font-bold'>{mv.year}</p>
                            <div className='top-0 flex'>
                                <img className=" mt-0" src={star}/>
                                <p className="text-white  text-[0.6rem] mt-0">{mv.popularity.toFixed(1)}</p>
                            </div>
                            <p onClick={()=>{update(mv,true)}} className="text-black text-[0.6rem] px-3 py-1 rounded-full cursor-pointer transition-all  bg-white">watched</p>
                            <p onClick={()=>{remove(mv)}} className="text-white text-[0.6rem] px-3 py-1 rounded-full cursor-pointer transition-all  bg-slate-900">Remove</p>
                        </div>
                    </div>
                </div>}
        </div>)
    })
    


    const moveLeft=(id)=>{
        if(id=="watchlater"){
            if(rigA-1==0){
                setLeftA(false)
            }
            setRigA((prev)=>{
                return (prev-1)
            })
            setRightA(true)
        }else if(id=="watched"){
            if(rigB-1==0){
                setLeftB(false)
            }
            setRigB((prev)=>{
                return (prev-1)
            })
            setRightB(true)
        }
    }
    const moveRight=(id)=>{
        if(id=="watchlater"){
            if((rigA+2)*6>=watchLater.length){
                setRightA(false)
            }
            setLeftA(true)
            setRigA((prev)=>(prev+1))
        }else if(id=="watched"){
            if((rigB+2)*6>=watched.length){
                setRightB(false)
            }
            setLeftB(true)  
            setRigB((prev)=>(prev+1))
        }
    }

    return (
        <>
            <div className="w-[96%]  right-0 absolute overflow-hidden">
                <div className="fixed -z-20 right-0 w-[35rem] h-[35rem] bg-[#A931F3] rounded-[35rem]  translate-x-[40%] translate-y-[-40%] blur-[379px]"></div>
                <div className="fixed -z-10 right-0 w-[96%] h-screen  backdrop-blur-[200px]"></div>
                <div>
                    <p className=" font-bold text-white pt-5 pl-[4%] text-[3rem]">WatchList</p>
                   {(!user)&&( <p onClick={()=>{props.setSignHide(false)}} className="text-white rounded-full absolute top-[60%] left-[50%] underline cursor-pointer z-10">Sign in!</p>)}
                    {(!user)&&(<img className="w-[60%] mx-auto bottom-[250px] relative " src={Movie}/>)}
                    {(user)&&<div className={`mx-[4%] mt-6 flex justify-between `}>
                        {movieList}
                    </div>}
                    {(user)&&(<div className="h-[77vh]">
                    {((watchl.length==0 && watch.length==0))&&(
                    <div>
                        <img src={notFound} className="mx-auto w-[25%] mt-20"/>
                        <p className='text-white text-center mt-20'>Oops! No movies found. Try adding <span onClick={()=>{navigate('/search')}} className='underline cursor-pointer'> some!</span></p>
                    </div>
                    )}
                    {(watchl.length!=0)&&(<div className="relative w-[100%] h-[27%] top-[2%]">
                    <p  className=" text-white text-[1.3vw] pl-[4%] pb-4 ">Watch Next</p>
                        {(leftA)&&(<img onClick={()=>(moveLeft("watchlater"))} src={arrowl} className=" absolute left-[1.5%] top-[92%] w-[1.5%] cursor-pointer z-10"/>)}
                        <div style={{transform:`translateX(${rigA*(-96)}%)`}} id="watchlater" className=" flex translate-x-[%] duration-1000 transition-all w-[100%] h-[100%] mx-[2%] ">
                            {watchl}
                        </div>
                        {(rightA)&&(<img onClick={()=>(moveRight("watchlater"))} src={arrowr} className="absolute right-[1.5%] top-[92%] w-[1.5%] cursor-pointer z-10"/>)}
                    </div>)}
                    

                  {(watch.length!=0)&&(<div className={`${(watchl.length==0)?"top-[2%]":"top-[25%]"} relative w-[100%] h-[27%] `}>
                    <p className=" text-white text-[1.3vw] pl-[4%] pb-3">Watched</p>
                       {(leftB)&&( <img onClick={()=>(moveLeft("watched"))} src={arrowl} className=" absolute left-[1.5%] top-[92%] w-[1.5%] cursor-pointer z-10 "/>)}
                        <div style={{transform:`translateX(${rigB*(-96)}%)`}} id="watched" className=" flex  duration-1000 transition-all w-[100%] h-[100%] mx-[2%] ">
                            {watch}
                        </div>
                       {(rightB)&&(<img onClick={()=>(moveRight("watched"))} src={arrowr} className="absolute right-[1.5%] top-[92%] w-[1.5%] cursor-pointer z-10"/>)}
                    </div>)}
                    
                    </div>)}
                </div>

            </div>
        </>
    )
}


export default Watchlist

