require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/db");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const fileRoutes = require("./routes/fileRoute");
const logsRoutes = require("./routes/auditLogsRoute");
const contactRoutes = require("./routes/contactRoute");
const notesRoutes = require("./routes/noteRoute");
const homepageRoutes = require("./routes/homepageRoute");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path, stat) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);
app.set("trust proxy", true);

app.get("/", (req, res) => {
  return res.redirect("https://rohitkumaryadav.com/");
});

app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/website/homepage", homepageRoutes);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    console.log(`Server is listening on PORT ${PORT}`);
    await dbConnection();
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
});
