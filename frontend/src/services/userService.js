import { api, requestConfig } from "../utils/config";

// Get user details
const profile = async (data, token) => {
    const config = requestConfig("GET", data, token);

    try {
        const res = await fetch(api + "/users/profile", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

// Update user details
const updateProfile = async (data, token) => {
    const config = requestConfig("PUT", data, token, true);

    try {
        const res = await fetch(api + "/users", config);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(
                errorData.errors?.[0] || `HTTP error! status: ${res.status}`
            );
        }

        const json = await res.json();
        return json;
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        return {
            errors: [
                error.message ||
                    "Erro ao atualizar perfil. Por favor, tente novamente.",
            ],
        };
    }
};

const userService = {
    profile,
    updateProfile,
};

export default userService;
