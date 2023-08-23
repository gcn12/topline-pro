import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

type Inputs = {
  search: string;
};

export default function Searchbar() {
  const { register, handleSubmit } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.replace({
      query: { ...router.query, search: data.search },
    });
  };
  return (
    <div className="bg-grey-900 max-w-[400px] py-32px mx-auto flex justify-center rounded-8px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="visually-hidden" htmlFor="search-box">
          search for images
        </label>
        <div className="flex w-full">
          <input
            className="h-40px w-full"
            id="search-box"
            autoComplete="off"
            {...register("search")}
          />
          <button className="bg-black text-white h-40px px-16px">search</button>
        </div>
      </form>
    </div>
  );
}
