import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Our pages 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {  GoogleLoginProvider} from '@abacritt/angularx-social-login';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {NgxStripeModule} from 'ngx-stripe'

import { GASettingsComponent } from './ggera/g-a-settings/g-a-settings.component';
import { SigninComponent } from './ggera/signin/signin.component';
import { HeroService } from './hero.service';
import { ProfileComponent } from './ggera/profile/profile.component';
import { AccountDetailsComponent } from './ggera/account-details/account-details.component';
import { ProRequestsComponent } from './ggera/pro-requests/pro-requests.component';
import { JoinPartyComponent } from './ggera/join-party/join-party.component';
import { PlayerPageComponent } from './ggera/player-page/player-page.component';
import { HomePageComponent } from './ggera/home-page/home-page.component';
import { MyorderComponent } from './ggera/myorder/myorder.component';
import { CreatePartyComponent } from './ggera/create-party/create-party.component';
import { ChatboxPopupComponent } from './ggera/chatbox-popup/chatbox-popup.component';
import { NavBarComponent } from './ggera/nav-bar/nav-bar.component';
import { NewFooterComponent } from './ggera/new-footer/new-footer.component';
import { AdminUsersComponent } from './ggera/admin-users/admin-users.component';
import { EarningsComponent } from './ggera/earnings/earnings.component';
import { SingleProComponent } from './ggera/single-pro/single-pro.component';
import { PlayersComponent } from './ggera/players/players.component';
import { SubscriptionsComponent } from './ggera/subscriptions/subscriptions.component';
import { UnderconstructionComponent } from './ggera/underconstruction/underconstruction.component';
import { LazyLoadingComponent } from './ggera/lazy-loading/lazy-loading.component';
import { AuthGuard } from './auth.guard';
import { OrderListsComponent } from './ggera/order-lists/order-lists.component';
import { TwitchComponent } from './ggera/twitch/twitch.component';
import { StatsComponent } from './ggera/stats/stats.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { PreloaderComponent } from './ggera/preloader/preloader.component';
import { SocialComponent } from './ggera/social/social.component';
import { MakeMeProComponent } from './ggera/make-me-pro/make-me-pro.component';
import { ChatScreenComponent } from './ggera/chat-screen/chat-screen.component';
import { PartyListComponent } from './ggera/party-list/party-list.component';

import { RanksComponent } from './ggera/ranks/ranks.component';
import { PlayersNewPageComponent } from './ggera/players-new-page/players-new-page.component';

import { MyOrderNormalComponent } from './ggera/my-order-normal/my-order-normal.component';
import { HomePageNew1Component } from './ggera/home-page-new1/home-page-new1.component';

import { RangeFilterPipe } from './range-filter.pipe';
import { ComingSoonComponent } from './ggera/coming-soon/coming-soon.component';
import { SupportComponent } from './ggera/support/support.component';
import { SettingsComponent } from './ggera/settings/settings.component';
import { DailyChartComponent } from './ggera/charts/daily-chart/daily-chart.component';
import { WeeklyChartComponent } from './ggera/charts/weekly-chart/weekly-chart.component';
import { MonthlyChartComponent } from './ggera/charts/monthly-chart/monthly-chart.component';
import { ErrorTextComponent } from './common/components/error-text/error-text.component';
import { JobTemplateComponent } from './template/job-template/job-template.component';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import { VideoPlayerComponent } from './common/components/video-player/video-player.component';
import { JwtInterceptor } from './common/interceptor/jwt.interceptor';
import { PartyPaymentSucessComponent } from './ggera/party-payment-sucess/party-payment-sucess.component';
import { PartyPaymentFailedComponent } from './ggera/party-payment-failed/party-payment-failed.component';
import { ViewPartyComponent } from './ggera/view-party/view-party.component';
import { AdminTemplateComponent } from './template/admin-template/admin-template.component';
import { AdminNavbarComponent } from './common/components/admin-navbar/admin-navbar.component';
import { LobbyListingSubscriberComponent } from './ggera/lobby/lobby-listing-subscriber/lobby-listing-subscriber.component';
import { LobbyProComponent } from './ggera/lobby/lobby-pro/lobby-pro.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { IndexComponent } from './index/index.component';

const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PreloaderComponent,
    GASettingsComponent,
    SigninComponent,
    ProfileComponent,
    AccountDetailsComponent,
    ProRequestsComponent,
    JoinPartyComponent,
    PlayerPageComponent,
    HomePageComponent,
    MyorderComponent,
    CreatePartyComponent,
    ChatboxPopupComponent,
    NavBarComponent,
    NewFooterComponent,
    AdminUsersComponent,
    EarningsComponent,
    SingleProComponent,
    PlayersComponent,
    SubscriptionsComponent,
    UnderconstructionComponent,
    LazyLoadingComponent,
    OrderListsComponent,
    TwitchComponent,
    StatsComponent,
    SearchFilterPipe,
    SocialComponent,
    MakeMeProComponent,
    ChatScreenComponent,

    PartyListComponent,
    RanksComponent,
    PlayersNewPageComponent,

    MyOrderNormalComponent,
    HomePageNew1Component,

    RangeFilterPipe,
    
    ComingSoonComponent,
          SupportComponent,
          SettingsComponent,
          DailyChartComponent,
          WeeklyChartComponent,
          MonthlyChartComponent,
          ErrorTextComponent,
          VideoPlayerComponent,
      JobTemplateComponent,
      PartyPaymentSucessComponent,
      PartyPaymentFailedComponent,
      ViewPartyComponent,
      AdminTemplateComponent,
      AdminNavbarComponent,
      LobbyListingSubscriberComponent,
      LobbyProComponent,
      IndexComponent


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxStripeModule.forRoot('pk_test_51LT4FJSBGyD7UYjV7Uzl35ECOGv6TAtzwwYlAokpfqWpLNoXEZq1Ov3RoijNAxrN5fRhYqxzedauoF7tyFlbgr9q002zPPPLTa'),
    SocketIoModule.forRoot(config)
  ],
  providers: [HeroService,AuthGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('175613608118-or5k2udnug8clivm7enruru42qnk6qd4.apps.googleusercontent.com'),
          }        
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
      
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
