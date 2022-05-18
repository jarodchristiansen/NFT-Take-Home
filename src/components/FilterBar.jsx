import { Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";

const PaginationBar = ({ pageNum, setPageNum }) => {
  const [pageNums, setPageNums] = useState();

  useEffect(() => {
    const start = pageNum > 1 ? pageNum - 1 : pageNum;
    const end = pageNum + 1;
    const pageArray = [...Array(end - start + 1).keys()].map((x) => x + start);
    setPageNums(pageArray);
  }, [pageNum]);

  return (
    <div>
      <Pagination>
        {pageNum > 3 && (
          <Pagination.Item onClick={() => setPageNum(1)}>First</Pagination.Item>
        )}
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

        {pageNums && pageNums[23] && <Pagination.Item>{22}</Pagination.Item>}
      </Pagination>
    </div>
  );
};
export default PaginationBar;
