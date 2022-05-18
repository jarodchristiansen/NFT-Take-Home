import { Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";

const PaginationBar = ({ pageNum, setPageNum }) => {
  const [pageNums, setPageNums] = useState();

  useEffect(() => {
    const start = pageNum;
    const end = pageNum + 2;
    const pageArray = [...Array(end - start + 1).keys()].map((x) => x + start);
    setPageNums(pageArray);
  }, [pageNum]);

  return (
    <div>
      <Pagination>
        {pageNum > 1 && (
          <>
            <Pagination.Prev onClick={() => setPageNum(pageNum - 1)} />
          </>
        )}

        {pageNums &&
          pageNums.map((pageNumber) => {
            return (
              pageNumber > 0 && (
                <Pagination.Item
                  key={pageNumber}
                  onClick={() => setPageNum(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              )
            );
          })}

        {pageNum <= 19 && (
          <Pagination.Next onClick={() => setPageNum(pageNum + 1)} />
        )}
      </Pagination>
    </div>
  );
};
export default PaginationBar;
