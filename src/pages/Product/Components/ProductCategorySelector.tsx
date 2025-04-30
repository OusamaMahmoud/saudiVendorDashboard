import { forwardRef, useMemo } from "react";
import useFetchProductCategories from "../hooks/useFetchProductCategories";
import ReactSelector from "./ReactSelector";

const ProductCategorySelector = forwardRef(
    (
        {
            onSelectTargetCategories,
        }: {
            onSelectTargetCategories: (selectTargetCategories: { value: string; label: string }[]) => void;
        },
        ref,
    ) => {
        const { data } = useFetchProductCategories();

        const options = useMemo(() => {
            if (!data) return [];
            return data.map((category: { id: string; path: string }) => ({
                value: category.id,
                label: category.path,
            }));
        }, [data]);
        return (
            <div>
                <h1 className="mb-2 font-serif text-lg">Select Product Categories</h1>
                <ReactSelector
                    ref={ref}
                    options={options}
                    onSelectCategories={(selectedCategories) => onSelectTargetCategories(selectedCategories)}
                />
            </div>
        );
    },
);

export default ProductCategorySelector;
