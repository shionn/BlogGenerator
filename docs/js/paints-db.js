'use strict';

const VJ = "Vallejo";
const GW = "Cidatel";
const OLD_GW = "Old Citadel";
const AP = "Army Painter";
const GSW = "Green Stuff World";

const _DEBUG = false;

const SHIONN_SRC = {
	name : "Shionn",
	url : "https://www.vallejoacrylics.com/wp-content/uploads/2023/04/CC266-Game_Color-NewIC-Rev00_.pdf"
}

const VJ_GC_SRC = {
	name : "Vallejo",
	url : "https://www.vallejoacrylics.com/wp-content/uploads/2023/04/CC266-Game_Color-NewIC-Rev00_.pdf"
};

const DAKKA = {
	name : "Dakka",
	url : "https://www.dakkadakka.com/wiki/en/Paint_Range_Compatibility_Chart"
};

const GSW_SRC = {
	name : "GSW",
	url : "https://www.greenstuffworld.com/fr/content/11-tableau-d-equivalence-peintures-gsw"
};

const AP_SRC = {
	name : "AP",
	url : "https://www.thearmypainter.com/tutorials/pdf-tutorials/tutorials/colour-charts/"
}

const AK_SRC = {
	name : "AK",
	url : "https://www.ak-masters.com/app/pdf/RCEquivalenceDIG.pdf"
}


let paints = new Map();

let equivalences = new Array();

let paint = function(id) {
	return paints.get(id);
}

let createPaint = function(brand, id, name, legacy = false) {
	const p = { id : id, name : name, brand : brand, legacy: legacy};
	paints.set(id, p);
	return p;
}

let equivalence = function(src, ids) {
	let result = [undefined, undefined, undefined, undefined, undefined];
	ids.forEach( i => {
		let p = paint(i);
		if (p) {
			result[[VJ, GW, OLD_GW, AP, GSW].indexOf(p.brand)] = i;
		} else {
			console.log("undefined color : " + i);
		}
	})

	equivalences = equivalences.concat({ ids : result, src : [ src ] });
};

q(function() {
	equivalences.forEach( equi => {
		let line = q("<tr>");
		equi.ids.forEach( (id, index) => {
			if (id) {
				let p = paint(id);
				if (p.brand === OLD_GW) {
					line.append(q("<td>").text(p.name));
				} else {
					line.append(q("<td>").text(id));
					line.append(q("<td>").text(p.name));
				}
			} else {
				if (index != 2) {
					line.append(q("<td>"));
				}
				line.append(q("<td>"));
			}
		});
		if (_DEBUG || equi.src.indexOf(SHIONN_SRC) < 0) {
			let src = q("<td>");
			equi.src.forEach(s => {
				src.append(q("<a>").attr("href", s.url).attr("target", "_blank").text(s.name));
			})
			line.append(src);
			q("#equivalence tbody").append(line);
		} else {
			q("#merge tbody").append(line);
		}
	});

	q("#filter").on("keyup",(e)=> {
		let val = q(e.target).value().toLowerCase();
		q("#equivalence").find("tbody tr").each(function() {
			if (this.text().toLowerCase().indexOf(val) >0 ) {
				this.rmClass("hide");
			} else {
				this.addClass("hide");
			}
		});
	});

	if (_DEBUG) {
		let area = q("<textarea>").attr("rows",3).attr("cols",80).attr("style", "position: sticky;top: 0;margin: 0 auto;display: block;");
		q("#equivalence").parent("article").find("section").prepend(area);

		let _addToPersonnal = function(obj) {
			console.log(obj);
			if (area.value()) {
				area.value(area.value()+", "+obj);
			} else {
				area.value("equivalence(SHIONN_SRC, ["+obj);
			}
		}

		q("#equivalence tbody").on("click", "td:nth-child(1), td:nth-child(8)", (e) => {
			_addToPersonnal(q(e.target).text());
		});

		q("#equivalence tbody").on("click", "td:nth-child(3), td:nth-child(6)", (e) => {
			_addToPersonnal("\"" + q(e.target).text()+"\"");
		});

		q("#equivalence tbody").on("click", "td:nth-child(5)", (e) => {
			_addToPersonnal("\"old-gw-" + q(e.target).text().toLowerCase().replaceAll(" ", "-")+"\"");
		});

		area.on("focus", (e)=> {
			area.value(area.value()+"]);\n");
			e.target.select();
			document.execCommand("copy");
			area.value("");
		});
	}
});

createPaint(VJ, 72001, "Dead White");
createPaint(VJ, 72002, "White Primer", true);
createPaint(VJ, 72003, "Pale Flesh");
createPaint(VJ, 72004, "Elf Skin Tone");
createPaint(VJ, 72005, "Moon Yellow");
createPaint(VJ, 72006, "Sun Yellow");
createPaint(VJ, 72007, "Gold Yellow");
createPaint(VJ, 72008, "Orange Fire");
createPaint(VJ, 72009, "Hot Orange");
createPaint(VJ, 72010, "Bloody Red");
createPaint(VJ, 72011, "Gory Red");
createPaint(VJ, 72012, "Scarlet Red");
createPaint(VJ, 72013, "Squid Pink");
createPaint(VJ, 72014, "Warlord Purple");
createPaint(VJ, 72015, "Hexed Lichen");
createPaint(VJ, 72016, "Royal Purple");
createPaint(VJ, 72017, "Dark Blue", true);
createPaint(VJ, 72018, "Stormy Blue", true);
createPaint(VJ, 72019, "Night Blue");
createPaint(VJ, 72020, "Imperial Blue");
createPaint(VJ, 72021, "Magic Blue");
createPaint(VJ, 72022, "Ultram. Blue");
createPaint(VJ, 72023, "Electric Blue");
createPaint(VJ, 72024, "Turquoise");
createPaint(VJ, 72025, "Fool Green");
createPaint(VJ, 72026, "Jade Green");
createPaint(VJ, 72027, "Scurvy Green");
createPaint(VJ, 72028, "Dark Green");
createPaint(VJ, 72029, "Sick Green");
createPaint(VJ, 72030, "Goblin Green");
createPaint(VJ, 72031, "Cam. Green");
createPaint(VJ, 72032, "Scorpy Green");
createPaint(VJ, 72033, "Livery Green", true);
createPaint(VJ, 72034, "Bone White");
createPaint(VJ, 72035, "Dead Flesh");
createPaint(VJ, 72036, "Bronze Brown");
createPaint(VJ, 72037, "Filthy Brown", true);
createPaint(VJ, 72038, "Scrofulous Brown");
createPaint(VJ, 72039, "Plague Brown");
createPaint(VJ, 72040, "Leather Brown");
createPaint(VJ, 72041, "Dwarf Skin", true);
createPaint(VJ, 72042, "Parasite Brown");
createPaint(VJ, 72043, "Beasty Brown");
createPaint(VJ, 72044, "Dark Fleshtone");
createPaint(VJ, 72045, "Charred Brown");
createPaint(VJ, 72046, "Ghost Grey", true);
createPaint(VJ, 72047, "Wolf Grey");
createPaint(VJ, 72048, "Sombre Grey");
createPaint(VJ, 72049, "Stonewall Grey");
createPaint(VJ, 72050, "Neutral Grey");
createPaint(VJ, 72051, "Black");
createPaint(VJ, 72052, "Silver");
createPaint(VJ, 72053, "Chainmail");
createPaint(VJ, 72054, "Dark Gunmetal");
createPaint(VJ, 72055, "Polished Gold");
createPaint(VJ, 72056, "Glorious Gold");
createPaint(VJ, 72057, "Bright Bronze");
createPaint(VJ, 72058, "Brassy Brass");
createPaint(VJ, 72059, "Ham. Copper");
createPaint(VJ, 72060, "Tinny Tin");
createPaint(VJ, 72061, "Khaki");
createPaint(VJ, 72062, "Earth");
createPaint(VJ, 72063, "Desert Yellow");
createPaint(VJ, 72064, "Yellow Olive", true);
createPaint(VJ, 72065, "Terracotta", true);
createPaint(VJ, 72066, "Tan");
createPaint(VJ, 72067, "Cayman Green");
createPaint(VJ, 72068, "Smokey Ink");
createPaint(VJ, 72071, "Barbarian Skin");
createPaint(VJ, 72076, "Alien Purple");
createPaint(VJ, 72082, "White");
createPaint(VJ, 72084, "Dark Turquoise");
createPaint(VJ, 72085, "Yellow");
createPaint(VJ, 72086, "Red");
createPaint(VJ, 72087, "Violet");
createPaint(VJ, 72088, "Blue");
createPaint(VJ, 72089, "Green");
createPaint(VJ, 72090, "Black Green");
createPaint(VJ, 72091, "Sepia");
createPaint(VJ, 72092, "Brown");
createPaint(VJ, 72093, "Skin");
createPaint(VJ, 72094, "Black");
createPaint(VJ, 72095, "Glacier blue");
createPaint(VJ, 72096, "Verdigris");
createPaint(VJ, 72097, "Pale Yellow", true);
createPaint(VJ, 72098, "Elfic Flesh");
createPaint(VJ, 72099, "Skin Tone");
createPaint(VJ, 72100, "Rosy Flesh");
createPaint(VJ, 72101, "Off White");
createPaint(VJ, 72102, "Steel Grey");
createPaint(VJ, 72103, "Yellow");
createPaint(VJ, 72104, "Fluo Green");
createPaint(VJ, 72105, "Mutation Green", true);
createPaint(VJ, 72106, "Scarlet Blood");
createPaint(VJ, 72107, "Anthea Skin");
createPaint(VJ, 72108, "Succubs Skin");
createPaint(VJ, 72109, "Toxic Yellow");
createPaint(VJ, 72110, "Sunset Orange");
createPaint(VJ, 72111, "Nocturnal Red");
createPaint(VJ, 72112, "Evil Red");
createPaint(VJ, 72113, "Deep Magenta");
createPaint(VJ, 72114, "Lustful Purple");
createPaint(VJ, 72115, "Grunge Brown");
createPaint(VJ, 72116, "Midnight Purple");
createPaint(VJ, 72117, "Elfic Blue");
createPaint(VJ, 72118, "Sunrise Blue");
createPaint(VJ, 72119, "Aquamarine");
createPaint(VJ, 72120, "Abyssal Turquoise");
createPaint(VJ, 72121, "Ghost Green");
createPaint(VJ, 72122, "Bile Green");
createPaint(VJ, 72123, "Angel Green");
createPaint(VJ, 72124, "Gorgon Brown");
createPaint(VJ, 72140, "Heavy Skint.", true);
createPaint(VJ, 72141, "Heavy Red", true);
createPaint(VJ, 72142, "Heavy Violet", true);
createPaint(VJ, 72143, "Heavy Blue", true);
createPaint(VJ, 72144, "Heavy Bluegr.", true);
createPaint(VJ, 72145, "Dirty Grey");
createPaint(VJ, 72146, "Heavy Green", true);
createPaint(VJ, 72147, "H. Black Green", true);
createPaint(VJ, 72148, "Warm Grey");
createPaint(VJ, 72149, "Heavy Kakhi", true);
createPaint(VJ, 72150, "Heavy Ocre", true);
createPaint(VJ, 72151, "Heavy Gold Br.", true);
createPaint(VJ, 72152, "Heavy Orange", true);
createPaint(VJ, 72153, "Heavy Brown", true);
createPaint(VJ, 72154, "Heavy Sienna", true);
createPaint(VJ, 72155, "Charcoal");
createPaint(VJ, 72156, "Orange");
createPaint(VJ, 72157, "Red");
createPaint(VJ, 72158, "Magenta");
createPaint(VJ, 72159, "Violet");
createPaint(VJ, 72160, "Blue");
createPaint(VJ, 72161, "Cold Green");

