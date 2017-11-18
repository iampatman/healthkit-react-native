import GoogleFit from 'react-native-google-fit';

class GoogleFitManager {
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
        GoogleFit.authorize((err, result) => {
            if(err) {
                dispatch('AUTH ERROR');
                return;
            }
            dispatch('AUTH SUCCESS');
        });
    }


    readBiologicalData() {
        let d = new Date()
        let options = {
            date: d.toISOString()
        };

    }

    _retreiveWeight(){
        let opt =   {
            unit: 'pound',										// required; default 'kg'
            startDate: "2017-01-01T00:00:17.971Z",		        // required
            endDate: (new Date()).toISOString(),				// required
            ascending: false									// optional; default false
        };

        GoogleFit.getWeightSamples(opt, (err,res) => {
            console.log(res);
        });

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