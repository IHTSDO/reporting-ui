// FRAMEWORKS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

// COMPONENTS
import { AppComponent } from './app.component';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { ReportingComponent } from './components/reporting/reporting.component';
import { QueryParametersComponent } from './components/query-parameters/query-parameters.component';
import { ModalComponent } from './components/modal/modal.component';

// SERVICES
import { ReportingService } from './services/reporting/reporting.service';
import { UtilityService } from './services/utility/utility.service';
import { TemplateService } from './services/template/template.service';
import { AuthoringService } from './services/authoring/authoring.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { TerminologyServerService } from './services/terminologyServer/terminologyServer.service';
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

@NgModule({
    declarations: [
        AppComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        LeftSidebarComponent,
        ModalComponent,
        QueryParametersComponent,
        TagsPipe,
        AlphabeticalPipe,
        TextFilterPipe,
        CategoryFilterPipe,
        BranchPipe,
        ProjectPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatCheckboxModule,
        NgbTypeaheadModule,
        AppRoutingModule
    ],
    providers: [
        ReportingService,
        UtilityService,
        TemplateService,
        AuthoringService,
        AuthenticationService,
        TerminologyServerService,
        ModalService,
        PathingService,
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
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
