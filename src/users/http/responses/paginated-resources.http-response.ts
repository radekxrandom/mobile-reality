export class PaginatedResourcesDto<T extends any[]> {
  limit: number;
  offset: number;
  total: number;
  resources: T;
}