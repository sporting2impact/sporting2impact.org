import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Donate } from './donate/donate';
import { Events } from './events/events';
import { Home } from './home/home';
import { Team } from './team/team';
import { App } from './app';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'team', component: Team },
  { path: 'events', component: Events },
  { path: 'donate', component: Donate },
  { path: '**', redirectTo: 'home' }
];
