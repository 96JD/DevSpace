import { buildODataQueryUrl, ODataQuery } from "96jd-odata-query-utils";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "../../../auth/auth.service";
import { QUESTIONS_ODATA_API_URL, USERS_ODATA_API_URL } from "../../../shared/constants";
import { jwtTokenHeader } from "../../../shared/functions/auth";
import { UserLocalStorage } from "../../../shared/interfaces";

@Injectable({
	providedIn: "root"
})
export class SearchService {
	loggedInUser!: UserLocalStorage;

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) {
		this.loggedInUser = this.authService.loggedInUser;
	}

	getAllUsers() {
		const oDataQuery: ODataQuery = {
			apiUrl: USERS_ODATA_API_URL,
			select: "id,profilePicture,firstName,lastName"
		};

		return this.http.get(buildODataQueryUrl(oDataQuery), {
			headers: new HttpHeaders(jwtTokenHeader(this.authService.jwtToken ?? ""))
		});
	}

	getAllQuestions() {
		const oDataQuery: ODataQuery = {
			apiUrl: QUESTIONS_ODATA_API_URL,
			select: "id,title"
		};

		return this.http.get(buildODataQueryUrl(oDataQuery), {
			headers: new HttpHeaders(jwtTokenHeader(this.authService.jwtToken ?? ""))
		});
	}
}
