import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiUpload, FiX, FiCheck, FiImage } from "react-icons/fi";

// TypeScript interfaces
interface ProductFormInputs {
    thumbnailImage: FileList;
    productImages: FileList;
}

interface ImagePreview {
    url: string;
    file: File;
}

const ProductImageForm = () => {
    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ProductFormInputs>();

    // State for image previews
    const [thumbnailPreview, setThumbnailPreview] = useState<ImagePreview | null>(null);
    const [productPreviews, setProductPreviews] = useState<ImagePreview[]>([]);
    const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");

    // Handle thumbnail change
    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setThumbnailPreview({
                url: URL.createObjectURL(file),
                file,
            });
        }
    };

    // Handle product images change
    const handleProductImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newPreviews: ImagePreview[] = [];
            Array.from(files).forEach((file) => {
                newPreviews.push({
                    url: URL.createObjectURL(file),
                    file,
                });
            });
            setProductPreviews(newPreviews);
        }
    };

    // Remove thumbnail preview
    const removeThumbnailPreview = () => {
        if (thumbnailPreview) {
            URL.revokeObjectURL(thumbnailPreview.url);
            setThumbnailPreview(null);
        }
    };

    // Remove product image preview
    const removeProductPreview = (index: number) => {
        const preview = productPreviews[index];
        URL.revokeObjectURL(preview.url);

        const updatedPreviews = [...productPreviews];
        updatedPreviews.splice(index, 1);
        setProductPreviews(updatedPreviews);
    };

    // Form submission handler
    const onSubmit: SubmitHandler<ProductFormInputs> = async (data) => {
        try {
            // Create FormData to send to API
            const formData = new FormData();

            if (data.thumbnailImage && data.thumbnailImage.length > 0) {
                formData.append("thumbnailImage", data.thumbnailImage[0]);
            }

            if (data.productImages && data.productImages.length > 0) {
                Array.from(data.productImages).forEach((file, index) => {
                    formData.append(`productImages[${index}]`, file);
                });
            }

            // API call - Replace URL with your actual API endpoint
            const response = await fetch("https://your-api-endpoint.com/upload-images", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload images");
            }

            // Handle success
            setSubmissionStatus("success");
            setTimeout(() => {
                reset();
                removeThumbnailPreview();
                productPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
                setProductPreviews([]);
                setSubmissionStatus("idle");
            }, 3000);
        } catch (error) {
            console.error("Error uploading images:", error);
            setSubmissionStatus("error");
            setTimeout(() => setSubmissionStatus("idle"), 3000);
        }
    };

    return (
        <div className="mx-auto w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold">Product Image Upload</h2>

            {submissionStatus === "success" && (
                <div className="alert alert-success mb-6 flex items-center">
                    <FiCheck className="mr-2 h-6 w-6" />
                    <span>Images uploaded successfully!</span>
                </div>
            )}

            {submissionStatus === "error" && (
                <div className="alert alert-error mb-6 flex items-center">
                    <FiX className="mr-2 h-6 w-6" />
                    <span>Failed to upload images. Please try again.</span>
                </div>
            )}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
            >
                {/* Thumbnail Image Upload */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg font-medium">Thumbnail Image</span>
                        <span className="label-text-alt text-error">{errors.thumbnailImage?.message}</span>
                    </label>

                    <div className="mt-2">
                        {!thumbnailPreview ? (
                            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                                <input
                                    type="file"
                                    id="thumbnailImage"
                                    accept="image/*"
                                    className="hidden"
                                    {...register("thumbnailImage", {
                                        required: "Thumbnail image is required",
                                        onChange: handleThumbnailChange,
                                    })}
                                />
                                <label
                                    htmlFor="thumbnailImage"
                                    className="btn btn-outline cursor-pointer gap-2"
                                >
                                    <FiUpload className="h-5 w-5" />
                                    <span>Upload Thumbnail</span>
                                </label>
                                <p className="mt-2 text-sm text-gray-500">Click to select a thumbnail image</p>
                            </div>
                        ) : (
                            <div className="relative h-48 w-48 overflow-hidden rounded-lg border">
                                <img
                                    src={thumbnailPreview.url}
                                    alt="Thumbnail preview"
                                    className="h-full w-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={removeThumbnailPreview}
                                    className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                >
                                    <FiX className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Images Upload */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg font-medium">Product Images</span>
                        <span className="label-text-alt text-error">{errors.productImages?.message}</span>
                    </label>

                    <div className="mt-2">
                        <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                            <input
                                type="file"
                                id="productImages"
                                accept="image/*"
                                multiple
                                className="hidden"
                                {...register("productImages", {
                                    required: "Product images are required",
                                    onChange: handleProductImagesChange,
                                })}
                            />
                            <label
                                htmlFor="productImages"
                                className="btn btn-outline cursor-pointer gap-2"
                            >
                                <FiImage className="h-5 w-5" />
                                <span>Upload Product Images</span>
                            </label>
                            <p className="mt-2 text-sm text-gray-500">Click to select multiple product images</p>
                        </div>

                        {productPreviews.length > 0 && (
                            <div className="mt-4">
                                <h3 className="mb-2 font-medium">Selected Images ({productPreviews.length})</h3>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                    {productPreviews.map((preview, index) => (
                                        <div
                                            key={index}
                                            className="relative h-24 w-24 overflow-hidden rounded-lg border"
                                        >
                                            <img
                                                src={preview.url}
                                                alt={`Product preview ${index + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeProductPreview(index)}
                                                className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                            >
                                                <FiX className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Uploading...
                            </>
                        ) : (
                            <>
                                <FiUpload className="mr-1 h-5 w-5" />
                                Upload Images
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductImageForm;
