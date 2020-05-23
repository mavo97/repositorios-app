export class Repositorio {
    data: data;
}

interface data {
    repository: repository;
}

interface repository {
    name: string;
    description: string;
    primaryLanguage: primaryLanguage;
    pushedAt: data;
}

interface primaryLanguage {
    name: string;
    color: string;
}