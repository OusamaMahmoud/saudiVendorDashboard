import { useTranslation } from "react-i18next";
import { SaudiCategory } from "../../../hooks/categories/useFetchCategories";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, Trash2Icon } from "lucide-react";
import useDeleteCategory from "../../../hooks/categories/useDeleteCategory";
import LoadingModal from "../../../models/LoadingModal";

interface CategoryItemProps {
    category: SaudiCategory;
    level?: number;
    actionKeword: string;
    parentId: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, level = 0, actionKeword, parentId }) => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setTimeout(
            () =>
                navigate("/add-sub-category", {
                    state: { category_id: category?.id, parent_id: parentId, name: category?.name?.en, action: actionKeword, category: category },
                }),
            0,
        );
    };
    const { mutateAsync, isPending } = useDeleteCategory();
    const handleDeleteCategory = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        mutateAsync({ targetId: category.id });
    };

    return (
        <>
            {isPending && <LoadingModal />}

            <div
                style={{ marginLeft: level * 20 }}
                onClick={handleClick}
                data-tip="hello"
                className="my-2 h-fit cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 hover:bg-[#2d855f75]"
            >
                <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
                    <div className="flex flex-col items-center gap-3 sm:flex-row">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                    src={category.image}
                                    alt="Avatar Tailwind CSS Component"
                                />
                            </div>
                        </div>
                        <div className="text-sm font-bold sm:text-lg">{category.name[i18n.language as "ar" | "en"]}</div>
                    </div>
                    <div
                        className="relative flex h-10 w-10 items-center justify-center rounded-full border p-1 transition-all duration-300 hover:bg-red-600"
                        onClick={handleDeleteCategory}
                    >
                        <Trash2Icon className="absolute h-5 w-5" />
                    </div>
                </div>
                {category?.childs && category?.childs?.length > 0 && (
                    <div className="border-l-[3px] border-l-[#2d855f75] pl-4">
                        {category?.childs?.map((child) => (
                            <CategoryItem
                                key={child.id}
                                category={child}
                                level={level + 1}
                                actionKeword={actionKeword}
                                parentId={child.parent_id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
export default CategoryItem;
