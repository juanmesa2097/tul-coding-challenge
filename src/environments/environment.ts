// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
  firebase: {
    apiKey: 'AIzaSyC39g1eGeJdbgGqSG1NZJaekvfbMif7qYs',
    authDomain: 'tul-shop.firebaseapp.com',
    projectId: 'tul-shop',
    storageBucket: 'tul-shop.appspot.com',
    messagingSenderId: '376593416745',
    appId: '1:376593416745:web:d19c9fe062cb97af22d238',
    measurementId: 'G-LNJM5X87CN',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
