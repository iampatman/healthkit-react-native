import AppleHealthKit from 'rn-apple-healthkit'


export default class HealthKitManager {

    _data = {
        available: false,
        age: 0,
        sex: 'unknown',
        dob: '',
        height: '',
        weight: '',
        bloodType: ''
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
        AppleHealthKit.isAvailable((err: Object, available: boolean) => {
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
        AppleHealthKit.getDateOfBirth(null, (err: Object, results: Object) => {
            if (this._handleHealthkitError(err, 'getDateOfBirth')) {
                return;
            }
            console.log(results)
            this._data.age = results.age
        });
        AppleHealthKit.getBiologicalSex(null, (err: Object, results: Object) => {
            if (this._handleHealthkitError(err, 'getBiologicalSex')) {
                return;
            }
            console.log(results)
            this._data.age = results.value
        });

        AppleHealthKit.getBiologicalSex(null, (err: Object, results: Object) => {
            if (this._handleHealthkitError(err, 'getBiologicalSex')) {
                return;
            }
            console.log(results)
            this._data.age = results.value
        });

    }


    getAge() {
        return this._data.age
    }

    getSex() {
        return this._data.sex
    }

    // getHeight() {
    //     return this.state.height
    // }
    //
    // getWeight() {
    //     return this.state.weight
    // }
    //
    // getBloodType() {
    //     return this.state.bloodType
    // }


}

