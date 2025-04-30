import { forwardRef, useImperativeHandle, useRef } from "react";
import Select from "react-select";

const ReactSelector = forwardRef(
    (
        {
            options,
            onSelectCategories,
        }: {
            options: { value: string; label: string }[];
            onSelectCategories: (selectedCategory: { value: string; label: string }[]) => void;
        },
        ref,
    ) => {
        const handleChange = (selectedOption: any) => {
            console.log("Selected:", selectedOption);
            onSelectCategories(selectedOption);
        };
        const selectRef = useRef<any>(null);

        useImperativeHandle(ref, () => ({
            focus: () => {
                selectRef.current?.focus();
                selectRef.current.scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to it smoothly
            },
        }));

        return (
            <Select
                ref={selectRef}
                options={options}
                onChange={handleChange}
                isMulti
            />
        );
    },
);

export default ReactSelector;
