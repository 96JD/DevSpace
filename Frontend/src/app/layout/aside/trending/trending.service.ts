import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { TRENDING_API_URL } from "../../../shared/constants";

@Injectable({
	providedIn: "root"
})
export class TrendingService {
	constructor(private http: HttpClient) {}

	getTrendingArticles() {
		return this.http.get(TRENDING_API_URL);
	}
}
