import { Component } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private httpService: HttpService) {
        this.httpService.getReports();
    }
}
