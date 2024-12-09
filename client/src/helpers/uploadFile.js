import { toast } from "react-toastify";

const url = `https://api.cloudinary.com/v1_1/dukgmjr5e/auto/upload`;

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "chat-app-file");

  //   const response = await fetch(url, {
  //     method: "POST",
  //     body: formData,
  //   }).then((response) => response.json());
  const response = await toast.promise(
    await fetch(url, {
      method: "POST",
      body: formData,
    }),
    {
      pending: "Đang tải ảnh",
      success: "Tải ảnh thành công 👌",
      error: "Có lỗi khi tải ảnh 🤯",
    }
  );

  return response.json();
};

export { uploadFile };
