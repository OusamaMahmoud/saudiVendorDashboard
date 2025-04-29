import CustomPagination, { Meta, Pagination } from "../../../components/shared/Pagination";
import { Vendor } from "../../../hooks/vendors/useFetchVendors";

const VendorsPagination = ({
    vendors,
    setCurrentPage,
}: {
    vendors: {
        data: Vendor[];
        links: Pagination;
        meta: Meta;
    };
    setCurrentPage: (page: string) => void;
}) => {
    function getPageNumber(url: string) {
        const urlObj = new URL(url); // Parse the URL
        return urlObj.searchParams.get("page"); // Get the value of the 'page' query parameter
    }
    return (
        <div className="mt-8">
            {vendors?.meta && (
                <CustomPagination
                    links={vendors?.links!}
                    meta={vendors?.meta!}
                    handleGetFirstPage={() => {
                        const result = getPageNumber(vendors?.links?.first!);
                        console.log("firstPage=>", result);
                        if (result) setCurrentPage(result);
                    }}
                    handleGetLastPage={() => {
                        const result = getPageNumber(vendors?.links?.last!);
                        if (result) setCurrentPage(result);
                    }}
                    handleGetNextPage={() => {
                        const result = getPageNumber(vendors?.links?.next!);
                        if (result) setCurrentPage(result);
                    }}
                    handleGetPrevPage={() => {
                        const result = getPageNumber(vendors?.links?.prev!);
                        if (result) setCurrentPage(result);
                    }}
                />
            )}
        </div>
    );
};

export default VendorsPagination;
