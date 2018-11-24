#!/usr/bin/env node



const Discord = require("discord.js");
const config = require("./config_1_0.json");


const client = new Discord.Client();

const version = "1.0";
const consoleGruen = "\x1b[32m";
const consoleRot = "\x1b[31m";
const consoleOrange = "\x1b[33m";
const consoleTuerkis = "\x1b[36m";



client.login(config.token);

client.on("ready", () => {
	console.log(consoleTuerkis + "[LOGIN] [Spielebot] [" + version + "] Bot ist nun bereit.");
});












client.on("message", async message => {

});
