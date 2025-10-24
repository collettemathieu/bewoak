import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        loadComponent: () => import('@bewoak/search-client-pathway-test-component').then((m) => m.TestComponent),
        path: 'test',
    },
    { path: '', pathMatch: 'full', redirectTo: '/test' },
];
