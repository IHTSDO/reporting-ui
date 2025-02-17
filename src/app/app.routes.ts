import {Routes} from '@angular/router';
import {AppComponent} from './app.component';

export const routes: Routes = [
    {
        path: ':branch',
        component: AppComponent,
        children: [
            {
                path: ':extension',
                component: AppComponent,
                children: [
                    {
                        path: ':project',
                        component: AppComponent,
                        children: [
                            {
                                path: ':task',
                                component: AppComponent
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
