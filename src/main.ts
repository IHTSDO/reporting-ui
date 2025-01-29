import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import 'zone.js';
import { ReportingService } from './app/services/reporting/reporting.service';
import { UtilityService } from './app/services/utility/utility.service';
import { TemplateService } from './app/services/template/template.service';
import { AuthoringService } from './app/services/authoring/authoring.service';
import { AuthenticationService } from './app/services/authentication/authentication.service';
import { ModalService } from './app/services/modal/modal.service';
import { PathingService } from './app/services/pathing/pathing.service';
import { QueueService } from './app/services/queue/queue.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HeaderInterceptor } from './app/interceptors/header.interceptor';
import { AuthenticationInterceptor } from './app/interceptors/authentication.interceptor';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgbTypeaheadModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app/app-routing.module';
import { ClipboardModule } from 'ngx-clipboard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app/app.component';

enableProdMode();

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, MatCheckboxModule, NgbTypeaheadModule, NgbTooltipModule, ToastrModule.forRoot(), AppRoutingModule, ClipboardModule, MatFormFieldModule, MatAutocompleteModule, MatSelectModule, FormsModule, ReactiveFormsModule),
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
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
    .catch(err => console.log(err));
