import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    imports: [RouterModule],
    selector: 'app-root',
    styleUrl: './app.scss',
    templateUrl: './app.html',
})
export class App {
    title = 'client';
    shell?: string;

    ngOnInit() {
        this.shell = 'pkgJSON';
    }
}
