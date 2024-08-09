import _ from "lodash";

import { UserLocalStorage } from "../interfaces";
import { parseJson, stringifyJson } from "./json";

export const EMAIL_CHANGE_PASSWORD = "EMAIL_CHANGE_PASSWORD";

export const JWT_TOKEN = "JWT_TOKEN";

export const LOGGED_IN_USER = "LOGGED_IN_USER";

export const setInLocalStorage = (key: string, value: string | UserLocalStorage) => {
	if (typeof value !== "string") {
		value = stringifyJson(value);
	}
	localStorage.setItem(key, value);
};

export const removeObjectFromLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};

export const getEmailChangePasswordFromLocalStorage = localStorage.getItem(EMAIL_CHANGE_PASSWORD);

export const getJwtTokenFromLocalStorage = localStorage.getItem(JWT_TOKEN);

export const getLoggedInUserFromLocalStorage = () => {
	const loggedInUser = localStorage.getItem(LOGGED_IN_USER);
	return !_.isNil(loggedInUser)
		? (parseJson(loggedInUser) as UserLocalStorage)
		: {
				Id: 0,
				ProfilePicture: "",
				CoverPhoto: "",
				FirstName: "",
				LastName: "",
				JobTitle: "",
				Phone: "",
				Email: "",
				City: "",
				Salary: 0,
				Birthday: "",
				About: "",
				isFollowed: false
			};
};
