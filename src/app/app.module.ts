import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { ReportingComponent } from './pages/reporting/reporting.component';
import { ReportingService } from './services/reporting.service';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { TypePipe } from './pipes/type.pipe';
import { SnomedTypeaheadComponent } from './components/snomed-typeahead/snomed-typeahead.component';

@NgModule({
    declarations: [
        AppComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        SnomedTypeaheadComponent,
        ReportingComponent,
        TypePipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgbModule
    ],
    providers: [
        ReportingService,
        HttpService
    ],
    entryComponents: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