createPaint(VJ, 72208, "Yellow");
createPaint(VJ, 72209, "Violet");

createPaint(VJ, 72401, "Templar White");
createPaint(VJ, 72402, "Dwarf Skin");
createPaint(VJ, 72403, "Imperial Yellow");
createPaint(VJ, 72404, "Nuclear Yellow");
createPaint(VJ, 72405, "Martian Orange");
createPaint(VJ, 72406, "Plasma Red");
createPaint(VJ, 72407, "Velvet Red");
createPaint(VJ, 72408, "Cardinal Purple");
createPaint(VJ, 72409, "Deep Purple");
createPaint(VJ, 72410, "Gloomy Violet");
createPaint(VJ, 72411, "Mystic Blue");
createPaint(VJ, 72412, "Storm Blue");
createPaint(VJ, 72413, "Omega Blue");
createPaint(VJ, 72414, "Caribbean Turquoise");
createPaint(VJ, 72415, "Orc Skin");
createPaint(VJ, 72416, "Troll Green");
createPaint(VJ, 72417, "Snake Green");
createPaint(VJ, 72418, "Lizard Green");
createPaint(VJ, 72419, "Plague Green");
createPaint(VJ, 72420, "Wasteland Brown");
createPaint(VJ, 72421, "Cpper Brown");
createPaint(VJ, 72422, "Space Grey");
createPaint(VJ, 72423, "Black Lotus");
createPaint(VJ, 72448, "Xpress Medium");
createPaint(VJ, 72750, "Cold Grey");

createPaint(VJ, 73200, "Sepia Wash");
createPaint(VJ, 73201, "Black Wash");
createPaint(VJ, 73202, "Pale Grey Wash");
createPaint(VJ, 73203, "Umber Wash");
createPaint(VJ, 73204, "Flesh Wash");
createPaint(VJ, 73205, "Green Wash");
createPaint(VJ, 73206, "Red Wash");
createPaint(VJ, 73207, "Blue Wash");


createPaint(GW, "21-01", "Averland Sunset");
createPaint(GW, "21-02", "Jokaero Orange");
createPaint(GW, "21-03", "Mephiston Red");
createPaint(GW, "21-04", "Khorne Red");
createPaint(GW, "21-06", "Daemonette Hide");
createPaint(GW, "21-06", "Naggaroth Night");
createPaint(GW, "21-07", "Kantor Blue");
createPaint(GW, "21-08", "Macragge Blue");
createPaint(GW, "21-09", "Caledor Sky");
createPaint(GW, "21-10", "Stegadon Scale Green");
createPaint(GW, "21-11", "Incubi Darkness");
createPaint(GW, "21-12", "Caliban Green");
createPaint(GW, "21-14", "Castellan Green");
createPaint(GW, "21-15", "Death W. Forest");
createPaint(GW, "21-16", "Zandri Dust");
createPaint(GW, "21-17", "Steel Legion Drab");
createPaint(GW, "21-18", "Bugmans Glow");
createPaint(GW, "21-19", "Ratskin Flesh");
createPaint(GW, "21-20", "Mournfang Brown");
createPaint(GW, "21-21", "XV88");
createPaint(GW, "21-22", "Rinox Hide");
createPaint(GW, "21-23", "Dryad Bark");
createPaint(GW, "21-24", "Mechanicus SG");
createPaint(GW, "21-25", "Abbadon Black");
createPaint(GW, "21-26", "Celestra Grey");
createPaint(GW, "21-27", "Rakath Flesh");
createPaint(GW, "21-28", "Leadbelcher");
createPaint(GW, "21-29", "Balthazar Gold");
createPaint(GW, "21-30", "Screaming Bell");
createPaint(GW, "21-31", "WarplockBronze");
createPaint(GW, "21-32", "The Fang");
createPaint(GW, "21-33", "Screamer Pink");
createPaint(GW, "21-35", "Retributor Armour");
createPaint(GW, "21-36", "Thousand Sons Blue");
createPaint(GW, "21-37", "Death Guard Green");
createPaint(GW, "21-39", "Phoenician Purple");
createPaint(GW, "21-41", "Gal Vorbak Red");
createPaint(GW, "21-42", "Night Lord Blue");
createPaint(GW, "21-44", "Corvus Black");
createPaint(GW, "21-49", "Barak-Nar Burgundy");
createPaint(GW, "21-52", "Corax White");
createPaint(GW, "21-54", "Grey Seer");
createPaint(GW, "21-55", "Runelord Brass");

createPaint(GW, "22-01", "Yriel Yellow");
createPaint(GW, "22-02", "Flash Gitz Yellow");
createPaint(GW, "22-03", "Troll Slayer Oran.");
createPaint(GW, "22-04", "Fire Dragon Br.");
createPaint(GW, "22-05", "Evil Sunz Scarlet");
createPaint(GW, "22-06", "Wild Rider Red");
createPaint(GW, "22-07", "Wazdakka Red");
createPaint(GW, "22-09", "Xereus Purple");
createPaint(GW, "22-10", "Genestealer Purple");
createPaint(GW, "22-12", "Slaanesh Grey");
createPaint(GW, "22-11", "Warpfiend Grey");
createPaint(GW, "22-14", "Hoeth Blue");
createPaint(GW, "22-15", "Altd. Guard Blue");
createPaint(GW, "22-16", "Calgar Blue");
createPaint(GW, "22-17", "Teclis Blue");
createPaint(GW, "22-18", "Lothern Blue");
createPaint(GW, "22-19", "Sotek Green");
createPaint(GW, "22-20", "Temple Guard Blue");
createPaint(GW, "22-21", "Kabalite Green");
createPaint(GW, "22-22", "Sybarite Green");
createPaint(GW, "22-23", "Warpstone Glow");
createPaint(GW, "22-24", "Moot Green");
createPaint(GW, "22-25", "Warboss Green");
createPaint(GW, "22-26", "Skarsnik Green");
createPaint(GW, "22-27", "Loren Forest");
createPaint(GW, "22-29", "Nurgling Green");
createPaint(GW, "22-30", "Elysian Green");
createPaint(GW, "22-31", "Ogryn Camo");
createPaint(GW, "22-32", "Ushabti Bone");
createPaint(GW, "22-33", "Screaming Skull");
createPaint(GW, "22-34", "Tallarn Sand");
createPaint(GW, "22-35", "Karak Stone");
createPaint(GW, "22-36", "Cadian Fleshtone");
createPaint(GW, "22-37", "Kislev Flesh");
createPaint(GW, "22-38", "Bestigor Flesh");
createPaint(GW, "22-39", "Ungor Flesh");
createPaint(GW, "22-40", "Skrag Brown");
createPaint(GW, "22-41", "Death claw brown");
createPaint(GW, "22-42", "Tau Light Ochre");
createPaint(GW, "22-43", "Balor Brown");
createPaint(GW, "22-44", "Zamesi Desert");
createPaint(GW, "22-45", "Doombull Brown");
createPaint(GW, "22-46", "Tuskgor Fur");
createPaint(GW, "22-47", "Gorthor Brown");
createPaint(GW, "22-48", "Baneblade Brown");
createPaint(GW, "22-49", "Dawnstone");
createPaint(GW, "22-50", "Administratum Grey");
createPaint(GW, "22-51", "Eshin Grey");
createPaint(GW, "22-52", "Dark Reaper");
createPaint(GW, "22-54", "Skavenblight Dinge");
createPaint(GW, "22-55", "Stormvermin Fur");
createPaint(GW, "22-56", "Ulthuan Grey");
createPaint(GW, "22-57", "White Scar");
createPaint(GW, "22-58", "Pallid Wych Flesh");
createPaint(GW, "22-59", "Ironbreaker");
createPaint(GW, "22-60", "Runefang Steel");
createPaint(GW, "22-61", "Gehenna's Gold");
createPaint(GW, "22-62", "Auric Arm. Gold");
createPaint(GW, "22-63", "Hashut Copper");
createPaint(GW, "22-65", "Brass Scorpion");
createPaint(GW, "22-67", "Russ Grey");
createPaint(GW, "22-68", "Fenrisian Grey");
createPaint(GW, "22-69", "Pink Horror");
createPaint(GW, "22-70", "Emperor's Children");
createPaint(GW, "22-72", "Flayed One Flesh");
createPaint(GW, "22-75", "Stormhost Silver");
createPaint(GW, "22-78", "Gauss Blaster Green");
createPaint(GW, "22-79", "Baharroth Blue");
createPaint(GW, "22-80", "Dorn Yellow");
createPaint(GW, "22-81", "Fulgrim Pink");
createPaint(GW, "22-82", "Dechala Lilac");
createPaint(GW, "22-83", "Krieg Khaki");
createPaint(GW, "22-84", "Blue Horror");
createPaint(GW, "22-85", "Lugganath Orange");
createPaint(GW, "22-91", "Word Bearers Red");

