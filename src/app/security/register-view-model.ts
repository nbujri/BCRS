/* Title: register-view-model
Author: Megan Walker,  Ngi Bujri, Caitlynne Johnson
Date: 09-20-2023
Description: Register view model
Source: Professor Krasso, Angular.io */

import { selectedSecurityQuestionsViewModel } from './selected-security-questions-view-model'


// register view model
export interface RegisterViewModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    selectedSecurityQuestions: selectedSecurityQuestionsViewModel[]
}
