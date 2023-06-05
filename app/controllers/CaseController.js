import CaseRegister from "../models/CaseSchema.js";

const CaseController = () => {
  return {
    async addcase(req, res) {
      const { caseid, invid, cname, cnotes, cdesc, fileNames, fileSizes, fileTypes, ipfsPaths, uploadTimes } = req.body;

      const Case = await CaseRegister.findOne({ caseid: caseid });

      if (Case) {
        return res
          .status(200)
          .json({ message: "<h3>A case with same ID already exists 🙄</h3>" });
      } else {
        const CaseDetails = await new CaseRegister({
          caseid, invid, cname, cnotes, cdesc, fileNames, fileSizes, fileTypes, ipfsPaths, uploadTimes 
        });

        try {
          const registered = await CaseDetails.save().then((resp) => {
            return res.json({
              message: " <h3> Case added successfully 😊 </h3> ",
            });
          });
        } catch (err) {
          console.log(err);
          return res.json({
            message: " <h3> Error in adding the case </h3> 😓",
          });
        }
      }
    },

    async editcase(req, res) {
      const { caseid, invid, cname, cnotes, cdesc, fileNames, fileSizes, fileTypes, ipfsPaths, uploadTimes } = req.body;


      try {
        const Case = await CaseRegister.findOne({ caseid: caseid });

        if (Case) {
          Case.invid = invid;
          Case.cname = cname;
          Case.cnotes = cnotes;
          Case.cdesc = cdesc;
          Case.fileNames = fileNames;
          Case.fileSizes = fileSizes;
          Case.fileTypes = fileTypes;
          Case.ipfsPaths = ipfsPaths;
          Case.uploadTimes = uploadTimes;

          // Save the updated document
          const updatedDocument = await Case.save();
          return res.json({ message: " <h3> Case Details Updated 😊 </h3> " });
        } else {
          console.log("Document not found");
        }
      } catch (err) {
        console.log(err);
        return res.json({ message: " <h3> Error in Updating 😢 </h3> " });
      }
    },
    async allrec(req, res) {
      try {
        const Case = await CaseRegister.find();

        if (Case) {
          return res.json(Case);
        } else {
          return res.json({ message: "<h3>No cases 🙄</h3>" });
        }
      } catch (error) {
        console.log(error);
        return res.json({ message: error });
      }
    },
  };
};

export default CaseController;
