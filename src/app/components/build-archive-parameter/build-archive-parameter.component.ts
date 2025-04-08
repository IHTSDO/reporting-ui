import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReleaseService } from '../../services/release/release.service';
import { PathingService } from '../../services/pathing/pathing.service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'build-archive-parameter',
  templateUrl: './build-archive-parameter.component.html',
  styleUrls: ['./build-archive-parameter.component.scss']
})
export class BuildArchiveParameterComponent implements OnInit {
    @ViewChild('matSelect') matSelect: MatSelect;

    @Input() activeReport: any;
    @Input() activeCodeSystem: any;
    @Input() parameter: any;
    @Input() releaseCenters: any;

    selectedYears: number[] = [];
    yearOptions: number[] = [];

    selectedProduct: string = '';
    selectedBuild: string = '';
    excludedBuilds: string[] = [];

    productOptions: any[] = [];
    buildOptions: any[] = [];
    unmodifiedBuildOptions: any[] = [];

    selectedBuildView: string = 'ALL_RELEASES';
    includedHiddenBuilds: boolean = false;
    buildsLoading: boolean = false;

    activeBranchSubscription: Subscription;
    activeProductSubscription: Subscription;
    activeBuildSubscription: Subscription;

    apiCall: any;

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
                this.apiCall = null;
            }
        });
        this.activeProductSubscription = this.releaseService.getActiveProduct().subscribe(data => {
            if (data && data['parameterKey'] !== this.parameter.key && (!this.selectedProduct || this.selectedProduct !== data['product'])) {
                this.selectedProduct = data['product'];
                this.onProductChange();
            }
        });
        this.activeBuildSubscription = this.releaseService.getActiveBuild().subscribe(data => {
            if (data && data['parameterKey'] !== this.parameter.key) {
                this.excludedBuilds = [];
                this.excludedBuilds.push(data['buildId']);
                if (this.unmodifiedBuildOptions.length !== 0) {
                    this.buildOptions = this.unmodifiedBuildOptions.filter(item => !this.excludedBuilds.includes(item['id']));
                }
            }
        });
    }

    ngOnInit(): void {
        if (!this.releaseCenters) {
            this.releaseService.getReleaseCenters().subscribe(releaseCenters => {
                this.releaseCenters = releaseCenters;
                this.getProductOptions();
            });
        } else {
            this.getProductOptions();
        }
        this.resetView();
    }

    ngOnDestroy() {
        if (this.activeBranchSubscription) {
            this.activeBranchSubscription.unsubscribe();
        }
        if (this.activeProductSubscription) {
            this.activeProductSubscription.unsubscribe();
        }
        if (this.activeBuildSubscription) {
            this.activeBuildSubscription.unsubscribe();
        }
    }

    matSelectOnblur() {
        setTimeout(()=>{
            this.matSelect.close();
        }, 200);
    }

    matSelectOnValueChange() {
        setTimeout(()=>{
            this.getBuildOptions();
        }, 0);
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
        this.selectedBuild = '';
        this.getBuildOptions();
        this.releaseService.setActiveProduct({
            parameterKey: this.parameter.key,
            product: this.selectedProduct
        });
    }

    getBuildOptions() {
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
        this.buildOptions = [];
        this.apiCall && typeof this.apiCall.unsunscribe === 'function' && this.apiCall.unsunscribe(); // Unsubscribe here as well.
        this.apiCall = this.releaseService.httpGetBuilds(releaseCenter['id'], this.selectedProduct, this.selectedBuildView, !this.includedHiddenBuilds, this.selectedYears).subscribe(response => {
            this.buildsLoading = false;
            let items = response['content'];
            this.unmodifiedBuildOptions = items;
            this.buildOptions = items.filter(item => !this.excludedBuilds.includes(item['id']));
            this.apiCall && typeof this.apiCall.unsunscribe === 'function' && this.apiCall.unsunscribe(); // Unsubscribe here as well.
        });
    }

    populateParameterValue() {
        const parameterKey = this.parameter.key;
        const releaseCenter = this.findReleaseCenter();
        if (!releaseCenter) {
            return;
        }
        this.parameter.value.value = '';
        this.releaseService.httpGetBuildConfiguration(releaseCenter['id'], this.selectedProduct, this.selectedBuild).subscribe(response => {
            if (response.hasOwnProperty('extensionConfig') && response['extensionConfig']) {
                const extensionConfig = response['extensionConfig'];
                for (const key in this.activeReport.parameters) {
                    const parameter = this.activeReport.parameters[key];
                    if (extensionConfig.dependencyRelease && ((parameterKey === 'This Release' && key === 'This Dependency')
                        || (parameterKey === 'Previous Release' && key === 'Previous Dependency'))) {
                        parameter.value = extensionConfig.dependencyRelease;
                    }
                    if (extensionConfig.moduleIds && parameterKey === 'This Release' && key === 'Modules') {
                        parameter.value = extensionConfig.moduleIds.split(',').join(', ');
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
                this.parameter.value.value = 'Release package is not available.';
            }
        });
        this.releaseService.setActiveBuild({
            parameterKey: this.parameter.key,
            buildId: this.selectedBuild
        });
    }

    private findReleaseCenter() {
        if (!this.releaseCenters) {
            return null;
        }
        return this.releaseCenters.find(releaseCenter => releaseCenter['codeSystem'] === this.activeCodeSystem);
    }

    private resetView() {
      this.resetUIParameters();
      this.resetBuildArchiveValues();
    }

    private resetUIParameters() {
        this.selectedProduct = '';
        this.productOptions = [];
        this.selectedBuild = '';
        this.buildOptions = [];
        this.includedHiddenBuilds = false;
        this.selectedBuildView = 'ALL_RELEASES';
        this.buildsLoading = false;

        const currentYear = new Date().getFullYear();
        this.selectedYears = [];
        this.selectedYears.push(currentYear);
        this.selectedYears.push(currentYear - 1);
        this.yearOptions = [];
        for (let i = 0; i < 5; i++) {
            this.yearOptions.push(currentYear - i);
        }
    }

    private resetBuildArchiveValues() {
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
