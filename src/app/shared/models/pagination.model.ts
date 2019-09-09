export class PaginationModel<T> {
  pageNumber: number;
  firstPage: boolean;
  lastPage: boolean;
  totalPages: number;
  pageSize: number;
  sort: string;
  content: T[];
}
