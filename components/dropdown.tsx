import { Select } from "@radix-ui/themes";
import React from "react";

interface Props {
  radius: "DESKTOP" | "MOBILE";
  setFilterPeriod: (item: string) => void;
  data: any[];
}

const Dropdown = ({ radius, setFilterPeriod, data }: Props) => {
  const handleChange = (selectedValue: string) => {
    setFilterPeriod(selectedValue);
  };
  return (
    <Select.Root
      defaultValue="7 days"
      onValueChange={(item) => handleChange(item)}
    >
      <Select.Trigger radius={radius === "DESKTOP" ? "large" : "full"} />
      <Select.Content>
        {data.map((item) => (
          <Select.Item
            className="text-[#71717A] "
            key={item.value}
            value={item?.value}
          >
            {item.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default Dropdown;
