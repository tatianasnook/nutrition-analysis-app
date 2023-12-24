import './App.css';
import { useEffect, useState, useRef } from 'react';
import { Nutrition } from "./Nutrition";
import { LoaderPage } from "./LoaderPage";
import Swal from 'sweetalert2';

function App() {
  const box = useRef();
  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted] = useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);

  const APP_ID = 'c929c8c3';
  const APP_KEY = '50bb4a4c28e0c37eebcf22e6d971cac1';

  const fetchData = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    });
    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setMyNutrition(data);
      box.current.classList.add('results');
    } else {
      setStateLoader(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ingredient entered incorrectly!"
      });
    }
  }

  const myRecipeSearch = e => {
    setMySearch(e.target.value);
  }

  const finalSearch = (e) => {
    e.preventDefault();

    if (mySearch.trim() === '') {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please enter an ingredient or ingredient list.",
      });
    } else {
      setWordSubmitted(mySearch);
    }
  }

  useEffect(() => {
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }
  }, [wordSubmitted])


  return (
    <div className='App'>
      {stateLoader && <LoaderPage />}
      <h1>Nutrition Analysis</h1>
      <p>Enter an ingredient or ingredient list, like "1 banana, 1 cup sour cream, 2 oz cheese".</p>

      <form onSubmit={finalSearch}>
        <input
          placeholder="Enter ingredient..."
          onChange={myRecipeSearch}
        />
        <button type="submit">Analyze</button>
      </form>

      <div ref={box}>
        {myNutrition && <h2>{myNutrition.calories} kcal</h2>}
        {
          myNutrition && Object.values(myNutrition.totalNutrients)
            .map(({ label, quantity, unit }, index) =>
              <Nutrition
                key={index}
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }
      </div>
    </div>
  );
}

export default App;
