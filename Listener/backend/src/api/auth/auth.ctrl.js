import Joi from 'joi';
import User from '../../models/user';
import bcrypt from 'bcrypt';
/*
  POST /api/auth/register
*/
export const register = async ctx => {
  // Request Body 검증하기
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  const level = "🌱";
  const totalTime = 0;
  try {
    // username  이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({
      username, totalTime, level
    });
    await user.setPassword(password); // 비밀번호 설정
    await user.save(); // 데이터베이스에 저장

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};
/*
  POST /api/auth/login
*/
export const login = async ctx => {
  const { username, password } = ctx.request.body;

  // username, password 가 없으면 에러 처리
  if (!username || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    const user = await User.findByUsername(username);
    // 계정이 존재하지 않으면 에러 처리
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    // 잘못된 비밀번호
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    //console.log(ctx.body);
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/auth/check
*/
export const check = async ctx => {
  const { user } = ctx.state;
  if (!user) {
    // 로그인중 아님
    ctx.status = 401; // Unauthorized
    return;
  }
  const userDoc = await User.findByUsername(user.username);
  //console.log(userDoc);
  ctx.body = userDoc.serialize();
  //ctx.body = userDoc;
};
export const logout = async ctx => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};

export const modify = async (ctx) => {

  const { username, password } = ctx.request.body;
 
  try {
    // 계정이 존재하지 않으면 에러 처리
    const filter = { username: username };
    const hashpw = await bcrypt.hash(password, 10); //새 비번 해시
    const update = { hashedPassword: hashpw };
    let doc = await User.findOneAndUpdate(filter, update, {
    new: true
  });
  ctx.body = doc.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
  
};

export const findLevel = async (ctx) => {
  const { username } = ctx.request.body;
  console.log(username);
  try{
    const user = await User.findByUsername(username);
    if(user){
      const doc = {level: user.level, username: username};
      console.log(doc);
      ctx.body = doc;
    }else{  
      ctx.state = 404;
      return;
    }
  } catch(e) {
    ctx.throw(500, e);
  }
};

export const exercise = async ctx => {
  const {title, totalTime, username, id} = ctx.request.body;
  const userDoc = await User.findByUsername(username);
  const user = new User();
  const exerDoc = user.exercises.create({title : title});
  userDoc.exercises.push(exerDoc); //exercise 배열에 add
  userDoc.save();    //exercise DB 저장
  try{
    ctx.body = exerDoc;
  } catch(e){
    ctx.throw(500, e);
  }
};