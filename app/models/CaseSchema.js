import mongoose from 'mongoose';


const CaseSchema = new mongoose.Schema({

    caseid: {
        type: String,
        required: true
    },
    cstatus: {
        type: String,
        default: "open"
    },
    invid: {
        type: String,
        required: true
    },
    cname: {
        type: String,
        required: true
    },
    cnotes: {
        type: String

    },
    cdesc: {
        type: String,
        required: true
    },
    fileNames: {
        type: Array
    },

    fileSizes: {
        type: Array
    },

    fileTypes: {
        type: Array
    },

    ipfsPaths: {
        type: Array
    },

    uploadTimes: {
        type: Array
    },


}, { timestamps: true });


const CaseRegister = new mongoose.model("case", CaseSchema);


export default CaseRegister;
