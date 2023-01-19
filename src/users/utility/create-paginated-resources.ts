import { PaginatedResourcesDto   } from '../http/responses/paginated-resources.http-response';

export const createPaginatedResources = <T extends any[]>(
  limit: number,
  offset: number,
  total: number,
  resources: T,
): PaginatedResourcesDto<T> => {
  return {
    limit: limit,
    offset: offset,
    total: total,
    resources: resources,
  };
};