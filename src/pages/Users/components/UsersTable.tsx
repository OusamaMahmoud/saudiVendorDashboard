import { useTranslation } from "react-i18next";
import { Order } from "../../../hooks/orders/useFetchOrders";
import { useNavigate } from "react-router-dom";
import { User } from "../../../hooks/users/useFetchUsers";
import Modal from "../../../models/Modal";
import { showModal } from "../../../models/showModel";
import useDeleteUser from "../../../hooks/users/useDeleteUser";
import { useState } from "react";
import { closeModal } from "../../../models/closeModal";
import LoadingModal from "../../../models/LoadingModal";
import { showToast } from "../../../utils/showToast";
import handlingErrorOnStatusCode from "../../../utils/handlingErrorOnStatusCode";

const UsersTable = ({ data: users }: { data: User[] }) => {
    const { t } = useTranslation();

    const tableHeaders = [
        t("users:table_headers.username"),
        t("users:table_headers.email"),
        t("users:table_headers.phone"),
        t("users:table_headers.action"),
    ];
    const [userId, setUserId] = useState("");
    const { mutateAsync, isPending } = useDeleteUser();
    const handleDeleteUser = () => {
        mutateAsync({ targetId: userId });
        closeModal("deletion_user");
    };
    return (
        <>
            {isPending && <LoadingModal />}
            <Modal
                meta={{ Cancel: "Cancel", confirm: "i'm Sure", label: "You will Delete This User, Are You sure?" }}
                modal_id="deletion_user"
                onConfirm={handleDeleteUser}
            />
            <div className="overflow-x-auto">
                <table className="table border">
                    {/* head */}
                    <thead className="border">
                        <tr className="border border-b-slate-200 text-lg">
                            {tableHeaders.map((head, idx) => (
                                <th key={idx}>{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="cursor-pointer transition-all duration-300 hover:bg-slate-300"
                            >
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.image}
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            setUserId(user.id);
                                            showModal("deletion_user");
                                        }}
                                        className="btn btn-sm bg-main-color text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UsersTable;
