import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'user/new',
        component: UserComponent
    },
    {
        path: 'user/edit/:id',
        component: UserComponent
    }
];
