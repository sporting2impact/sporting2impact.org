import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Joinus } from './joinus/joinus';
import { Events } from './events/events';
import { Home } from './home/home';
import { Team } from './team/team';
import { App } from './app';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'team', component: Team },
  { path: 'events', component: Events },
  { path: 'joinus', component: Joinus },
  { path: '**', redirectTo: 'home' }
];
