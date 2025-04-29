import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useAddSubCategory from "../../../hooks/categories/useAddSubCategory";
import { SaudiCategory } from "../../../hooks/categories/useFetchCategories";

const addCategorySchema = z.object({
    name: z.object({
        en: z.string().nonempty({ message: "English name is required" }),
        ar: z.string().nonempty({ message: "Arabic name is required" }),
    }),
    image: z
        .any()
        .optional()
        .refine((files) => files instanceof FileList && files.length > 0, { message: "Image file is required" }),
});
const updateCategorySchema = addCategorySchema.partial();

const AddSubCategory = () => {
    const location = useLocation();
    const [category, setCategory] = useState<SaudiCategory>({} as SaudiCategory);
    const [categoryId, setCategoryId] = useState("");
    const [parentId, setParentId] = useState("");
    const [categoryLabel, setCategoryLabel] = useState("");
    const [action, setAction] = useState("");

    useEffect(() => {
        setCategory(location.state.category);
        setCategoryId(location.state.category_id);
        setParentId(location.state.parent_id);
        setCategoryLabel(location.state.name);
        setAction(location.state.action);
    }, [location]);

    const selectedSchema = action === "/categories/add" ? addCategorySchema : updateCategorySchema;

    type SelectedFormData = z.infer<typeof selectedSchema>;
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
        control,
    } = useForm<SelectedFormData>({
        resolver: zodResolver(selectedSchema),
    });

    const { mutateAsync, isPending, error, isError } = useAddSubCategory();

    const onSubmit = (data: SelectedFormData) => {
        console.log("Submitted Category:", data);
        // Access the first file from the FileList
        const imageFile = data.image[0];
        // Process the image file and other form data (e.g., call an API)
        console.log(categoryId);

        const formData = new FormData();
        if (data.name?.en && data.name?.ar) {
            formData.append("name[en]", data.name.en);
            formData.append("name[ar]", data.name.ar);
            formData.append("image", imageFile);
        }

        if (action === "/categories/add") formData.append("parent_id", categoryId);

        if (action === "/categories/update") {
            formData.append("_method", "put");
            formData.append("parent_id", parentId);
        }

        action === "/categories/update" ? mutateAsync({ formData, categoryId }) : mutateAsync({ formData });

        isSubmitSuccessful && reset();
    };
    const [imagePreview, setImagePreview] = useState<null | string>(null);
    useEffect(() => {
        if (action === "/categories/update") {
            reset({
                name: {
                    ar: category?.name?.ar,
                    en: category?.name?.en,
                },
            });
            setImagePreview(category.image);
        }
    }, [action, category]);

    return (
        <div className="p-4">
            <p className="mb-8 rounded-xl p-2 text-center text-xl font-bold shadow-md">{categoryLabel}</p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-center"
            >
                <div className="grid max-w-[1400px] grid-cols-1 gap-8 md:grid-cols-2">
                    {/* English Name */}
                    <div>
                        <label
                            className="mb-1 text-sm font-medium"
                            htmlFor="name-en"
                        >
                            Name (English)
                        </label>
                        <input
                            id="name-en"
                            type="text"
                            placeholder="Enter English name"
                            className="input input-bordered w-full"
                            {...register("name.en")}
                        />
                        {errors.name?.en && <p className="mt-1 text-xs text-red-500">{errors.name.en.message}</p>}
                    </div>
                    {/* Arabic Name */}
                    <div>
                        <label
                            className="mb-1 text-sm font-medium"
                            htmlFor="name-ar"
                        >
                            Name (Arabic)
                        </label>
                        <input
                            id="name-ar"
                            type="text"
                            placeholder="Enter Arabic name"
                            className="input input-bordered w-full"
                            {...register("name.ar")}
                        />
                        {errors.name?.ar && <p className="mt-1 text-xs text-red-500">{errors.name.ar.message}</p>}
                    </div>
                    {/* Image File Input */}
                    <div>
                        <label
                            className="mb-1 block text-sm font-medium"
                            htmlFor="image"
                        >
                            Image File
                        </label>
                        <Controller
                            name="image"
                            control={control}
                            defaultValue={null}
                            rules={{
                                validate: (files) => !files || (files instanceof FileList && files.length > 0) || "Image file is required",
                            }}
                            render={({ field: { onChange, onBlur, ref } }) => (
                                <>
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const files = e.target.files;
                                            onChange(files);
                                            if (files && files.length > 0) {
                                                setImagePreview(URL.createObjectURL(files[0]));
                                            } else {
                                                setImagePreview(null);
                                            }
                                        }}
                                        onBlur={onBlur}
                                        ref={ref}
                                        className="file-input file-input-bordered"
                                    />
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Image Preview"
                                            className="mt-2 h-32 w-auto rounded-xl object-cover"
                                        />
                                    )}
                                </>
                            )}
                        />
                        {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image.message?.toString()}</p>}
                    </div>
                </div>
                {/* Submit Button */}
                <div className="flex w-full items-center justify-center">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="btn mt-8 w-fit border-[#006638] bg-[#006638] px-10 text-white hover:bg-[#00522E]"
                    >
                        {isPending ? "Submitting..." : action === "/categories/update" ? "Update Category" : "Add Category"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSubCategory;
