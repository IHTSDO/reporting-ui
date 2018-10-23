import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { SnomedTypeaheadComponent } from './components/snomed-typeahead/snomed-typeahead.component';
import { ReportingComponent } from './pages/reporting/reporting.component';
import { ReportingService } from './services/reporting.service';
import { ConceptService } from './services/concept.service';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoryPipe } from './pipes/category.pipe';
import { SnomedOverlayComponent } from './components/snomed-overlay/snomed-overlay.component';
import { SnomedModalComponent } from './components/snomed-modal/snomed-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        SnomedTypeaheadComponent,
        ReportingComponent,
        CategoryPipe,
        SnomedOverlayComponent,
        SnomedModalComponent
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
        HttpService
    ],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
