var locations = {
	"place1" : {
		"entity1" : [ "entityA" ],
		"entity2" : [ "entityB", "entityC", "entityD" ],
		"entity3" : [ "entityC" ]
	},
	"place2" : {
		"entityA" : [ "entityD" ],
		"entityB" : [ "entityE" ],
		"entityC" : [ "entityF" ]
	},
	"place3" : {
		"entityD" : [ "entityH" ],
		"entityE" : [ "entityI", "entity3", "entity1" ],
		"entityF" : []
	}
};

function getEntitiesFrom(location) {
	var entities = new Array();

	if (location != "unknown") {
		for ( var entity in locations[location]) {
			entities.push(entity);
		}
	}

	return entities;
}

function getLocationOf(entity) {
	for ( var location in locations) {
		if (entity in locations[location]) {
			return location;
		}
	}
	return "unknown";
}

function getDependenciesFor(entity) {
	var dependencies = new Array();

	var location = getLocationOf(entity);

	if (location != "unknown") {
		var entities = locations[location];
		var deps = entities[entity];

		for ( var i in deps) {
			var dependency = deps[i];
			dependencies.push(dependency);
		}
	}

	return dependencies;
}

function outLocation(location) {
	var entities = getEntitiesFrom(location);
	for ( var i in entities) {
		var entity = entities[i];
		outEntity(entity, 1, new Boolean(false));
		out("<br>");
	}
}

var p = 0;

function outEntity(e, n, last) {

	var location = getLocationOf(e);

	var color = "#e0e0e0";
	if (p % 2 == 0) {
		color = "#F0F0F0";
	}

	p++;

	out('<ul class="Container">');

	if (n == 1) {
		out('<li class="IsRoot">');
		color = "#a0a0a0";
	} else {
		var isLast = "";
		if (last == true) {
			isLast = "IsLast";
		}
		out('<li class="Node ExpandOpen ' + isLast + ' ">');
	}

	out('<div class="Expand"></div>');
	out('<div class="Content">');
	out('<table width=100% cellspacing="0" cellpadding="0"><tr bgcolor='
			+ color + '><td>' + e + '</td><td width=800px>'
			+ location.replace("unknown", "") + '</td></tr></table>');
	out('</div>');

	var entities3 = getDependenciesFor(e);

	for ( var i3 in entities3) {
		var eN = entities3[i3];

		outEntity(eN, n + 1, i3 == Object.keys(entities3).length - 1);
	}

	out("</li></ul>");

}

var content = "";
function out(str) {
	content = content + str;
	document.getElementById("tree-content").innerHTML = content;
}

window.onload = function() {
	outLocation("place1");
}