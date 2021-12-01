// Dependencies
const { create } = require("axios").default;
const FormData = require("form-data");

// Constants
const { BASE_URL, ACCOUNT_ENDPOINT, UPLOAD_ENDPOINT, DELETE_ENDPOINT,
    GET_UPLOAD_ENDPOINT } = require("../constants/endpoints.json");

// Config
const axiosConfig = create({
    baseURL: BASE_URL,
});
const { get, post, delete: del } = axiosConfig;

class Client {
    constructor(apiKey) {
        if (apiKey) {
            this._apiKey = apiKey;

            axiosConfig.defaults.headers.common["Authorization"] = this._apiKey;
        }
    }

    /**
     * Gets account details of user
     * @returns {AccountDetails}
     */
    async getAccountInfo() {
        const result = await get(ACCOUNT_ENDPOINT).catch(error => error.response);
        return result.data;
    }

    /**
     * @param {Buffer} buffer A valid buffer representing a file
     * @param {Object} options An object with optional settings
     * @param {String} domain The domain the image should be uploaded to
     * @param {String} options.filename The filename to upload the file under
     * @param {String} options.extension The extension of the file
     * @returns {UploadFileResponse}
     */
    async uploadFile(buffer, domain, options) {
        if (!Buffer.isBuffer(buffer)) return new TypeError(`[uploadFile] Expected Buffer, got ${typeof buffer}`);
        if (!domain || typeof domain !== "string") return new TypeError(`[uploadFile] Expected 'domain' to be a string, got ${typeof buffer}`);
        if (options && typeof options !== "object") return new TypeError(`[uploadFile] Expected 'options' to be an object, got ${typeof options}`);

        // TODO: Upload file under supplied name in options
        const formData = new FormData()
        formData.append("file", buffer, `${options.filename}.${options.extension}`);

        const uploadResponse = await post(UPLOAD_ENDPOINT, formData, {
            data: formData,
            headers: { ...formData.getHeaders(), domain },
        }).catch(error => error.response);

        return uploadResponse.data;
    }

    /**
     * @param {String} id The unique ID of the file you want to delete
     * @returns {DeleteFileResponse}
     */
    async deleteFile(id) {
        if (!id || typeof id !== "string") return new TypeError(`[deleteFile] Expected 'id' to be a string, got ${typeof id}`);

        const uploadResponse = await del(`${DELETE_ENDPOINT}/${id}`).catch(error => error.response);
        return uploadResponse.data;
    }

    /**
     * @param {String} id The unique ID of the file you want to retrieve
     * @returns {GetFileResponse}
     */
    async getFile(id) {
        if (!id || typeof id !== "string") return new TypeError(`[getFile] Expected 'id' to be a string, got ${typeof id}`);

        const uploadResponse = await get(`${GET_UPLOAD_ENDPOINT}/${id}`).catch(error => error.response);
        return uploadResponse.data;
    }
}

module.exports = { Client };