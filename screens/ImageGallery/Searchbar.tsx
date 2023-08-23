import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import Select from "@/components/Select";
import Spacer from "@/components/Spacer";

type Inputs = {
  search: string;
};

export default function Searchbar() {
  const { register, handleSubmit } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.push({
      query: { ...router.query, search: data.search },
    });
  };

  const setSortBy = (type: "popular" | "newest") => {
    router.push({
      query: { ...router.query, sort: type },
    });
  };

  return (
    <div
      className="bg-[#ffffff] max-w-[500px] py-32px mx-auto flex justify-center rounded-8px 
        shadow-sm [border:1px_solid_#e3dada] px-30px flex-col"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <label className="visually-hidden" htmlFor="search-box">
          search for images
        </label>
        <div className="flex w-full">
          <input
            className="h-40px w-full px-8px text-20px bg-[#f8f8f8] [border:1px_solid_rgba(0,0,0,.2)] rounded-l-4px [border-right:none]"
            id="search-box"
            autoComplete="off"
            {...register("search")}
          />
          <button className="bg-black text-white h-40px px-16px rounded-r-4px">
            search
          </button>
        </div>
      </form>
      <Spacer size={20} axis="y" />
      <div className="max-w-[100px]">
        <Select
          defaultValue={"popular"}
          title="sort:"
          onChange={setSortBy}
          values={sortValues}
        />
      </div>
    </div>
  );
}

const sortValues = [
  { name: "Popular", value: "popular" },
  { name: "Newest", value: "newest" },
];
