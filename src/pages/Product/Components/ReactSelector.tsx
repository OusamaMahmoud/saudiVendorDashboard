import Select from "react-select";

const ReactSelector = ({
    options,
    onSelectCategories,
}: {
    options: { value: string; label: string }[];
    onSelectCategories: (selectedCategory: { value: string; label: string }[]) => void;
}) => {
    const handleChange = (selectedOption: any) => {
        console.log("Selected:", selectedOption);
        onSelectCategories(selectedOption);
    };

    return (
        <Select
            options={options}
            onChange={handleChange}
            isMulti
        />
    );
};

export default ReactSelector;
