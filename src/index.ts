import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import collaboratorsRouter from "./routes/collaborators";
import reassignAccessRouter from "./routes/reassignAccess";
import accessRecordsRouter from "./routes/accessRecords";
import healthRouter from "./routes/health";
import authMiddleware from "./middleware/auth";

dotenv.config();

const app = express();

const corsOptions = process.env.CORS_ORIGIN
  ? { origin: process.env.CORS_ORIGIN.split(",") }
  : {};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/health", healthRouter);
app.use(authMiddleware);
app.use("/collaborators", collaboratorsRouter);
app.use("/reassign-access", reassignAccessRouter);
app.use("/access-records", accessRecordsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
