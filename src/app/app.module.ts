import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material';

import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { SnomedTypeaheadComponent } from './components/snomed-typeahead/snomed-typeahead.component';
import { SnomedOverlayComponent } from './components/snomed-overlay/snomed-overlay.component';
import { SnomedModalComponent } from './components/snomed-modal/snomed-modal.component';
import { SnomedLeftSidebarComponent } from './components/snomed-left-sidebar/snomed-left-sidebar.component';
import { ReportingComponent } from './pages/reporting/reporting.component';

import { ReportingService } from './services/reporting.service';
import { ConceptService } from './services/concept.service';
import { HttpService } from './services/http.service';
import { ModalService } from './services/modal.service';
import { UserService } from './services/user.service';

import { CategoryPipe } from './pipes/category.pipe';
import { ConceptsPipe } from './pipes/concepts.pipe';

@NgModule({
    declarations: [
        AppComponent,
        ReportingComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        SnomedTypeaheadComponent,
        SnomedOverlayComponent,
        SnomedModalComponent,
        SnomedLeftSidebarComponent,
        CategoryPipe,
        ConceptsPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatTooltipModule
    ],
    providers: [
        ReportingService,
        ConceptService,
        HttpService,
        ModalService,
        UserService
    ],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
