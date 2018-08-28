import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SnomedNavbarComponent } from './components/snomed-navbar/snomed-navbar.component';
import { SnomedFooterComponent } from './components/snomed-footer/snomed-footer.component';
import { ReportingComponent } from './pages/reporting/reporting.component';
import { ReportingService } from './services/reporting.service';
import { HttpClientModule } from '@angular/common/http';
import { TypePipe } from './pipes/type.pipe';

@NgModule({
    declarations: [
        AppComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        ReportingComponent,
        TypePipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        ReportingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
