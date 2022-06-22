import React, { useState } from "react";

export default function Meme() {

    const [memeData, setMemeData]=React.useState({
        firstline : "",
        lastline : "",
        randomImage: "http://i.imgflip.com/1bij.jpg"

    })

    const [allMemes, setAllMemes]=useState([]);

    React.useEffect(()=>{
        // API : //"https://api.imgflip.com/get_memes"
        async function getMemes(){
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
        

    },[])
    
    const getMemeImage=()=>{
        let randomNum = Math.floor(Math.random()*allMemes.length);
        
        setMemeData(prevState=>{
            return {
                ...prevState,
                randomImage:[allMemes[randomNum].url]
            }
        })
       
    }
   const handlerMeme=(event)=>{
        const {name,value}=event.target;
        setMemeData(prevState=>{
            return {
                ...prevState,
                [name]:value
            }
        })
   }
    return (
        <>
        <main>
            <div className="form">
                <input className="form--input" 
                style={{marginRight:10   }} 
                type="text"  placeholder="First Line" 
                name="firstline"
                onChange={handlerMeme}
                value={memeData.firstline}
                />

                <input className="form--input" 
                type="text" 
                placeholder="Last Line" 
                name="lastline"
                onChange={handlerMeme}
                value={memeData.lastline}
                /> 

                <div className="form--btncontainer">
                    <button onClick={getMemeImage} className="form--button">Get a new meme image 🖼</button>
                </div>
            </div>
             <div className="meme">
                <img src={memeData.randomImage} className="meme--image"/>
                <h2 className="meme--text top">{memeData.firstline}</h2>
                <h2 className="meme--text bottom">{memeData.lastline}</h2>
            </div>
        </main>
    </>
    )
}