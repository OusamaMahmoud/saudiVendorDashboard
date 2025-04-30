import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaBox, FaLanguage, FaMoneyBillWave, FaWarehouse, FaSave } from "react-icons/fa";
import ReactQuillEditor from "./ReactQuillEditor";
import ProductCategorySelector from "./ProductCategorySelector";
import apiClient from "../../../utils/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Schema definition
const productFormSchema = z.object({
    productNameArabic: z.string().min(1, { message: "اسم المنتج مطلوب" }),
    productNameEnglish: z.string().min(1, { message: "Product name is required" }),
    price: z.string().min(1, { message: "السعر مطلوب" }),
    priceWithSale: z.string().min(1, { message: "السعر مطلوب" }),
    quantity: z.string().min(1, { message: "الكمية مطلوبة" }),
    sku: z.string().min(1, { message: "الكمية مطلوبة" }),
});

type ProductFormData = z.infer<typeof productFormSchema>;
type ProductDescription = {
    productDescriptionArabic: string;
    productDescriptionEnglish: string;
};

const ProductForm: React.FC = () => {
    const navigate = useNavigate();
    const methods = useForm<ProductFormData>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            productNameArabic: "",
            productNameEnglish: "",
            price: "",
            priceWithSale: "",
            quantity: "",
            sku: "",
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = methods;

    const [productDescription, setProductDescription] = useState<ProductDescription>({
        productDescriptionArabic: "",
        productDescriptionEnglish: "",
    });

    const [isProductDescAr, setIsProductDescAr] = useState(false);
    const ProductDescArRef = useRef<{ focus: () => void }>(null);
    const [isProductDescEn, setIsProductDescEn] = useState(false);
    const ProductDescEnRef = useRef<{ focus: () => void }>(null);

    useEffect(() => {
        if (productDescription.productDescriptionArabic !== "<p><br></p>" && productDescription.productDescriptionArabic !== "") {
            setIsProductDescAr(true);
        } else {
            setIsProductDescAr(false);
        }

        if (productDescription.productDescriptionEnglish !== "<p><br></p>" && productDescription.productDescriptionEnglish !== "") {
            setIsProductDescEn(true);
        } else {
            setIsProductDescEn(false);
        }
    }, [productDescription, productDescription.productDescriptionArabic, productDescription.productDescriptionEnglish]);

    const [selectedCategories, setSelectedCategories] = useState<{ value: string; label: string }[]>([]);
    const [isSelectedCategories, setIsSelectedCategories] = useState(false);
    const selectedCategoriesRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        if (selectedCategories.length > 0) {
            setIsSelectedCategories(true);
        } else {
            setIsSelectedCategories(false);
        }
    }, [selectedCategories]);

    const [showOnStore, setShowOnStore] = useState(true);

    useEffect(() => {
        console.log("Debug selectedCategories =>", selectedCategories);
    }, [selectedCategories]);

    const onSubmit = async (data: ProductFormData) => {
        if (isProductDescAr === false) {
            ProductDescArRef.current?.focus();
            return;
        }
        if (isProductDescEn === false) {
            ProductDescEnRef.current?.focus();
            return;
        }
        if (isSelectedCategories === false) {
            selectedCategoriesRef.current?.focus();
            return;
        }

        console.log("=>=>", data);
        const formData = new FormData();

        formData.append("name[ar]", data.productNameArabic);
        formData.append("name[en]", data.productNameEnglish);
        formData.append("description[ar]", productDescription.productDescriptionArabic);
        formData.append("description[en]", productDescription.productDescriptionEnglish);
        formData.append("price", data.price);
        formData.append("price_after_discount", data.priceWithSale);
        formData.append("quantity", data.quantity);
        formData.append("seller_sku", data.sku);
        formData.append("published", showOnStore ? "1" : "0");
        formData.append("stock_amount", data.quantity);
        formData.append("brand_id", "1"); // Assuming brand_id is static for now
        if (selectedCategories.length > 0) {
            selectedCategories.forEach((category, idx) => {
                formData.append(`categories[${idx}]`, category.value);
            });
        }

        try {
            const response = await apiClient.post("/api/dashboard/products/storeBaseInformation", formData);
            toast.success("Product saved successfully!");
            console.log("is This THe Id =>", response.data);
            navigate("/products/complete-product", {
                state: { productId: response.data.data.productId },
            });
            reset(); // Reset the form after successful submission
        } catch (error) {
            console.error("Error saving product:", error);
            toast.error("Error saving product");
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">بيانات المنتج الأساسية</h2>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Product Name Fields */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col">
                            <label
                                htmlFor="productNameArabic"
                                className="mb-2 font-medium text-gray-700"
                            >
                                اسم المنتج بالعربية
                            </label>
                            <div className="relative">
                                <FaLanguage className="pointer-events-none absolute inset-y-0 right-0 my-auto mr-3 text-gray-500" />
                                <input
                                    {...register("productNameArabic")}
                                    id="productNameArabic"
                                    type="text"
                                    placeholder="اسم المنتج بالعربية"
                                    className="input input-bordered w-full bg-white pr-10"
                                />
                            </div>
                            {errors.productNameArabic && <p className="mt-1 text-sm text-red-600">{errors.productNameArabic.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="productNameEnglish"
                                className="mb-2 font-medium text-gray-700"
                            >
                                اسم المنتج بالانجليزية
                            </label>
                            <div className="relative">
                                <FaLanguage className="pointer-events-none absolute inset-y-0 right-0 my-auto mr-3 text-gray-500" />
                                <input
                                    {...register("productNameEnglish")}
                                    id="productNameEnglish"
                                    type="text"
                                    placeholder="Product name in English"
                                    className="input input-bordered w-full bg-white pr-10"
                                />
                            </div>
                            {errors.productNameEnglish && <p className="mt-1 text-sm text-red-600">{errors.productNameEnglish.message}</p>}
                        </div>
                    </div>

                    {/* Price Fields */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col">
                            <label
                                htmlFor="price"
                                className="mb-2 font-medium text-gray-700"
                            >
                                سعر المنتج
                            </label>
                            <div className="relative">
                                <FaMoneyBillWave className="pointer-events-none absolute inset-y-0 right-0 my-auto mr-3 text-gray-500" />
                                <input
                                    {...register("price")}
                                    id="price"
                                    type="number"
                                    className="appearance:textfield] input input-bordered w-full bg-white pr-10 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                            </div>
                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="priceWithSale"
                                className="mb-2 font-medium text-gray-700"
                            >
                                سعر المنتج بالخصم
                            </label>
                            <div className="relative">
                                <FaMoneyBillWave className="pointer-events-none absolute inset-y-0 right-0 my-auto mr-3 text-gray-500" />
                                <input
                                    {...register("priceWithSale")}
                                    id="priceWithSale"
                                    type="number"
                                    className="input input-bordered w-full bg-white pr-10 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                            </div>
                            {errors.priceWithSale && <p className="mt-1 text-sm text-red-600">{errors.priceWithSale.message}</p>}
                        </div>
                    </div>

                    {/* Quantity and SKU */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col">
                            <label
                                htmlFor="quantity"
                                className="mb-2 font-medium text-gray-700"
                            >
                                الكمية
                            </label>
                            <div className="relative">
                                <FaWarehouse className="pointer-events-none absolute inset-y-0 right-0 my-auto mr-3 text-gray-500" />
                                <input
                                    {...register("quantity")}
                                    id="quantity"
                                    type="number"
                                    className="input input-bordered w-full bg-white pr-10 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                            </div>
                            {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="sku"
                                className="mb-2 font-medium text-gray-700"
                            >
                                SKU
                            </label>
                            <div className="relative">
                                <FaBox className="pointer-events-none absolute inset-y-0 right-0 my-auto mr-3 text-gray-500" />
                                <input
                                    {...register("sku")}
                                    id="sku"
                                    type="text"
                                    className="appearance:textfield] input input-bordered w-full bg-white pr-10 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                />
                            </div>
                            {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku.message}</p>}
                        </div>
                    </div>

                    {/* Show on Store Toggle */}
                    <div className="form-control w-52">
                        <label className="label cursor-pointer">
                            <span className="label-text">Show On Store</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={showOnStore}
                                onChange={(e) => setShowOnStore(e.target.checked)}
                            />
                        </label>
                    </div>

                    {/* Rich Text Editors */}
                    <div className="mb-52">
                        <h1 className="mb-2">Product Description [Ar]</h1>
                        <ReactQuillEditor
                            ref={ProductDescArRef}
                            onChange={(val) => setProductDescription((prev) => ({ ...prev, productDescriptionArabic: val }))}
                        />
                        {!isProductDescAr && <p className="mt-1 text-sm text-red-600">وصف المنتج مطلوب</p>}
                    </div>

                    <div className="mb-2">
                        <h1 className="mb-2">Product Description [En]</h1>
                        <ReactQuillEditor
                            ref={ProductDescEnRef}
                            onChange={(val) => setProductDescription((prev) => ({ ...prev, productDescriptionEnglish: val }))}
                        />
                        {!isProductDescEn && <p className="mt-1 text-sm text-red-600">وصف المنتج مطلوب</p>}
                    </div>

                    <ProductCategorySelector
                        ref={selectedCategoriesRef}
                        onSelectTargetCategories={(selected) => setSelectedCategories(selected)}
                    />
                    {!isSelectedCategories && <p className="mt-1 text-sm text-red-600">فئة المنتج مطلوبة</p>}
                    {/* Submit Button */}
                    <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <FaSave />
                            {isSubmitting ? "جاري الحفظ..." : "حفظ المنتج"}
                        </button>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
};

export default ProductForm;
