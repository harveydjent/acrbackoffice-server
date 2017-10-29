"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const body_parser_1 = require("body-parser");
const express_1 = require("express");
const path_1 = require("path");
app_1.default.use(body_parser_1.default.json());
app_1.default.use(express_1.default.static(path_1.join(__dirname, 'public')));
// setup error handlers for uncaught rejections and errors
process.on('uncaughtException', error => console.error(`Uncaught exception... ${error.stack}`));
process.on('unhandledRejection', error => {
    console.error(`Uncaught rejection... ${error.stack}`);
    process.exit(1);
});
const port = process.env.PORT || 3000;
app_1.default.listen(port, err => {
    return err ? console.error(err) : console.log(`Server is listening on port ${port}`);
});
