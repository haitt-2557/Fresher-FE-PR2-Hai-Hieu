import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import "./styles.scss";
const PaymentBreadcrumb = ({ title }) => {
    let history = useHistory();
    const location = useLocation();
    const { t } = useTranslation();
    return (
        <div className="payment__breadcrumb">
            <span className=" payment__breadcrumb--active" onClick={() => history.push("/cart")}>
                {t("payments.breadcrumb.Cart")}
            </span>
            <FiChevronRight />
            <span
                className={` ${location.pathname === "/payment" ? "payment__breadcrumb--active" : ""}`}
                onClick={() => history.push("/payment")}
            >
                {t("payments.breadcrumb.Payment")}
            </span>
            <FiChevronRight />
            <span
                className={` ${location.pathname === "/shipping" || location.pathname === "/payment"
                    ? "payment__breadcrumb--active"
                    : ""
                    }`}
                onClick={() => history.push("/shipping")}
            >
                {t("payments.breadcrumb.Shipping")}
            </span>

        </div>
    );
};

export default PaymentBreadcrumb;
