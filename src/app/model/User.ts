export class User {
    id: string;
    username: string;
    password: string;
    email: string;
    alertOn: boolean;
    stations: Map<string, number>;
}
