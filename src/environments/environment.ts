// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "***REMOVED***",
    authDomain: "***REMOVED***",
    databaseURL: "https://myphotoapptest.firebaseio.com",
    projectId: "myphotoapptest",
    storageBucket: "***REMOVED***",
    messagingSenderId: "***REMOVED***",
    appId: "1:***REMOVED***:web:89f56ee92229c0a48132a8"
  },
  API_BASE_URL: '***REMOVED***',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
