export interface NoBorderJobsUserNameRow {
  Id: string;
  emailencrypted: string;
  username: string;
}

export interface NoBorderJobsCuratorRow {
  id: string;
  username: string;
}

export interface NoBorderJobsJobpostRow {
  id: string;
  title: string;
  company: string;
  body: string;
  created_at: Date;
  updated_at: Date;
  username: string;
  BLOB: string;
}
