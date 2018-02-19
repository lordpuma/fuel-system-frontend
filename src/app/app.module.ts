import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { AuthModule } from './auth/auth.module';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import {ApolloLink, concat} from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ProtectedModule } from './protected/protected.module';
import { registerLocaleData } from '@angular/common';
import localeCs from '@angular/common/locales/cs';
import { environment } from '../environments/environment';

// the second parameter 'fr' is optional
registerLocaleData(localeCs, 'cs');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    ClarityModule,
    AuthModule,
    ProtectedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo,
    httpLink: HttpLink
  ) {
      const http = httpLink.create({uri: environment.backend_uri});


    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      if (!!localStorage.getItem('token')) {
        operation.setContext({
          headers: new HttpHeaders().set('Token', localStorage.getItem('token'))
        });
      }
      return forward(operation);
    });

    const logoutLink = onError(({ networkError }) => {
      // if (networkError.statusCode === 401) {
        // TODO: apply logout logic here
      // }
    });

      apollo.create({
        link: concat(authMiddleware, http),
        // link: http,
        cache: new InMemoryCache()
        // other options like cache
      });
    }
}
