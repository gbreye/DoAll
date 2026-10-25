import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";


const JWT_SECRET = process.env.JWT_SECRET;
const ORIGIN = process.env.CORS_ORIGIN;

const allowed = (ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
if (!allowed.length) { console.error("CORS_ORIGIN ausente"); process.exit(1); }

function isSocket(req) {
  const isUpgrade = req?.headers?.upgrade?.toLowerCase() === 'websocket';
  const hasUpgradeConn = req?.headers?.connection?.toLowerCase().includes('upgrade');
  
  return Boolean(isUpgrade && hasUpgradeConn);
}

function isAllowedOrigin(req, allowed) {

  if (!isSocket(req)) {
    console.log("Não é websocket");
    return false;
  }

  const origin = req?.headers?.origin;
  
  if (!origin || !allowed.includes(origin)) {
    console.log("Não é da origem permitida");
    return false;
  }

  return true;
}

function receiveCookie(req) {
    const socket = isSocket(req);
    if(!socket) {
        const token = req.cookies['token'];
        if(!token) {
           return res.status(401).json({mes: 'Não autorizado'});
        };
        const userDecoded = jsonwebtoken.verify(token, JWT_SECRET);
        return userDecoded
    } else {
        const headerCookies = socket.handshake.headers.cookie;
        const cookies = cookie.parse(headerCookies);
        const token = cookies.token;

        if (!token) {
            return (new Error("Autenticação falhou: Token não encontrado."));
        }
        if (!headerCookies) {
            return next(new Error("Autenticação falhou: Nenhum cookie encontrado."));
        }
        return token;
    }
}

export function AuthMiddleWare(req, res, next) {
  const token = receiveCookie(req);

  if (!token) {
    const socket = isSocket(req);
    if (!socket) {
      return res.status(401).json({ mes: "Não autorizado" }); 
    }
    
  }

  next();
}
