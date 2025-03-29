export function Pagination({ totalPages, currentPage, onPageChange }) {
  const MAX_PAGE_BUTTONS = 7;

  const generatePages = () => {
    const pages = [];

    // Siempre incluir primera y última
    const first = 1;
    const last = totalPages;

    // Calcular el rango central
    let start = Math.max(currentPage - 1, 2);
    let end = Math.min(currentPage + 1, totalPages - 1);

    // Ajuste para mantener el número total de botones constante
    if (currentPage <= 3) {
      start = 2;
      end = 4;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
      end = totalPages - 1;
    }

    // Asegurar que están en rango válido
    start = Math.max(start, 2);
    end = Math.min(end, totalPages - 1);

    pages.push(first);

    if (start > 2) {
      pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(last);
    }

    return pages;
  };

  const pagesToShow = generatePages();

  return (
    <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">
      {/* Flecha izquierda */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded w-9 ${
          currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'arrow-page'
        }`}
      >
        «
      </button>

      {/* Números de página */}
      {pagesToShow.map((page, idx) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="px-3 py-1 w-9 text-center text-gray-500 select-none"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded w-9 text-center cursor-pointer ${
              currentPage === page
                ? 'bg-[var(--main-blue)] text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Flecha derecha */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded w-9 ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'arrow-page'
        }`}
      >
        »
      </button>
    </div>
  );
}
