"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.generateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret = 'xxx';
var generateJWT = function (opt) {
    var jwt = jsonwebtoken_1.default.sign(opt, secret);
    return jwt;
};
exports.generateJWT = generateJWT;
var verifyJWT = function (jwt) {
    var decoded = jsonwebtoken_1.default.verify(jwt, secret);
    return decoded;
};
exports.verifyJWT = verifyJWT;
