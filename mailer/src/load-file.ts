import * as ini from "ini";
import * as fs from "fs";

const config = ini.parse(fs.readFileSync("./config.ini", "utf-8"));
