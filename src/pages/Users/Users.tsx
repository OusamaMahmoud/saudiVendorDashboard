import { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";
import OrdersPagination from "../Orders/components/OrdersPagination";
import UsersPagination from "./components/UsersPagination";
import Skeleton from "../../components/shared/Skeleton";
import OrdersTable from "../Orders/components/OrdersTable";
import UsersTable from "./components/UsersTable";
import { showToast } from "../../utils/showToast";
import handlingErrorOnStatusCode from "../../utils/handlingErrorOnStatusCode";
import useFetchUsers from "../../hooks/users/useFetchUsers";
import TopHeader from "../../components/reuse/TopHeader";
import SearchInput from "../../components/shared/SearchInput";

const Users = () => {
    const [currentPage, setCurrentPage] = useState<string>("1");
    const [searchTerm, setSearchTerm] = useState("");

    const { data: users, isPending: isFetchOrdersLoading, isError, error } = useFetchUsers({ pageNum: currentPage, search: searchTerm });

    useEffect(() => {
        setCurrentPage("1");
    }, [searchTerm]);

    if (isError) {
        return showToast(handlingErrorOnStatusCode(error), "error");
    }
    return (
        <div>
            <TopHeader title="Users" />
            <div className="my-4 max-w-sm">
                <SearchInput onSearch={(q) => setSearchTerm(q)} />
            </div>
            {isFetchOrdersLoading ? <Skeleton /> : <UsersTable data={users?.data || []} />}
            <UsersPagination
                orders={users!}
                setCurrentPage={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default Users;
