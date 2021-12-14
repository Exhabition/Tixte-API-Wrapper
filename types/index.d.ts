declare module "tixte" {
  class Client {
    constructor(private apiKey?: string);

    getAccountInfo(): Promise<AccountDetails>;

    uploadFile(
      buffer: Buffer,
      domain: string,
      options?: UploadOptions
    ): Promise<UploadFileResponse>;
    deleteFile(id: string): Promise<DeleteFileResponse>;
    getFile(id: string): Promise<GetFileResponse>;
  }
}

declare interface AccountDetails {
  success: boolean;
  data: {
    id: string;
    username: string;
    mfa_enabled: boolean;
    pro: boolean;
    beta: boolean;
    admin: boolean;
    staff: boolean;
    email: string;
    email_verified: boolean;
    phone?: string;
    avatar?: string;
    upload_region: string;
    last_login: string;
  };
}

declare interface UploadOptions {
  extension: string;
  filename: string;
}

declare interface UploadFileResponse {
  success: boolean;
  size: number;
  data: {
    id: string;
    name: string;
    region: string;
    filename: string;
    extension: string;
    domain: string;
    type: number;
    permissions: [{
      user: TixteUser,
      access_level: number,
    }]
    url: string;
    direct_url: string;
    deletion_url: string;
    message: string;
  };
}

declare interface DeleteFileResponse {
  success: boolean;
  data: {
    message: string;
  };
}

declare interface TixteUser {
  id: string,
  username: string,
  avatar: string,
}
