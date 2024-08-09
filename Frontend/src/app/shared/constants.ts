import { isDevMode } from "@angular/core";

export const BACKEND_API_URL = isDevMode() ? "https://localhost:7177" : "https://jacob-dolorzo-dev-space.onrender.com";
export const AUTH_API_URL = BACKEND_API_URL + "/Auth";
export const USER_FOLLOWS_API_URL = BACKEND_API_URL + "/UserFollow";

export const ODATA_API_URL = BACKEND_API_URL + "/odata";
export const USERS_ODATA_API_URL = ODATA_API_URL + "/Users";
export const QUESTIONS_ODATA_API_URL = ODATA_API_URL + "/Questions";

export const TRENDING_API_URL =
	"https://jacob-dolorzo-global-eye-server.onrender.com/api/v1/news/fetch-all-news(sources=hacker-news)";

export const JSON_CONTENT_TYPE_HEADER = { "Content-Type": "application/json" };

export const APPLICATION_THEME_COLOR = "rose";

export const VALID_STATUS = "VALID";

export const PASSWORD_VALIDATION_PATTERN = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