createPaint(GW, "23-14", "Golden Griffon");

createPaint(GW, "24-02", "Fuegan Orange");
createPaint(GW, "24-03", "Carroburg Crimson");
createPaint(GW, "24-04", "Druchii Violet");
createPaint(GW, "24-05", "Drakenhof Nightshade");
createPaint(GW, "24-07", "Biel-Tan Green");
createPaint(GW, "24-08", "Athonian Camoshade");
createPaint(GW, "24-09", "Seraphin Sepia");
createPaint(GW, "24-10", "Reikland Fleshshade");
createPaint(GW, "24-11", "Agrax Earthshade");
createPaint(GW, "24-12", "Nuln Oil");

createPaint(GW, "27-06", "Nihilakh Oxide");
createPaint(GW, "27-19", "Nighthaunt Gloom");

createPaint(GW, "28-09", "Deathworld Forest");

createPaint(GW, "29-10", "Iyanden Yellow");
createPaint(GW, "29-12", "Blood Angels Red");
createPaint(GW, "29-13", "Flesh Tearers Red");
createPaint(GW, "29-14", "Volupus Pink");
createPaint(GW, "29-18", "Ultramarines Blue");
createPaint(GW, "29-23", "Creed Camo");
createPaint(GW, "29-24", "Militarum Green");
createPaint(GW, "29-27", "Snakebite Leather");
createPaint(GW, "29-28", "Gore-grunta Fur");
createPaint(GW, "29-30", "Wyldwood");
createPaint(GW, "29-32", "Guilliman Flesh");
createPaint(GW, "29-33", "Darkoath Flesh");
createPaint(GW, "29-34", "Apothecary White");
createPaint(GW, "29-39", "Talassar Blue");
createPaint(GW, "29-47", "Mantis Warrior Green");
createPaint(GW, "29-48", "Aeldari Emerald");
createPaint(GW, "29-50", "Karandras Green");
createPaint(GW, "29-54", "Imperial Fist");
createPaint(GW, "29-55", "Kroxigor Scales");
createPaint(GW, "29-56", "Briar Queen Chill");
createPaint(GW, "29-60", "Celestium Blue");
createPaint(GW, "29-63", "Luxion Purple");
createPaint(GW, "29-66", "Doomfire Magenta");
createPaint(GW, "29-68", "Magmadroth Flame");


createPaint(AP, "WP1101", "Matt Black");
createPaint(AP, "WP1102", "Matt White");
createPaint(AP, "WP1104", "Pure Red");
createPaint(AP, "WP1105", "Dragon Red");
createPaint(AP, "WP1106", "Lava Orange");
createPaint(AP, "WP1107", "Demonic Yellow");
createPaint(AP, "WP1108", "Necrotic Flesh");
createPaint(AP, "WP1109", "Goblin Green");
createPaint(AP, "WP1110", "Army Green");
createPaint(AP, "WP1111", "Greenskin");
createPaint(AP, "WP1112", "Angel Green");
createPaint(AP, "WP1113", "Electric Blue");
createPaint(AP, "WP1114", "Crystal Blue");
createPaint(AP, "WP1115", "Ultramarine Blue");
createPaint(AP, "WP1116", "Deep Blue");
createPaint(AP, "WP1117", "Ash Grey");
createPaint(AP, "WP1118", "Uniform Grey");
createPaint(AP, "WP1119", "Wolf Grey");
createPaint(AP, "WP1120", "Monster Brown");
createPaint(AP, "WP1121", "Desert Yellow");
createPaint(AP, "WP1122", "Fur Brown");
createPaint(AP, "WP1123", "Leather Brown");
createPaint(AP, "WP1124", "Oak Brown");
createPaint(AP, "WP1125", "Skeleton Bone");
createPaint(AP, "WP1126", "Barbarian Flesh");
createPaint(AP, "WP1127", "Tanned Flesh");
createPaint(AP, "WP1128", "Alien Purple");
createPaint(AP, "WP1129", "Shining Silver");
createPaint(AP, "WP1130", "Plate Mail Metal");
createPaint(AP, "WP1131", "Gun Metal");
createPaint(AP, "WP1132", "Greedy Gold");
createPaint(AP, "WP1133", "Weapon Bronze");
createPaint(AP, "WP1134", "Soft Tone Ink");
createPaint(AP, "WP1135", "Strong Tone Wash");
createPaint(AP, "WP1136", "Dark Tone Ink");
createPaint(AP, "WP1137", "Green Tone Wash");
createPaint(AP, "WP1138", "Red Tone Ink");
createPaint(AP, "WP1139", "Blue Tone Ink");
createPaint(AP, "WP1140", "Purple Tone Ink");
createPaint(AP, "WP1141", "Hydra Turquoise");
createPaint(AP, "WP1142", "Chaotic Red");
createPaint(AP, "WP1143", "Flesh Wash");

createPaint(AP, "WP1211", "Prison Jumpsuit");
createPaint(AP, "WP1221", "Machinegun Metal");
createPaint(AP, "WP1231", "Bright Gold");

createPaint(AP, "WP1401", "Abomination Gore");
createPaint(AP, "WP1402", "Arid Earth");
createPaint(AP, "WP1403", "Babe Blond");
createPaint(AP, "WP1404", "Banshee Brown");
createPaint(AP, "WP1405", "Basilisk Brown");
createPaint(AP, "WP1406", "Brainmatter Beige");
createPaint(AP, "WP1407", "Castle Grey");
createPaint(AP, "WP1408", "Centaur Skin");
createPaint(AP, "WP1410", "Commando Green");
createPaint(AP, "WP1411", "Corpse Pale");
createPaint(AP, "WP1412", "Crusted Sore");
createPaint(AP, "WP1413", "Crypt Wraith");
createPaint(AP, "WP1414", "Cultist Robe");
createPaint(AP, "WP1415", "Dark Sky");
createPaint(AP, "WP1416", "Dirt Spatter");
createPaint(AP, "WP1417", "Drake Tooth");
createPaint(AP, "WP1418", "Dungeon Grey");
createPaint(AP, "WP1419", "Elemental Bolt");
createPaint(AP, "WP1420", "Elf Green");
createPaint(AP, "WP1421", "Elven Flesh");
createPaint(AP, "WP1424", "Filthy Cape");
createPaint(AP, "WP1425", "Dark Stone");
createPaint(AP, "WP1426", "Fire Lizard");
createPaint(AP, "WP1427", "Fog Grey");
createPaint(AP, "WP1428", "Gorgon Hide");
createPaint(AP, "WP1429", "Griffon Blue");
createPaint(AP, "WP1430", "Hardened Carapace");
createPaint(AP, "WP1431", "Hemp Rope");
createPaint(AP, "WP1432", "Ice Storm");
createPaint(AP, "WP1433", "Jungle Green");
createPaint(AP, "WP1434", "Kobold Skin");
createPaint(AP, "WP1435", "Kraken Skin");
createPaint(AP, "WP1436", "Mars Red");
createPaint(AP, "WP1437", "Toxic Mist");
createPaint(AP, "WP1438", "Moon Dust");
createPaint(AP, "WP1439", "Mouldy Clothes");
createPaint(AP, "WP1440", "Mummy Robes");
createPaint(AP, "WP1442", "Mythical Orange");
createPaint(AP, "WP1443", "Necromancer Cloak");
createPaint(AP, "WP1444", "Grimoire Purple");
createPaint(AP, "WP1445", "Oozing Purple");
createPaint(AP, "WP1446", "Phoenix Flames");
createPaint(AP, "WP1447", "Pixie Pink");
createPaint(AP, "WP1448", "Poisonous Cloud");
createPaint(AP, "WP1449", "Royal Cloak");
createPaint(AP, "WP1450", "Scaly Hide");
createPaint(AP, "WP1451", "Warlock Purple");
createPaint(AP, "WP1452", "Voidshield Blue");
createPaint(AP, "WP1454", "Spaceship Exterior");
createPaint(AP, "WP1455", "Stone Golem");
createPaint(AP, "WP1456", "Sulfide Ochre");
createPaint(AP, "WP1457", "Toxic Boils");
createPaint(AP, "WP1459", "Troll Claws");
createPaint(AP, "WP1458", "Troglodyte Blue");
createPaint(AP, "WP1460", "Vampire Red");
createPaint(AP, "WP1461", "Venom Wyrm");
createPaint(AP, "WP1462", "Viking Blue");
createPaint(AP, "WP1464", "Werewolf Fur");
createPaint(AP, "WP1463", "Wasteland Soil");
createPaint(AP, "WP1465", "Witch Brew");
createPaint(AP, "WP1466", "Wizards Orb");
createPaint(AP, "WP1467", "True Copper");
createPaint(AP, "WP1468", "Rough Iron");
createPaint(AP, "WP1471", "Military Shade");
createPaint(AP, "WP1480", "Scar Tissue");
createPaint(AP, "WP1481", "Field Grey");


