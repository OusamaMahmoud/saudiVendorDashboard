import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. Dynamic fields configuration
const fieldsConfig = ["name", "price", "size", "material"];

// 2. Zod Schema
const variationSchema = z.object(
    fieldsConfig.reduce(
        (acc, field) => {
            acc[field] = z.union([z.string().min(1, `${field} is required`), z.number()]);
            return acc;
        },
        {} as Record<string, any>,
    ),
);

const productFormSchema = z.object({
    variations: z.array(variationSchema),
});

// 3. Types
type ProductFormType = z.infer<typeof productFormSchema>;

export default function RepetedForm() {
    // 4. React Hook Form setup
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormType>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            variations: [{}],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variations",
    });

    // 5. Submit handler
    const onSubmit = (data: ProductFormType) => {
        console.log("Form Data:", data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-2xl space-y-6 p-6"
        >
            <h2 className="mb-4 text-2xl font-bold">Product Variations</h2>

            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="relative space-y-4 rounded-md border p-4 shadow-md"
                >
                    {fieldsConfig.map((fieldName) => (
                        <div key={fieldName}>
                            <input
                                {...register(`variations.${index}.${fieldName}`)}
                                placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                                className="input input-bordered w-full"
                            />
                            {errors.variations?.[index]?.[fieldName] && (
                                <p className="mt-1 text-sm text-red-500">{errors.variations[index]?.[fieldName]?.message as string}</p>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => remove(index)}
                        className="btn btn-error right-2 top-2 mt-4"
                    >
                        Remove
                    </button>
                </div>
            ))}

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={() => append({})}
                    className="btn btn-primary"
                >
                    Add Variation
                </button>

                <button
                    type="submit"
                    className="btn btn-success"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
