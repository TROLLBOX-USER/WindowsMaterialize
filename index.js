const express = require("express")
const app = express()
const fs = require("fs")
const config = require("./mbr/config/boot.json")
let newe;

app.use(express.static("./static"))

app.enable("trust proxy")

app.enable("case sensitive routing")

app.get("/", (req, res) => {
    res.redirect("/boot")
})

app.get("/boot", (req, res, next) => {
    fs.readFile("./mbr/config/boot.json", "utf8", (e, _) => {
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

app.get("/osboot", (req, res) => {
    res.send("<!DOCTYPE html><title>Boot</title><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css'><script src='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js'></script>")
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