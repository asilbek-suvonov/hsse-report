export interface PageableParams {
  page?: number;
  size?: number;
  sort?: string | string[];
}

export type QueryPrimitive = string | number | boolean;
export type QueryValue = QueryPrimitive | QueryPrimitive[] | undefined | null;
export type FilterParams = Record<string, QueryValue>;

function cleanFilter(filter: FilterParams) {
  return Object.fromEntries(
    Object.entries(filter).filter(([, value]) => {
      if (value === undefined || value === null || value === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    }),
  );
}

export function buildPagedQuery<T extends PageableParams>(params: T) {
  const { page = 0, size = 20, sort, ...filterParams } = params;
  const filter = cleanFilter(filterParams as FilterParams);
  const pageable = { page, size, ...(sort ? { sort } : {}) };

  return {
    ...filter,
    page,
    size,
    ...(sort ? { sort } : {}),
    filter,
    pageable,
  };
}
