import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@radix-ui/themes";

interface Props {
  title: string;
  onChange: (value: any) => void;
  defaultValue: string;
  values: { value: string; name: string }[];
}

export default function Select({
  title,
  onChange,
  defaultValue,
  values,
}: Props) {
  return (
    <SelectRoot onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger placeholder={title} />
      <SelectContent>
        <SelectGroup>
          {values.map((value) => {
            return (
              <SelectItem key={value.name} value={value.value}>
                {value.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
}
