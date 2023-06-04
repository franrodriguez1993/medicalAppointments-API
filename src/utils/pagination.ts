/**---------------------- pagination functions ------------------------ **/
export function pagination(page: number, size: number) {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
}

/** LIST  DATA  **/
export function paginatedData(data: any, page: number, limit: number) {
  const currentPage = page ? page + 1 : 1;
  let { count: totalItems, rows: list } = data;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, list, totalPages, currentPage };
}
