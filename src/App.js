import React, { useState, useEffect } from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hotels } from './components';
import { DECREMENT, HOTELS_LIST, INCREMENT, REMOVE_ITEM, SORT_DECREMENT, SORT_INCREMENT } from "./store/types";
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

function App() {
  const hotels = [
    { id: 1, name: 'Voyage Hotel 1' , point: 5, image: 'https://www.michellhotel.com/uploads/michell-hotel-slider-3-img.jpg'},
    { id: 2, name: 'Voyage Hotel 2' , point: 8.7, image: 'https://www.michellhotel.com/uploads/michell-hotel-slider-3-img.jpg' },
    { id: 3, name: 'Voyage Hotel 3' , point: 6.5, image: 'https://www.michellhotel.com/uploads/michell-hotel-slider-3-img.jpg' },
    { id: 4, name: 'Voyage Hotel 4' , point: 9.7, image: 'https://www.michellhotel.com/uploads/michell-hotel-slider-3-img.jpg'},
    { id: 5, name: 'Voyage Hotel 5' , point: 8.8, image: 'https://www.michellhotel.com/uploads/michell-hotel-slider-3-img.jpg' },
    { id: 6, name: 'Voyage Hotel 6' , point: 3.5, image: 'https://www.michellhotel.com/uploads/michell-hotel-slider-3-img.jpg' },
    { id: 7, name: 'Voyage Hotel 7' , point: 6.7, image: 'https://www.michellhotel.com/uploads/michell-hotel-slider-3-img.jpg'},
    { id: 8, name: 'Voyage Hotel 8' , point: 7.7, image: 'https://www.michellhotel.com/uploads/michell-hotel-slider-3-img.jpg' },
    { id: 9, name: 'Voyage Hotel 9' , point: 2.5, image: 'https://www.michellhotel.com/uploads/michell-hotel-slider-3-img.jpg' },
    { id: 10, name: 'Voyage Hotel 10' , point: 4.7, image: 'https://www.michellhotel.com/uploads/michell-hotel-slider-3-img.jpg'}
  ] ;
  
  const hotelList = useSelector(state => state.hotelList);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  useEffect(()=> {
    dispatch({type: HOTELS_LIST, payload: hotels.reverse()})
  }, [])

  const handleSave = async (value) => {
    if (value.length > 0) {
      let length = hotels.length;
      let newObjectHotel = {
        id: length + 1,
        name: value,
        point: 5.0,
        image: 'https://www.michellhotel.com/uploads/michell-hotel-slider-3-img.jpg'
      };
  
      hotels.push(newObjectHotel);
      dispatch({type: HOTELS_LIST, payload: hotels})
    }
    setOpen(false);
    
    Swal.fire('Otel Eklenmiştir.', "", "success")
  }

  const handleDelete = async (id) => {
    Swal.fire({
        title: 'Silmek İstediğinize Emin Misiniz ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Hayır',
        confirmButtonText: 'Evet'
      }).then((result) => {
        if (result.isConfirmed) {
            dispatch({type: REMOVE_ITEM, payload: id})
            Swal.fire('Otel Silinmiştir.', result.message, "success")
        }
      })
  }

  const handleDecrement = async (value) => {
    dispatch({type: DECREMENT, payload: (value)})
  }

  const handleIncrement = async (value) => {
    dispatch({type: INCREMENT, payload: (value)})
  }

  const handleSort = async (value) => {
    value === 0 ? dispatch({type: SORT_INCREMENT}) : dispatch({type: SORT_DECREMENT})
  }

  const showModal = () => {
      setOpen(true);
  };

  const handleClose =  () => {
      setOpen(false);
  };

  return (
    <Router>
        <div>
            <Navbar />
            <Routes>
              <Route exact path='/'>
                  <Route exact path='/' element={
                    <Hotels 
                      hotels={hotelList}
                      handleClose={handleClose} 
                      open={open} 
                      handleSave={handleSave} 
                      handleDelete={handleDelete} 
                      showModal={showModal} 
                      handleIncrement={handleIncrement} 
                      handleDecrement={handleDecrement}
                      handleSort={handleSort}
                    />}
                  />
                </Route>
            </Routes>
        </div>
    </Router>
)
}

export default App;
