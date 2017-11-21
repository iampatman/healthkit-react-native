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
        weight: 0,
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
            unit: 'kg',										// required; default 'kg'
            startDate: "2017-01-01T00:00:17.971Z",		        // required
            endDate: (new Date()).toISOString(),				// required
            ascending: false									// optional; default false
        };

        GoogleFit.getWeightSamples(opt, (err, res) => {
            console.log('getWeightSamples' + res);
            res.forEach(x => {
                console.log(x.value)
            })
            this._data.weight = res[res.length - 1].value
            if (this.reloadData != null) {
                this.reloadData()
            }
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
            var total = 0;
            res = res.map((source) => (source.steps))
                .filter(source => source.length > 0)
                .forEach((source) => {
                    console.log('src: ' + source)
                    source.forEach(x => {
                        console.log(x.value)
                        total += x.value

                    })
                    // var subTotal = source.reduce((a, b) => a.value + b.value, 0);
                    // console.log('subTotal' + subTotal)
                    // total += subTotal
                })

            console.log('total: ' + total)
            console.log("Daily steps >>>", res);
            this._data.stepCount = total
            if (this.reloadData != null) {
                this.reloadData()
            }
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


    getWeight() {
        return this._data.weight
    }
}