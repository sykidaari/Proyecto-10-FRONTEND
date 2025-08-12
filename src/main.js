import './main.scss';
import { header } from './components/header/header';
import { main } from './components/main/main';
import { home } from './pages/home/home';
import { headerEvents } from './components/header/headerEvents';
import { footer } from './components/footer/footer';
import { register } from './pages/register/register';

const links = header();
const mainTag = main();
footer();

headerEvents(links, mainTag);

home(mainTag);

register(mainTag);