createPaint(OLD_GW, "old-gw-asurmen-blue-wash", "Asurmen Blue Wash");
createPaint(OLD_GW, "old-gw-baal-red-wash", "Baal Red Wash");
createPaint(OLD_GW, "old-gw-bad-moon-yellow", "Bad Moon Yellow");
createPaint(OLD_GW, "old-gw-badab-black-wash", "Badab Black Wash");
createPaint(OLD_GW, "old-gw-bilious-green", "Bilious Green");
createPaint(OLD_GW, "old-gw-blazing-orange", "Blazing Orange");
createPaint(OLD_GW, "old-gw-blood-red", "Blood Red");
createPaint(OLD_GW, "old-gw-brunished-gold", "Brunished Gold");
createPaint(OLD_GW, "old-gw-camo-green", "Camo Green");
createPaint(OLD_GW, "old-gw-catachan-green", "Catachan Green");
createPaint(OLD_GW, "old-gw-dark-angels-green", "Dark Angels Green");
createPaint(OLD_GW, "old-gw-devlan-mud-wash", "Devlan Mud Wash");
createPaint(OLD_GW, "old-gw-desert-yellow", "Desert Yellow");
createPaint(OLD_GW, "old-gw-elf-flesh", "Elf Flesh");
createPaint(OLD_GW, "old-gw-enchanted-blue", "Enchanted Blue");
createPaint(OLD_GW, "old-gw-fiery-orange", "Fiery Orange");
createPaint(OLD_GW, "old-gw-goblin-green", "Goblin Green");
createPaint(OLD_GW, "old-gw-golden-yellow", "Golden Yellow");
createPaint(OLD_GW, "old-gw-hawk-turquoise", "Hawk Turquoise");
createPaint(OLD_GW, "old-gw-ice-blue", "Ice Blue");
createPaint(OLD_GW, "old-gw-imperial-purple", "Imperial Purple");
createPaint(OLD_GW, "old-gw-jade-green", "Jade Green");
createPaint(OLD_GW, "old-gw-knarloc-green", "Knarloc Green");
createPaint(OLD_GW, "old-gw-liche-purple", "Liche Purple");
createPaint(OLD_GW, "old-gw-lightning-bolt-blue", "Lightning Bolt Blue");
createPaint(OLD_GW, "old-gw-macharius-solar-orange", "Macharius Solar Orange");
createPaint(OLD_GW, "old-gw-mechrite-red", "Mechrite Red");
createPaint(OLD_GW, "old-gw-mordian-blue", "Mordian Blue");
createPaint(OLD_GW, "old-gw-midnight-blue", "Midnight Blue");
createPaint(OLD_GW, "old-gw-nauseating-blue", "Nauseating Blue");
createPaint(OLD_GW, "old-gw-orkhide-shade", "Orkhide Shade");
createPaint(OLD_GW, "old-gw-pallid-flesh", "Pallid Flesh");
createPaint(OLD_GW, "old-gw-red-gore", "Red Gore");
createPaint(OLD_GW, "old-gw-regal-blue", "Regal Blue");
createPaint(OLD_GW, "old-gw-scab-red", "Scab Red");
createPaint(OLD_GW, "old-gw-scaly-green", "Scaly Green");
createPaint(OLD_GW, "old-gw-scorpion-green", "Scorpion Green");
createPaint(OLD_GW, "old-gw-skull-white", "Skull White");
createPaint(OLD_GW, "old-gw-smelly-primer", "Smelly Primer");
createPaint(OLD_GW, "old-gw-snot-green", "Snot Green");
createPaint(OLD_GW, "old-gw-sunburst-yellow", "Sunburst Yellow");
createPaint(OLD_GW, "old-gw-storm-blue", "Storm Blue");
createPaint(OLD_GW, "old-gw-tentacle-pink", "Tentacle Pink");
createPaint(OLD_GW, "old-gw-ultramarine-blue", "Ultramarine Blue");
createPaint(OLD_GW, "old-gw-vile-green", "Vile Green");
createPaint(OLD_GW, "old-gw-warlock-purple", "Warlock Purple");

createPaint(OLD_GW, "old-gw-gretchin-green", "Gretchin Green");
createPaint(OLD_GW, "old-gw-rotting-flesh", "Rotting Flesh");
createPaint(OLD_GW, "old-gw-bleached-bone", "Bleached Bone");
createPaint(OLD_GW, "old-gw-kommando-khaki", "Kommando Khaki");
createPaint(OLD_GW, "old-gw-bronzed-flesh", "Bronzed Flesh");
createPaint(OLD_GW, "old-gw-vomit-brown", "Vomit Brown");
createPaint(OLD_GW, "old-gw-dwarf-flesh", "Dwarf Flesh");
createPaint(OLD_GW, "old-gw-tanned-flesh", "Tanned Flesh");
createPaint(OLD_GW, "old-gw-leprous-brown", "Leprous Brown");
createPaint(OLD_GW, "old-gw-bubonic-brown", "Bubonic Brown");
createPaint(OLD_GW, "old-gw-snakebite-leather", "Snakebite Leather");
createPaint(OLD_GW, "old-gw-tausept-ochre", "Tausept Ochre");
createPaint(OLD_GW, "old-gw-vermin-brown", "Vermin Brown");
createPaint(OLD_GW, "old-gw-scorched-brown", "Scorched Brown");
createPaint(OLD_GW, "old-gw-dark-flesh", "Dark Flesh");
createPaint(OLD_GW, "old-gw-khemri-brown", "Khemri Brown");
createPaint(OLD_GW, "old-gw-bestial-brown", "Bestial Brown");
createPaint(OLD_GW, "old-gw-calthan-brown", "Calthan Brown");
createPaint(OLD_GW, "old-gw-terracotta", "Terracotta");
createPaint(OLD_GW, "old-gw-graveyard-earth", "Graveyard Earth");
createPaint(OLD_GW, "old-gw-kommando-khaki", "Kommando Khaki");
createPaint(OLD_GW, "old-gw-ghostly-grey", "Ghostly Grey");
createPaint(OLD_GW, "old-gw-space-wolves-grey", "Space Wolves Grey");
createPaint(OLD_GW, "old-gw-shadow-grey", "Shadow Grey");
createPaint(OLD_GW, "old-gw-fortress-grey", "Fortress Grey");
createPaint(OLD_GW, "old-gw-codex-grey", "Codex Grey");
createPaint(OLD_GW, "old-gw-adeptus-battlegrey", "Adeptus Battlegrey");
createPaint(OLD_GW, "old-gw-astronomicon-grey", "Astronomicon Grey");
createPaint(OLD_GW, "old-gw-chaos-black", "Chaos Black");
createPaint(OLD_GW, "old-gw-mithril-silver", "Mithril Silver");
createPaint(OLD_GW, "old-gw-chainmail", "Chainmail");
createPaint(OLD_GW, "old-gw-boltgun-metal", "Boltgun Metal");
createPaint(OLD_GW, "old-gw-burnished-gold", "Burnished Gold");
createPaint(OLD_GW, "old-gw-shining-gold", "Shining Gold");
createPaint(OLD_GW, "old-gw-dwarf-bronze", "Dwarf Bronze");
createPaint(OLD_GW, "old-gw-brazen-brass", "Brazen Brass");
createPaint(OLD_GW, "old-gw-beaten-copper", "Beaten Copper");
createPaint(OLD_GW, "old-gw-tin-bitz", "Tin Bitz");
createPaint(OLD_GW, "old-gw-black-ink", "Black Ink");
createPaint(OLD_GW, "old-gw-dark-green-ink", "Dark Green Ink");
createPaint(OLD_GW, "old-gw-flesh-wash", "Flesh Wash");
createPaint(OLD_GW, "old-gw-magenta-ink", "Magenta Ink");
createPaint(OLD_GW, "old-gw-purple-ink", "Purple Ink");
createPaint(OLD_GW, "old-gw-charadon-granite", "Charadon Granite");
createPaint(OLD_GW, "old-gw-dheneb-stone", "Dheneb Stone");
createPaint(OLD_GW, "old-gw-hormagaunt-purple", "Hormagaunt Purple");
createPaint(OLD_GW, "old-gw-iyanden-darksun", "Iyanden Darksun");
createPaint(OLD_GW, "old-gw-tallarn-flesh", "Tallarn Flesh");
createPaint(OLD_GW, "old-gw-gryphonne-sepia-wash", "Gryphonne Sepia Wash");
createPaint(OLD_GW, "old-gw-leviathan-purple-wash", "Leviathan Purple Wash");
createPaint(OLD_GW, "old-gw-ogryn-flesh-wash", "Ogryn Flesh Wash");

