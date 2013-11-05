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
		p=1;
		outEntity(entity, 1, new Boolean(false));
	}
}

var p = 1;

function outEntity(e, n, last) {

	var location = getLocationOf(e);
	var entities3 = getDependenciesFor(e);

	var grayed = "NotGrayed";
	if (p % 2 == 0) {
		grayed = "Grayed";
	}

	p++;

	if (n == 1) {
		grayed = "NotGrayed";
	}
	
	out('<ul class="Container">');

	if (n == 1) {
		out('<li class="IsRoot ExpandClosed">');
	} else {
		var isLast = "";
		var isLeaf = "ExpandOpen";
		if (last == true) {
			isLast = "IsLast";
		}
		if (entities3.length == 0){
			isLeaf = "ExpandLeaf";
		}
		out('<li class="Node '+ isLeaf+ " " + isLast + ' ">');
	}
	
	out('<div class="Expand"></div>');
	out('<div class="Content">');
	out('<table width=100% cellspacing="0" cellpadding="0"><tr class="'
			+ grayed + '"><td>' + e + '</td><td width=800px>'
			+ location.replace("unknown", "") + '</td></tr></table>');
	out('</div>');


	for (var i3 in entities3) {
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

function tree_toggle(event) {
	event = event || window.event
	var clickedElem = event.target || event.srcElement

	if (!hasClass(clickedElem, 'Expand')) {
		return
	}

	var node = clickedElem.parentNode
	if (hasClass(node, 'ExpandLeaf')) {
		return
	}

	var newClass = hasClass(node, 'ExpandOpen') ? 'ExpandClosed' : 'ExpandOpen'
	var re =  /(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/
	node.className = node.className.replace(re, '$1'+newClass+'$3')
}

function hasClass(elem, className) {
	return new RegExp("(^|\\s)"+className+"(\\s|$)").test(elem.className)
}
