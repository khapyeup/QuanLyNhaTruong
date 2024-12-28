import Loading from "../../component/Loading";
import {
  useDeleteGroupActivityMutation,
  useEditGroupActivityMutation,
  useGetGroupActivityQuery,
} from "../../../redux/activityRelated/activityApiSlice";
import { AiOutlineDelete, AiFillEdit, AiTwotoneAppstore } from "react-icons/ai";
import { useState } from "react";
import AddGroupActivityModal from "./AddGroupActivityModal";
import { toast } from "react-toastify";

function ShowGroupActivity() {
  const [isEdit, setIsEdit] = useState(null);
  const [valueEdit, setValueEdit] = useState("");
  const [openAddGroupActivity, setOpenAddGroupActivity] = useState(false);

  const {
    data: groupActivityList = [],
    isLoading,
    isError,
  } = useGetGroupActivityQuery();
  const [updateGroupActivity, { isLoading: isUpdating }] =
    useEditGroupActivityMutation();
  const [deleteGroupActivity] = useDeleteGroupActivityMutation();

  function handleSaveEdit() {
    updateGroupActivity({ id: isEdit._id, group_activity: valueEdit })
      .unwrap()
      .then((res) => toast.success(res.message))
      .finally(() => setIsEdit(null));
  }

  function handleDelete(id) {
    deleteGroupActivity(id)
      .unwrap()
      .then((res) => toast.success(res.message));
  }

  if (isLoading) {
    return <Loading size={12} />;
  } else if (isError) {
    return <div>Lỗi</div>;
  }
  return (
    <>
      <div>
        <h1>Nhóm hoạt động ({groupActivityList.length})</h1>
        <button onClick={() => setOpenAddGroupActivity(true)}>
          Thêm nhóm hoạt động
        </button>
        <table className="table-auto text-center ">
          <thead>
            <tr>
              <th>Tên nhóm hoạt động</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {groupActivityList.map((groupActivity) => (
              <tr key={groupActivity._id}>
                <td>
                  {isEdit === groupActivity ? (
                    <input
                      onChange={(e) => setValueEdit(e.target.value)}
                      className="border border-gray-400 p-2"
                      value={valueEdit}
                    />
                  ) : (
                    groupActivity.group_activity
                  )}
                </td>
                <td>
                  {isEdit === groupActivity ? (
                    <div>
                      <button
                        disabled={isUpdating}
                        onClick={handleSaveEdit}
                        className="p-2 rounded-lg bg-green-400 hover:bg-green-500 mr-2"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={() => setIsEdit(null)}
                        className="p-2 rounded-lg bg-green-400 hover:bg-green-500"
                      >
                        Hủy
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => {
                          setIsEdit(groupActivity);
                          setValueEdit(groupActivity.group_activity);
                        }}
                        className="p-2 rounded-lg bg-green-400 hover:bg-green-500 mr-2"
                      >
                        <AiFillEdit className="inline" />
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(groupActivity._id)}
                        className="p-2 rounded-lg bg-green-400 hover:bg-green-500"
                      >
                        <AiOutlineDelete className="inline" /> Xóa
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openAddGroupActivity && (
        <AddGroupActivityModal onClose={() => setOpenAddGroupActivity(false)} />
      )}
    </>
  );
}

export default ShowGroupActivity;
