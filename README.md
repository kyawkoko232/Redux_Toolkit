Redux Tool Kit
## Store
Application တစ်ခုလုံးရဲ့ State တွေကိုသိမ်းထားပြီး configureStore function နဲ့ တည်ဆောက်ရတယ်။ Application တစ်ခုလုံးရဲ့ state tree ကိုကိုင်ထားတယ်။

 လိုအပ်တဲ့ Libraray တွေသွင်း

```javascript
yarn  add react-redux && yarn  add react-redux
```

<br>

#### Step 1 - Store ဖိုင်ဆောက်
Store Folder တစ်ခုဆောက်ပြီး configureStore function ကို redux tool kit ကနေခေါ်သုံးမယ်။
<a id="store"> </a>

`src/store/store.js`
```jsx
import { configureStore} from '@reduxjs/toolkit';


export const store =  configureStore({
    //Slice တွေခွဲပြီးရင် Object ထဲ slice နာမည်တွေရေးထည့်မယ်။
    reducer : { },
});
```
<br>

#### Step 2 - main.jsx မှာ Redux က  provider ထောက်ပံ့ပေး။
React ကို Redux Store Provide လုပ်ပေး။ အဲလို  ပေးလိုက်ခြင်းအားဖြင့် Application ကြီးတစ်ခုလုံးကို store နဲ့ချိတ်ဆက်ပြီး လှမ်းသုံးလို့ရသွားမယ်။ 

`main.jsx`
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//Redux
import { store } from './store/store.js';
import { Provider }from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
    // Adding Provider and store
  <Provider store={store} >
    <App />
  </Provider>
)
```

<br>

#### Step 3 - Slice ဖိုင်တွေဆောက်
#### What is Slice
* A slice is a piece of store state and the corresponding reducer logic to update that state. Slices are a way to organize our Redux Store by breaking it down into smalller, more manageable parts

* ဥပမာ အနေနဲ့ကိုယ့်မှာကိုယ့်မှာ ကိတ်မုန့်တစ်လုံးရှိတယ်ဆိုရင် အစိတ်ပိုင်းလေးတွေခွဲမယ် စားသုံးလို့အဆင်ပြေအောင် အစိတ်ပိုင်းတစ်ခုစီက ကိတ်မုန့်ရဲ့ Slice အပိုင်းအစလေးတွေဖြစ်မယ်။ Redux မှာလည်း Slice က Application state overall state တစ်ခုလုံးရဲ့ အစိတ်ပိုင်းအသေးလေးတွေ ဖြစ်ပြီး အဲဒီအစိတ်ပိုင်းသေးသေးလေးတွေကိုဘယ်လို update လုပ်ရမလဲ ပြောင်းလဲရမလဲဆိုတာကိုသတ်မှတ်လို့ရတယ်။

*  code အရမ်းများနေရင်နောက်တစ်ဖိုင်ခွဲရေးလို့ရ။

`src/slice/counterSlice.js`
```jsx
import { createSlice } from '@reduxjs/toolkit';

//
export const counterSlice = createSlice({
    name : "counter",
    initialState : {value : 0},
    reducers : {
        increment : (state) => {
            state.value += 1;
        },
        decrement : (state) => {
            state.value -= 1;
        },
    }
});

export const {increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

* createSlice()  function  ထဲမှာ object parsing လုပ်
    * name 
        * ကိုယ်ကြိုက်တဲ့နာမည်ပေး။ store.js ထဲမှာပြန်ခေါ်သုံးဖို့။ <a href="#store"> Store</a>
    * initialState 
        * နာမည်အတိုင်းဘဲ ကိုယ့် state ရဲ့ initial data ဖြစ်တယ်။ useState,setState(""); လိုမျိုးမြင်ပေးလို့ရတယ်။ 
    * reducers ကို object parsing ပေးပြီး properties တွေပါတယ်။
        * Reducers are like the instructions on what to do with each slice of cake
        * They define how to the information in a particular slice can be changed or updated
* Reducers Object ထဲမှာ Actions or methods  တွေပါမယ်။
    * Actions are like request or commands you give to change a specific slice of cake
    *  For example, you might have an action called "Eat Slice  a bite  that instruction how to take a bite from slice
    *  Actions are payloads of information that send data from your application to your Redux store. In a slice, you define action creators, which are functions that create action objects to be dispatched to the Redux store.

export  ထုတ်ရင်သတိထားမယ်။  `actions` s ပါတယ်။
```jsx
export const {increment, decrement } = counterSlice.actions;
```
<br>

#### Step 4
<a href="#store"> Store</a> ထဲက reducer ထဲ   slice `name` parameter မှာ ကိုယ်ပေးထားတဲ့နာမည်နဲ့  Slice Reducers တွေပြန်ထည့်

`src/store/store.js`
```jsx
import { configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store =  configureStore({

    reducer : {
        counter : counterReducer
    },
});
```

`useSelector()` allows us to read data from the redux store
`useDispatch()` 
* The Dispatch function is used to send actions to the store, triggering update to the Application state
* In simpler term it let you `change the state` in your redux `store` from within you React component
  
in component

```jsx
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
```

 <br>

  state.counter က  store.js counter property ကနေလာတယ်၊။ 
```jsx
import { configureStore} from '@reduxjs/toolkit'; 
import counterReducer from '../features/counter/counterSlice'; 


export const store =  configureStore({ 
    reducer : { 
        counter : counterReducer 
    }, 
}); 
```

.value ကကျတော့ slice , initialState  value ကနေလာတယ် 
```jsx
export const counterSlice = createSlice({ 
    name : "counter", 
    initialState : {value : 0}, 
    reducers : { 
        increment : (state) => { 
            state.value += 1; 
        }, 
        increment : (state) => { 
            state.value -= 1; 
        }, 
    } 

}); 
```

```jsx
<button onClick={()=> dispatch(increment()) }>+ </button>
```

increment က function မလို့ `()`လိုတယ်။