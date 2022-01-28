import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { Productos } from './Productos';


const divRoot = document.querySelector('#app');

// ReactDOM.render( <PrimeraApp saludo="Hola soy goku" />  , divRoot );
ReactDOM.render( <Productos />  , divRoot );

