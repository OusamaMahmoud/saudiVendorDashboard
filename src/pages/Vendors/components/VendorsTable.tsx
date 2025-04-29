import { useTranslation } from "react-i18next";
import Modal from "../../../models/Modal";
import { useState } from "react";
import { closeModal } from "../../../models/closeModal";
import LoadingModal from "../../../models/LoadingModal";
import { Vendor } from "../../../hooks/vendors/useFetchVendors";
import { showModal } from "../../../models/showModel";
import useChangeVendorStatus from "../../../hooks/vendors/useChangeVendorStatus";

const VendorsTable = ({ data: vendors }: { data: Vendor[] }) => {
    const { t } = useTranslation();
    const { mutateAsync, isPending } = useChangeVendorStatus();

    const [vendorId, setVendorId] = useState("");
    const [status, setStatus] = useState("");
    const [blockStatuses, setBlockStatuses] = useState<{ [key: string]: boolean }>(
        vendors.reduce((acc, vendor) => ({ ...acc, [vendor.id]: vendor.approved == "0" }), {}),
    );

    const handleChangeStatus = () => {
        mutateAsync({ vendorId, currentStatus: status });
        closeModal("change_status");
    };

    const handleChangeBlockStatus = () => {
        mutateAsync({ vendorId, blockStatus: blockStatuses[vendorId] ? 0 : 1 });
        closeModal("change_block_status");
    };

    const toggleBlock = (id: string) => {
        setVendorId(id);
        setBlockStatuses((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
        showModal("change_block_status");
    };

    return (
        <>
            {isPending && <LoadingModal />}
            <Modal
                meta={{ Cancel: "Cancel", confirm: "I'm Sure", label: "You Will Change This Vendor Status. Are You Sure?" }}
                modal_id="change_status"
                onConfirm={handleChangeStatus}
            />
            <Modal
                meta={{ Cancel: "Cancel", confirm: "I'm Sure", label: "You Will Change This Vendor's Block Status. Are You Sure?" }}
                modal_id="change_block_status"
                onConfirm={handleChangeBlockStatus}
            />
            <div className="overflow-x-auto">
                <table className="table border">
                    <thead className="border">
                        <tr className="border border-b-slate-200 text-lg">
                            <th>{t("vendors:table_headers.username")}</th>
                            <th>{t("vendors:table_headers.email")}</th>
                            <th>{t("vendors:table_headers.phone")}</th>
                            <th>{t("vendors:table_headers.action")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map((vendor) => (
                            <tr
                                key={vendor.id}
                                className="cursor-pointer transition-all duration-300 hover:bg-slate-300"
                            >
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={vendor.image}
                                                    alt="Avatar"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{vendor.first_name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{vendor.email}</td>
                                <td>{vendor.phone}</td>
                                <td className="flex items-center gap-6">
                                    <select
                                        onChange={(e) => {
                                            setStatus(e.target.value);
                                            setVendorId(vendor.id);
                                            showModal("change_status");
                                        }}
                                        className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-all duration-200 hover:border-main-color focus:border-main-color focus:ring focus:ring-green-300"
                                    >
                                        <option
                                            selected={vendor.status === "approved"}
                                            value="approved"
                                        >
                                            ✅ Approved
                                        </option>
                                        <option
                                            selected={vendor.status === "rejected"}
                                            value="rejected"
                                        >
                                            ❌ Rejected
                                        </option>
                                        <option
                                            selected={vendor.status === "pending"}
                                            value="pending"
                                        >
                                            ⏳ Pending
                                        </option>
                                    </select>

                                    {/* Toggle Switch */}
                                    <label className="flex cursor-pointer items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={!blockStatuses[vendor.id]}
                                            onChange={() => toggleBlock(vendor.id)}
                                            className="toggle toggle-success"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            {blockStatuses[vendor.id] ? "Blocked ❌" : "Unblocked ✅"}
                                        </span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default VendorsTable;
