import http from "http";
import fs from "fs/promises";
import process  from "process";
import {extname} from "path";
import path from "path";
import typesMap from "./w3-media-types.mjs"

const host = "127.0.0.1";
const port = "3000"
const root = path.resolve(process.cwd(),"files")

const server = http.createServer();

server.on("request", async (req, res) => {
    const {pathname}= new URL (req.url, `http://${req.headers.host}`);
    const file = `${root}${pathname}`
    console.log(typesMap.get(extname(pathname)))

    const fileType = typesMap.get(extname(pathname));
    if(fileType){
        res.setHeader("Content-type", fileType)
    }


    try {
        const data = await fs.readFile(file);
        res.end(data);
    } catch (e) {
        console.error(e);
        res.statusCode = 404;
        res.end();
    }
});

server.listen(port, host, () =>{
    console.log(`Web server running at http://${host}:${port}`)
})