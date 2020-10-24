export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  starredSpots: string[];
  createdSpots: string[];
}

export interface DecodedToken {
  id: string;
  token: string;
}

export interface Context {
  currentUser: User;
}
