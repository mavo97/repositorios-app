export class Repositorios {
    data: data;
}

// tslint:disable-next-line: class-name
interface data {
    user: user;
}

// tslint:disable-next-line: class-name
interface user {
    name: string;
    repositories: repositories;
}

// tslint:disable-next-line: class-name
interface repositories {
    nodes: nodes[];
}

// tslint:disable-next-line: class-name
interface nodes {
    name: string;
    description: string;
    primaryLanguage: primaryLanguage;
    pushedAt: Date;
}

// tslint:disable-next-line: class-name
interface primaryLanguage {
    name: string;
    color: string;
}