createPaint(GSW, 1778, "Nuclear White");
createPaint(GSW, 1779, "Black Stallion");
createPaint(GSW, 1780, "Banana Split");
createPaint(GSW, 1780, "Cyber Yellow");
createPaint(GSW, 1782, "Go Mango");
createPaint(GSW, 1783, "Mustard Yellow");
createPaint(GSW, 1784, "Flaming Orange");
createPaint(GSW, 1785, "Ember Orange");
createPaint(GSW, 1786, "Hellfire Red");
createPaint(GSW, 1787, "Cutthroat Red");
createPaint(GSW, 1788, "Majin Pink");
createPaint(GSW, 1789, "Sangria Red");
createPaint(GSW, 1790, "Liche Purple");
createPaint(GSW, 1791, "Abyss Blue");
createPaint(GSW, 1792, "Marine Blue");
createPaint(GSW, 1793, "Summersea Blue");
createPaint(GSW, 1794, "Zima Blue");
createPaint(GSW, 1795, "Tropical Turquoise");
createPaint(GSW, 1796, "Kraken Green");
createPaint(GSW, 1797, "Forest Green");
createPaint(GSW, 1798, "Hunter Green");
createPaint(GSW, 1799, "Warcry Green");
createPaint(GSW, 1800, "Camouflage Green");
createPaint(GSW, 1820, "Flubber Green");
createPaint(GSW, 1821, "Olivegrove Green");
createPaint(GSW, 1822, "Zombie Flesh");
createPaint(GSW, 1823, "Sun-bleached Bone");
createPaint(GSW, 1824, "Komodo Khaki");
createPaint(GSW, 1825, "Peach Flesh");
createPaint(GSW, 1826, "Dwarven Flesh");
createPaint(GSW, 1827, "Blushing Flesh");
createPaint(GSW, 1828, "Ochre Desert");
createPaint(GSW, 1829, "Leather Brown");
createPaint(GSW, 1830, "Foxhide Brown");
createPaint(GSW, 1831, "Choco Brown");
createPaint(GSW, 1832, "Redwood Brown");
createPaint(GSW, 1833, "Bestial Brown");
createPaint(GSW, 1834, "Quicksand Brown");
createPaint(GSW, 1835, "Wolven Grey");
createPaint(GSW, 1836, "Bluegrey Dusk");
createPaint(GSW, 1837, "Moonstone Grey");
createPaint(GSW, 1838, "Slate Grey");
createPaint(GSW, 1839, "Lollipop Magenta");
createPaint(GSW, 1840, "Mirage Blue");
createPaint(GSW, 1841, "Dark Umber");
createPaint(GSW, 1842, "Steel Grey");
createPaint(GSW, 1843, "Ivory Tusk");
createPaint(GSW, 1844, "Pale Flesh");
createPaint(GSW, 1845, "Elven Flesh");
createPaint(GSW, 1846, "Imperium Blue");
createPaint(GSW, 1847, "Malefic Purple");
createPaint(GSW, 1848, "Military Green");
createPaint(GSW, 1849, "Field Green-Grey");
createPaint(GSW, 1850, "Rocket Green");
createPaint(GSW, 1851, "Gangrene");
createPaint(GSW, 1852, "Scorched Wood");
createPaint(GSW, 1853, "Overlord Olive");
createPaint(GSW, 1854, "Dark Beige");
createPaint(GSW, 1855, "English Field Brown");
createPaint(GSW, 1856, "Coyote Brown");
createPaint(GSW, 1857, "Desert Camo");
createPaint(GSW, 1858, "Yellow-Brown Ops");
createPaint(GSW, 1859, "Valkyrie Yellow");
createPaint(GSW, 1860, "Gunmetal Grey");
createPaint(GSW, 1861, "Quicksilver");
createPaint(GSW, 1862, "Anthrax Metal");
createPaint(GSW, 1863, "Mystic White");
createPaint(GSW, 1864, "Sharkfin Blue");
createPaint(GSW, 1865, "Tinmetal Grey");
createPaint(GSW, 1866, "Dark Elder Bronze");
createPaint(GSW, 1867, "Gladius Bronze");
createPaint(GSW, 1868, "Steampunk Copper");
createPaint(GSW, 1869, "Shiny Gold");
createPaint(GSW, 1870, "El Dorado");
createPaint(GSW, 1871, "Antique Gold");
createPaint(GSW, 1872, "Neptunus Blue");
createPaint(GSW, 1873, "Sirenscale Green");
createPaint(GSW, 1874, "Caesar Red");
createPaint(GSW, 1875, "Persian Violet");
createPaint(GSW, 1876, "Aqua Turquoise");
createPaint(GSW, 1877, "Orchid Purple");
createPaint(GSW, 1882, "Barrel Grey");
createPaint(GSW, 1883, "Gengis Khaki");
createPaint(GSW, 1884, "Sandstorm");
createPaint(GSW, 1885, "Deck Grey");
createPaint(GSW, 1886, "Prussian Green");
createPaint(GSW, 1887, "Olive-Brown Ops");
createPaint(GSW, 3207, "Fang White");
createPaint(GSW, 3208, "Vanilla Drop");
createPaint(GSW, 3209, "Parchment");
createPaint(GSW, 3210, "Golden Cream");
createPaint(GSW, 3211, "Temple Ochre");
createPaint(GSW, 3212, "Tiger Brown");
createPaint(GSW, 3213, "Arrakis Brown");
createPaint(GSW, 3214, "Faded Orange");
createPaint(GSW, 3215, "Dusty Rose");
createPaint(GSW, 3216, "Flesh Rose");
createPaint(GSW, 3217, "Red Truth");
createPaint(GSW, 3219, "Brown Skin");
createPaint(GSW, 3220, "Wonka Violet");
createPaint(GSW, 3221, "Phantom Violet");
createPaint(GSW, 3222, "Chancellor Blue");
createPaint(GSW, 3223, "Prussian Blue");
createPaint(GSW, 3224, "Ultramar Blue");
createPaint(GSW, 3225, "Lapislazuli");
createPaint(GSW, 3226, "Smoked Blue");
createPaint(GSW, 3227, "Arctic Blue");
createPaint(GSW, 3228, "Grey Teal");
createPaint(GSW, 3229, "Viridian Green");
createPaint(GSW, 3230, "Rotten Green");
createPaint(GSW, 3231, "Canary Green");
createPaint(GSW, 3232, "Yoda Green");
createPaint(GSW, 3233, "Blackroot Grey");
createPaint(GSW, 3234, "Ranger Green");
createPaint(GSW, 3235, "Starship Grey");
createPaint(GSW, 3236, "Lilac Purple");
createPaint(GSW, 3237, "Mint Twister");
createPaint(GSW, 3238, "Bluebird Grey");
createPaint(GSW, 3239, "Arachnid Green");
createPaint(GSW, 3240, "Moon Mist Grey");
createPaint(GSW, 3259, "Whitecap Beige");

equivalence(SHIONN_SRC, [72051, "21-25", "old-gw-chaos-black", "WP1101", 1779]);
equivalence(SHIONN_SRC, [72049, "22-50", "old-gw-fortress-grey", "WP1117", 1837]);
equivalence(SHIONN_SRC, [72022, "22-15", "old-gw-ultramarine-blue", "WP1115", 1792]);
// TODO auric armor






