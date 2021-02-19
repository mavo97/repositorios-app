export class Repository {
  data: data;
}

interface data {
  repository: repository;
}

interface repository {
  sshUrl: string;
  url: string;
  defaultBranchRef: DefaultBranchRef;
  object: gitObject;
}
interface DefaultBranchRef {
  name: string;
}
interface gitObject {
  entries: entries;
}

interface entries {
  name: string;
  type: string;
  mode: number;
}
