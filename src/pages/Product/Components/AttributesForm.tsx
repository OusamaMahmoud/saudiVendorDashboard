import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import { FiPlus, FiTrash2, FiSave, FiLoader } from "react-icons/fi";

// Define types for our form
interface KeyValuePair {
    key: {
        en: string;
        ar: string;
    };
    value: {
        en: string;
        ar: string;
    };
}

interface FormData {
    attributes: KeyValuePair[];
}

const AttributesForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    // Initialize form with React Hook Form
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            attributes: [{ key: { en: "", ar: "" }, value: { en: "", ar: "" } }],
        },
    });

    // Use field array to handle the dynamic fields
    const { fields, append, remove } = useFieldArray({
        control,
        name: "attributes",
    });

    // Form submission handler
    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            // Send data to API using Axios
            const response = await axios.post("https://your-api-endpoint.com/attributes", data.attributes);

            console.log("API Response:", response.data);
            setSubmitStatus("success");

            // Optional: Reset form after successful submission
            // reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="mx-auto w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg"
            dir="rtl"
        >
            <h2 className="mb-6 text-center text-2xl font-bold">إضافة الخصائص</h2>

            {submitStatus === "success" && <div className="alert alert-success mb-6">تم إرسال البيانات بنجاح!</div>}

            {submitStatus === "error" && <div className="alert alert-error mb-6">حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.</div>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="rounded-lg border bg-gray-50 p-4"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold">خاصية #{index + 1}</h3>
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="btn btn-error btn-sm"
                                    >
                                        <FiTrash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Key Section */}
                                <div className="space-y-4">
                                    <h4 className="font-medium">المفتاح (Key)</h4>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">القيمة (عربي)</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="القيمة باللغة العربية"
                                            className={`input input-bordered w-full ${errors.attributes?.[index]?.key?.ar ? "input-error" : ""}`}
                                            {...register(`attributes.${index}.key.ar`, { required: "هذا الحقل مطلوب" })}
                                            dir="rtl"
                                        />
                                        {errors.attributes?.[index]?.key?.ar && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.attributes?.[index]?.key?.ar?.message}</span>
                                            </label>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">القيمة (إنجليزي)</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="القيمة باللغة الإنجليزية"
                                            className={`input input-bordered w-full ${errors.attributes?.[index]?.key?.en ? "input-error" : ""}`}
                                            {...register(`attributes.${index}.key.en`, { required: "هذا الحقل مطلوب" })}
                                            dir="ltr"
                                        />
                                        {errors.attributes?.[index]?.key?.en && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.attributes?.[index]?.key?.en?.message}</span>
                                            </label>
                                        )}
                                    </div>
                                </div>

                                {/* Value Section */}
                                <div className="space-y-4">
                                    <h4 className="font-medium">التفاصيل (Value)</h4>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">التفاصيل (عربي)</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="التفاصيل باللغة العربية"
                                            className={`input input-bordered w-full ${errors.attributes?.[index]?.value?.ar ? "input-error" : ""}`}
                                            {...register(`attributes.${index}.value.ar`, { required: "هذا الحقل مطلوب" })}
                                            dir="rtl"
                                        />
                                        {errors.attributes?.[index]?.value?.ar && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.attributes?.[index]?.value?.ar?.message}</span>
                                            </label>
                                        )}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">التفاصيل (إنجليزي)</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="التفاصيل باللغة الإنجليزية"
                                            className={`input input-bordered w-full ${errors.attributes?.[index]?.value?.en ? "input-error" : ""}`}
                                            {...register(`attributes.${index}.value.en`, { required: "هذا الحقل مطلوب" })}
                                            dir="ltr"
                                        />
                                        {errors.attributes?.[index]?.value?.en && (
                                            <label className="label">
                                                <span className="label-text-alt text-error">{errors.attributes?.[index]?.value?.en?.message}</span>
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={() => append({ key: { en: "", ar: "" }, value: { en: "", ar: "" } })}
                            className="btn btn-outline btn-primary"
                        >
                            <FiPlus className="mr-1 h-5 w-5" />
                            إضافة خاصية جديدة
                        </button>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                جاري الإرسال...
                            </>
                        ) : (
                            <>
                                <FiSave className="mr-2 h-5 w-5" />
                                حفظ الخصائص
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AttributesForm;
