import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { isBuffer } from 'cypress/types/lodash';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

    private releaseCenters = new Subject<any>();
    private activeProduct = new Subject();
    private activeBuild = new Subject();

    // Setters & Getters: ReleaseCenters
    setReleaseCenters(releaseCenters) {
        this.releaseCenters.next(releaseCenters);
    }

    getReleaseCenters() {
        return this.releaseCenters.asObservable();
    }

    // Setters & Getters: Product
    setActiveProduct(product) {
        this.activeProduct.next(product);
    }

    getActiveProduct() {
        return this.activeProduct.asObservable();
    }

    // Setters & Getters: Build
    setActiveBuild(build) {
        this.activeBuild.next(build);
    }

    getActiveBuild() {
        return this.activeBuild.asObservable();
    }

    constructor(private http: HttpClient) { }

    httpGetReleaseCenters() {
      return this.http.get<Object[]>('/release-service/centers');
    }

    httpGetProducts(releaseCenterKey: string) {
      return this.http.get<Object[]>('/release-service/centers/' + releaseCenterKey + '/products?pageSize=100&sortField=name&sortDirection=asc');
    }

    httpGetBuilds(releaseCenterKey: string, productKey: string, viewMode: string, visibility: boolean) {
      let param = 'pageSize=100&sort=creationTime,desc';
      if (viewMode) {
        param += '&viewMode=' + viewMode;
      }
      if (visibility) {
        param += '&visibility=true';
      }
      return this.http.get<Object[]>('/release-service/centers/' + releaseCenterKey + '/products/' + productKey + '/builds?' + param);
    }

    httpGetBuildConfiguration(releaseCenterKey: string, productKey: string, buildKey: string) {
      return this.http.get<Object>('/release-service/centers/' + releaseCenterKey + '/products/' + productKey + '/builds/' + buildKey + '/configuration');
    }

    httpGetBuildOutputFiles(releaseCenterKey: string, productKey: string, buildKey: string) {
      return this.http.get<Object[]>('/release-service/centers/' + releaseCenterKey + '/products/' + productKey + '/builds/' + buildKey + '/outputfiles');
    }
}
