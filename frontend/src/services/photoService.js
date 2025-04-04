import { api, requestConfig } from "../utils/config";

// Publish an user photo
const publishPhoto = async (data, token) => {
    const config = requestConfig("POST", data, token, true);

    try {
        const res = await fetch(api + "/photos", config);

        const json = await res.json();

        if (!res.ok) {
            return { errors: json.errors || ["Erro ao publicar foto"] };
        }

        return json;
    } catch (error) {
        console.log(error);
        return { errors: ["Erro ao publicar foto"] };
    }
};

// Get user photos
const getUserPhotos = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + `/photos/user/${id}`, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};
const photoService = {
    publishPhoto,
    getUserPhotos,
};

export default photoService;
