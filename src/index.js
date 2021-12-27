// Dependencies
const { create } = require("axios").default;
const FormData = require("form-data");

// Constants
const { BASE_URL, ACCOUNT_ENDPOINT, UPLOAD_ENDPOINT, FILE_ENDPOINT,
    DOMAINS_ENDPOINT, SIZE_ENDPOINT } = require("../constants/endpoints.json");

// Config
const axiosConfig = create({ baseURL: BASE_URL });
const { get, post, delete: del, patch } = axiosConfig;

class Client {
    constructor(apiKey) {
        if (typeof apiKey !== "string") return new TypeError(`[Client] Expected API key, got ${typeof apiKey}`);

        this._apiKey = apiKey;

        axiosConfig.defaults.headers.common["Authorization"] = this._apiKey;
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
     * [Account Token Only] Gets all domains registered by user
     * @returns {DomainsResponse}
     */
    async getDomains() {
        const result = await get(DOMAINS_ENDPOINT).catch(error => error.response);
        return result.data;
    }

    /**
     * Gets total uploaded file size of user
     * @returns {SizeResponse}
     */
    async getSize() {
        const result = await get(SIZE_ENDPOINT).catch(error => error.response);
        return result.data;
    }

    /**
     * @param {Buffer} buffer A valid buffer representing a file
     * @param {Object} options An object with optional settings
     * @param {String} domain The domain the image should be uploaded to
     * @param {Object} [options] Optional options to use while uploading the file
     * @param {String} [options.filename = Date.now()] The filename to upload the file under
     * @param {String} [options.extension = png] The extension of the file
     * @returns {UploadFileResponse}
     */
    async uploadFile(buffer, domain, options) {
        if (!Buffer.isBuffer(buffer)) return new TypeError(`[uploadFile] Expected Buffer, got ${typeof buffer}`);
        if (!domain || typeof domain !== "string") return new TypeError(`[uploadFile] Expected 'domain' to be a string, got ${typeof buffer}`);
        if (options && typeof options !== "object") return new TypeError(`[uploadFile] Expected 'options' to be an object, got ${typeof options}`);

        const formData = new FormData()
        formData.append("file", buffer, `${options?.filename || Date.now()}.${options?.extension || "png"}`);

        const uploadResponse = await post(UPLOAD_ENDPOINT, formData, {
            params: { random_name: options?.filename ? false : true },
            headers: { ...formData.getHeaders(), domain },
        }).catch(error => error.response);

        return uploadResponse.data;
    }

    /**
     * @param {String} id The unique ID of the file you want to update
     * @param {Object} fileInfo The new file information
     * @param {String} [fileInfo.name] Updated name of the file
     * @param {String} [fileInfo.extension] Updated extension of the file
     * @returns {UpdateFileResponse}
     */
    async updateFile(id, fileInfo) {
        if (!id || typeof id !== "string") return new TypeError(`[updateFile] Expected 'id' to be a string, got ${typeof id}`);
        if (!fileInfo || typeof fileInfo !== "object") return new TypeError(`[updateFile] Expected 'fileInfo' to be an object, got ${typeof options}`);
        if (fileInfo.name && typeof fileInfo.name !== "string") return new TypeError(`[updateFile] Expected 'fileInfo.name' to be a string, got ${typeof buffer}`);
        if (fileInfo.extension && typeof fileInfo.extension !== "string") return new TypeError(`[updateFile] Expected 'fileInfo.extension' to be a string, got ${typeof buffer}`);

        const uploadResponse = await patch(`${FILE_ENDPOINT}/${id}`, fileInfo).catch(error => error.response);
        return uploadResponse.data;
    }

    /**
     * @param {String} id The unique ID of the file you want to delete
     * @returns {DeleteFileResponse}
     */
    async deleteFile(id) {
        if (!id || typeof id !== "string") return new TypeError(`[deleteFile] Expected 'id' to be a string, got ${typeof id}`);

        const uploadResponse = await del(`${FILE_ENDPOINT}/${id}`).catch(error => error.response);
        return uploadResponse.data;
    }
}

module.exports = { Client };