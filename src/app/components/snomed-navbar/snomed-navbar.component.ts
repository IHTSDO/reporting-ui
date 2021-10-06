import { Component, OnInit } from '@angular/core';
import { AuthoringService } from 'src/app/services/authoring/authoring.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import {Project} from '../../models/project';

@Component({
    selector: 'app-snomed-navbar',
    templateUrl: './snomed-navbar.component.html',
    styleUrls: ['./snomed-navbar.component.scss']
})
export class SnomedNavbarComponent implements OnInit {

    environment: string;

    activeProject: any;
    private activeProjectSubscription;
    projects: any;
    private projectSubscription: Subscription;
    user: User;
    private userSubscription: Subscription;

    constructor(private authoringService: AuthoringService,
                private authenticationService: AuthenticationService) {
        this.userSubscription = this.authenticationService.getUser().subscribe(data => this.user = data);
        this.projectSubscription = this.authoringService.getProjects().subscribe(data => this.projects = data);
        this.activeProjectSubscription = this.authoringService.getActiveProject().subscribe(data => this.activeProject = data);
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];
    }

    ngOnInit() {
        this.authoringService.httpGetProjects().subscribe(data => {
            const projects = data;

            projects.unshift(new Project('MAIN', 'MAIN', 'MAIN'));

            this.authoringService.setProjects(projects);
            this.authoringService.setActiveProject(projects[0]);
        });
    }

    setProject(project) {
        this.authoringService.setActiveProject(project);
    }

    logout() {
        this.authenticationService.logout();
    }
}
