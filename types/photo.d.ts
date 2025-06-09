export interface Photo {
  uuid: string;
  user_uuid?: string;
  created_at: string; // ISO 字符串
  img_description: string;
  img_url: string;
  status: string;
}
