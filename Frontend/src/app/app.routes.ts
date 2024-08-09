import { Routes } from "@angular/router";

import { APP_ROUTES } from "./app-routes";
import { IS_AUTHENTICATED } from "./auth/auth.service";
import { AnonymousGuard } from "./auth/guards/anonymous-guard.service";
import { AuthGuard } from "./auth/guards/auth-guard.service";
import { LoginComponent } from "./auth/login/login.component";
import { ChangeYourPasswordComponent } from "./auth/password/change-your-password/change-your-password.component";
import { ForgotYourPasswordComponent } from "./auth/password/forgot-your-password/forgot-your-password.component";
import { RegisterComponent } from "./auth/register/register.component";
import { HomeComponent } from "./pages/home/home.component";
import { MyNetworkComponent } from "./pages/my-network/my-network.component";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { PrivacyComponent } from "./pages/privacy/privacy.component";
import { MyBioComponent } from "./pages/profile/my-bio/my-bio.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { QuestionFormComponent } from "./pages/questions/question-form/question-form.component";
import { TermsComponent } from "./pages/terms/terms.component";
import { TrendingComponent } from "./pages/trending/trending.component";
import { WhoToFollowComponent } from "./pages/who-to-follow/who-to-follow.component";

export const routes: Routes = [
	{ path: APP_ROUTES.Default, redirectTo: IS_AUTHENTICATED ? APP_ROUTES.Home : APP_ROUTES.Login, pathMatch: "full" },
	{
		path: APP_ROUTES.Default,
		canActivate: [AnonymousGuard],
		children: [
			{ path: APP_ROUTES.Login, component: LoginComponent },
			{ path: APP_ROUTES.ChangeYourPassword, component: ChangeYourPasswordComponent },
			{ path: APP_ROUTES.ForgotYourPassword, component: ForgotYourPasswordComponent },
			{ path: APP_ROUTES.Register, component: RegisterComponent }
		]
	},
	{
		path: APP_ROUTES.Default,
		canActivate: [AuthGuard],
		children: [
			{ path: APP_ROUTES.Home, component: HomeComponent },
			{ path: APP_ROUTES.MyNetwork, component: MyNetworkComponent },
			{
				path: APP_ROUTES.Profile,
				component: ProfileComponent,
				children: [{ path: APP_ROUTES.MyBio, component: MyBioComponent }]
			},
			{ path: APP_ROUTES.QuestionForm, component: QuestionFormComponent },
			{ path: APP_ROUTES.Trending, component: TrendingComponent },
			{ path: APP_ROUTES.WhoToFollow, component: WhoToFollowComponent }
		]
	},
	{ path: APP_ROUTES.Privacy, component: PrivacyComponent },
	{ path: APP_ROUTES.Terms, component: TermsComponent },
	{ path: APP_ROUTES.PageNotFound, component: PageNotFoundComponent }
];
