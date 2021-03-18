import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const ExerciseSchema = new Schema({
  title : Number,
  date: {
    type: Date,
    default: Date.now,
  }
});

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
    totalTime : Number,
    level : String,
    exercises: [ExerciseSchema]
});
UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
  };
  
UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result; // true / false
};
UserSchema.methods.serialize = function() {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
  };
  
  const JWT_SECRET="8f386f672542e4c095dae727aa6f1314b690b0529805daae0bcb67119346b8df38e7478dd25afc80cb837a28e9c5e3ea2e8fbdb903100ca4fb5cdda40ae529e7";
  UserSchema.methods.generateToken = function() {
    const token = jwt.sign(
      // 첫번째 파라미터엔 토큰 안에 집어넣고 싶은 데이터를 넣습니다
      {
        _id: this.id,
        username: this.username,
      },
      JWT_SECRET, // 두번째 파라미터에는 JWT 암호를 넣습니다
      {
        expiresIn: '3d', // 7일동안 유효함
      },
    );
    return token;
  };

  UserSchema.statics.findByUsername = function(username) {
    // 객체에 내장되어있는 값을 사용 할 때는 객체명.키 이런식으로 쿼리하면 됩니다
    return this.findOne({'username': username}).exec();
  };

  UserSchema.statics.findByID = function(Id) {
    return this.findOne({ Id });
  };

const User = mongoose.model('User', UserSchema);
export default User;