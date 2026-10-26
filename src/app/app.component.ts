import { Component } from '@angular/core';
import { RouterOutlet } from '../../node_modules/@angular/router/types/_router_module-chunk';
import { NavBar } from './components/nav-bar/nav-bar.component';
import { Navbar } from './shared/navbar/navbar.component';

@Component({
  imports: [RouterOutlet, NavBar, Navbar],
  selector: 'app-root',
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class App {}