equivalence(VJ_GC_SRC, [ 72001, "22-57"]);
equivalence(VJ_GC_SRC, [ 72004, "22-37"]);
equivalence(VJ_GC_SRC, [ 72005, "22-02"]);
equivalence(VJ_GC_SRC, [ 72006, "22-01"]);
equivalence(VJ_GC_SRC, [ 72008, "22-04"]);
equivalence(VJ_GC_SRC, [ 72009, "22-03"]);
equivalence(VJ_GC_SRC, [ 72010, "22-05"]);
equivalence(VJ_GC_SRC, [ 72011, "22-07"]);
equivalence(VJ_GC_SRC, [ 72012, "21-04"]);
equivalence(VJ_GC_SRC, [ 72013, "22-81"]);
equivalence(VJ_GC_SRC, [ 72014, "21-33"]);
equivalence(VJ_GC_SRC, [ 72015, "22-09"]);
equivalence(VJ_GC_SRC, [ 72019, "21-42"]);
equivalence(VJ_GC_SRC, [ 72021, "21-09"]);
equivalence(VJ_GC_SRC, [ 72022, "21-08"]);
equivalence(VJ_GC_SRC, [ 72023, "22-18"]);
equivalence(VJ_GC_SRC, [ 72024, "22-19"]);
equivalence(VJ_GC_SRC, [ 72025, "22-22"]);
equivalence(VJ_GC_SRC, [ 72027, "22-21"]);
equivalence(VJ_GC_SRC, [ 72028, "21-12"]);
equivalence(VJ_GC_SRC, [ 72029, "22-25"]);
equivalence(VJ_GC_SRC, [ 72031, "22-30"]);
equivalence(VJ_GC_SRC, [ 72032, "22-24"]);
equivalence(VJ_GC_SRC, [ 72034, "22-33"]);
equivalence(VJ_GC_SRC, [ 72035, "22-31"]);
equivalence(VJ_GC_SRC, [ 72036, "22-42"]);
equivalence(VJ_GC_SRC, [ 72038, "22-38"]);
equivalence(VJ_GC_SRC, [ 72039, "22-43"]);
equivalence(VJ_GC_SRC, [ 72040, "21-21"]);
equivalence(VJ_GC_SRC, [ 72042, "22-40"]);
equivalence(VJ_GC_SRC, [ 72044, "22-45"]);
equivalence(VJ_GC_SRC, [ 72045, "21-22"]);
equivalence(VJ_GC_SRC, [ 72047, "22-84"]);
equivalence(VJ_GC_SRC, [ 72048, "21-32"]);
equivalence(VJ_GC_SRC, [ 72049, "22-49"]);
equivalence(VJ_GC_SRC, [ 72051, "21-25"]);
equivalence(VJ_GC_SRC, [ 72061, "21-16"]);
equivalence(VJ_GC_SRC, [ 72062, "21-17"]);
equivalence(VJ_GC_SRC, [ 72063, "22-34"]);
equivalence(VJ_GC_SRC, [ 72066, "21-18"]);
equivalence(VJ_GC_SRC, [ 72067, "21-14"]);
equivalence(VJ_GC_SRC, [ 72076, "21-06"]);
equivalence(VJ_GC_SRC, [ 72107, "21-18"]);
equivalence(VJ_GC_SRC, [ 72109, "22-80"]);
equivalence(VJ_GC_SRC, [ 72114, "22-82"]);
equivalence(VJ_GC_SRC, [ 72117, "22-16"]);
equivalence(VJ_GC_SRC, [ 72118, "21-07"]);
equivalence(VJ_GC_SRC, [ 72120, "21-10"]);
equivalence(VJ_GC_SRC, [ 72121, "22-78"]);
equivalence(VJ_GC_SRC, [ 72124, "21-20"]);
equivalence(VJ_GC_SRC, [ 72145, "21-15"]);
equivalence(VJ_GC_SRC, [ 72148, "21-27"]);
equivalence(VJ_GC_SRC, [ 72155, "21-44"]);

equivalence(DAKKA, [ 72001, "22-57", "old-gw-skull-white", "WP1102"]);
equivalence(DAKKA, [ 72002, "old-gw-smelly-primer"]);
equivalence(DAKKA, [ 72003, "22-37", "old-gw-pallid-flesh", "WP1434"]);
equivalence(DAKKA, [ 72004, "old-gw-elf-flesh"]);
equivalence(DAKKA, [ 72005, "old-gw-bad-moon-yellow"]);
equivalence(DAKKA, [ 72006, "22-02", "old-gw-sunburst-yellow", "WP1107"]);
equivalence(DAKKA, [ 72007, "old-gw-golden-yellow"]);
equivalence(DAKKA, [ 72063, "22-34", "old-gw-desert-yellow", "WP1121"]);
equivalence(DAKKA, [ 72152, "old-gw-macharius-solar-orange"]);
equivalence(DAKKA, [ 72008, "22-04", "old-gw-fiery-orange", "WP1211"]);
equivalence(DAKKA, [ 72009, "22-03", "old-gw-blazing-orange", "WP1442"]);
equivalence(DAKKA, [ 72141, "21-03", "old-gw-mechrite-red", "WP1460"]);
equivalence(DAKKA, [ 72010, "22-05", "old-gw-blood-red", "WP1104"]);
equivalence(DAKKA, [ "22-06", "WP1436"]);
equivalence(DAKKA, [ 72011, "22-07", "old-gw-red-gore", "WP1105"]);
equivalence(DAKKA, [ 72012, "old-gw-scab-red"]);
equivalence(DAKKA, [ "22-91", "WP1142"]);
equivalence(DAKKA, [ 72013, "old-gw-tentacle-pink"]);
equivalence(DAKKA, [ 72014, "old-gw-warlock-purple"]);
equivalence(DAKKA, [ "21-49", "WP1412"]);
equivalence(DAKKA, [ 72015, "22-09", "old-gw-liche-purple", "WP1128"]);
equivalence(DAKKA, [ 72016, "old-gw-imperial-purple"]);
equivalence(DAKKA, [ 72017, "old-gw-nauseating-blue"]);
equivalence(DAKKA, [ 72018, "old-gw-storm-blue"]);
equivalence(DAKKA, [ 72019, "old-gw-midnight-blue"]);
equivalence(DAKKA, [ 72020, "21-07", "old-gw-regal-blue", "WP1116"]);
equivalence(DAKKA, [ 72022, "22-15", "old-gw-ultramarine-blue", "WP1115"]);
equivalence(DAKKA, [ 72143, "21-08", "old-gw-mordian-blue", "WP1415"]);
equivalence(DAKKA, [ 72021, "21-09", "old-gw-enchanted-blue", "WP1114"]);
equivalence(DAKKA, [ 72095, "22-18", "old-gw-ice-blue", "WP1452"]);
equivalence(DAKKA, [ 72023, "22-17", "old-gw-lightning-bolt-blue", "WP1113"]);
equivalence(DAKKA, [ 72024, "22-19", "old-gw-hawk-turquoise", "WP1141"]);
equivalence(DAKKA, [ 72025, "old-gw-vile-green"]);
equivalence(DAKKA, [ 72026, "old-gw-jade-green"]);
equivalence(DAKKA, [ 72027, "old-gw-scaly-green"]);
equivalence(DAKKA, [ 72028, "21-12", "old-gw-dark-angels-green", "WP1112"]);
equivalence(DAKKA, [ 72029, "old-gw-snot-green"]);
equivalence(DAKKA, [ 72030, "22-25", "old-gw-goblin-green", "WP1109"]);
equivalence(DAKKA, [ 72031, "old-gw-camo-green"]);
equivalence(DAKKA, [ 72032, "old-gw-scorpion-green"]);
equivalence(DAKKA, [ 72033, "old-gw-bilious-green"]);
equivalence(DAKKA, [ 72067, "old-gw-catachan-green"]);
equivalence(DAKKA, [ 72147, "old-gw-orkhide-shade"]);
equivalence(DAKKA, [ 72146, "22-27", "old-gw-knarloc-green", "WP1110"]);
equivalence(DAKKA, [ 72149, "28-09", "old-gw-gretchin-green", "WP1461"]);
equivalence(DAKKA, [ 72035, "22-29", "old-gw-rotting-flesh", "WP1108"]);
equivalence(DAKKA, [ 72034, "22-32", "old-gw-bleached-bone", "WP1125"]);
equivalence(DAKKA, [ 72061, "old-gw-kommando-khaki"]);
equivalence(DAKKA, [ 72036, "old-gw-bronzed-flesh"]);
equivalence(DAKKA, [ 72037, "old-gw-vomit-brown"]);
equivalence(DAKKA, [ 72041, "21-19", "old-gw-dwarf-flesh", "WP1126"]);
equivalence(DAKKA, [ 72066, "21-18", "old-gw-tanned-flesh", "WP1127"]);
equivalence(DAKKA, [ 72038, "old-gw-leprous-brown"]);
equivalence(DAKKA, [ 72039, "old-gw-bubonic-brown"]);
equivalence(DAKKA, [ 72040, "old-gw-snakebite-leather"]);
equivalence(DAKKA, [ 72150, "old-gw-tausept-ochre"]);
equivalence(DAKKA, [ 72042, "old-gw-vermin-brown"]);
equivalence(DAKKA, [ 72045, "old-gw-scorched-brown"]);
equivalence(DAKKA, [ 72044, "old-gw-dark-flesh"]);
equivalence(DAKKA, [ "21-23", "WP1124"]);
equivalence(DAKKA, [ "22-47", "WP1464"]);
equivalence(DAKKA, [ 72153, "old-gw-khemri-brown"]);
equivalence(DAKKA, [ 72043, "old-gw-bestial-brown"]);
equivalence(DAKKA, [ 72154, "old-gw-calthan-brown"]);
equivalence(DAKKA, [ 72065, "old-gw-terracotta"]);
equivalence(DAKKA, [ 72062, "21-17", "old-gw-graveyard-earth", "WP1123"]);
equivalence(DAKKA, [ 72061, "old-gw-kommando-khaki"]);
equivalence(DAKKA, [ 72046, "old-gw-ghostly-grey"]);
equivalence(DAKKA, [ 72047, "old-gw-space-wolves-grey"]);
equivalence(DAKKA, [ 72048, "21-32", "old-gw-shadow-grey", "WP1119"]);
equivalence(DAKKA, [ 72049, "22-50", "old-gw-fortress-grey", "WP1117"]);
equivalence(DAKKA, [ 72050, "22-49", "old-gw-codex-grey", "WP1118"]);
equivalence(DAKKA, [ 72144, "old-gw-astronomicon-grey"]);
equivalence(DAKKA, [ 72051, "21-25", "old-gw-chaos-black", "WP1101"]);
equivalence(DAKKA, [ "21-44", "WP1443"]);
equivalence(DAKKA, [ 72052, "22-60", "old-gw-mithril-silver", "WP1129"]);
equivalence(DAKKA, [ 72053, "22-59", "old-gw-chainmail", "WP1130"]);
equivalence(DAKKA, [ 72054, "21-28", "old-gw-boltgun-metal", "WP1221"]);
equivalence(DAKKA, [ "22-62", "old-gw-burnished-gold", "WP1231"]);
equivalence(DAKKA, [ 72055, "22-61", "old-gw-shining-gold", "WP1132"]);
equivalence(DAKKA, [ 72057, "22-63", "old-gw-dwarf-bronze", "WP1133"]);
equivalence(DAKKA, [ 72058, "old-gw-brazen-brass"]);
equivalence(DAKKA, [ 72059, "old-gw-beaten-copper"]);
equivalence(DAKKA, [ 72060, "old-gw-tin-bitz"]);
equivalence(DAKKA, [ 72094, "old-gw-black-ink"]);
equivalence(DAKKA, [ 72089, "old-gw-dark-green-ink"]);
equivalence(DAKKA, [ 72087, "old-gw-purple-ink"]);
equivalence(DAKKA, [ 72155, "old-gw-charadon-granite"]);
equivalence(DAKKA, [ 72148, "21-27", "old-gw-dheneb-stone", "WP1417"]);
equivalence(DAKKA, [ 72142, "old-gw-hormagaunt-purple"]);
equivalence(DAKKA, [ 72151, "old-gw-iyanden-darksun"]);
equivalence(DAKKA, [ 72140, "old-gw-tallarn-flesh"]);
equivalence(DAKKA, [ 73207, "24-05", "old-gw-asurmen-blue-wash", "WP1139"]);
equivalence(DAKKA, [ 73206, "24-03", "old-gw-baal-red-wash", "WP1138"]);
equivalence(DAKKA, [ 73201, "24-12", "old-gw-badab-black-wash", "WP1136"]);
equivalence(DAKKA, [ 73203, "24-11", "old-gw-devlan-mud-wash", "WP1135"]);
equivalence(DAKKA, [ 73200, "24-09", "old-gw-gryphonne-sepia-wash", "WP1134"]);
equivalence(DAKKA, [ 73202, "24-04", "old-gw-leviathan-purple-wash", "WP1140"]);
equivalence(DAKKA, [ 73204, "24-10", "old-gw-ogryn-flesh-wash", "WP1143"]);
equivalence(DAKKA, [ 73205, "24-07", "WP1137"]);
equivalence(DAKKA, [ "24-08", "WP1471"]);
equivalence(DAKKA, [ "22-82", "WP1445"]);
equivalence(DAKKA, [ "29-55", "WP1108"]);
equivalence(DAKKA, [ "22-84", "WP1428"]);

