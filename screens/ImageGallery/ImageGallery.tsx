import { useQuery } from "@tanstack/react-query";
import ImagePreview, { Image } from "./ImagePreview";
import Searchbar from "./Searchbar";
import { useRouter } from "next/router";

export default function ImageGallery() {
  const router = useRouter();
  const search = router.query.search;

  const { data } = useQuery(
    ["images", search],
    () => fetchImages({ searchParam: search }),
    { enabled: !!search }
  );

  return (
    <div>
      <Searchbar />
      {data?.hits.map((imageObj) => {
        return (
          <div key={imageObj.id}>
            <ImagePreview imageObj={imageObj} />
          </div>
        );
      })}
    </div>
  );
}

const fetchImages = async ({
  searchParam,
}: {
  searchParam: string | string[] | undefined;
}): Promise<ImagesRes> => {
  if (typeof searchParam !== "string") {
    throw new Error("invalid param");
  }

  const URL =
    "https://pixabay.com/api/?key=" +
    process.env.NEXT_PUBLIC_PIXABAY_KEY +
    "&q=" +
    encodeURIComponent(searchParam);
  const res = await fetch(URL);
  return await res.json();
};

type ImagesRes = {
  total: number;
  totalHits: number;
  hits: Image[];
};
