import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CategoryPipe } from './pipes/category.pipe';
import { FormsModule } from '@angular/forms';
import 'jquery';
import { Versions } from './models/versions';
import { UIConfiguration } from './models/uiConfiguration';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                Versions,
                UIConfiguration
            ],
            imports: [
                FormsModule,
                HttpClientModule
            ]
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
