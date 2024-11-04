const url = `https://api.cloudinary.com/v1_1/dukgmjr5e/auto/upload`;

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'chat-app-file');

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    }).then(response => response.json());

    return response;
}

export { uploadFile }