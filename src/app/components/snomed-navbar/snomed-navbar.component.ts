import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { AuthoringService } from 'src/app/services/authoring/authoring.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import {PathingService} from '../../services/pathing/pathing.service';
import {ActivatedRoute} from '@angular/router';
import {ReportingService} from '../../services/reporting/reporting.service';

@Component({
    selector: 'app-snomed-navbar',
    templateUrl: './snomed-navbar.component.html',
    styleUrls: ['./snomed-navbar.component.scss']
})
export class SnomedNavbarComponent implements OnInit {

    environment: string;
    path: string;

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

    activeReport: any;
    activeReportSubscription: Subscription;

    constructor(private authoringService: AuthoringService,
                private authenticationService: AuthenticationService,
                private pathingService: PathingService,
                private reportingService: ReportingService,
                private location: Location,
                private route: ActivatedRoute) {
        this.userSubscription = this.authenticationService.getUser().subscribe(data => this.user = data);
        this.branchesSubscription = this.pathingService.getBranches().subscribe(data => this.branches = data);
        this.activeBranchSubscription = this.pathingService.getActiveBranch().subscribe(data => this.activeBranch = data);
        this.projectsSubscription = this.pathingService.getProjects().subscribe(data => this.projects = data);
        this.activeProjectSubscription = this.pathingService.getActiveProject().subscribe(data => this.activeProject = data);
        this.tasksSubscription = this.pathingService.getTasks().subscribe(data => this.tasks = data);
        this.activeTaskSubscription = this.pathingService.getActiveTask().subscribe(data => this.activeTask = data);
        this.activeReportSubscription = this.reportingService.getActiveReport().subscribe(data => this.activeReport = data);
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];
    }

    ngOnInit() {
        this.path = this.location.path();

        this.route.queryParams.subscribe(params => {
            if (params['report']) {
                this.reportingService.getReports().subscribe(data => {
                    data.forEach(category => {
                        category.jobs.forEach(report => {
                            if (report.name === params['report']) {
                                this.reportingService.setActiveReport(report);
                            }
                        });
                    });
                });
            }
        });

        this.pathingService.httpGetBranches().subscribe(branches => {
            this.pathingService.setBranches(branches);
            if (!this.path) {
                this.pathingService.setActiveBranch(branches[0]);
            }
        });

        this.pathingService.httpGetProjects().subscribe(projects => {
            this.pathingService.setProjects(projects);
            this.setPath(this.path);
        });
    }

    setPath(path) {
        const splitPath = path.split('?')[0].split('/');
        this.setBranch({ branchPath: 'MAIN'});
        if (path.includes('SNOMEDCT')) {
            if (splitPath.length > 2) {
                this.setBranch({ branchPath: splitPath[1] + '/' + splitPath[2]});
            }

            if (splitPath.length > 3) {
                this.setProject({ key: splitPath[3]});
            }

            if (splitPath.length > 4) {
                this.setTask({ key: splitPath[4]});
            }
        } else {
            if (splitPath.length > 1) {
                this.setBranch({ branchPath: splitPath[1]});
            }

            if (splitPath.length > 2) {
                this.setProject({ key: splitPath[2]});
            }

            if (splitPath.length > 3) {
                this.setTask({ key: splitPath[3]});
            }
        }
    }

    setBranch(branch) {
        this.pathingService.setActiveBranch(branch);

        this.pathingService.setActiveProject(null);

        this.pathingService.setTasks([]);
        this.pathingService.setActiveTask(null);
    }

    setProject(project) {
        const proj = this.projects.find(item => item.key === project.key);
        this.pathingService.setActiveProject(proj);

        this.pathingService.setTasks([]);
        this.pathingService.setActiveTask(null);

        if (proj.key) {
            this.pathingService.httpGetTasks(proj).subscribe(tasks => {
                this.pathingService.setTasks(tasks);
            });
        }
    }

    noProject() {
        this.pathingService.setActiveProject(null);
        this.noTask();
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
