import loadingGif from "../assests/loading-gif.gif"
const Loader =()=>{
    return(
        <div style={{height:"100vh", background:"white", opacity:"0.3", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <img src={loadingGif} alt="wait until the page loads" style={{width:"10rem", height:"10rem"}}/>
        </div>
    )
}

export default Loader;