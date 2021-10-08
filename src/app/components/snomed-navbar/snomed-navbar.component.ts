import { Component, OnInit } from '@angular/core';
import { AuthoringService } from 'src/app/services/authoring/authoring.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import {Project} from '../../models/project';
import {PathingService} from '../../services/pathing/pathing.service';

@Component({
    selector: 'app-snomed-navbar',
    templateUrl: './snomed-navbar.component.html',
    styleUrls: ['./snomed-navbar.component.scss']
})
export class SnomedNavbarComponent implements OnInit {

    environment: string;

    user: User;
    userSubscription: Subscription;

    branches: any;
    branchesSubscription: Subscription;
    activeBranch: any;
    activeBranchSubscription: Subscription;

    projects: any;
    projectsSubscription: Subscription;
    activeProject: any;
    activeProjectSubscription: Subscription;

    tasks: any;
    tasksSubscription: Subscription;
    activeTask: any;
    activeTaskSubscription: Subscription;


    constructor(private authoringService: AuthoringService,
                private authenticationService: AuthenticationService,
                private pathingService: PathingService) {
        this.userSubscription = this.authenticationService.getUser().subscribe(data => this.user = data);
        this.branchesSubscription = this.pathingService.getBranches().subscribe(data => this.branches = data);
        this.activeBranchSubscription = this.pathingService.getActiveBranch().subscribe(data => this.activeBranch = data);
        this.projectsSubscription = this.pathingService.getProjects().subscribe(data => this.projects = data);
        this.activeProjectSubscription = this.pathingService.getActiveProject().subscribe(data => this.activeProject = data);
        this.tasksSubscription = this.pathingService.getTasks().subscribe(data => this.tasks = data);
        this.activeTaskSubscription = this.pathingService.getActiveTask().subscribe(data => this.activeTask = data);
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];
    }

    ngOnInit() {
        this.pathingService.httpGetBranches().subscribe(branches => {
            this.pathingService.setBranches(branches);
            this.pathingService.setActiveBranch(branches[0]);
        });

        this.pathingService.httpGetProjects().subscribe(projects => {
            this.pathingService.setProjects(projects);
        });
    }

    setBranch(branch) {
        this.pathingService.setActiveBranch(branch);

        this.pathingService.setActiveProject(null);

        this.pathingService.setTasks([]);
        this.pathingService.setActiveTask(null);
    }

    setProject(project) {
        this.pathingService.setActiveProject(project);

        this.pathingService.setTasks([]);
        this.pathingService.setActiveTask(null);

        if (project.key) {
            this.pathingService.httpGetTasks(project).subscribe(tasks => {
                this.pathingService.setTasks(tasks);
            });
        }
    }

    noProject() {
        this.pathingService.setActiveProject(null);
    }

    setTask(task) {
        this.pathingService.setActiveTask(task);
    }

    noTask() {
        this.pathingService.setActiveTask(null);
    }

    logout() {
        this.authenticationService.logout();
    }
}
