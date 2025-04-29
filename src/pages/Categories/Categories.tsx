import { useLocation, useParams } from "react-router-dom";
import Skeleton from "../../components/shared/Skeleton";
import useFetchCategories from "../../hooks/categories/useFetchCategories";
import handlingErrorOnStatusCode from "../../utils/handlingErrorOnStatusCode";
import { showToast } from "../../utils/showToast";
import CategoryItem from "./components/CategoryItem";
import { useEffect } from "react";

const Categories = () => {
    const { data: categories, isPending: isFetchCategoriesLoading, isError, error } = useFetchCategories();
    if (isError) {
        return showToast(handlingErrorOnStatusCode(error), "error");
    }
    const location = useLocation();

    useEffect(() => {
        console.log("dop=>", location.pathname);
    }, [location]);
    return (
        <>
            {isFetchCategoriesLoading ? (
                <Skeleton />
            ) : (
                <div>
                    <h1 className="mb-8 w-fit rounded-xl p-4 text-xl font-bold shadow-xl">
                        {location.pathname === "/categories/add" ? "Add" : "Update"} Category
                    </h1>
                    <div className="grid grid-cols-1 gap-10 rounded-xl border p-4 xl:grid-cols-2 2xl:grid-cols-3">
                        {categories?.map((category) => (
                            <CategoryItem
                                key={category?.id}
                                category={category}
                                actionKeword={location.pathname}
                                parentId={category.id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Categories;
