import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CompleteProductForm = () => {
    const location = useLocation();
    const [targetId, setTargetId] = useState("");

    useEffect(() => {
        console.log(location.state.productId);
        setTargetId(location.state.productId);
    }, [location]);

    return <div>CompleteProductForm</div>;
};

export default CompleteProductForm;
