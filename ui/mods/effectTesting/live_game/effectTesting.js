model.effectPuppetArray = {};// an object containing all spawned puppets keyed to the id's
var mostRecentPuppet = undefined;
model.currentUISettings = {//testing settings
	orientation:undefined,
	selectedAnim:"NONE",
	selectedUnit:"/pa/units/land/assault_bot/assault_bot.json", 
	selectedEffect:"/pa/effects/specs/ping.pfx", 
	effectBone:"bone_root",
	boneOffset:[0,0,0], 
	boneOrient:[0,0,0], 
	useUnit:false,
	useEffect:true,
	useUnitEffects:false,
	autoDelete:true,
	timedDelete:false,
	timedReset:false,
	refreshOnFileChange:true,
	useLastEffectPath:false,
	refreshOnSettingsChange:false,
	deleteResetDuration:3,
	autoDeleteAmount:10,
	snap:10,
	scale:1,
	travelSpeed:10,

}

var effectUpdateLoop = function () { //regularly checks currently loaded effect file/ui panel for changes and reloads puppet as needed
	var puppetTimeMadeObject = {}
	for(puppetIndex in model.effectPuppetArray){
		var puppet = model.effectPuppetArray[puppetIndex];
		var path = puppet.usedSettings.selectedEffect;
		var timeAlive = Date.now()/1000 - puppet.timeAlive;
		puppetTimeMadeObject[puppetIndex] = puppet.initialTime;
		//checks for timed delete and reset
		if(puppet.usedSettings.timedDelete == true || puppet.usedSettings.timedReset == true){
			
			if(timeAlive > puppet.usedSettings.deleteResetDuration){
				//delete the puppet, has priority over reset
				if(puppet.usedSettings.timedDelete == true){
					console.log("deleting puppet")
					api.getWorldView(0).unPuppet(puppet.id);
					delete model.effectPuppetArray[puppet.id];
				}
				//reset the puppet
				else{
					console.log("resetting puppet")
					api.puppet.createEffectPuppet(puppet.usedSettings,0,puppet.location, puppetIndex)
					api.getWorldView(0).unPuppet(puppet.id);
				}
			}
		}
		
	}
	//auto deletes excess puppets after the main loop is done, based on real time since being made
	var totalPuppets = _.keys(puppetTimeMadeObject).length;
	var amountToDelete = totalPuppets - model.currentUISettings.autoDeleteAmount;
	var keys = Object.keys(puppetTimeMadeObject);
	keys.sort(function(a, b) { return puppetTimeMadeObject[a] - puppetTimeMadeObject[b]});
	if(model.currentUISettings.autoDelete == true){
	for(var i = 0; i< amountToDelete;i++){
		api.getWorldView(0).unPuppet(keys[i]);
		delete model.effectPuppetArray[keys[i]];
	}}
	//updates newest puppet if files/settings are changed and is set
	var updatePuppet = model.effectPuppetArray[keys[keys.length-1]];
	mostRecentPuppet = updatePuppet;
	if(updatePuppet !== undefined){
	updateEffectPlusSettings(updatePuppet);
	}
	api.puppet.followPath(model.currentPath, updatePuppet);
		_.delay(effectUpdateLoop, 500);
};

var updateEffectPlusSettings = function(puppet){
	if(puppet.usedSettings.refreshOnSettingsChange == true){
		//refresh puppet with new effects on settings change
	
		if(JSON.stringify(puppet.usedSettings) !== JSON.stringify(model.currentUISettings)){
					puppet.location.scale = model.currentUISettings.scale;
					puppet.location.snap = model.currentUISettings.snap;
					api.puppet.createEffectPuppet(model.currentUISettings,0,puppet.location, puppet.id)
					api.getWorldView(0).unPuppet(puppet.id);
					return;//takes priority over effect file change
		}
	}
	if(puppet.usedSettings.refreshOnFileChange == true){
	$.getJSON("coui://"+puppet.usedSettings.selectedEffect).then(function(data){
   
				var oldFileString = puppet.string;
				var newString = JSON.stringify(data);
				if(newString !== oldFileString){//change in effect file so replace puppet
						api.puppet.createEffectPuppet(puppet.usedSettings,0,puppet.location, puppet.id)
						api.getWorldView(0).unPuppet(puppet.id);
				}
	})
}
}


console.log("starting effect testing")
effectUpdateLoop();

//stops keyboard input from triggering hotkeys/movement etc when inside ui boxes
handlers.pauseInput = function (payload) {
	inputmap.paused(payload);
}

//updates the settings on ui changes
handlers.settingsChange = function (payload) {
	try {
		payload.boneOffset = payload.boneOffset.split(",").map(function(string){return Number(string)})
		payload.boneOrient = payload.boneOrient.split(",").map(function(string){return Number(string)})
		payload.orientation = payload.orientation.split(",").map(function(string){return Number(string)})
		if(_.isEqual(payload.orientation,[0,0,0])){payload.orientation = undefined}
	} catch (error) {
		payload.boneOffset = [0,0,0];
		payload.boneOrient = [0,0,0];
		payload.modelOrient = undefined;
	}
	model.currentUISettings = payload;
}