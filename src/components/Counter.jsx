import {useSelector, useDispatch} from 'react-redux';
import { increment, decrement } from '../features/counter/counterSlice';

import React from 'react'

const Counter = () => {

  //Read the data from the store  
  const count =  useSelector((state)=> state.counter.value); 

  //changing the data by sending actions to the store
  const dispatch = useDispatch();

  return (
    <>
    <div>{count} </div>
    <button onClick={()=> dispatch(increment()) }>+ </button>
    <button onClick={()=> dispatch(decrement())}>- </button>
    
    </>
  )
}

export default Counter