import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthoringService } from 'src/app/services/authoring.service';
import { EventService } from 'src/app/services/event.service';
import { forkJoin } from 'rxjs';
import { Event } from 'src/app/models/event';
import { Project } from 'src/app/models/project';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-snomed-navbar',
    templateUrl: './snomed-navbar.component.html',
    styleUrls: ['./snomed-navbar.component.scss']
})
export class SnomedNavbarComponent implements OnInit {

    @Input() environment: string;
    projects: Project[] = [];
    activeProject: Project;

    constructor(private authoringService: AuthoringService,
        private eventService: EventService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.getAndFilterMyProjects();
    }

    notifyReportingComponent(): void {
        const event = new Event();
        event.eventName = 'call_reporting_component';
        event.value = <object> this.activeProject;
        this.eventService.notify(event);
    }

    private getAndFilterMyProjects(): void {
        let taskDone = false;
        let projectDone = false;
        let tasks = [];
        let projects = [];
        forkJoin([this.authoringService.getTasks(), this.authoringService.getReviewTasks()]).subscribe(data => {
            for (let i = 0; i < data.length; i++) {
                tasks = tasks.concat(data[i]);
            }
            taskDone = true;
            if (projectDone) {
                this.filterMyProjects(projects, tasks);
            }
        });

        this.authoringService.getProjects().subscribe(data => {
            projects = data;
            projectDone = true;
            if (taskDone) {
                this.filterMyProjects(projects, tasks);
            }
        });
    }

    private filterMyProjects(projects, tasks): void {
        const filteredProjects = [];
        if (projects.length !== 0) {
            for (let i = 0; i < projects.length; i++) {
                for (let j = 0; j < tasks.length; j++) {
                    if (!filteredProjects.includes(projects[i]) && projects[i]['key'] === tasks[j]['projectKey']) {
                        filteredProjects.push(projects[i]);
                    }
                }
            }
        }

        filteredProjects.sort(function(a, b) { return a['key'].localeCompare(b['key']); });

        if (!this.authoringService.uiConfiguration.endpoints.terminologyServerEndpoint.includes('snowowl')) {
            this.addProjectMAIN();
        }

        this.projects = this.projects.concat(filteredProjects);

        if (this.projects.length !== 0) {
            this.activeProject =  this.projects[0];
            this.notifyReportingComponent();
        }
    }

    private addProjectMAIN(): void {
        const defaultProject = new Project();
        defaultProject.key = 'MAIN';
        defaultProject.title = 'MAIN';

        this.activeProject = defaultProject;
        this.projects.push(defaultProject);
    }
}
