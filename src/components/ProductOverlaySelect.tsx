import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface ProductSelectProps {
  value: string;
  onChange: (val: string) => void;
}

export default function ProductSelect({ value, onChange }: ProductSelectProps) {
  const [open, setOpen] = useState<boolean>(false);

  const items = [
    { value: "tshirt", label: "T-shirt" },
    { value: "longsleeve", label: "Longsleeve" },
    { value: "hoodie", label: "Hoodie" },
    { value: "sweatshirt", label: "Sweatshirt" },
  ];

  return (
    <div className="relative w-52">
      {/* Selected box */}
      <div className="border p-2 rounded cursor-pointer bg-white flex justify-between items-center" onClick={() => setOpen(!open)}>
        {items.find((i) => i.value === value)?.label}

        <MdKeyboardArrowDown />
      </div>

      {/* Dropdown menu */}
      {open && (
        <ul className="absolute mt-1 w-full border rounded bg-white shadow-lg z-20">
          {items.map((item) => (
            <li
              key={item.value}
              onClick={() => {
                onChange(item.value);
                setOpen(false);
              }}
              className="p-2 hover:bg-green-600 hover:text-white cursor-pointer"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
