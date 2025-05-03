
/**
 * Pagination utility functions for the directory
 */

export type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
};

/**
 * Get a slice of data based on pagination parameters
 */
export const getPaginatedData = <T>(
  data: T[],
  page: number,
  itemsPerPage: number
): { items: T[]; paginationInfo: PaginationInfo } => {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Ensure page is within valid range
  const currentPage = Math.max(1, Math.min(page, totalPages));
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = data.slice(startIndex, endIndex);

  return {
    items,
    paginationInfo: {
      currentPage,
      totalPages,
      itemsPerPage,
      totalItems,
    },
  };
};

/**
 * Generate an array of page numbers for pagination navigation
 */
export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
): (number | null)[] => {
  // If total pages is less than max visible, show all
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Always include first and last page
  const pages: (number | null)[] = [1];
  
  // Calculate range around current page
  const sidePages = Math.floor((maxVisiblePages - 2) / 2);
  let startPage = Math.max(2, currentPage - sidePages);
  let endPage = Math.min(totalPages - 1, currentPage + sidePages);
  
  // Adjust if close to beginning or end
  if (startPage <= 2) {
    endPage = Math.min(1 + maxVisiblePages - 2, totalPages - 1);
    startPage = 2;
  }
  
  if (endPage >= totalPages - 1) {
    startPage = Math.max(2, totalPages - maxVisiblePages + 2);
    endPage = totalPages - 1;
  }
  
  // Add ellipsis if needed
  if (startPage > 2) {
    pages.push(null); // represents ellipsis
  }
  
  // Add pages in range
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  // Add ellipsis if needed
  if (endPage < totalPages - 1) {
    pages.push(null); // represents ellipsis
  }
  
  // Add last page if we have more than one page
  if (totalPages > 1) {
    pages.push(totalPages);
  }
  
  return pages;
};
