import { JSON_CONTENT_TYPE_HEADER } from "../constants";

export const jwtTokenHeader = (jwtToken: string) => ({ Authorization: `Bearer ${jwtToken}` });

export const jwtTokenAndJsonContentTypeHeaders = (jwtToken: string) => ({
	...JSON_CONTENT_TYPE_HEADER,
	...jwtTokenHeader(jwtToken)
});
