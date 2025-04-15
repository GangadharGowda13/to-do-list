import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import './index.css';

function ToDoList(){
  return (
    <>
    <App />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <ToDoList />)

