import { useQuery } from "@tanstack/react-query";
import ImagePreview, { Image } from "./ImagePreview";
import { useRouter } from "next/router";

export default function ImageGallery() {
  const router = useRouter();
  const { query } = router;
  const search = query.search;
  const sort = query.sort;
  const display = query.display;

  const { data, isLoading } = useQuery(["images", search, sort], () =>
    fetchImages({ searchParam: search, sort })
  );

  const filteredData = data?.filter((item) => {
    if (display === "all" || display === undefined) {
      return true;
    }
    return localStorage.getItem(String(item.id)) === "true";
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
      </div>
      <div className="flex justify-center w-full">
        {!isLoading &&
        (filteredData === undefined || filteredData.length === 0) ? (
          <p className="text-center mx-auto">
            No results found. Try a new search or adjust the search filters.
          </p>
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
}): Promise<Image[]> => {
  if (typeof searchParam !== "string" && typeof searchParam !== "undefined") {
    return [];
  }

  let order = "popular";

  if (typeof sort === "string" && sort === "newest") {
    order = "newest";
  }

  if (searchParam === undefined) {
    searchParam = "images";
  }

  const URL =
    "https://pixabay.com/api/?key=" +
    process.env.NEXT_PUBLIC_PIXABAY_KEY +
    "&q=" +
    encodeURIComponent(searchParam) +
    "&order=" +
    order;

  const res = await fetch(URL);
  const data = await res.json();

  return data.hits;
};
