#!/usr/bin/env node

/*
///////////////////////////////////////////////////
  _      ____  _____  _____       ____  ______     _______ _    _ ______      _____          __  __ ______  _____
 | |    / __ \|  __ \|  __ \     / __ \|  ____|   |__   __| |  | |  ____|    / ____|   /\   |  \/  |  ____|/ ____|
 | |   | |  | | |__) | |  | |   | |  | | |__         | |  | |__| | |__      | |  __   /  \  | \  / | |__  | (___
 | |   | |  | |  _  /| |  | |   | |  | |  __|        | |  |  __  |  __|     | | |_ | / /\ \ | |\/| |  __|  \___ \
 | |___| |__| | | \ \| |__| |   | |__| | |           | |  | |  | | |____    | |__| |/ ____ \| |  | | |____ ____) |
 |______\____/|_|  \_\_____/     \____/|_|           |_|  |_|  |_|______|    \_____/_/    \_\_|  |_|______|_____/

///////////////////////////////////////////////////
Spielebot erstellt während der HPI-Codenight 2018.

Copyright by Vincent (vale5566), Finn (FunKuchen) und Andreas Zander (LordAkkaron).

Version 1.0 (24. November 2018 21:50)
///////////////////////////////////////////////////
*/

//IMPORTS
console.log("\x1b[36m Importiere...");
//Discord, config und SQL
const Discord = require("discord.js");
const config = require("./config_1_0.json");
var mysql = require('mysql');



//KONSTANTEN
console.log("\x1b[36m Konstanten werden geladen...");

const client = new Discord.Client();
const version = "v1.0";
const consoleGruen = "\x1b[32m";
const consoleRot = "\x1b[31m";
const consoleOrange = "\x1b[33m";
const consoleTuerkis = "\x1b[36m";
const ae = "\u00E4";
const aE = "\u00C4";
const ue = "\u00FC";
const uE = "\u00DC";
const oe = "\u00F6";
const oE = "\u00D6";
const sz = "\u00DF";



//VARIABLEN
console.log("\x1b[36m Variablen werden geladen...");
//SQL-Connection, zzt noch unnötig
var con = mysql.createConnection({
  host: "81.169.133.223",
  user: "lotg",
  password: config.db_pw,
  database: "lordofthegames"
});








/*
  _      ____   _____ _____ _   _
 | |    / __ \ / ____|_   _| \ | |
 | |   | |  | | |  __  | | |  \| |
 | |   | |  | | | |_ | | | | . ` |
 | |___| |__| | |__| |_| |_| |\  |
 |______\____/ \_____|_____|_| \_|

 */
 console.log("\x1b[36m Login eingeleitet...");
  client.login(config.token);



 client.on("ready", () => {
	//Statusmeldung des Bots
	client.user.setActivity("auf Version " + version);
	//Verbinden mit der DB
	con.connect();
	console.log(consoleTuerkis + aktuelleZeit() + "[LOGIN_DB] [BOT] Erfolgreich mit Datenbank verbunden.")
	//Einlognachricht
	console.log(consoleTuerkis + aktuelleZeit() + "[LOGIN_DISCORD] [LordOfTheGames] [" + version + "] Bot ist betriebsbereit.");
});




























/*
  __  __ ______  _____ _____         _____ ______
 |  \/  |  ____|/ ____/ ____|  /\   / ____|  ____|
 | \  / | |__  | (___| (___   /  \ | |  __| |__
 | |\/| |  __|  \___ \\___ \ / /\ \| | |_ |  __|
 | |  | | |____ ____) |___) / ____ \ |__| | |____
 |_|  |_|______|_____/_____/_/    \_\_____|______|

*/
client.on("message", async message => {
	//argumente und command der nachricht
	var args;
  var command;

	//wenn nachricht von bot oder per pm ist, ignorieren
	if(message.author.bot) return;
  if(message.guild == null) return;

	//analysieren der nachricht, zuordnen von command (/startgame zB) und argumenten
	if(message.content.indexOf(config.prefix) == 0) {
		args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		command = args.shift().toLowerCase();
	}
	else {
		args = null;
		command = null;
	}

	//Nachricht ist befehl
	if(command != null) {
		addUserToDB(message.author.id);
		if(message.channel.id == config.c_general_infos) {
			if(command == "status") {
				if(args[0] == null) statusFromUserInChannel(message.author.id,message.channel);
				else statusFromUserInChannel(cutTag(args[0]),message.channel);
			}
		}
		else if(message.channel.id == config.c_hangman) {
			if (command == "start" && args[0] === "play" && args[1] === "hangman") {
			    randomWord = randomWords();
			    var randomWordLength = randomWord.length;
			    var messageSend = "";
			    for (i = 0; i < randomWordLength; i++) {
			      messageSend = messageSend + ":large_blue_circle:";
			    }
			    message.channel.send(messageSend);
			  } else if (command == "start" && args[0] === "play") {
			    message.channel.send("Right now you can play: Hangman");
			  }

			  if (command == "guess") {
			    if (args[0].length > 1) {
			      message.channel.sendMessage("Wort");
			      //guess = word
			    } else {
			      message.channel.sendMessage(randomWord);
			      if (randomWord.indexOf(args[0]) != -1) {
				message.channel.sendMessage("nice");
			      } else {
				message.channel.sendMessage("not nice");
			      }
			    }
			  }	
		}
	}
	//kein befehl, zurzeit unbenutzt
	else {}

});











