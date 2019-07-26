import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { ProjectService } from './services/project.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    constructor(private userService: UserService, private projectService: ProjectService) {
    }

    ngOnInit() {
        this.projectService.getUIConfiguration().subscribe(
            data => {
                this.projectService.uiConfiguration = data;
            },
            error => {
                console.error('ERROR: UI Config failed to load');
            });

        this.userService.getLoggedInUser().subscribe(
            user => {
                if (!user) {
                    window.location.replace(this.projectService.uiConfiguration.endpoints.imsEndpoint
                        + 'login?serviceReferer=' + window.location.href);
                }
            },
            error => {
                window.location.replace(this.projectService.uiConfiguration.endpoints.imsEndpoint
                    + 'login?serviceReferer=' + window.location.href);
            });


    }
}
