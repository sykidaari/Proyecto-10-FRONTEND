import './main.scss';
import { header } from './components/header/header';

header();

const res = await fetch('http://localhost:3000/api/v1/events');

const events = await res.json();

console.log(events);
