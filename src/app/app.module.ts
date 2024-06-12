// FRAMEWORKS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbTooltipModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

// COMPONENTS
import { AppComponent } from './app.component';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { QueryParametersComponent } from './components/query-parameters/query-parameters.component';
import { ModalComponent } from './components/modal/modal.component';

// SERVICES
import { ReportingService } from './services/reporting/reporting.service';
import { UtilityService } from './services/utility/utility.service';
import { TemplateService } from './services/template/template.service';
import { AuthoringService } from './services/authoring/authoring.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ModalService } from './services/modal/modal.service';

// PIPES
import { TagsPipe } from './pipes/tags/tags.pipe';

// INTERCEPTORS
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { AlphabeticalPipe } from './pipes/alphabetical/alphabetical.pipe';
import {TextFilterPipe} from './pipes/text-filter/text-filter.pipe';
import { CategoryFilterPipe } from './pipes/category-filter/category-filter.pipe';
import {PathingService} from './services/pathing/pathing.service';
import { BranchPipe } from './pipes/branch/branch.pipe';
import { ProjectPipe } from './pipes/project/project.pipe';
import { AppRoutingModule } from './app-routing.module';
import {ReportComponent} from './components/report/report.component';
import { HiddenPipe } from './pipes/hidden/hidden.pipe';
import { DisplayOrderPipe } from './pipes/displayOrder/display-order.pipe';
import { OrderByPipe } from './pipes/orderBy/order-by.pipe';
import { AllReportsPipe } from './pipes/allReports/all-reports.pipe';
import { QueueComponent } from './components/queue/queue.component';
import {QueueService} from './services/queue/queue.service';
import { BuildArchiveParameterComponent } from './components/build-archive-parameter/build-archive-parameter.component';
import { ReleaseArchiveParameterComponent } from './components/release-archive-parameter/release-archive-parameter.component';
import {ToastrModule} from 'ngx-toastr';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
    declarations: [
        AppComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        LeftSidebarComponent,
        ModalComponent,
        QueryParametersComponent,
        ReportComponent,
        TagsPipe,
        AlphabeticalPipe,
        TextFilterPipe,
        CategoryFilterPipe,
        BranchPipe,
        ProjectPipe,
        HiddenPipe,
        DisplayOrderPipe,
        OrderByPipe,
        AllReportsPipe,
        QueueComponent,
        BuildArchiveParameterComponent,
        ReleaseArchiveParameterComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        NgbTypeaheadModule,
        NgbTooltipModule,
        ToastrModule.forRoot(),
        AppRoutingModule,
        ClipboardModule,
        MatFormFieldModule,
        MatAutocompleteModule, 
        MatSelectModule, 
        FormsModule, 
        ReactiveFormsModule
    ],
    providers: [
        ReportingService,
        UtilityService,
        TemplateService,
        AuthoringService,
        AuthenticationService,
        ModalService,
        PathingService,
        QueueService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
