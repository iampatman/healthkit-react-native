export default class CommonDataManager {

    static myInstance = null;

    _userID = "";


    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (this.myInstance == null) {
            this.myInstance = new CommonDataManager();
        }

        return this.myInstance;
    }

    getUserID() {
        return this._userID;
    }

    setUserID(id) {
        this._userID = id;
    }
}
