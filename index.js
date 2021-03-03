const express = require("express")
const app = express()
const fs = require("fs")
let newe;

app.use(express.static("./static"))

app.enable("trust proxy")

app.enable("case sensitive routing")

app.get("/", (req, res) => {
    res.redirect("/boot")
})

app.get("/boot", (req, res, next) => {
    fs.readFile("./mbr/config/boot.json", "utf8", (e, d) => {
        if (e) {
            newe = new Error("Cannot find ./mbr/config/boot.json")
            next(newe)
        }
    })
    res.sendFile(__dirname + "/found.html")
})

app.get("/bootinfo", (req, res) => {
    res.sendFile(__dirname + "/mbr/config/boot.json")
})

app.use((req, res) => {
    res.status(404).sendFile(__dirname + "/notfound.html")
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).sendFile(__dirname + "/err.html")
})

app.listen(3000, () => {
    console.log("Ready!")
})