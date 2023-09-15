/**
 * title: user.ts
 * author: ngi bujri
 * date: september 14 2023
 * description: user interface
 */

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  address: string;
  isDisabled: boolean;
  role: string;
}