/*
  ______ _    _ _   _  _____ _______ _____ ____  _   _  _____
 |  ____| |  | | \ | |/ ____|__   __|_   _/ __ \| \ | |/ ____|
 | |__  | |  | |  \| | |       | |    | || |  | |  \| | (___
 |  __| | |  | | . ` | |       | |    | || |  | | . ` |\___ \
 | |    | |__| | |\  | |____   | |   _| || |__| | |\  |____) |
 |_|     \____/|_| \_|\_____|  |_|  |_____\____/|_| \_|_____/

*/

/*
PARAMETER: User-ID und CHANNEL
RÜCKGABE: none
*/
async function statusFromUserInChannel(userid,channel) {
	if(memberToID(userid) == null) {
    channel.send("Dieser User ist nicht existent.").catch();
    return;
  }
  var nick = nickToID(userid);

	var query = con.query("SELECT * FROM t_user WHERE discord_id = " + userid, function (err, result) {
		if (err) {
			console.log(consoleRot + aktuelleZeit() + "[ERR_REQUESTING_DATA] [" + nick + "]");
			throw err;
		}
		else {
      //User ist in der DB vorhanden
      if(result.length != 0) {
				const embed = new Discord.RichEmbed()
			  .setTitle("**Status von " + nick + "**")
			  .setColor("#3893e8")
			  .addField("Punkte:",result[0].points)
			  .setFooter("© LotG",client.user.avatarURL)
			  .setTimestamp();

				channel.send(embed).catch();
      }
      //User ist NICHT in der DB vorhanden
      else {
        channel.send("Der angefragte User ist noch nicht Anh" + ae + "nger der Religion von LordOfTheGames :)").catch();
        return;
      }
		}
	});
}




function addUserToDB(id) {
	var query = con.query("SELECT * FROM t_user WHERE discord_id = " + id, function (err, result) {
		if (err) {
			console.log(consoleRot + aktuelleZeit() + "[ERR_REQUESTING_DATA] [" + nickToID(id) + "]");
			throw err;
		}
		else {
			switch(result.length) {
				case(0):
					var query = con.query("INSERT INTO t_user (discord_id, discord_name, points) VALUES (\"" + id + "\",\"" + nickToID(id) + "\",DEFAULT)",function (err, result) {
						if (err) {
							console.log(consoleRot + aktuelleZeit() + "[ERR_INSERTING_USER] [" + nickToID(id) + "]");
							throw err;
						}
						else {
							console.log(consoleGruen + aktuelleZeit() + "[INSERTING_USER] [" + nickToID(id) + "]");
						}
					});
					break;
				case(1):
					break;
				default:
					console.log(consoleRot + aktuelleZeit() + "[ERR_USER_TO_OFTEN_IN_DB] [" + nickToID(id) + "]");
			}
		}
	});
}



/*
PARAMTER: WIE WAHRSCHEINLICH SOLL TRUE ALS RÜCKGABEWERT KOMMEN
RÜCKGABE: TRUE OR FALSE
*/
function trueMitProzent(wahrscheinlichkeit) {
	if((Math.floor(Math.random() * 100)) < wahrscheinlichkeit) {
		return true;
	}
	else {
		return false;
	}
}



/*
PARAMTER: MIN UND MAX (GANZE ZAHLEN)
RÜCKGABE: ZUFALLSZAHL ZWISCHEN MIN UND MAX
*/
function zahlZwischen(min, max) {
	var zahl = Math.floor(Math.random() * (max - min + 1)) + min;
	return zahl;
}



/*
PARAMTER: ZU TRIMMENDER createdAt-STRING
RÜCKGABE: GETRIMMTER STRING MIT DATUM UND ZEIT
*/
function trimCreatedTimestamp(timestamp) {
	var date = new Date(timestamp);
	var timeString = new String();

	timeString = date.getHours() + ":" + date.getMinutes();

	return timeString;

}



/*
PARAMTER: KEINE
RÜCKGABE: STRING MIT AKTUELLER ZEIT
*/
function aktuelleZeit() {
	var zeit = new String();
	zeit = "[" + trimCreatedTimestamp(Date.now()) + "] ";
	return zeit;
}






/*
PARAMETER: ERWÄHNUNGSSTRING    <@8392483294832948> ODER <@!4583294832940>
RÜCKGABE: ID
*/
function cutTag(tag) {
	if(tag == null) return -1;
	var start = 2;

	if(tag.charAt(start) == "!") {
		start = 3;
	}

	return tag.substring(start,tag.length-1);

}




/*
PARAMETER: Titel, Text
RÜCKGABE:  embed
*/
function embed(title,text) {
	var newEmbed = new Discord.RichEmbed()
	.setTitle(title)
	.setDescription(text + "\n")
	.setColor("#0080FF");

	return newEmbed;
}



function nickToID(id) {
  var member = client.guilds.array()[0].members.find(x => x.id === id);
  var nick = member.nickname;

  if(nick == null) nick = member.user.username;

  return nick;
}



function nickToMember(member) {
  var nick = member.nickname;

  if(nick == null) nick = member.user.username;

  return nick;
}



function memberToID(id) {
  var member = client.guilds.array()[0].members.find(x => x.id === id);
  if(member != null) return member;
  else return null;
}



async function sendAndDelete(msg,channel,time) {
	var answer = await channel.send(msg);
	answer.delete(time).catch();
}
