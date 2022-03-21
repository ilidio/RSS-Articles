const express = require("express")

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res)=> {
    console.log("Here");
    res.render("index", {text: "World"})
})

const articlesRouter = require("./routes/articles")
app.use("/api/articles", articlesRouter);

app.listen(3000)
console.log("teste")