import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import NftListComponent from "../components/NftListComponent";
import "./CollectionPage.css";
import { currencyFormat } from "../helpers/formatters";

const CollectionPage = () => {
  let { collection } = useParams();
  const { state } = useLocation();
  const [nfts, setNFTS] = useState([]);
  const [noNFTMessage, setNoNFTMessage] = useState(false);
  const [numberOfNFTS] = useState(25);

  const getNFTS = () => {
    // setIsLoading(true);
    let filterString = JSON.stringify({ collection });

    axios
      .get(
        `https://ftx.us/api/nft/nfts_filtered?startInclusive=0&endExclusive=${numberOfNFTS}&nft_filter_string=${filterString}`
      )
      .then((res) => {
        const nftData = res.data?.result;
        if (nftData.nfts && nftData.nfts.length) {
          const nfts = nftData.nfts;
          setNFTS(nfts);
          // setIsLoading(false);
        } else {
          setNoNFTMessage(true);
        }
      });
  };

  useEffect(() => {
    getNFTS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={"container"}>
      <div className="collection-info-container text-white p-4 mt-2">
        <div className={"row text-center"}>
          <div className={"col"}>
            <h2 className={"mb-3"}>{state?.collection?.group_id}</h2>
            <div>
              <img
                alt={state?.collection?.group_id}
                className={"img-fluid collection-image-container"}
                src={state?.collection?.collectionDict?.bannerImageUrl || null}
              />
            </div>
          </div>
        </div>

        <div className="row text-center mt-3">
          <div className="col">
            <span>Number of NFTs: {state?.collection?.total}</span>
          </div>
          <div className="col">
            <span>USD Volume: {currencyFormat(state?.collection?.volume)}</span>
          </div>
          <div className="col">
            <span>Mint Source: {state?.collection?.issuer?.mintSource}</span>
          </div>
        </div>

        <div className={"row pt-4"}>
          <span>{state?.collection?.collectionDict?.markdownDescription}</span>
        </div>
      </div>

      <div className={"text-center mt-4"}>
        {nfts && !noNFTMessage ? (
          <div>
            <NftListComponent nfts={nfts} />
          </div>
        ) : (
          <div>
            <span className={"text-white"}>
              No NFTs Found for this collection
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
