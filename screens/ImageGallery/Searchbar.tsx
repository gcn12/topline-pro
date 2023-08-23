import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";

type Inputs = {
  search: string;
};

export default function Searchbar() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.replace({
      query: { ...router.query, search: data.search },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input autoComplete="off" {...register("search")} />
        <button>search</button>
      </form>
    </div>
  );
}
