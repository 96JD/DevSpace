import { buildODataQueryUrl, ODataQuery } from "96jd-odata-query-utils";
import _ from "lodash";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "../../auth/auth.service";
import { QUESTIONS_ODATA_API_URL } from "../../shared/constants";
import { jwtTokenAndJsonContentTypeHeaders, jwtTokenHeader } from "../../shared/functions/auth";
import { UserLocalStorage } from "../../shared/interfaces";

@Injectable({
	providedIn: "root"
})
export class QuestionsService {
	loggedInUser!: UserLocalStorage;

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) {
		this.loggedInUser = this.authService.loggedInUser;
	}

	getQuestionsList(top: number, skip: number, orderBy: string, tabNumber: number) {
		let oDataQuery: ODataQuery;
		if (tabNumber === 0) {
			oDataQuery = {
				apiUrl: QUESTIONS_ODATA_API_URL,
				count: true,
				expand: "User($select=profilePicture,firstName,lastName),QuestionLikes($expand=User($select=firstName,lastName)),QuestionAnswers($expand=User($select=profilePicture,firstName,lastName)),QuestionFavorites",
				top: _.toString(top),
				skip: _.toString(skip),
				orderBy: orderBy
			};
		} else if (tabNumber === 1) {
			oDataQuery = {
				apiUrl: QUESTIONS_ODATA_API_URL,
				count: true,
				expand: "User($select=profilePicture,firstName,lastName),QuestionLikes($count=true;$expand=User($select=firstName,lastName)),QuestionAnswers($expand=User($select=profilePicture,firstName,lastName)),QuestionFavorites",
				top: _.toString(top),
				skip: _.toString(skip),
				orderBy: "QuestionLikes/$count desc"
			};
		} else {
			oDataQuery = {
				apiUrl: QUESTIONS_ODATA_API_URL,
				count: true,
				expand: "User($select=profilePicture,firstName,lastName),QuestionLikes($expand=User($select=firstName,lastName)),QuestionAnswers($expand=User($select=profilePicture,firstName,lastName)),QuestionFavorites",
				filter: `QuestionFavorites/any(qf: qf/UserId eq ${_.toString(this.loggedInUser.Id)})`,
				top: _.toString(top),
				skip: _.toString(skip),
				orderBy: orderBy
			};
		}
		return this.http.get(buildODataQueryUrl(oDataQuery), {
			headers: new HttpHeaders(jwtTokenHeader(this.authService.jwtToken ?? ""))
		});
	}

	postQuestion(data: { UserId: number; Title: string; Description: string }) {
		return this.http.post(QUESTIONS_ODATA_API_URL, data, {
			headers: new HttpHeaders(jwtTokenAndJsonContentTypeHeaders(this.authService.jwtToken ?? ""))
		});
	}

	updateQuestion(key: number, data: { Title: string; Description: string }) {
		return this.http.patch(`${QUESTIONS_ODATA_API_URL}(${_.toString(key)})`, data, {
			headers: new HttpHeaders(jwtTokenAndJsonContentTypeHeaders(this.authService.jwtToken ?? ""))
		});
	}

	deleteQuestion(key: number) {
		return this.http.delete(`${QUESTIONS_ODATA_API_URL}(${_.toString(key)})`, {
			headers: new HttpHeaders(jwtTokenHeader(this.authService.jwtToken ?? ""))
		});
	}

	likeQuestion(key: number, data: { UserId: number }) {
		return this.http.post(`${QUESTIONS_ODATA_API_URL}(${_.toString(key)})/QuestionLikes`, data, {
			headers: new HttpHeaders(jwtTokenAndJsonContentTypeHeaders(this.authService.jwtToken ?? ""))
		});
	}

	postAnswer(key: number, data: { UserId: number; Answer: string }) {
		return this.http.post(`${QUESTIONS_ODATA_API_URL}(${_.toString(key)})/QuestionAnswers`, data, {
			headers: new HttpHeaders(jwtTokenAndJsonContentTypeHeaders(this.authService.jwtToken ?? ""))
		});
	}

	unlikeQuestion(questionId: number, userId: number) {
		return this.http.delete(
			`${QUESTIONS_ODATA_API_URL}(${_.toString(questionId)})/QuestionLikes(${_.toString(userId)})`,
			{
				headers: new HttpHeaders(jwtTokenHeader(this.authService.jwtToken ?? ""))
			}
		);
	}

	addQuestionToFavorite(key: number, data: { UserId: number }) {
		return this.http.post(`${QUESTIONS_ODATA_API_URL}(${_.toString(key)})/QuestionFavorites`, data, {
			headers: new HttpHeaders(jwtTokenAndJsonContentTypeHeaders(this.authService.jwtToken ?? ""))
		});
	}

	deleteQuestionFromFavorite(questionId: number, userId: number) {
		return this.http.delete(
			`${QUESTIONS_ODATA_API_URL}(${_.toString(questionId)})/QuestionFavorites(${_.toString(userId)})`,
			{
				headers: new HttpHeaders(jwtTokenHeader(this.authService.jwtToken ?? ""))
			}
		);
	}
}
