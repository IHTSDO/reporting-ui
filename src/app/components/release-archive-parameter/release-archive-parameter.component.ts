import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PathingService } from '../../services/pathing/pathing.service';
import { ReportingService } from '../../services/reporting/reporting.service';

@Component({
  selector: 'release-archive-parameter',
  templateUrl: './release-archive-parameter.component.html',
  styleUrls: ['./release-archive-parameter.component.scss']
})
export class ReleaseArchiveParameterComponent {
    @Input() activeReport: any;
    @Input() releases: any;
    @Input() activeCodeSystemShortName: string;
    @Input() parameter: any;

    releaseOptions: any[] = [];

    activeBranchSubscription: Subscription;

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
                            (parameterKey === 'This Release' && key === 'This Dependency')
                            || (parameterKey === 'Previous Release' && key === 'Previous Dependency')) {
                            parameter.value = release.dependencies[0].filename;
                        }
                        if (release.compositionModuleIds && release.compositionModuleIds.length !== 0 &&
                            parameterKey === 'This Release' && key === 'Modules') {
                            parameter.value = release.compositionModuleIds.join(',');
                        }
                    }
                    break;
                }
            }
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
            if (Object.keys(this.activeReport.parameters).length !== 0) {
                for (const key in this.activeReport.parameters) {
                    if (key !== this.parameter.key && this.activeReport.parameters[key].type === 'RELEASE_ARCHIVE' && this.activeReport.parameters[key].value) {
                      releases = releases.filter(release => release.filename !== this.activeReport.parameters[key].value);
                    }
                }
            }
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
