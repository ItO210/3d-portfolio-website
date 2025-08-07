import { useState } from "react";
import { BsTranslate } from "react-icons/bs";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export default function LanguageSelector({ selected, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative text-2xl "
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`pointer-events-auto p-4  backdrop-blur-xs ${open ? "bg-neutral-800 rounded-t-xl" : "bg-neutral-800/40 rounded-xl"}  cursor-pointer hover:bg-neutral-800`}
      >
        <BsTranslate size={30} />
      </button>

      {open && (
        <div className="text-center w-full pointer-events-auto flex items-center justify-center  px-4 pb-4 bg-neutral-800  rounded-b-xl z-10">
          <ul className="">
            {LANGUAGES.map(({ code, label }) => (
              <li key={code}>
                <button
                  onClick={() => {
                    onChange(code);
                    setOpen(false);
                  }}
                  className={`hover:text-red-500 ${
                    selected === code ? "text-neutral-200 " : "text-neutral-400"
                  }`}
                >
                  {code}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
