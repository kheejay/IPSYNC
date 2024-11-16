const apiKey = "d11b2cdd9d822a2b364c4f6dc9651364";

const uploadPhoto = async (image) => {
    const formData = new FormData();

    formData.append("key", apiKey);
    formData.append("image", image);

    try {
        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData
        })

        const result = await response.json();

        if(result.success) {
            return ('url', result.data.url)
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

export default uploadPhoto