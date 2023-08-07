import {useState,useLayoutEffect,useRef, useEffect,useContext} from 'react'
import gsap from 'gsap'
import star from '/star.svg'
import play from '/play.svg'
import arrowl from '/arrow-left.svg'
import arrowr from '/arrow-right.svg'
import { userContext } from '../authentication/useContext'
import AddWatchList from "./addWatchList.jsx"
import img1c from '/1c.svg'
import img2c from '/2c.svg'
import img3c from '/3c.svg'
import img4c from '/4c.svg'
import img5c from '/5c.svg'
import img6c from '/6c.svg'
import img7c from '/7c.svg'
import img8c from '/8c.svg'
import img9c from '/9c.svg'

import img1 from '/1.svg'
import img2 from '/2.svg'
import img3 from '/3.svg'
import img4 from '/4.svg'
import img5 from '/5.svg'
import img6 from '/6.svg'
import img7 from '/7.svg'
import img8 from '/8.svg'
import img9 from '/9.svg'

const Home=(props)=>{
  const img=[img1,img2,img3,img4,img5,img6,img7,img8,img9]
  const imgc=[img1c,img2c,img3c,img4c,img5c,img6c,img7c,img8c,img9c]
  const [left,setLeft]=useState(false)
  const [right,setRight]=useState(true)
    const [user,setUser]=useContext(userContext)
    const [trending,setTrending]=useState([])
    const [currentMovie,setCurrentMovie]=useState(null)
    const [currentIndex,setCurrentIndex]=useState(0)
    const [page,setPage]=useState(0) 
    const [watchHide,setWatchHide]=useState(true)
    const [watchMovie,setWatchMovie]=useState(null)
    useEffect(()=>{
      setCurrentMovie(trending[0])
    },[trending])
    useEffect(()=>{
      const url = 'https://api.themoviedb.org/3/trending/movie/week';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWRjYjQ4NTkxMTM3YmIwZmU3NzE1Mzc0NGY2OTJjOCIsInN1YiI6IjYzMTBjY2JkN2ZjYWIzMDA3ZmJkZmVkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1iAei_v2-QvzugFcddbVx8DMcps500az92CxzsPlvf8'
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(json => {setTrending(json.results)})
        .catch(err => console.error('error:' + err));
      
        
    },[])
    useEffect(()=>{
      setCurrentMovie(trending[currentIndex])
    },[currentIndex])

    
    const interval=()=>{
      setCurrentIndex((prev)=>{
        if(prev==5){
          setRight(false)
          setLeft(true)
          setPage(1)
        }
        else if(prev==8){
          setRight(true)
          setLeft(false)
          setPage(0)
        }
        return ((prev+1)%9)
      })
    }
    const [animState,setAnimState]=useState(null);
    const inter=()=>{
      if(animState!=null){
        clearInterval(animState)
      }
      const anim=setInterval(interval,4000)
      setAnimState(anim)
    }


    const trigg=()=>{
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
        const txt=document.getElementById("txt")
        const word="MOLOG"
        const interval = setInterval(() => {
         txt.innerText =txt.innerText
            .split("")
            .map((char, index) => {
              if (15== iter) {
                return word[index];
              }
              return alphabet[Math.floor(Math.random() * 26)];
            })
            .join("");
          if (iter == 15) clearInterval(interval);
          iter++;
        }, 30);
  }


    const textRef=useRef()
    const contRef=useRef()
    useLayoutEffect(() => {
        const tl= gsap.timeline()
        tl.from(textRef.current, {
          y:"50%",
          opacity:0,
          duration:2
        }).add(trigg)
        .to(textRef.current,{
            letterSpacing:"100px",
            duration:3
        }).to(textRef.current,{
            opacity:0,
            display:"none",
            duration:0.5
        }).to(contRef.current,{
            y:"-200%",
            duration:1
        }).add(inter)
      },[]);

    const moveRight=()=>{
        setPage((prev)=>{
          setRight(false)
            setLeft(true)
            return (prev+1)
        })
    }
    const moveLeft=()=>{
      setPage((prev)=>{
       
          setRight(true)
          setLeft(false)
          return (prev-1)
      })
    }

    const trendingDisp=trending.slice(0,9).map((mv,ind)=>{
      return (<div onClick={()=>{inter();setCurrentIndex(ind)}} key={ind} className="cursor-pointer w-[15vw] relative mx-[0.5vw]">
        <img className={` transition-all duration-500 inline ${(ind==0)?"w-[44%]":"w-[50%]"}`} src={(ind==currentIndex)?imgc[ind]:img[ind]}/>
        <img className='inline w-[50%] z-10 right-4   relative rounded-md' src={`https://image.tmdb.org/t/p/w500${mv.poster_path}`}/>
        </div>)
    })  

    const addMovie=()=>{
      if(!user){
        props.setSignHide(false)
      }
      else{
        setWatchMovie(currentMovie)
        setWatchHide(false)
      }
    }
    return (
      <>
       {(!watchHide)&&<AddWatchList type="movie" setHide={setWatchHide}  setWatchMovie={setWatchMovie} setLoader={props.setLoader} watchMovie={watchMovie} user={user} setUser={setUser}/>}
    <div className='overflow-x-hidden w-screen h-screen'>

        <div ref={contRef} className='h-screen w-screen bg-black overflow-hidden z-20 absolute'>
            <div className='overflow-hidden flex justify-center w-screen h-screen items-center'> 
                    <p id="txt" ref={textRef} className="absolute  text-white  text-[2rem] tracking-[10px]">HELLO</p>
            </div>
            
        </div>
        <div style={(currentMovie)&& {backgroundImage:`url('https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}')`}} className='transition-all duration-500 overflow-x-hidden w-[96%] right-0 absolute h-[100%] bg-cover'>
          {(currentMovie)&&(<div className='text-white w-[37%] z-10 absolute ml-10 bottom-[35%]'>
            <div className="flex items-baseline">
              <p className="text-white text-[2rem] mb-4 font-bold uppercase">{currentMovie.title}</p>
            </div>
            <div className="flex items-center w-[40%] justify-between mb-4">
            <p className='text-white text-[0.8rem]'># no {currentIndex+1} in this week</p>
                
                <p className='text-white text-[0.6rem] font-bold'>{currentMovie.release_date.slice(0,4)}</p>
                <div className='top-0 flex'>
                    <img className=" mt-0" src={star}/>
                    <p className="text-white  text-[0.6rem] mt-0">{currentMovie.vote_average.toFixed(1)}</p>
                </div>
            </div>
            <p className='text-white text-[1.1rem] mb-5 '>{currentMovie.overview}</p>
            <div className='flex justify-between w-[38%] '>
              <a  href={`https://www.themoviedb.org/movie/${currentMovie.id}-${currentMovie.title}/watch?locale=IN`} target='_blank' className='cursor-pointer px-[10%] py-2 bg-[#A931F3] rounded-lg'>Play</a>
              <p onClick={addMovie} className='cursor-pointer px-[10%] py-2 bg-[white] text-black rounded-lg'>watchlist</p>
            </div>
          </div>)}
          <div className="absolute  bottom-0 z-10">
          <p className='text-white ml-10 mb-4 text-[1.2rem] font-medium'>TRENDING</p>
          {(left)&&(<img onClick={()=>(moveLeft())} src={arrowl} className=" absolute left-[1.5%] bottom-[28%] z-20 w-[0.8%] cursor-pointer "/>)}
          {(right)&&(<img onClick={()=>(moveRight())} src={arrowr} className=" absolute left-[66%] bottom-[28%] z-20 w-[0.8%] cursor-pointer "/>)}
          <div style={{transform:`translatex(${-42*page}%)`}} className='flex transition duration-500'>
          
            {trendingDisp}
          </div>

          </div>
        </div>
        <div  className="h-[100%] w-[96%] absolute right-0 bg-gradient-to-r from-[#000] from-41.7% via-[rgba(5, 5, 5, 0.78)] from-76% via-[rgba(10, 10, 10, 0.9)] to-[ rgba(255, 255, 255, 0.00)] "></div>
        <div  className="h-[100%] w-[96%] absolute right-0 bg-gradient-to-t from-[#000] from-41.7% via-[rgba(5, 5, 5, 0.78)] from-76% via-[rgba(10, 10, 10, 0.9)] to-[ rgba(255, 255, 255, 0.00)] "></div>

    </div>
      </>)
}

export default Home