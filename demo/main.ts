import app, { ROUTER_EVENT } from '../src/apprun';

app.on(ROUTER_EVENT, route => {
  const menus = document.querySelectorAll('.navbar-nav li');
  for (let i = 0; i < menus.length; ++i) menus[i].classList.remove('active');
  const item = document.querySelector(`[href='${route}']`);
  item && item.parentElement.classList.add('active');
})

import home from './components/home';
import counter from './components/counter';
import counters from './components/counters';
import dragdrop from './components/dragdrop';
import blade from './components/blade';
import todo from './components/todo';
import benchmark from './components/benchmark';
import hello from './components/hello';
import svg from './components/svg';
import animation from './components/animation';
import play from './components/play';

const element = document.getElementById('my-app');
[home, hello, blade, counter, counters, dragdrop, todo, animation, benchmark, svg, play].forEach(c => c(element));
