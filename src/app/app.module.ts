import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { SubmitModal } from './components/submit-modal/submit-modal.component';
import { ReportingComponent } from './pages/reporting/reporting.component';
import { ReportingService } from './services/reporting.service';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { TypePipe } from './pipes/type.pipe';
import {NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        ReportingComponent,
        SubmitModal,
        TypePipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgbAccordionModule
    ],
    providers: [
        ReportingService,
        HttpService
    ],
    entryComponents: [
        SubmitModal
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
