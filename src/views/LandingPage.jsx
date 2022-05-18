import { useState, useEffect } from "react";
import axios from "axios";
import CollectionListComponent from "../components/CollectionListComponent";
import NftListComponent from "../components/NftListComponent";
import FilterBar from "../components/FilterBar";
import { Spinner } from "react-bootstrap";

function LandingPage() {
  const [startingCollections, setStartingCollections] = useState([]);
  const [startingNFTS, setStartingNFTS] = useState();
  const [errorState, setErrorState] = useState({});
  const [collectionOrNFT, setCollectionOrNFT] = useState("COLLECTIONS");
  const [pageNum, setPageNum] = useState(1);
  const [requestedCollections, setRequestedCollections] = useState([]);
  const [requestedNFT, setRequestedNFT] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (collectionOrNFT === "COLLECTIONS") {
      pageNum === 1 ? getStartingCollections() : getRequestedAssets();
    } else if (collectionOrNFT === "NFTs") {
      getStartingNFTS();
    }
  }, [collectionOrNFT, pageNum]);

  // useEffect(() => {
  //   if (pageNum !== 1) {
  //     getRequestedAssets();
  //   }
  // }, [pageNum]);

  const getStartingCollections = () => {
    setIsLoading(true);
    axios
      .get(
        `https://ftx.us/api/nft/collections_page?startInclusive=0&endExclusive=25&collectionType=all`
      )
      .then((res) => {
        const startingData = res.data?.result;
        if (startingData) {
          setStartingCollections(startingData);
          setRequestedCollections();
          setIsLoading(false);
        }
      });
  };

  const getStartingNFTS = () => {
    setIsLoading(true);
    // let filterString = JSON.stringify({ collection: "Bored Ape Yacht Club" });
    axios
      .get(
        // `https://ftx.us/api/nft/nfts_filtered?startInclusive=0&endExclusive=25&nft_filter_string=${filterString}`
        "https://ftx.us/api/nft/nfts_filtered?startInclusive=0&endExclusive=25&nft_filter_string=%7B%22nftAuctionFilter%22%3A%22all%22%2C%22minPriceFilter%22%3Anull%2C%22maxPriceFilter%22%3Anull%2C%22seriesFilter%22%3A%5B%5D%2C%22traitsFilter%22%3A%7B%7D%2C%22searchStringFilter%22%3A%22%22%2C%22mintSourceFilter%22%3A%22sol%22%2C%22include_not_for_sale%22%3Atrue%7D&sortFunc=offer_asc"
      )
      .then((res) => {
        const startingData = res.data?.result;
        if (startingData) {
          const startingNFTS = startingData?.nfts;
          setStartingNFTS(startingNFTS);
          setIsLoading(false);
        }
      });
  };

  const getRequestedAssets = () => {
    setIsLoading(true);
    if (collectionOrNFT === "COLLECTIONS") {
      axios
        .get(
          `https://ftx.us/api/nft/collections_page?startInclusive=${
            pageNum * 25 - 25
          }&endExclusive=${pageNum * 25 + 25}&collectionType=all`
        )
        .then((res) => {
          const requestedData = res.data?.result;
          if (requestedData) {
            setRequestedCollections(requestedData);
            setIsLoading(false);
          }
        });
    } else if (collectionOrNFT === "NFTs") {
      // axios
      //     .get(
      //         `https://ftx.us/api/nft/collections_page?startInclusive=0&endExclusive=25&collectionType=all`
      //     )
      //     .then((res) => {
      //       const startingData = res.data?.result;
      //       // startingData
      //       //     ? setStartingCollections(startingData)
      //       //     : setErrorState({ ErrorText: "Unable to load collections" });
      //       if (startingData) {
      //         setStartingCollections(startingData);
      //         window.sessionStorage.setItem(
      //             "startingCollections",
      //             JSON.stringify(startingData?.collections)
      //         );
      //       }
      //     });
    }
  };
  return (
    <div className="App">
      <div className={"container text-center"}>
        <div className={"flex flex-row"}>
          <div
            className="btn-group my-4"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              className="standardized-button px-3"
              onClick={() => setCollectionOrNFT("COLLECTIONS")}
            >
              Collections
            </button>
            <button
              type="button"
              className="standardized-button px-3"
              onClick={() => setCollectionOrNFT("NFTs")}
            >
              NFTS
            </button>
          </div>
        </div>
        {errorState && <div>{errorState?.ErrorText}</div>}

        <div className="d-flex justify-content-center">
          <FilterBar
            pageNum={pageNum}
            setPageNum={(e) => {
              setPageNum(e);
            }}
          />
        </div>

        {isLoading && (
          <div>
            <Spinner
              animation="border"
              variant="primary"
              className={"mt-5 my-4"}
              size={"lg"}
            />
            <h1 className={"text-white mt-4"}>Loading {collectionOrNFT}</h1>
          </div>
        )}

        {!isLoading && <h1 className={"text-white"}>{collectionOrNFT}</h1>}

        {collectionOrNFT === "COLLECTIONS" &&
          startingCollections &&
          !isLoading && (
            <CollectionListComponent
              collections={
                requestedCollections?.collections ||
                startingCollections?.collections
              }
            />
          )}

        {collectionOrNFT === "NFTs" && startingNFTS && !isLoading && (
          <NftListComponent nfts={startingNFTS} />
        )}
      </div>
    </div>
  );
}

export default LandingPage;
