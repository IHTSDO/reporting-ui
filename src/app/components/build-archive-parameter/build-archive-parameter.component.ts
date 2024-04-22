import { Component, Input, OnInit } from '@angular/core';
import { ReleaseService } from '../../services/release/release.service';
import { Subscription } from 'rxjs';
import { PathingService } from '../../services/pathing/pathing.service';

@Component({
  selector: 'build-archive-parameter',
  templateUrl: './build-archive-parameter.component.html',
  styleUrls: ['./build-archive-parameter.component.scss']
})
export class BuildArchiveParameterComponent implements OnInit {

    @Input() activeReport: any;
    @Input() activeCodeSystem: any;
    @Input() parameter: any;
    @Input() releaseCenters: any;

    selectedProduct: string = '';
    selectedBuild: string = '';

    productOptions: any[] = [];
    buildOptions: any[] = [];

    selectedBuildView: string = 'ALL_RELEASES';
    includedHiddenBuilds: boolean = false;
    buildsLoading: boolean = false;

    activeBranchSubscription: Subscription;
    activeReportSubscription: Subscription;

    constructor(private pathingService: PathingService,
                private releaseService: ReleaseService) {
          this.activeBranchSubscription = this.pathingService.getActiveBranch().subscribe(data => {
              if (data) {
                if (data.hasOwnProperty('shortName')) {
                    this.activeCodeSystem = data['shortName'];
                } else if (data.hasOwnProperty('branchPath')) {
                    const branchPath = data['branchPath'];
                    this.activeCodeSystem = branchPath.includes('-') ? branchPath.substr(branchPath.lastIndexOf('/') + 1) : 'SNOMEDCT';
                }
                this.resetView();
                this.getProductOptions();
            }
        });
    }

    ngOnInit(): void {
        this.resetView();
        this.getProductOptions();
    }

    ngOnDestroy() {
      if (this.activeBranchSubscription) {
        this.activeBranchSubscription.unsubscribe();
      }
      if (this.activeReportSubscription) {
        this.activeReportSubscription.unsubscribe();
      }
    }

    getProductOptions() {
        const releaseCenter = this.findReleaseCenter();
        if (!releaseCenter) {
            return;
        }
        this.productOptions = [];
        this.releaseService.httpGetProducts(releaseCenter['id']).subscribe(response => {
            let items = response['content'];
            if (items.length !== 0) {
                items = items.filter(item => item['releaseCenter'].codeSystem === this.activeCodeSystem);
                if (items.length !== 0) {
                    this.productOptions = items;
                }
            }
        });
    }

    onProductChange() {
        if (!this.selectedProduct) {
            return;
        }
        const releaseCenter = this.findReleaseCenter();
        if (!releaseCenter) {
            return;
        }

        // Reset BUILD_ARCHIVE values
        this.buildsLoading = true;
        this.selectedBuild = '';
        this.resetBuildArchiveValues();

        this.releaseService.httpGetBuilds(releaseCenter['id'], this.selectedProduct, this.selectedBuild, !this.includedHiddenBuilds).subscribe(response => {
            this.buildsLoading = false;
            let items = response['content'];
            if (Object.keys(this.activeReport.parameters).length !== 0) {
                for (const key in this.activeReport.parameters) {
                    if (key !== this.parameter.key && this.activeReport.parameters[key].type === 'BUILD_ARCHIVE' && this.activeReport.parameters[key].value) {
                      items = items.filter(item => !this.activeReport.parameters[key].value.includes(item['id']));
                    }
                }
            }
            this.buildOptions = items;
        });
    }

    populateParameterValue() {
        const parameterKey = this.parameter.key;
        const releaseCenter = this.findReleaseCenter();
        if (!releaseCenter) {
            return;
        }
        this.releaseService.httpGetBuildConfiguration(releaseCenter['id'], this.selectedProduct, this.selectedBuild).subscribe(response => {
            if (response.hasOwnProperty('extensionConfig') && response['extensionConfig'] && response['extensionConfig'].dependencyRelease) {
                for (const key in this.activeReport.parameters) {
                    const parameter = this.activeReport.parameters[key];
                    if ((parameterKey === 'This Release' && key === 'This Dependency')
                        || (parameterKey === 'Previous Release' && key === 'Previous Dependency')) {
                        parameter.value = response['extensionConfig'].dependencyRelease;
                    }
                    if (parameterKey === 'This Release' && key === 'Modules') {
                        parameter.value = response['extensionConfig'].moduleIds;
                    }
                }
            }
        });
        this.releaseService.httpGetBuildOutputFiles(releaseCenter['id'], this.selectedProduct, this.selectedBuild).subscribe(results => {
            let packageFileFound = false;
            for (let i = 0; i < results.length; i++) {
                const item = results[i];
                if (item['id'].endsWith('.zip')) {
                    this.parameter.value.value =  releaseCenter['id'] + '/' + this.selectedProduct + '/' + this.selectedBuild + '/output-files/' + item['id'];
                    packageFileFound = true;
                    break;
                }
            }
            if (!packageFileFound) {
                this.parameter.value.value = 'Release package is not availabe.';
            }
        });
    }

    findReleaseCenter() {
        if (!this.releaseCenters) {
            return null;
        }
        return this.releaseCenters.find(releaseCenter => releaseCenter['codeSystem'] === this.activeCodeSystem);
    }

    resetView() {
      this.resetUIParameters();
      this.resetBuildArchiveValues();
    }

    resetUIParameters() {
        this.selectedProduct = '';
        this.productOptions = [];
        this.selectedBuild = '';
        this.buildOptions = [];
        this.includedHiddenBuilds = false;
        this.selectedBuildView = 'ALL_RELEASES';
        this.buildsLoading = false;
    }

    resetBuildArchiveValues() {
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
