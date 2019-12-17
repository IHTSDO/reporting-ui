import { Component, Input, OnInit } from '@angular/core';
import { AuthoringService } from 'src/app/services/authoring.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { Project } from 'src/app/models/project';

@Component({
    selector: 'app-snomed-navbar',
    templateUrl: './snomed-navbar.component.html',
    styleUrls: ['./snomed-navbar.component.scss']
})
export class SnomedNavbarComponent implements OnInit {

    @Input() environment: string;
    @Input() managedService: boolean;
    projects: any[] = [];
    activeProject: Project;

    constructor(private authoringService: AuthoringService, private eventService: EventService) {
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
        this.authoringService.getProjects().subscribe(data => {
            if (!this.managedService) {
                this.addProjectMAIN();
            }

            this.projects = data.sort(function(a, b) { return a['key'].localeCompare(b['key']); });

            if (this.projects.length !== 0) {
                this.activeProject =  this.projects[0];
                this.notifyReportingComponent();
            }
        });
    }

    private addProjectMAIN(): void {
        const defaultProject = new Project();
        defaultProject.key = 'MAIN';
        defaultProject.title = 'MAIN';

        const newProjectList = [];
        this.activeProject = defaultProject;
        newProjectList.push(defaultProject);
        newProjectList.concat(this.projects);
        this.projects = newProjectList;
    }
}
