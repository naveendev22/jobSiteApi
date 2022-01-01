const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://adminDB:admin@naveenlearning.0wkrh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
module.exports = mongoose