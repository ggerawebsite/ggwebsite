import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GASettingsComponent } from './ggera/g-a-settings/g-a-settings.component';
import { SigninComponent } from './ggera/signin/signin.component';
import { ProfileComponent } from './ggera/profile/profile.component';
import { AccountDetailsComponent } from './ggera/account-details/account-details.component';
import { JoinPartyComponent } from './ggera/join-party/join-party.component';
import { PlayerPageComponent } from './ggera/player-page/player-page.component';
import { HomePageComponent } from './ggera/home-page/home-page.component';
import { ProRequestsComponent } from './ggera/pro-requests/pro-requests.component';
import { MyorderComponent } from './ggera/myorder/myorder.component';
import { CreatePartyComponent } from './ggera/create-party/create-party.component';
import { ChatboxPopupComponent } from './ggera/chatbox-popup/chatbox-popup.component';
import { AdminUsersComponent } from './ggera/admin-users/admin-users.component';
import { EarningsComponent } from './ggera/earnings/earnings.component';
import { SingleProComponent } from './ggera/single-pro/single-pro.component';
import { PlayersComponent } from './ggera/players/players.component';
import { UnderconstructionComponent } from './ggera/underconstruction/underconstruction.component';
import { LazyLoadingComponent } from './ggera/lazy-loading/lazy-loading.component';
import { AuthGuard } from './auth.guard';
import { OrderListsComponent } from './ggera/order-lists/order-lists.component';
import { TwitchComponent } from './ggera/twitch/twitch.component';
import { StatsComponent } from './ggera/stats/stats.component';
import { MakeMeProComponent } from './ggera/make-me-pro/make-me-pro.component';
import { PartyListComponent } from './ggera/party-list/party-list.component';

import { RanksComponent } from './ggera/ranks/ranks.component';
import { PlayersNewPageComponent } from './ggera/players-new-page/players-new-page.component';
import { MyOrderNormalComponent } from './ggera/my-order-normal/my-order-normal.component';
import { HomePageNew1Component } from './ggera/home-page-new1/home-page-new1.component';
import { ComingSoonComponent } from './ggera/coming-soon/coming-soon.component';
import { SupportComponent } from './ggera/support/support.component';
import { SettingsComponent } from './ggera/settings/settings.component';
import { SubscriptionsComponent } from './ggera/subscriptions/subscriptions.component';
import { JobTemplateComponent } from './template/job-template/job-template.component';
import { PartyPaymentSucessComponent } from './ggera/party-payment-sucess/party-payment-sucess.component';
import { PartyPaymentFailedComponent } from './ggera/party-payment-failed/party-payment-failed.component';
import { CanCreatePartyGuard } from './common/guards/can-create-party.guard';
import { ViewPartyComponent } from './ggera/view-party/view-party.component';
import { ProUserGuard } from './common/guards/pro-user.guard';
import { AdminTemplateComponent } from './template/admin-template/admin-template.component';
import { AdminGuard } from './common/guards/admin.guard';
import { LobbyListingSubscriberComponent } from './ggera/lobby/lobby-listing-subscriber/lobby-listing-subscriber.component';
import { LobbyProComponent } from './ggera/lobby/lobby-pro/lobby-pro.component';
import { IndexComponent } from './index/index.component';




const routes: Routes = [
    
    { path: '', redirectTo:'index',pathMatch: 'full'},
    // { path: '', canActivate: [AuthGuard ], component: HomePageComponent, redirectTo:'index',pathMatch: 'full'},
    { path: 'index',  component: IndexComponent },
    { path: 'login',  component: SigninComponent },
    { path: 'account', canActivate: [AuthGuard ],  component: AccountDetailsComponent },
    { path: 'profile', canActivate: [AuthGuard ],  component: ProfileComponent },
    { path: 'join-party', canActivate: [AuthGuard ],  component: JoinPartyComponent },
    { path: 'home-page', canActivate: [AuthGuard ], component: HomePageComponent },
    { path: 'coachings', canActivate: [AuthGuard ], component: ProRequestsComponent },
    { path: 'player-page',canActivate: [AuthGuard ],  component: PlayerPageComponent },
    { path: 'my-orders', canActivate: [AuthGuard ], component: OrderListsComponent },
    { path: 'create-party',canActivate: [AuthGuard, CanCreatePartyGuard ],  component: CreatePartyComponent },
    { path: 'users', canActivate: [AuthGuard ], component: AdminUsersComponent },
    { path: 'pro-requests', canActivate: [AuthGuard ], component: ProRequestsComponent },
    { path: 'earnings',canActivate: [AuthGuard ], component: EarningsComponent },
    { path: 'single-pro', canActivate: [AuthGuard ], component: SingleProComponent },
    { path: 'players',canActivate: [AuthGuard ],  component: PlayersNewPageComponent },
    { path: 'loading', component: LazyLoadingComponent },
    { path: 'pro-home',canActivate: [AuthGuard ], component: MyorderComponent },
    { path: 'twitch-player/:partyId',canActivate: [AuthGuard ], component: TwitchComponent },
    { path: 'party/:partyId/payment/success',canActivate: [AuthGuard ], component: PartyPaymentSucessComponent },
    { path: 'party/:partyId/payment/failure',canActivate: [AuthGuard ], component: PartyPaymentFailedComponent },
    { path: 'party/:partyId',canActivate: [AuthGuard, ProUserGuard ], component: ViewPartyComponent },
    { path: 'stats',canActivate: [AuthGuard ], component: StatsComponent },
    { path: 'makeme-pro',canActivate: [AuthGuard ],component: MakeMeProComponent },
    { path: 'ranks', component: RanksComponent },
    { path: 'players', component: PlayersNewPageComponent },
    { path: 'my-orders2', component: MyOrderNormalComponent },
    { path: 'pre-party', component: HomePageNew1Component },

    { path: 'coming-soon', canActivate: [AuthGuard ],  component: ComingSoonComponent },
    { path: 'support', canActivate: [AuthGuard ],  component: SupportComponent },
    { path: 'settings', canActivate: [AuthGuard ],  component: SettingsComponent },
    { path: 'subscriptions', canActivate: [AuthGuard ],  component: SubscriptionsComponent },
    {path: 'make-me-pro', component: JobTemplateComponent, loadChildren: () => import('./ggera/jobs/jobs.module').then(e => e.JobsModule)},
    {path: 'admin', component: AdminTemplateComponent, canActivateChild: [AdminGuard], loadChildren: () => import('./ggera/admin/admin.module').then(e => e.AdminModule)},

    { path: 'lobby-listing-subscriber', canActivate: [AuthGuard ],  component: LobbyListingSubscriberComponent },
    { path: 'pro/enterlobby/:matchId', canActivate: [AuthGuard ],  component: LobbyProComponent },

    { path: '**', canActivate: [AuthGuard], component: UnderconstructionComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes,  {
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }