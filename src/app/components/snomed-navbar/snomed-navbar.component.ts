import { Component, Input, OnInit } from '@angular/core';
import { AuthoringService } from 'src/app/services/authoring.service';
import { Project } from 'src/app/models/project';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../services/project.service';

@Component({
    selector: 'app-snomed-navbar',
    templateUrl: './snomed-navbar.component.html',
    styleUrls: ['./snomed-navbar.component.scss']
})
export class SnomedNavbarComponent implements OnInit {

    @Input() environment: string;
    @Input() managedServiceUser: boolean;

    private activeProject: Project;
    private activeProjectSubscription;
    private projects: Project[];
    private projectSubscription: Subscription;
    private user: User;
    private userSubscription: Subscription;

    constructor(private authoringService: AuthoringService,
                private authenticationService: AuthenticationService,
                private projectService: ProjectService) {
        this.userSubscription = this.authenticationService.getLoggedInUser().subscribe(data => this.user = data);
        this.projectSubscription = this.projectService.getProjects().subscribe(data => this.projects = data);
        this.activeProjectSubscription = this.projectService.getActiveProject().subscribe(data => this.activeProject = data);
    }

    ngOnInit() {
        this.authoringService.getProjects().subscribe(data => {
            const projects = data;

            if (!this.managedServiceUser) {
                projects.unshift(new Project('MAIN', 'MAIN'));
            }

            this.projectService.setProjects(projects);
            this.projectService.setActiveProject(projects[0]);
        });
    }

    setProject(project) {
        this.projectService.setActiveProject(project);
    }

    logout() {
        this.authenticationService.logout();
    }
}
