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
import { ReportingService } from './services/reporting.service';
import { UtilityService } from './services/utility.service';
import { TemplateService } from './services/template.service';
import { AuthoringService } from './services/authoring.service';
import { AuthenticationService } from './services/authentication.service';
import { TerminologyServerService } from './services/terminologyServer.service';
import { ModalService } from './services/modal.service';
import { ProjectService } from './services/project.service';

// PIPES
import { CategoryPipe } from './pipes/category.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { DisplayOrderPipe } from './pipes/display-order.pipe';
import { HiddenPipe } from './pipes/hidden.pipe';
import { TagsPipe } from './pipes/tags.pipe';
import { AlphabeticalPipe } from './pipes/alphabetical.pipe';
import { MainToTopPipe } from './pipes/main-to-top.pipe';

// INTERCEPTORS
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';


@NgModule({
    declarations: [
        AppComponent,
        ReportingComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        LeftSidebarComponent,
        CategoryPipe,
        DisplayOrderPipe,
        HiddenPipe,
        OrderByPipe,
        ModalComponent,
        QueryParametersComponent,
        TagsPipe,
        AlphabeticalPipe,
        MainToTopPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatCheckboxModule,
        NgbTypeaheadModule
    ],
    providers: [
        ReportingService,
        UtilityService,
        TemplateService,
        AuthoringService,
        AuthenticationService,
        TerminologyServerService,
        ProjectService,
        ModalService,
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
