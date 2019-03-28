import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { ConfigService } from './services/config.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    imsEndpoint: string;

    constructor(private userService: UserService, private configService: ConfigService) {
    }

    ngOnInit() {
        this.configService.getUIConfig().subscribe(
            config => {
                this.imsEndpoint = config['endpoints'].imsEndpoint;
            },
            error => {
                console.log('ERROR: UI Config failed to load');
            });

        this.userService.getLoggedInUser().subscribe(
            user => {
                if (!user) {
                    window.location.replace(this.imsEndpoint + 'login?serviceReferer=' + window.location.href);
                }
            },
            error => {
                window.location.replace(this.imsEndpoint + 'login?serviceReferer=' + window.location.href);
            });
    }
}
