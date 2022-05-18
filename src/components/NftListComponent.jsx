import { useMediaQuery } from "react-responsive";
import NftListCard from "./NftListCard";

const NftListComponent = ({ nfts }) => {
  const isMobile = useMediaQuery({
    query: `(max-width: 920px)`,
  });

  return (
    <div className={"col col-rows-5"}>
      <ul className={isMobile ? "row row-cols-2 my-3" : "row row-cols-5 my-3"}>
        {nfts &&
          nfts.map((nft, index) => {
            return (
              <li key={nft?.id}>
                <NftListCard nft={nft} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default NftListComponent;
