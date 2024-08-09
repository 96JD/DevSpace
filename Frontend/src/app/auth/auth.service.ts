import _ from "lodash";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { APP_ROUTES } from "../app-routes";
import { AUTH_API_URL, JSON_CONTENT_TYPE_HEADER } from "../shared/constants";
import { jwtTokenHeader } from "../shared/functions/auth";
import {
	EMAIL_CHANGE_PASSWORD,
	getEmailChangePasswordFromLocalStorage,
	getJwtTokenFromLocalStorage,
	getLoggedInUserFromLocalStorage,
	JWT_TOKEN,
	LOGGED_IN_USER,
	removeObjectFromLocalStorage,
	setInLocalStorage
} from "../shared/functions/localStorage";
import { toastError, toastSuccess } from "../shared/functions/toast";
import { ErrorResponse, UserLocalStorage } from "../shared/interfaces";

export const IS_AUTHENTICATED = !_.isEmpty(getJwtTokenFromLocalStorage);

interface LoginResponse {
	JwtToken: string;
	LoggedInUser: UserLocalStorage;
}

@Injectable({
	providedIn: "root"
})
export class AuthService {
	emailChangePassword = getEmailChangePasswordFromLocalStorage;
	jwtToken = getJwtTokenFromLocalStorage;
	loggedInUser = getLoggedInUserFromLocalStorage();
	isAuthenticated: boolean = IS_AUTHENTICATED;
	authChange = new Subject<boolean>();

	constructor(
		private http: HttpClient,
		private toastrService: ToastrService,
		private router: Router
	) {}

	register(data: FormData, emailAndPassword: { Email: string; Password: string }) {
		this.http.post(`${AUTH_API_URL}/register`, data).subscribe({
			next: () => {
				this.login(emailAndPassword);
			},
			error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
		});
	}

	login(data: { Email: string; Password: string }) {
		this.http
			.post(`${AUTH_API_URL}/login`, data, { headers: new HttpHeaders(JSON_CONTENT_TYPE_HEADER) })
			.subscribe({
				next: (response) => {
					this.isAuthenticated = true;
					this.authChange.next(true);
					this.jwtToken = (response as LoginResponse).JwtToken;
					this.loggedInUser = (response as LoginResponse).LoggedInUser;
					setInLocalStorage(JWT_TOKEN, this.jwtToken);
					setInLocalStorage(LOGGED_IN_USER, this.loggedInUser);
					toastSuccess(this.toastrService, "Logged in successfully!");
					this.router.navigate([APP_ROUTES.Home]);
				},
				error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
			});
	}

	logout() {
		this.http
			.get(`${AUTH_API_URL}/logout`, { headers: new HttpHeaders(jwtTokenHeader(this.jwtToken ?? "")) })
			.subscribe({
				next: () => {
					this.isAuthenticated = false;
					this.authChange.next(false);
					setInLocalStorage(JWT_TOKEN, "");
					removeObjectFromLocalStorage(LOGGED_IN_USER);
					toastSuccess(this.toastrService, "Logged out successfully!");
					this.router.navigate([APP_ROUTES.Login]);
				},
				error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
			});
	}

	forgotYourPassword(data: { Email: string }) {
		this.http.post(`${AUTH_API_URL}/forgot-your-password`, data).subscribe({
			next: () => {
				this.emailChangePassword = data.Email;
				setInLocalStorage(EMAIL_CHANGE_PASSWORD, this.emailChangePassword);
				this.router.navigate([APP_ROUTES.ChangeYourPassword]);
			},
			error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
		});
	}

	changeYourPassword(data: { Email: string; Password: string }) {
		this.http.post(`${AUTH_API_URL}/change-your-password`, data).subscribe({
			next: () => {
				toastSuccess(this.toastrService, "Successfully changed your password!");
				this.router.navigate([APP_ROUTES.Login]);
			},
			error: (response: ErrorResponse) => toastError(this.toastrService, response.error)
		});
	}
}
