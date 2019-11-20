export class UIConfiguration {
    endpoints: {
        imsEndpoint: string;
        terminologyServerEndpoint: string;
        collectorEndpoint: string;
        reportingUserGuideEndpoint: string;
        contactUsEndpoint: string ;
    };
    features : {
        copyrightNotice: string;
    };    

    constructor(endpoints, features) {
        this.endpoints = endpoints;
        this.features = features;
    };
}
