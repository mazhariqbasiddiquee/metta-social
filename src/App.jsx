import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let [data,change_data]=useState([])
  let [currency1,change_currency]=useState("")
 let [total,change_count_button]=useState([])
  let [currentPage, set_Current_Page] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      let url =
      currency1 === ''
          ? 'https://restcountries.com/v3.1/all'
          : `https://restcountries.com/v3.1/currency/${currency1}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 404) {
          change_data([]);
          change_count_button([]);
        } else {
          let length = Math.ceil(data.length / 20);
          let arr = [];
          for (let i = 1; i <= length; i++) {
            arr.push(i);
          }
          change_count_button(arr);
          let init=(currentPage-1)*20;
          let final= currentPage*20;
          let slicedData=data.slice(init, final);
          change_data(slicedData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 500); 

    return () => clearTimeout(debounceTimer);
  }, [currency1, currentPage]);

  const handleInputChange = (e) => {
    change_currency(e.target.value);
    set_Current_Page(1); 
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>World by Currency</h1>
      <div style={{ textAlign: 'center',minWidth:"150px" }}>
        <input
          className="input"
          type="text"
          placeholder="Enter currency name to search"
          style={{}}
          onChange={handleInputChange}
        />
      </div>
      <div className="content">
        {data.length === 0 ? (
          <h1>No country matches</h1>
        ) : (
          data.map(({ name, flags, capital }) => {
            return (
              <div   style={{display:"grid",placeItems:"center"}}  key={name.official}>
                <img src={flags.png} alt="error"  className='image' />
                <div style={{ textAlign: 'center', margin: '40px' }}>
                  <h3>{name.official}</h3>
                  <p>{capital}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="button">
        {total.map((elem) => (
          <button
            key={elem}
            style={{ marginLeft: '10px', width: '30px' }}
            onClick={() => {
              set_Current_Page(elem);
            }}
          >
            {elem}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
