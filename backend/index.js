import express from "express"
import * as http from 'node:http';
import {Server} from "socket.io"
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;
const server = http.createServer(app);
app.use(express.json());
dotenv.config()

const corsOrigin = process.env.CORS_ORIGIN; 

const allowed = (corsOrigin || "").split(",").map(s => s.trim()).filter(Boolean);
if (!allowed.length) { console.error("CORS_ORIGIN ausente"); process.exit(1); }

const corsOptions = {
  origin: allowed,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  optionsSuccessStatus: 204,
  maxAge: 86_400,
}

app.use(cors(corsOptions));

export const io = new Server(server, {
  cors: corsOptions,
});

io.use()

app.get('/', (req, res) => {
    res.send("Hello from the API");
});

app.listen(port);




