import GoogleFit from 'react-native-google-fit';

export default class GoogleFitManager {
    reloadData = null

    setReloadCallback(callback) {
        console.log('setReloadCallback')

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
        console.log('getInstance')
        if (this.myInstance == null) {
            console.log('create new instance')

            this.myInstance = new GoogleFitManager();
        }
        return this.myInstance;
    }

    _handleHealthkitError(err, str) {

    }

    isEnabled() {
        console.log('IsEnabled called')
        GoogleFit.isEnabled((msg, result) => {
            console.log('IsEnabled return: ')

            console.log(msg + ' ' + result)
        })
    }

    constructor() {
        console.log('constructor')
        this.isEnabled()
        GoogleFit.authorize((err, result) => {
            console.log('authorize')

            console.log('result' + result)

            if (err) {
                return;
            }
            this.readBiologicalData()
        });
        this.readBiologicalData()
    }


    readBiologicalData() {
        console.log('readBiologicalData')
        let d = new Date()
        let options = {
            date: d.toISOString()
        };
        this._saveWeight(100);
        this._retrieveWeight()
        this._getStepCount()

    }

    _saveWeight(value) {
        let opt = {
            value: value,
            date: (new Date().toISOString()),
            unit: "pound"
        };
        GoogleFit.saveWeight(opt, (err, res) => {
            if (err) throw 'Cant save data to the Google Fit';
        });

    }

    _retrieveWeight() {
        let opt = {
            unit: 'pound',										// required; default 'kg'
            startDate: "2017-01-01T00:00:17.971Z",		        // required
            endDate: (new Date()).toISOString(),				// required
            ascending: false									// optional; default false
        };

        GoogleFit.getWeightSamples(opt, (err, res) => {
            console.log(res);
        });

    }


    _getStepCount() {
        console.log('_getStepCount')
        const options = {
            startDate: "2017-01-01T00:00:17.971Z",  // required ISO8601Timestamp
            endDate: (new Date()).toISOString()     // required ISO8601Timestamp
        };

        GoogleFit.getDailyStepCountSamples(options, (err, res) => {
            if (err) {
                throw err;
            }
            console.log("Daily steps >>>", res);
            return res;
        })
    }

    getAge() {
        console.log(this._data.age)

        return this._data.age
    }

    getSex() {

        return this._data.sex
    }

    getStepCount() {

        return this._data.stepCount;
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