export class Content { data: data; }

interface data { repository: repository; }

interface repository { object: gitObject; }

interface gitObject { text: string; }