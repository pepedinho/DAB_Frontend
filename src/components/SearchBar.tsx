import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";


interface SearchBarProps {
  onChange: (s: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({onChange}) => {
    const [search, setSearch] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (s: string) => {
        setSearch(s);
        onChange(s);
    }

    return (
        <div className="self-start bg-[#313338] flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
            <div className={`
            relative group
            bg-[#1e1f22] 
            rounded-md
            transition-all duration-200
            ${isFocused ? 'shadow-[0_0_0_1px_rgb(148,147,153)]' : 'hover:shadow-[0_0_0_1px_rgb(78,77,83)]'}
            `}>
            <button 
                onClick={() => search && handleChange('')}
                className="absolute top-1/2 -translate-y-1/2 text-[#949399] transition-all duration-200 hover:text-[#dbdee1]"
            >
                <div className="relative w-5 h-5">
                <FontAwesomeIcon
                    icon={faMagnifyingGlass} 
                    className={`absolute transition-all duration-200 w-[15px] h-[20px] ${
                    search ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                    }`}
                />
                <FontAwesomeIcon
                    icon={faXmark} 
                    className={`absolute transition-all duration-200 w-[20px] h-[20px] ${
                    search ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                    }`}
                />
                </div>
            </button>
            <input
                type="text"
                value={search}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => e.key === "Escape" && handleChange('')}
                placeholder="Search"
                className="
                w-full
                bg-transparent
                text-[#dbdee1]
                placeholder-[#949399]
                py-[10px]
                pl-10
                pr-4
                outline-none
                rounded-md
                "
            />
            </div>
        </div>
        </div>
  );
}
  
export default SearchBar
  
  