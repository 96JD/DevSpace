import { buildODataQueryUrl, ODataQuery } from "96jd-odata-query-utils";
import _ from "lodash";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "../../auth/auth.service";
import { USER_FOLLOWS_API_URL, USERS_ODATA_API_URL } from "../../shared/constants";
import { jwtTokenAndJsonContentTypeHeaders, jwtTokenHeader } from "../../shared/functions/auth";
import { UserLocalStorage } from "../../shared/interfaces";

@Injectable({
	providedIn: "root"
})
export class WhoToFollowService {
	loggedInUser!: UserLocalStorage;

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) {
		this.loggedInUser = this.authService.loggedInUser;
	}

	getWhoToFollowList(top: number, skip: number) {
		const oDataQuery: ODataQuery = {
			apiUrl: USERS_ODATA_API_URL,
			count: true,
			expand: "UserFollowRecipients",
			filter: `not(UserFollowRecipients/any(f:f/SenderId eq ${_.toString(this.loggedInUser.Id)})) and (Id ne ${_.toString(this.loggedInUser.Id)})`,
			select: "id,about,birthday,city,coverPhoto,email,firstName,lastName,jobTitle,phone,profilePicture,salary",
			top: _.toString(top),
			skip: _.toString(skip)
		};

		return this.http.get(buildODataQueryUrl(oDataQuery), {
			headers: new HttpHeaders(jwtTokenHeader(this.authService.jwtToken ?? ""))
		});
	}

	followUser(data: { SenderId: number; RecipientId: number }) {
		return this.http.post(`${USER_FOLLOWS_API_URL}/follow-user`, data, {
			headers: new HttpHeaders(jwtTokenAndJsonContentTypeHeaders(this.authService.jwtToken ?? ""))
		});
	}

	unfollowUser(data: { SenderId: number; RecipientId: number }) {
		return this.http.post(`${USER_FOLLOWS_API_URL}/unfollow-user`, data, {
			headers: new HttpHeaders(jwtTokenAndJsonContentTypeHeaders(this.authService.jwtToken ?? ""))
		});
	}
}
