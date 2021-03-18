import jwt from 'jsonwebtoken';
import User from '../models/user';



const jwtMiddleware = async (ctx, next) => {
  const JWT_SECRET="8f386f672542e4c095dae727aa6f1314b690b0529805daae0bcb67119346b8df38e7478dd25afc80cb837a28e9c5e3ea2e8fbdb903100ca4fb5cdda40ae529e7";
  const token = ctx.cookies.get('access_token');
  if (!token) return next(); // 토큰이 없음
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded._id);
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
      totalTime: user.totalTime,
      level: user.level
    };
    // 토큰 하루 미만 남으면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 ) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24, // 하루
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    // 토큰 검증 실패
    return next();
  }
};

export default jwtMiddleware;