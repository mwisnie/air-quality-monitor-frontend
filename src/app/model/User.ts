export class User {
    id: string;
    username: string;
    password: string;
    email: string;
    alertOn: boolean;
    stations: Map<string, number>;

    constructor(username?: string, password?: string, email?: string) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
