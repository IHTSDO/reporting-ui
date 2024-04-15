import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

    private releaseCenters = new Subject<any>();

    // Setters & Getters: ReleaseCenters
    setReleaseCenters(releaseCenters) {
        this.releaseCenters.next(releaseCenters);
    }

    getReleaseCenters() {
        return this.releaseCenters.asObservable();
    }

    constructor(private http: HttpClient) { }

    httpGetReleaseCenters() {
      return this.http.get<Object[]>('/release-service/centers');
    }

    httpGetProducts(releaseCenterKey: string) {
      return this.http.get<Object[]>('/release-service/centers/' + releaseCenterKey + '/products?pageSize=100');
    }

    httpGetBuilds(releaseCenterKey: string, productKey: string) {
      return this.http.get<Object[]>('/release-service/centers/' + releaseCenterKey + '/products/' + productKey + '/builds');
    }

    httpGetBuildConfiguration(releaseCenterKey: string, productKey: string, buildKey: string) {
      return this.http.get<Object>('/release-service/centers/' + releaseCenterKey + '/products/' + productKey + '/builds/' + buildKey + '/configuration');
    }

    httpGetBuildOutputFiles(releaseCenterKey: string, productKey: string, buildKey: string) {
      return this.http.get<Object[]>('/release-service/centers/' + releaseCenterKey + '/products/' + productKey + '/builds/' + buildKey + '/outputfiles');
    }
}