equivalence(GSW_SRC, [ 72001, "22-57", "old-gw-skull-white", 1778]);
equivalence(GSW_SRC, [ 72051, "21-25", "old-gw-chaos-black", 1779]);
equivalence(GSW_SRC, [ 72005, "old-gw-bad-moon-yellow", 1780]);
equivalence(GSW_SRC, [ 72006, "22-02", "old-gw-sunburst-yellow", 1780]);
equivalence(GSW_SRC, [ 72007, "22-01", "old-gw-golden-yellow", 1782]);
equivalence(GSW_SRC, [ 72063, "old-gw-desert-yellow", 1783]);
equivalence(GSW_SRC, [ 72008, "22-02", "old-gw-fiery-orange", 1784]);
equivalence(GSW_SRC, [ 72009, "22-03", "old-gw-blazing-orange", 1785]);
equivalence(GSW_SRC, [ 72010, "22-05", "old-gw-blood-red", 1786]);
equivalence(GSW_SRC, [ 72011, "22-07", "old-gw-red-gore", 1787]);
equivalence(GSW_SRC, [ 72013, "old-gw-tentacle-pink", 1788]);
equivalence(GSW_SRC, [ 72014, "21-33", "old-gw-warlock-purple", 1789]);
equivalence(GSW_SRC, [ 72015, "22-09", "old-gw-liche-purple", 1790]);
equivalence(GSW_SRC, [ 72019, "old-gw-midnight-blue", 1791]);
equivalence(GSW_SRC, [ 72022, "22-15", "old-gw-ultramarine-blue", 1792]);
equivalence(GSW_SRC, [ 72021, "22-17", "old-gw-enchanted-blue", 1793]);
equivalence(GSW_SRC, [ 72023, "22-18", "old-gw-ice-blue", 1794]);
equivalence(GSW_SRC, [ 72024, "22-19", "old-gw-hawk-turquoise", 1795]);
equivalence(GSW_SRC, [ 72027, "22-21", "old-gw-scaly-green", 1796]);
equivalence(GSW_SRC, [ 72028, "old-gw-dark-angels-green", 1797]);
equivalence(GSW_SRC, [ 72029, "22-23", "old-gw-snot-green", 1798]);
equivalence(GSW_SRC, [ 72030, "22-25", "old-gw-goblin-green", 1799]);
equivalence(GSW_SRC, [ 72408, "22-30", "old-gw-camo-green", 1800]);
equivalence(GSW_SRC, [ 72032, "22-24", "old-gw-scorpion-green", 1820]);
equivalence(GSW_SRC, [ 72067, "old-gw-catachan-green", 1821]);
equivalence(GSW_SRC, [ 72035, "22-29", "old-gw-rotting-flesh", 1822]);
equivalence(GSW_SRC, [ 72034, "22-32", "old-gw-bleached-bone", 1823]);
equivalence(GSW_SRC, [ 72061, "old-gw-kommando-khaki", 1824]);
equivalence(GSW_SRC, [ 72036, "22-39", "old-gw-bronzed-flesh", 1825]);
equivalence(GSW_SRC, [ 72041, "21-19", "old-gw-dwarf-flesh", 1826]);
equivalence(GSW_SRC, [ 72066, "old-gw-tanned-flesh", 1827]);
equivalence(GSW_SRC, [ 72039, "22-44", "old-gw-bubonic-brown", 1828]);
equivalence(GSW_SRC, [ 72040, "21-21", "old-gw-snakebite-leather", 1829]);
equivalence(GSW_SRC, [ 72042, "old-gw-vermin-brown", 1830]);
equivalence(GSW_SRC, [ 72045, "21-23", "old-gw-scorched-brown", 1831]);
equivalence(GSW_SRC, [ 72044, "22-45", "old-gw-dark-flesh", 1832]);
equivalence(GSW_SRC, [ 72043, "21-20", "old-gw-bestial-brown", 1833]);
equivalence(GSW_SRC, [ 72062, 1834]);
equivalence(GSW_SRC, [ "22-68", "old-gw-space-wolves-grey", 1835]);
equivalence(GSW_SRC, [ 72048, "21-32", "old-gw-shadow-grey", 1836]);
equivalence(GSW_SRC, [ 72049, "22-50", "old-gw-fortress-grey", 1837]);
equivalence(GSW_SRC, [ 72050, "22-49", "old-gw-codex-grey", 1838]);
equivalence(GSW_SRC, [ 72014, "21-33", "old-gw-warlock-purple", 1839]);
equivalence(GSW_SRC, [ "22-47", 1841]);
equivalence(GSW_SRC, [ "22-52", 1842]);
equivalence(GSW_SRC, [ 72101, 1843]);
equivalence(GSW_SRC, [ 72003, "old-gw-pallid-flesh", 1844]);
equivalence(GSW_SRC, [ 72004, "22-37", "old-gw-elf-flesh", 1845]);
equivalence(GSW_SRC, [ 72020, "old-gw-regal-blue", 1846]);
equivalence(GSW_SRC, [ 72016, 1847]);
equivalence(GSW_SRC, [ "21-14", 1848]);
equivalence(GSW_SRC, [ "21-12", 1849]);
equivalence(GSW_SRC, [ "22-25", 1850]);
equivalence(GSW_SRC, [ "28-09", 1851]);
equivalence(GSW_SRC, [ "21-22", 1852]);
equivalence(GSW_SRC, [ 72153, "21-10", 1855]);
equivalence(GSW_SRC, [ "22-38", 1856]);
equivalence(GSW_SRC, [ "22-34", 1857]);
equivalence(GSW_SRC, [ "22-80", 1859]);
equivalence(GSW_SRC, [ "22-51", 1882]);
equivalence(GSW_SRC, [ 72148, "21-15", 1883]);
equivalence(GSW_SRC, [ "22-35", 1884]);
equivalence(GSW_SRC, [ "21-11", 1886]);
equivalence(GSW_SRC, [ "21-01", 3210]);
equivalence(GSW_SRC, [ 72098, "22-33", 3211]);
equivalence(GSW_SRC, [ 72038, 3212]);
equivalence(GSW_SRC, [ 72037, 3213]);
equivalence(GSW_SRC, [ "22-85", 3214]);
equivalence(GSW_SRC, [ "22-07", 3219]);
equivalence(GSW_SRC, [ "21-39", 3220]);
equivalence(GSW_SRC, [ "22-10", 3221]);
equivalence(GSW_SRC, [ "21-07", 3225]);
equivalence(GSW_SRC, [ "22-16", 3226]);
equivalence(GSW_SRC, [ "22-84", 3228]);
equivalence(GSW_SRC, [ "22-22", 3229]);
equivalence(GSW_SRC, [ "22-24", 3230]);
equivalence(GSW_SRC, [ "21-15", 3232]);
equivalence(GSW_SRC, [ "22-82", 3236]);
equivalence(GSW_SRC, [ "22-78", 3237]);
equivalence(GSW_SRC, [ "22-12", 3238]);
equivalence(GSW_SRC, [ "21-10", 3239]);
equivalence(GSW_SRC, [ "22-58", 3259]);
equivalence(GSW_SRC, [ 72053, "22-59", "old-gw-chainmail", 1860]);
equivalence(GSW_SRC, [ 72052, "22-60", "old-gw-mithril-silver", 1861]);
equivalence(GSW_SRC, [ 72054, "21-28", "old-gw-boltgun-metal", 1862]);
equivalence(GSW_SRC, [ 72060, "21-31", "old-gw-tin-bitz", 1866]);
equivalence(GSW_SRC, [ 72057, "22-63", "old-gw-dwarf-bronze", 1867]);
equivalence(GSW_SRC, [ 72059, "22-63", "old-gw-beaten-copper", 1868]);
equivalence(GSW_SRC, [ 72056, "22-62", "old-gw-brunished-gold", 1869]);
equivalence(GSW_SRC, [ 72055, "21-35", "old-gw-shining-gold", 1870]);
equivalence(GSW_SRC, [ "23-14", 1871]);

