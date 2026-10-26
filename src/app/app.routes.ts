import { Routes } from '@angular/router';
import { NavBar } from './components/nav-bar/nav-bar.component';

export const routes: Routes = [
  {
    path:'',
    component:NavBar,
  },
  {
    path:'**',
    redirectTo:''
  }
];
