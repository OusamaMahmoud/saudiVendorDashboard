import { useState, useCallback } from "react";
import { debounce } from "lodash";

const SearchInput = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Debounced function using Lodash
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            onSearch(query);
        }, 500), // 500ms delay
        [onSearch],
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    return (
        <div className="mx-auto w-full max-w-md">
            <label className="input input-bordered flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleChange}
                    className="grow"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 opacity-70"
                >
                    <circle
                        cx="11"
                        cy="11"
                        r="8"
                    />
                    <path d="m21 21-4.3-4.3" />
                </svg>
            </label>
        </div>
    );
};

export default SearchInput;
