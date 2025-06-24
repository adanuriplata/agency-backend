import express from "express";
import cors from "cors";
import collaboratorsRouter from "./routes/collaborators";
import reassignAccessRouter from "./routes/reassignAccess";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/collaborators", collaboratorsRouter);
app.use("/reassign-access", reassignAccessRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
