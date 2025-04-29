import { useEffect, useState } from "react";
import Skeleton from "../../components/shared/Skeleton";
import { showToast } from "../../utils/showToast";
import handlingErrorOnStatusCode from "../../utils/handlingErrorOnStatusCode";
import useFetchVendors from "../../hooks/vendors/useFetchVendors";
import VendorsPagination from "./components/VendorsPagination";
import VendorsTable from "./components/VendorsTable";
import VendorsStatusFilter from "./components/VendorsStatusFilter";
import TopHeader from "../../components/reuse/TopHeader";
import SearchInput from "../../components/shared/SearchInput";

const Vendors = () => {
    const [currentPage, setCurrentPage] = useState<string>("1");
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setCurrentPage("1");
    }, [searchTerm]);

    const {
        data: vendors,
        isPending: isFetchOrdersLoading,
        isError,
        error,
    } = useFetchVendors({ pageNum: currentPage, orderStatus: selectedStatus, search: searchTerm });

    if (isError) {
        return showToast(handlingErrorOnStatusCode(error), "error");
    }
    return (
        <div>
            <TopHeader title="Vendors" />
            <div className="my-4 max-w-sm">
                <SearchInput onSearch={(q) => setSearchTerm(q)} />
            </div>
            <VendorsStatusFilter
                vendors={vendors!}
                onSelectedStatus={(selectedStatus) => setSelectedStatus(selectedStatus)}
                selectedStatus={selectedStatus}
            />
            {isFetchOrdersLoading ? <Skeleton /> : <VendorsTable data={vendors?.data || []} />}
            <VendorsPagination
                vendors={vendors!}
                setCurrentPage={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default Vendors;
