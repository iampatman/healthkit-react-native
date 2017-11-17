import AppleHealthKit from 'rn-apple-healthkit'


export default class HealthKitManager {


    reloadData = null

    setReloadCallback(callback) {
        this.reloadData = callback
    }

    _data = {
        loaded: false,
        available: false,
        age: 0,
        sex: 'unknown',
        dob: '',
        height: '',
        weight: '',
        bloodType: '',
        stepCount: 0
    }

    static myInstance = null;

    static getInstance() {
        if (this.myInstance == null) {
            this.myInstance = new HealthKitManager();
        }

        return this.myInstance;
    }

    _handleHealthkitError(err, str) {

    }

    constructor() {

        AppleHealthKit.isAvailable((err, available) => {
            this._data.available = available
            if (err) {
                console.log("error initializing Healthkit: ", err);
                return;
            }
            let options = {
                permissions: {
                    read: ["Height", "Weight", "StepCount", "DateOfBirth", "BodyMassIndex", "BiologicalSex"],
                    write: ["Weight", "StepCount", "BodyMassIndex"]
                }
            };
            AppleHealthKit.initHealthKit(options, (err, results) => {
                if (err) {
                    console.log("error initializing Healthkit: ", err);
                    return;
                }
                this.readBiologicalData()
            });
        });
    }


    readBiologicalData() {
        let d = new Date()
        let options = {
            date: d.toISOString()
        };
        AppleHealthKit.getDateOfBirth(null, (err, results: Object) => {
            if (this._handleHealthkitError(err, 'getDateOfBirth')) {
                return;
            }
            console.log(results)
            this._data.age = results.age
            if (this.reloadData != null) {
                this.reloadData()
            }
        })
        AppleHealthKit.getBiologicalSex(null, (err: Object, results: Object) => {
            if (this._handleHealthkitError(err, 'getBiologicalSex')) {
                return;
            }
            console.log(results)
            this._data.sex = results.value
            if (this.reloadData != null) {
                this.reloadData()
            }
        })

        AppleHealthKit.getStepCount(options, (err: Object, results: Object) => {
                if (this._handleHealthkitError(err, 'getStepCount')) {
                    return;
                }
                console.log(results)
                if (results != null) {
                    this._data.stepCount = results.value
                }
                if (this.reloadData != null) {
                    this.reloadData()
                }
            }
        )
    }

    getAge() {
        if (this._data.loaded == false) {
            this.readBiologicalData()
        }
        console.log(this._data.age)

        return this._data.age
    }

    getSex() {
        if (this._data.loaded == false) {
            this.readBiologicalData()
        }
        return this._data.sex
    }

    getStepCount() {
        if (this._data.loaded == false) {
            this.readBiologicalData()
        }
        return 10;
    }

    //
    // getWeight() {
    //     return this.state.weight
    // }
    //
    // getBloodType() {
    //     return this.state.bloodType
    // }


}

