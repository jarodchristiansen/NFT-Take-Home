import { useLocation } from "react-router-dom";
import "./NFTPage.css";

const NFTPage = () => {
  const { state } = useLocation();

  return (
    <div className={"container text-center"}>
      <div className={"row"}>
        <div className={"col"}>
          <div className={"mt-5"}>
            <img
              alt={state?.nft?.name}
              src={state?.nft?.imageUrl}
              className={"img-fluid"}
            />
            <div className={"text-cente row text-white"}>
              <div className={"col"}>
                <div className={"row"}>
                  <span>Name: {state?.nft?.name}</span>
                </div>
                <div className={"row"}>
                  <span>Collection: {state?.nft?.collection}</span>
                </div>
                <div className={"row"}>
                  <span>
                    Redeemable: {state?.nft?.redeemable ? "True" : "False"}
                  </span>
                </div>
                <div className={"row"}>
                  <span>Owned: {state?.nft?.owned ? "True" : "False"}</span>
                </div>
                <div className={"row"}>
                  <span>Issuer: {state?.nft?.issuer}</span>
                </div>
                <div className={"row"}>
                  <span>Series: {state?.nft?.series}</span>
                </div>
                <div className={"row"}>
                  <span>
                    Current Offer: {state?.nft?.offerPrice} -{" "}
                    {state?.nft?.quoteCurrency}
                  </span>
                </div>
                {state?.nft?.number && state?.nft?.totalQuantity && (
                  <div className={"rowr"}>
                    <span>
                      {state?.nft?.number} / {state?.nft?.totalQuantity}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/*Side container should be split into another component*/}
        <div className={"col  text-center"}>
          <div className={"mt-5 attribute-holder"}>
            <div className={"row "}>
              <h6 className={"mt-2"}>Attributes</h6>
            </div>
            <div className={"row"}>
              <span>
                {state?.nft?.name} - #{state?.nft?.number}
              </span>
            </div>
            <div className={"row"}>
              <span>Created: {state?.nft?.createdAt}</span>
            </div>
            <div className={"row"}>
              <span>Description: {state?.nft?.description}</span>
            </div>
            <div className={"row pb-2"}>
              <span>
                Royalty Rate Fee: {state?.nft?.royaltyFeeRate} - Seller Fee:{" "}
                {state?.nft?.totalSellerFeeRate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTPage;
