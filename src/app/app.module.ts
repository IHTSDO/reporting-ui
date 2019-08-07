import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './interceptors/header.interceptor';

import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { SnomedLeftSidebarComponent } from './components/snomed-left-sidebar/snomed-left-sidebar.component';
import { ReportingComponent } from './pages/reporting/reporting.component';

import { ReportingService } from './services/reporting.service';
import { UtilityService } from './services/utility.service';
import { TemplateService } from './services/template.service';
import { AuthoringService } from './services/authoring.service';
import { AuthenticationService } from './services/authentication.service';
import { TerminologyServerService } from './services/terminologyServer.service';

import { CategoryPipe } from './pipes/category.pipe';
import { ConceptsPipe } from './pipes/concepts.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';

import { DisplayOrderPipe } from './pipes/display-order.pipe';
import { HiddenPipe } from './pipes/hidden.pipe';
import { SnomedTypeaheadComponent } from './components/snomed-typeahead/snomed-typeahead.component';
import { SnomedTypeaheadListComponent } from './components/snomed-typeahead-list/snomed-typeahead-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';
import { QueryParametersComponent } from './components/query-parameters/query-parameters.component';




@NgModule({
    declarations: [
        AppComponent,
        ReportingComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        SnomedLeftSidebarComponent,
        CategoryPipe,
        ConceptsPipe,
        SnomedTypeaheadComponent,
        SnomedTypeaheadListComponent,
        DisplayOrderPipe,
        HiddenPipe,
        OrderByPipe,
        ModalComponent,
        QueryParametersComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatCheckboxModule
    ],
    providers: [
        ReportingService,
        UtilityService,
        TemplateService,
        AuthoringService,
        AuthenticationService,
        TerminologyServerService,
        ModalService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true,
        }
    ],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
