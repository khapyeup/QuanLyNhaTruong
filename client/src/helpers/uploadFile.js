import { toast } from "react-toastify";

const url = `https://api.cloudinary.com/v1_1/dukgmjr5e/auto/upload`;

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "chat-app-file");

  const id = toast.loading("Đang up ảnh");

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (!response.ok)
      toast.update(id, {render: "Up ảnh thất bại", type: "error", isLoading: false, autoClose: 5000})
    else
      toast.update(id, {render: "Up ảnh thành công", type: "success", isLoading: false, autoClose: 5000})
    return response.json()
  });

  
    // const response = await toast.promise(
    //   fetch(url, {
    //     method: "POST",
    //     body: formData,
    //   }),
    //   {
    //     pending: "Đang tải ảnh",
    //     success: "Tải ảnh thành công 👌",
    //     error: "Có lỗi khi tải ảnh 🤯",
    //   }
    // );

    return response;
};

export { uploadFile };
