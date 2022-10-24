interface DatabaseRowFileUpload {
  id: number;
  name: string;
  size: string;
  mimetype: string;
  md5_calc: string;
  file_storage: string;
  process_status: string;
  created_at: string
}

interface DatabaseRowFileProcessed extends FileRowFileUpload {
  uuid: string;
  cpf_valid: boolean;
  store_most_frequent_valid: boolean;
  store_last_purchase_valid: boolean;
}

interface FileRowFileUpload {
  cpf: string;
  private: string;
  incomplete: string;
  date_last_purchase: string;
  ticket_average: string;
  ticket_last_purchase: string;
  store_most_frequent: string;
  store_last_purchase: string;
}



export { DatabaseRowFileUpload, DatabaseRowFileProcessed, FileRowFileUpload }