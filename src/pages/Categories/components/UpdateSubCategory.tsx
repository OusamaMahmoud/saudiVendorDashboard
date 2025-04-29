import React from "react";
import Skeleton from "../../../components/shared/Skeleton";
import useFetchCategories from "../../../hooks/categories/useFetchCategories";
import handlingErrorOnStatusCode from "../../../utils/handlingErrorOnStatusCode";
import { showToast } from "../../../utils/showToast";
import CategoryItem from "./CategoryItem";

const UpdateSubCategory = () => {
    const { data: categories, isPending: isFetchCategoriesLoading, isError, error } = useFetchCategories();
    if (isError) {
        return showToast(handlingErrorOnStatusCode(error), "error");
    }
    return (
        <>
            {isFetchCategoriesLoading ? (
                <Skeleton />
            ) : (
                <div>
                    <h1 className="mb-8 w-fit rounded-xl p-4 text-xl font-bold shadow-xl">Add Category</h1>
                    <div className="grid grid-cols-1 gap-10 rounded-xl border p-4 lg:grid-cols-2 2xl:grid-cols-3">
                        {categories?.map((category) => (
                            <CategoryItem
                                key={category?.id}
                                category={category}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateSubCategory;
