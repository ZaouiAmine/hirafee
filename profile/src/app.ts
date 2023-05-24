import express from "express";
import 'express-async-errors';
import { json } from "body-parser";

import { createRouter } from "./routes/create";
import { modifyRouter } from "./routes/modify";
import { deleteRouter } from "./routes/delete";
import { showRouter } from "./routes/show";
import { showoneRouter } from "./routes/showone";


const app = express();
app.use(json());

app.use(modifyRouter);
app.use(deleteRouter);
app.use(showRouter);
app.use(showoneRouter);

export {app};
