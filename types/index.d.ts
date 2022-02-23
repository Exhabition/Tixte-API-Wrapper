declare module "tixte" {
  class Client {
    apiKey:string;
    
    constructor(apiKey: string);

    getAccountInfo(): Promise<AccountDetails | TixteError>;
    getDomains(): Promise<DomainResponse | TixteError>;
    getSize(): Promise<SizeResponse | TixteError>;

    uploadFile(
      buffer: Buffer,
      domain: string,
      options?: UploadOptions
    ): Promise<UploadFileResponse | TixteError>;
    updateFile(
      id: string,
      fileInfo: UpdateFileInfo
    ): Promise<UpdateFileResponse>;
    deleteFile(id: string): Promise<DeleteFileResponse | TixteError>;
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

declare interface DomainResponse {
  success: boolean;
  data: {
    domains: [
      {
        name: string;
        owner: string;
        uploads: number;
      }
    ];
  };
}

declare interface SizeResponse {
  success: boolean;
  data: {
    user: number;
    limit: number;
    premium_tier: number;
  };
}

declare interface UploadOptions {
  extension: string;
  filename: string;
}

declare interface UpdateFileInfo {
  name?: string;
  extension?: string;
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
    permissions: [
      {
        user: TixteUser;
        access_level: number;
      }
    ];
    url: string;
    direct_url: string;
    deletion_url: string;
    message: string;
  };
}

declare interface UpdateFileResponse {
  success: boolean;
  data: {
    asset_id: string;
    domain: string;
    extension: string;
    mimetype: string;
    name: string;
    size: number;
    uploaded_at: string;
  };
}

declare interface DeleteFileResponse {
  success: boolean;
  data: {
    message: string;
  };
}

declare interface TixteUser {
  id: string;
  username: string;
  avatar: string;
}

declare interface TixteError {
  success: boolean;
  error: {
    code: string;
    message: string;
  };
}
