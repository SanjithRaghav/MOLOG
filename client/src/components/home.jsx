import {useState,useLayoutEffect,useRef} from 'react'
import gsap from 'gsap'
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
const Home=()=>{
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
        })
      },[]);
      
    return (
    <div className='overflow-hidden w-screen h-screen'>
        <div ref={contRef} className='h-screen w-screen bg-black overflow-hidden z-20 absolute'>
            <div className='overflow-hidden flex justify-center w-screen h-screen items-center'> 
                    <p id="txt" ref={textRef} className="absolute  text-white  text-[2rem] tracking-[10px]">HELLO</p>
            </div>
        </div>
    </div>)
}

export default Home