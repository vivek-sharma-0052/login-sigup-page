const mongoos = require('mongoose');

const bcrypt = require('bcrypt');

const UserSchema = mongoos.Schema({
    name : {
        type : String,
        required : true,

    },
    email: {
   type: String,
   required: true,
   unique: true,
   lowercase: true
},
password: {
   type: String,
   required: true,
   minlength: 6
}   
},{timestamps:true})

UserSchema.pre('save',async function hash() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10)
})

const User = mongoos.model('user',UserSchema);
module.exports = User;