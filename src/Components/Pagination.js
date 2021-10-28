//Styles
import { useCallback, useEffect } from "react";
import "../Styles/Pagination.scss";

const Pagination = ({
  length,
  itemsPerPage,
  page,
  setPage,
  theme,
  scrollTop,
}) => {
  const pageCount = Math.ceil(length / itemsPerPage);

  const greaterThree = page + 2 >= pageCount ? pageCount : page + 2;
  const lastThree = page < 3 ? (pageCount <= 4 ? pageCount : 5) : greaterThree;
  const nextPages = page >= pageCount - 2 ? pageCount : lastThree;
  const prevPages =
    page + 2 > pageCount ? pageCount - 5 : page - 3 <= 0 ? 0 : page - 3;

  //Handlers
  const next = () => {
    setPage((prev) => (prev === pageCount ? prev : prev + 1));
  };

  const prev = () => {
    setPage((prev) => (prev === 1 ? prev : prev - 1));
  };

  const clickNumber = (newPage) => {
    setPage(newPage);
  };

  const scroll = () => {
    if (scrollTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToTop = useCallback(scroll, [scroll]);

  useEffect(() => {
    scrollToTop();
  }, [page, scrollToTop]);

  //Functions
  const generateNumbers = () => {
    const arr = [];
    for (let i = prevPages <= 0 ? 0 : prevPages; i < nextPages; i++) {
      arr.push(
        <div
          className={`pageNumber ${
            page === i + 1 ? (theme === "dark" ? "dark-active" : "active") : ""
          }`}
          key={i + 1}
          onClick={() => clickNumber(i + 1)}
        >
          {i + 1}
        </div>
      );
    }

    return arr;
  };

  return (
    <div className="pagination-container">
      <div className="numbers">
        <div className="prev" onClick={prev}>
          Prev
        </div>
        {generateNumbers()}
        <div className="next" onClick={next}>
          Next
        </div>
      </div>
    </div>
  );
};

export default Pagination;
