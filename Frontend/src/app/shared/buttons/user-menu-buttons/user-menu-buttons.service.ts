import _ from "lodash";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "../../../auth/auth.service";
import { USERS_ODATA_API_URL } from "../../constants";
import { jwtTokenHeader } from "../../functions/auth";
import { UserLocalStorage } from "../../interfaces";

@Injectable({
	providedIn: "root"
})
export class UserMenuButtonsService {
	loggedInUser!: UserLocalStorage;

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) {
		this.loggedInUser = this.authService.loggedInUser;
	}

	deleteUser(key: number) {
		return this.http.delete(`${USERS_ODATA_API_URL}(${_.toString(key)})`, {
			headers: new HttpHeaders(jwtTokenHeader(this.authService.jwtToken ?? ""))
		});
	}
}
