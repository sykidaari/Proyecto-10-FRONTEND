import './main.scss';
import { header } from './components/header/header';
import { main } from './components/main/main';
import { home } from './pages/home/home';
import { headerEvents } from './components/header/headerEvents';
import { footer } from './components/footer/footer';
import { app } from './config';
import { eventCreationButton } from './components/eventCreationButton/eventCreationButton';

const links = header(app);
const mainTag = main(app);
footer(app);

headerEvents(links, mainTag);

home(mainTag);

eventCreationButton(app, mainTag);
