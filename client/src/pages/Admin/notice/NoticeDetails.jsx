import { useParams } from "react-router-dom";
import { useGetNoticeDetailsQuery } from "../../../redux/noticeRelated/noticeApiSlice";
import { format } from "date-fns";
import Loading from "../../component/Loading";

function NoticeDetails() {
  const { id } = useParams();

  const { data: noticeDetails, isLoading } = useGetNoticeDetailsQuery(id);

  return (
    <>
      {isLoading ? (
        <Loading size={12} />
      ) : (
        <div className="flex flex-col gap-2 p-6">
          <p className="text-2xl font-bold">
            Thông báo - <span>{format(noticeDetails.date, "dd/MM/yyyy")}</span>
          </p>
          <h2 className="font-bold">Tiêu đề</h2>
          <p className="px-2 py-4 bg-gray-200 rounded-lg">
            {noticeDetails.title}
          </p>
          <h2 className="font-bold">Nội dung</h2>
          <p className="px-2 py-4 bg-gray-200 rounded-lg">
            {noticeDetails.content}
          </p>
        </div>
      )}
    </>
  );
}

export default NoticeDetails;
