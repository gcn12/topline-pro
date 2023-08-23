import { useQuery } from "@tanstack/react-query";
import ImagePreview, { Image } from "./ImagePreview";
import { useRouter } from "next/router";

export default function ImageGallery() {
  const router = useRouter();
  const search = router.query.search;
  const sort = router.query.sort;

  const { data } = useQuery(
    ["images", search, sort],
    () => fetchImages({ searchParam: search, sort }),
    { enabled: !!search }
  );

  return (
    <div>
      <div className="grid gap-14px [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] px-48px justify-center">
        {data?.hits.map((imageObj) => {
          return (
            <div key={imageObj.id}>
              <ImagePreview imageObj={imageObj} />
            </div>
          );
        })}
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
