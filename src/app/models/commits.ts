export class Commit { data: data; }

interface data { repository: repository; }

interface repository { ref: ref; }

interface ref { target: target; }

interface target { history: history; }

interface history { edges: edges; }

interface edges { node: node }

interface node { message: string; author: author; }

interface author { name: string; date: data; }