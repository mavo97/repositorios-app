export class Repository {
    data: data;
}

interface data {
    repository: repository;
}

interface repository {
    sshUrl: string;
    object: gitObject;
}

interface gitObject {
    entries: string;
}

interface entries {
    name: string;
    type: string;
    mode: number;
}