import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

    private releaseCenters = new Subject<any>();
    private activeProduct = new Subject();
    private activeBuild = new Subject();
    private buildOptions = new Subject<any>();

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

    setBuildOptions(buildOptions) {
        this.buildOptions.next(buildOptions);
    }

    getBuildOptions() {
        return this.buildOptions.asObservable();
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

    httpGetBuilds(releaseCenterKey: string, productKey: string, viewMode: string, visibility: boolean, forYears: number[]) {
      let param = 'pageSize=500&sort=creationTime,desc';
      if (viewMode) {
        param += '&viewMode=' + viewMode;
      }
      if (visibility) {
        param += '&visibility=true';
      }
      if (forYears) {
        for (let i = 0; i < forYears.length; i++) {
          param += '&forYears=' + forYears[i];
        }
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
