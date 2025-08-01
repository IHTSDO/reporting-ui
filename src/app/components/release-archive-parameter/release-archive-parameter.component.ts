import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PathingService } from '../../services/pathing/pathing.service';
import { ReportingService } from '../../services/reporting/reporting.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

@Component({
    selector: 'release-archive-parameter',
    templateUrl: './release-archive-parameter.component.html',
    styleUrls: ['./release-archive-parameter.component.scss'],
    imports: [NgIf, FormsModule, MatAutocompleteModule, MatOptionModule, NgFor]
})
export class ReleaseArchiveParameterComponent {
    @Input() activeReport: any;
    @Input() releases: any;
    @Input() activeCodeSystemShortName: string;
    @Input() parameter: any;

    releaseOptions: any[] = [];
    excludedReleases: string[] = [];

    activeBranchSubscription: Subscription;
    activeReleaseArchiveSubscription: Subscription;

    constructor(private reportingService: ReportingService,
                private pathingService: PathingService) {
        this.activeBranchSubscription = this.pathingService.getActiveBranch().subscribe(data => {
            if (data) {
                if (data.hasOwnProperty('shortName')) {
                    const activeCodeSystem = data['shortName'];
                    this.activeCodeSystemShortName = activeCodeSystem.includes('-') ? activeCodeSystem.split('-')[1] : 'INT';
                } else if (data.hasOwnProperty('branchPath')) {
                    const branchPath = data['branchPath'];
                    this.activeCodeSystemShortName = branchPath.includes('-') ? branchPath.split('-')[1] : 'INT';
                }
                this.resetReleaseArchiveValues();
            }
        });
        this.activeReleaseArchiveSubscription = this.reportingService.getActiveReleaseArchive().subscribe(data => {
            if (data && data['parameterKey'] !== this.parameter.key) {
                this.excludedReleases = [];
                this.excludedReleases.push(data['release']);
            }
        });
    }

    ngOnInit(): void {
        if (!this.releases) {
            this.reportingService.getReleases().subscribe(releases => {
              this.releases = releases;
          });
        }
        this.resetReleaseArchiveValues();
    }

    ngOnDestroy() {
        if (this.activeBranchSubscription) {
            this.activeBranchSubscription.unsubscribe();
        }
        if (this.activeReleaseArchiveSubscription) {
            this.activeReleaseArchiveSubscription.unsubscribe();
        }
    }

    onReleaseChange(): void {
        const parameterKey = this.parameter.key;
        const releases = this.filterReleases();
        if (releases.length !== 0) {
           for (const release of releases) {
                if (release.filename === this.parameter.value.value) {
                    for (const key in this.activeReport.parameters) {
                        const parameter = this.activeReport.parameters[key];
                        if (release.dependencies && release.dependencies.length !== 0 &&
                            ((parameterKey === 'This Release' && key === 'This Dependency')
                            || (parameterKey === 'Previous Release' && key === 'Previous Dependency'))) {
                            parameter.value = release.dependencies[0].filename;
                        }
                        if (release.compositionModuleIds && release.compositionModuleIds.length !== 0 &&
                            parameterKey === 'This Release' && key === 'Modules') {
                            parameter.value = release.compositionModuleIds.join(', ');
                        }
                    }
                    break;
                }
            }
            this.reportingService.setActiveReleaseArchive({
                parameterKey: this.parameter.key,
                release: this.parameter.value.value
            
            });
        }
    }

    getReleaseOptions(): string[] {
        if (!this.releases) {
            return [];
        }
        const releases = this.filterReleases();
        return releases.length !== 0 ? this.getSortedFilenames(releases) : [];
    }

    private getSortedFilenames(releases: any[]): string[] {
        return releases.sort((a, b) => b.effectiveTime - a.effectiveTime).map(release => release.filename);
    }

    private filterReleases() {
        if (this.parameter.value && this.parameter.value.options && this.parameter.value.options.length !== 0) {
            const codeSystemShortName = this.parameter.value.options[0];
            const releases = this.releases[codeSystemShortName];
            return releases ? releases : [];
        }

        let releases = this.releases[this.activeCodeSystemShortName];
        if (releases) {
            releases = releases.filter(release => !this.excludedReleases.includes(release.filename));
            return releases;
        }
        return [];
    }

    private resetReleaseArchiveValues() {
        const parameterKey = this.parameter.key;
        for (const key in this.activeReport.parameters) {
          const parameter = this.activeReport.parameters[key];
          if ((parameterKey === 'This Release' && (key === 'This Release' || key === 'This Dependency' || key === 'Modules'))
              || (parameterKey === 'Previous Release' && (key === 'Previous Release' || key === 'Previous Dependency'))) {
              parameter.value = '';
          }
      }
    }
}
