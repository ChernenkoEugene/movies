import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MoviesComponent } from './components/movies/movies.component';
import { reducers, metaReducers } from './reducers';
import { MoviesApiEffects } from './effects/movies-api-effects';
import { environment } from '../environments/environment';

import { AppEffects } from './app.effects';
import { MoviesApiService } from './shared/services/movies-api.service';
import { PopupComponent } from './components/popup/popup.component';
import { AlphaNumPipe } from './shared/pipes/alpha-num-pipe.';


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    PopupComponent,
    AlphaNumPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([MoviesApiEffects, AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [MoviesApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
