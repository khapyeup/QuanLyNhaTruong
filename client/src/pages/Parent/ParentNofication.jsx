import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { useGetPaymentNofiticationQuery } from "../../redux/paymentRelated/paymentApiSlice";
import { HiOutlineBell } from "react-icons/hi2";
import { useSelector } from "react-redux";
import Loading from "../component/Loading";

export default function ParentNofication() {
    const { currentUser } = useSelector(state => state.user);
    const { data, isLoading, isError } = useGetPaymentNofiticationQuery(currentUser._id)
    

    return (
        <Menu>
            <MenuHandler>
                <button>
                    {!isLoading && !isError && data.length > 0 && <div className="relative"><span className="animate-ping size-2 bg-red-500 h-3 w-3 absolute rounded-full"></span>
                        <span className="size-2 bg-red-500 h-3 w-3 absolute rounded-full"></span>        
                    </div>}
                    

                    <HiOutlineBell className="size-6" />
                </button>
            </MenuHandler>
            <MenuList>
                <p className="font-bold text-xl mb-2">Nhắc nhở</p>
                {isLoading ? <Loading /> : isError ? <p>Có lỗi khi lấy dữ liệu.</p> : data.length > 0 ? data.map((nofitication, idx) => <MenuItem className=" py-4" key={idx}>{nofitication}</MenuItem>) : <p>Không có thông báo</p>}
            </MenuList>
        </Menu>
    );
}