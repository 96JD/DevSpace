import { ExtendedQuestion, UserLocalStorage } from "../interfaces";
import { Question } from "../odata-models";

export const stringifyJson = (object: UserLocalStorage | ExtendedQuestion) => JSON.stringify(object);

export const parseJson = (stringifiedObject: string) => JSON.parse(stringifiedObject) as UserLocalStorage | Question;
