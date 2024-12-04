import { Link } from "react-router-dom";

export default function PaymentList() {
    return <>
    <p>PaymentList</p>
    <Link to={"/admin/payments/assigntostudent"}>Gán học phí</Link>
    </>
}