import { Link } from "react-router-dom";

const NftListCard = ({ nft }) => {
  return (
    <Link
      className={"text-center text-decoration-none text-black"}
      to={`/nfts/${nft?.id}`}
      state={{ nft: nft }}
    >
      <div className={"card my-4 text-center"}>
        <div className={"relative"}>
          <img
            alt={nft?.issuer}
            className={"img-fluid"}
            src={nft?.imageUrl || null}
          />
        </div>
        <h5 className={"card-text"}>{nft?.collection}</h5>
        <p className={"card=text"}>Issuer: {nft?.issuer}</p>
        <p className={"card=text"}>Currency: {nft?.quoteCurrency}</p>
        <p className={"card=text"}>Next Minimum Bid: {nft?.minNextBid}</p>
        <p className={"card=text"}>Issuer: {nft?.issuer}</p>
        <div>
          <span></span>
        </div>
      </div>
    </Link>
  );
};

export default NftListCard;
