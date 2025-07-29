import './main.scss';
import { header } from './components/header/header';
import { main } from './components/main/main';
import { home } from './pages/home/home';

header();
const mainTag = main();
home(mainTag);