equivalence(AP_SRC, ["WP1466", "22-21", 72026]);
equivalence(AP_SRC, ["WP1419", "22-22", 72025]);
equivalence(AP_SRC, ["WP1437", "22-20"]);
equivalence(AP_SRC, ["WP1449", "22-79"]);
equivalence(AP_SRC, ["WP1429", "21-08"]);
equivalence(AP_SRC, ["WP1113", "22-16"]);
equivalence(AP_SRC, ["WP1458", "22-18"]);
equivalence(AP_SRC, ["WP1114", "22-17"]);
equivalence(AP_SRC, ["WP1427", "22-68"]);
equivalence(AP_SRC, ["WP1141", "21-36", 72024]);
equivalence(AP_SRC, ["WP1116", "21-07", 72020]);
equivalence(AP_SRC, ["WP1115", "22-15", 72022]);
equivalence(AP_SRC, ["WP1462", "21-09", 72021]);
equivalence(AP_SRC, ["WP1432", "22-84", 72095]);
equivalence(AP_SRC, ["WP1452", "22-14", 72023]);
equivalence(AP_SRC, ["WP1415", "21-07", 72020]);
equivalence(AP_SRC, ["WP1119", "22-67", 72048]);
equivalence(AP_SRC, ["WP1428", "22-56", 72046]);
equivalence(AP_SRC, ["WP1101", "21-25", 72051]);
equivalence(AP_SRC, ["WP1443", "22-51"]);
equivalence(AP_SRC, ["WP1418", "22-49"]);
equivalence(AP_SRC, ["WP1481", "22-11"]);
equivalence(AP_SRC, ["WP1118", "22-49"]);
equivalence(AP_SRC, ["WP1430", "22-54"]);
equivalence(AP_SRC, ["WP1403", 72005]);
equivalence(AP_SRC, ["WP1407", "22-55", 72155]);
equivalence(AP_SRC, ["WP1431", "22-43", 72040]);
equivalence(AP_SRC, ["WP1120", "22-48", 72153]);
equivalence(AP_SRC, ["WP1123", "21-17", 72062]);
equivalence(AP_SRC, ["WP1416", "21-20", 72043]);
equivalence(AP_SRC, ["WP1124", "21-23", 72045]);
equivalence(AP_SRC, ["WP1405", "22-44", 72039]);
equivalence(AP_SRC, ["WP1456", "22-44", 72039]);
equivalence(AP_SRC, ["WP1121", "21-16", 72061]);
equivalence(AP_SRC, ["WP1438", "22-80", 72097]);
equivalence(AP_SRC, ["WP1402", "22-80", 72097]);
equivalence(AP_SRC, ["WP1107", "22-02", 72006]);
equivalence(AP_SRC, ["WP1446", "22-01", 72007]);
equivalence(AP_SRC, ["WP1426", "21-02", 72038]);
equivalence(AP_SRC, ["WP1106", "22-03", 72009]);
equivalence(AP_SRC, ["WP1442", "22-04", 72008]);
equivalence(AP_SRC, ["WP1104", "22-05", 72010]);
equivalence(AP_SRC, ["WP1105", "22-07", 72011]);
equivalence(AP_SRC, ["WP1401", "21-04", 72012]);
equivalence(AP_SRC, ["WP1460", "21-03", 72141]);
equivalence(AP_SRC, ["WP1436", "22-06"]);
equivalence(AP_SRC, ["WP1412", "21-04"]);
equivalence(AP_SRC, ["WP1425", "21-24"]);
equivalence(AP_SRC, ["WP1464", "22-47"]);
equivalence(AP_SRC, ["WP1463", "21-33", 72014]);
equivalence(AP_SRC, ["WP1444", "21-06", 72015]);
equivalence(AP_SRC, ["WP1414", "22-48", 72153]);
equivalence(AP_SRC, ["WP1404", "21-27", 72148]);
equivalence(AP_SRC, ["WP1406", "22-33", 72101]);
equivalence(AP_SRC, ["WP1454", "22-56", 72050]);
equivalence(AP_SRC, ["WP1455", "22-58"]);
equivalence(AP_SRC, ["WP1102", "22-57", 72001]);
equivalence(AP_SRC, ["WP1117", "22-50", 72049]);
equivalence(AP_SRC, ["WP1128", "22-09", 72016]);
equivalence(AP_SRC, ["WP1451", "22-69"]);
equivalence(AP_SRC, ["WP1447", "22-70", 72013]);
equivalence(AP_SRC, ["WP1408", "22-81"]);
equivalence(AP_SRC, ["WP1480", "21-18", 72066]);
equivalence(AP_SRC, ["WP1127", "21-19", 72041]);
equivalence(AP_SRC, ["WP1122", "22-40", 72042]);
equivalence(AP_SRC, ["WP1459", "22-42", 72037]);
equivalence(AP_SRC, ["WP1126", "22-38", 72038]);
equivalence(AP_SRC, ["WP1434", "22-36", 72140]);
equivalence(AP_SRC, ["WP1421", "22-37", 72003]);
equivalence(AP_SRC, ["WP1411", "22-72", 72098]);
equivalence(AP_SRC, ["WP1457", "22-12"]);
equivalence(AP_SRC, ["WP1125", "22-32", 72034]);
equivalence(AP_SRC, ["WP1440", "22-58"]);
equivalence(AP_SRC, ["WP1417", "22-33", 72034]);
equivalence(AP_SRC, ["WP1108", "22-29", 72035]);
equivalence(AP_SRC, ["WP1461", "21-37", 72064]);
equivalence(AP_SRC, ["WP1424", "22-55"]);
equivalence(AP_SRC, ["WP1413", "21-14", 72067]);
equivalence(AP_SRC, ["WP1420", "21-15", 72031]);
equivalence(AP_SRC, ["WP1410", "22-30", 72031]);
equivalence(AP_SRC, ["WP1465", "22-31"]);
equivalence(AP_SRC, ["WP1450", "22-83"]);
equivalence(AP_SRC, ["WP1109", "22-25", 72030]);
equivalence(AP_SRC, ["WP1435", "22-78"]);
equivalence(AP_SRC, ["WP1111", "22-23", 72029]);
equivalence(AP_SRC, ["WP1112", "21-12", 72029]);
equivalence(AP_SRC, ["WP1439", "22-26", 72064]);
equivalence(AP_SRC, ["WP1110", "22-24", 72032]);
equivalence(AP_SRC, ["WP1433", 72033]);
equivalence(AP_SRC, ["WP1468", "21-31", 72060]);
equivalence(AP_SRC, ["WP1131", "21-28", 72054]);
equivalence(AP_SRC, ["WP1130", "22-59", 72053]);
equivalence(AP_SRC, ["WP1129", "22-60", 72052]);
equivalence(AP_SRC, ["WP1133", "22-65", 72057]);
equivalence(AP_SRC, ["WP1467", "21-29", 72059]);
equivalence(AP_SRC, ["WP1132", "22-61", 72056]);
equivalence(AP_SRC, ["WP1231", "22-62", 72055]);
