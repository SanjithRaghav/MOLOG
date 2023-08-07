import {useState,useEffect} from 'react'
import Arrow from "/arrow.svg"
import added from '/added.svg'



const AddWatchList=(props)=>{
    const [watch,setWatch]=useState(false)
    const [movie,setMovie]=[props.watchMovie,props.setWatchMovie]
    const [notify,setNotify]=useState(false)
    const addMovie=()=>{
        props.setLoader(true)
        let url="https://molog.onrender.com/movies/addMovie"
            props.user.movies.forEach((mv) => {
            // console.log(mv)
            if(mv.id==movie.id){
                // console.log("hello")
                url="https://molog.onrender.com/movies/updateMovie"
            }
        })
        console.log(url)
        fetch(url,{
            method:"POST",
            body:JSON.stringify({
                "email": props.user.email,
                "movie": {
                        "id":movie.id,
                        "title": ((props.type)?movie.title:movie.name), 
                        "backdrop_path": movie.backdrop_path, 
                        "poster_path": movie.poster_path, 
                        "overview": movie.overview, 
                        "watched":watch,
                        "genre":movie.genre_ids,
                        "popularity":movie.vote_average,
                        "year":((props.type)?movie.release_date.slice(0,4):movie.first_air_date.slice(0,4)),
                        "movieType":(props.type)?("movie"):("tv")
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
            props.setLoader(false)
            setNotify(true)
            props.setUser(json)
            // console.log(json)
        }).catch((error)=>{
          props.setLoader(false)
            console.log(error)
        });
    } 

    useEffect(()=>{
        if(notify){
            const timeout=setTimeout(()=>{
                props.setHide(true)
                setMovie(null)
                setNotify(false)
            },1000)
        }
        
    },[notify])

    return (
      <>
        <div
          onClick={() => {
            props.setHide(true);
            setMovie(null)
          }}
          className="fixed top-0 left-0 z-30 right-0 bottom-0 bg-black opacity-50"
        ></div>
          <div className="fixed translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] z-30 w-[20%] bg-[#A931F3] rounded-md px-6 pb-6">
             {(notify)&&(<div className="absolute w-[100%] left-0"> <img className='w-[100%]' src={added} /><p className="text-center text-white text-[1.3rem]">Successfully added</p> </div>)}
          <div className={(notify)?`invisible`:"visible"}>

          <div className=" pt-6 flex items-center justify-between  mb-[1rem]">
            <div>
            <p className=" text-[1.4rem] text-black font-bold uppercase tracking-tighter">
              Watched
            </p>
            <div className={`${(watch)?"w-0":"w-[6.3rem]"} transition-all h-[0.2rem] bg-black absolute top-[2.5rem]`}></div>
            </div>
           
            <div onClick={()=>{setWatch((watch)=>(!watch))}} className="cursor-pointer w-[2.1rem] h-[1.125rem] bg-black rounded-[1.125rem] relative shadow-lg"><div className={`${(watch)&&"translate-x-[100%]"} transition-all duration-200 w-[1.125rem] absolute   h-[1.125rem] rounded-[1.125rem]  bg-white`}></div></div>

          </div>
          <img src={Arrow} className='absolute z-0 left-[0] w-[100%] '/>
          <div className='flex'>
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="z-10 w-[70%] rounded-md mx-auto"/>
          </div>
          <div className="flex justify-between mt-[1.8rem]">
            <button onClick={addMovie} className="bg-black text-[white] font-regular cursor-pointer px-[15%] py-2 rounded-lg">ADD</button>
            <button onClick={()=>{props.setHide(true);setMovie(null)}} className='bg-black text-white rounded-lg cursor-pointer px-[15%] py-[2%]'>NO</button>
          </div>
          </div>
        </div>
      </>
    );
}


export default AddWatchList