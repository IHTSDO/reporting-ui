import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

@NgModule({
    declarations: [
        AppComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        SnomedTypeaheadComponent,
        ReportingComponent,
        CategoryPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgbModule
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
