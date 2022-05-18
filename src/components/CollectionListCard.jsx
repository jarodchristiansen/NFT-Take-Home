import { Link } from "react-router-dom";

const CollectionListCard = ({ collection }) => {
  return (
    <Link
      className={"text-center text-decoration-none text-black"}
      to={`collections/${collection?.collectionDict?.displayName}`}
      state={{ collection: collection }}
    >
      <div className={"card my-4"}>
        <div className={"relative"}>
          <img
            className={"img-fluid"}
            src={collection?.first_nft.imageUrl || null}
          />
        </div>
        <h5 className={"card-text my-2"}>
          {collection?.collectionDict?.displayName}
        </h5>
        <span className={"card-text my-2"}>
          Number of NFTs: {collection?.total}
        </span>
        <span className={"card-text my-2"}>
          Issuer: {collection?.issuer?.issuer}
        </span>
        <span className={"card-text my-2"}>
          Mint Currency: {collection?.issuer?.mintSource}
        </span>
      </div>
    </Link>
  );
};

export default CollectionListCard;
