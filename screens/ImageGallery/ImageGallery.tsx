import { useQuery } from "@tanstack/react-query";
import ImagePreview, { Image } from "./ImagePreview";
import { useRouter } from "next/router";

export default function ImageGallery() {
  const router = useRouter();
  const search = router.query.search;
  const sort = router.query.sort;
  const display = router.query.display;

  const { data, isLoading } = useQuery(
    ["images", search, sort],
    () => fetchImages({ searchParam: search, sort }),
    { enabled: !!search }
  );

  const filteredData = data?.hits.filter((hit) => {
    if (display === "all" || display === undefined) {
      return true;
    }
    return localStorage.getItem(String(hit.id)) === "true";
  });

  return (
    <div>
      <div className="grid gap-x-14px gap-y-36px [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] px-48px justify-center">
        {filteredData?.map((imageObj) => {
          return (
            <div key={imageObj.id}>
              <ImagePreview imageObj={imageObj} />
            </div>
          );
        })}
        {!isLoading && filteredData === undefined ? (
          <p>No results found. Try a new search or adjust the search filters</p>
        ) : null}
      </div>
    </div>
  );
}

const fetchImages = async ({
  searchParam,
  sort,
}: {
  searchParam: string | string[] | undefined;
  sort: string | string[] | undefined;
}): Promise<ImagesRes> => {
  if (typeof searchParam !== "string") {
    throw new Error("invalid param");
  }

  let order = "popular";

  if (typeof sort === "string" && sort === "newest") {
    order = "newest";
  }

  const URL =
    "https://pixabay.com/api/?key=" +
    process.env.NEXT_PUBLIC_PIXABAY_KEY +
    "&q=" +
    encodeURIComponent(searchParam) +
    "&order=" +
    order;
  const res = await fetch(URL);
  return await res.json();
};

type ImagesRes = {
  total: number;
  totalHits: number;
  hits: Image[];
};
