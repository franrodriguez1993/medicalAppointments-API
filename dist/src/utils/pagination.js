"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatedData = exports.pagination = void 0;
/**---------------------- pagination functions ------------------------ **/
function pagination(page, size) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
}
exports.pagination = pagination;
/** LIST  DATA  **/
function paginatedData(data, page, limit) {
    const currentPage = page ? page + 1 : 1;
    let { count: totalItems, rows: list } = data;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, list, totalPages, currentPage };
}
exports.paginatedData = paginatedData;
