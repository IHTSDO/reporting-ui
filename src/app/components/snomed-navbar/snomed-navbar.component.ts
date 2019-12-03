import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthoringService } from 'src/app/services/authoring.service';
import { EventService } from 'src/app/services/event.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-snomed-navbar',
    templateUrl: './snomed-navbar.component.html',
    styleUrls: ['./snomed-navbar.component.scss']
})
export class SnomedNavbarComponent implements OnInit {

    @Input() environment: string;
    projects: object[] = [];
    activeProject: string = 'MAIN';

    constructor(private authoringService: AuthoringService, private eventService: EventService) {
    }

    ngOnInit() {
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

        this.eventService.notify({ eventName: 'call_reporting_component', value: this.activeProject });
    }    

    projectOnChange(project): void {
        if (this.activeProject !== project) {
            this.activeProject = project;
            this.eventService.notify({ eventName: 'call_reporting_component', value: this.activeProject });
        } else {
            this.activeProject = null;
            this.eventService.notify({ eventName: 'call_reporting_component', value: null });
        }
    }

    private filterMyProjects(projects, tasks): void {
        let filteredProjects = [];
        if (projects.length !== 0) {
            for (let i = 0; i < projects.length; i++) {
                for (let j = 0; j < tasks.length; j++) {
                    if (!filteredProjects.includes(projects[i]) && projects[i]['key'] === tasks[j]['projectKey']) {
                        filteredProjects.push(projects[i]);
                    }
                }
            }            
        }
        if (filteredProjects.length === 1) {
           this.activeProject =  filteredProjects[0]['key'];
           this.eventService.notify({ eventName: 'call_reporting_component', value: this.activeProject });
        }

        this.projects = filteredProjects;
    }
}
