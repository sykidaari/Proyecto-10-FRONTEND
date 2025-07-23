import './main.scss';
import { header } from './components/header/header';
import { fetchApi } from './utils/apiFetcher';

header();

const events = await fetchApi('events/');

console.log(events);
