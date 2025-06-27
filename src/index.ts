import express from "express";
import cors from "cors";
import collaboratorsRouter from "./routes/collaborators";
import reassignAccessRouter from "./routes/reassignAccess";
import accessRecordsRouter from "./routes/accessRecords";
import healthRouter from "./routes/health";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/collaborators", collaboratorsRouter);
app.use("/reassign-access", reassignAccessRouter);
app.use("/access-records", accessRecordsRouter);
app.use("/health", healthRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
