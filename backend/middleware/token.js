import jsonwebtoken from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET;
const ORIGIN = process.env.CORS;
const allowedOrigins = (ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);

if (!allowedOrigins.length) { 
  console.error("CORS_ORIGIN ausente"); 
  process.exit(1); 
}

export function isAllowedOrigin(originHeader) {
  if (!originHeader || !allowedOrigins.includes(originHeader)) {
    console.log("Origem não permitida ou ausente:", originHeader);
    return false;
  }
  return true;
}

function verifyTokenFromRawCookie(rawCookie) {
  if (!rawCookie) return null;
  
  try {
    const parsedCookies = cookie.parse(rawCookie);
    const token = parsedCookies.token;
    
    if (!token) return null;
    
    return jsonwebtoken.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("Erro na verificação do JWT:", err.message);
    return null;
  }
}

export function HttpAuthMiddleware(req, res, next) {
  if (!isAllowedOrigin(req.headers.origin)) {
    return res.status(403).json({ error: "Origem não permitida" });
  }

  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Não autorizado: Token ausente" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Não autorizado: Token inválido" });
  }
}

export function SocketAuthMiddleware(socket, next) {
  const headers = socket.handshake.headers;

  if (!isAllowedOrigin(headers.origin)) {
    return next(new Error("Acesso negado: Origem não permitida."));
  }

  const rawCookie = headers.cookie;

  if (!rawCookie) {
    return next(new Error("Autenticação falhou: Nenhum cookie encontrado."));
  }

  const userDecoded = verifyTokenFromRawCookie(rawCookie);

  if (!userDecoded) {

    return next(new Error("Autenticação falhou: Token inválido ou ausente."));
  }

  socket.user = userDecoded;
  next();
}