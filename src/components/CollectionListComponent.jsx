import CollectionListCard from "./CollectionListCard";
import { useMediaQuery } from "react-responsive";

const CollectionListComponent = ({ collections }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  return (
    <div className={"col col-rows-5"}>
      <ul className={isMobile ? "row row-cols-2 my-3" : "row row-cols-5 my-3"}>
        {collections &&
          collections.map((collection, index) => {
            return (
              <li
                key={collection?.first_nft?.id + collection?.issuer?.createdAt}
              >
                <CollectionListCard collection={collection} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CollectionListComponent;
