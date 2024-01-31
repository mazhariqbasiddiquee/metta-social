
import './App.css';
import { useEffect,useState } from 'react';

function App() {
 let [data,change_data]=useState([])
  let [currency1,change_currency]=useState("")
  let [total,change_count_button]=useState([])
  let [curr,curr_change]=useState(1)
  useEffect(()=>{
    fetch("https://restcountries.com/v3.1/all")
    .then((res)=>res.json())
    .then((data)=>{
      let length=Math.ceil(data.length/20)
      
     
      
      
      let arr=[]
      for(let i=1;i<=length;i++){
           arr.push(i)
      }
         curr_change(1)
      change_count_button(arr)
      console.log(curr,"**",data.length)
      let init = (curr-1)*20;
      let final = curr*20;
      data = data.slice(init, final);
      change_data(data)

      
    })
    .catch((err)=>{
      console.log(err)
    })

  },[curr])

 const  Handlesubmit=()=>{
 
  let url=currency1===""?"https://restcountries.com/v3.1/all":`https://restcountries.com/v3.1/currency/${currency1}`
  fetch(url)
  .then((res)=>res.json())
  .then((data)=>{
    if(data.status===404){
      change_data([])

      curr_change([])
    }
    else{
      let length=Math.ceil(data.length/20)
     
      let arr=[]
      for(let i=1;i<=length;i++){
           arr.push(i)
      }

      change_count_button(arr)
      let init = (curr-1)*20;
      let final = curr*20;
      data = data.slice(init, final);
      change_data(data)
    }
  
  })
  .catch((err)=>{
    console.log(err)
    
  })
 }

  return (
    <div>
    <h1 style={{textAlign:"center"}}>World by Currency</h1>
      <div style={{textAlign:"center"}}>
          <input type="text"  placeholder='Enter currency name to search'        style={{width:"20%", height:"24px",marginTop:"5%"}} onChange={(e)=>{
               change_currency(e.target.value)
          }} />
           <button onClick={Handlesubmit}  style={{width:"8%",marginLeft:"20px",height:"24px"}}>Search</button>
      </div>
      <div className='content'>{
        data.length===0?<h1 >No country matches</h1>:
        data.map(({name,flags,capital})=>{
   
          return(
            <div>
                <img src={flags.png} alt="error" />
                <div style={{textAlign:"center", margin:"40px"}}>
                <h3>{name.official}</h3>
                <p>{capital}</p>
                </div>
              

            </div>
          )
        })
        
        
        }</div>
            <div style={{display:"flex",justifyContent:"center",marginBottom:"50px"}}>{
              total.map((elem)=>{
                return(<button style={{marginLeft:"10px",width:"30px"}} onClick={()=>{
                  curr_change(elem)
                }}>
                  {elem}
                </button>)
              })
              
              }</div>
    </div>
    
  );
}

export default App;
