//view model setup
function EffectModel() {
        var self = this;

        //ui related observables
        self.unitError = ko.observable(false);
        self.effectError = ko.observable(false);
        self.unitErrorState = ko.pureComputed(function() {
            var givenClass = this.unitError() == true ? "Warning" : "NoWarning";
            if(givenClass == "NoWarning"){ return this.unitError() == false && this.selectedUnit() == this.unitInput() ? "Valid" : "NoWarning";}
            else{return givenClass}

        }, this)
        self.effectErrorState = ko.pureComputed(function() {
            var givenClass = this.effectError() == true ? "Warning" : "NoWarning";
            if(givenClass == "NoWarning"){ return this.effectError() == false && this.selectedEffect() == this.effectInput() ? "Valid" : "NoWarning";}
            else{return givenClass}
        }, this)
        self.unitSpec = ko.observable({});
        self.effectSpec = ko.observable({});
        self.unitInput = ko.observable("/pa/units/land/assault_bot/assault_bot.json"); 
        self.effectInput = ko.observable("/pa/effects/specs/ping.pfx");
        self.anims = ko.observableArray(["NONE"]);
        self.displayedPreviousEffects = ko.observableArray(["ping.pfx"]);
        self.previousEffects = ko.observableArray(["/pa/effects/specs/ping.pfx"])
        self.selectedPreviousEffect = ko.observable(""); 
        self.selectedPreviousUnit = ko.observable(""); 
        self.displayedPreviousUnits = ko.observableArray(["assault_bot.json"]);
        self.previousUnits = ko.observableArray(["/pa/units/land/assault_bot/assault_bot.json"]);
        //settings related observables
        self.selectedAnim = ko.observable({});
        self.selectedUnit = ko.observable(""); 
        self.selectedEffect = ko.observable(""); 
        self.effectBone = ko.observable(""); 
        self.modelOrient = ko.observable("0,0,0"); 
        self.boneOffset = ko.observable("0,0,0"); 
        self.boneOrient = ko.observable("0,0,0"); 
        self.useUnit = ko.observable(false);
        self.useEffect = ko.observable(true);
        self.useUnitEffects = ko.observable(false);
        self.autoDelete = ko.observable(true);
        self.timedDelete = ko.observable(false);
        self.timedReset = ko.observable(false);
        self.refreshOnFileChange = ko.observable(true);
        self.useLastEffectPath = ko.observable(false);
        self.refreshOnSettingsChange = ko.observable(false);
        self.deleteResetDuration = ko.observable(3);
        self.autoDeleteAmount = ko.observable(10);
        self.snap = ko.observable(10);
        self.scale = ko.observable(1);
        self.travelSpeed = ko.observable(10);

        //text box focus observables
        self.box1Selected = ko.observable(false);
        self.box2Selected = ko.observable(false);
        self.box3Selected = ko.observable(false);
        self.box4Selected = ko.observable(false);
        self.box5Selected = ko.observable(false);
        self.box6Selected = ko.observable(false);
        self.box7Selected = ko.observable(false);
        self.box8Selected = ko.observable(false);
        self.box9Selected = ko.observable(false);
        self.box10Selected = ko.observable(false);
        self.box11Selected = ko.observable(false);
        self.selectedBoxes = ko.computed(function(){return [self.box1Selected(),self.box2Selected(),self.box3Selected(),self.box4Selected(),
                                                self.box5Selected(),self.box6Selected(),self.box7Selected(),self.box8Selected(),
                                                self.box9Selected(),self.box10Selected(),self.box11Selected()]})
}
effectModel = new EffectModel();
//makes the floating frame for the view model
createFloatingFrame("effect_frame", 450, 50, {"offset": "topRight", "left": -240});

//attaches the html to the frame
$.get("coui://ui/mods/effectTesting/floatzone/effectTestingUI.html", function (html) {
		$("#effect_frame_content").append(html);
})

loadPastSettings();

//controls the positioning of the frame
model.effectLockEvent = function() {
    console.log("triggered")
if (localStorage["frames_effect_frame_lockStatus"] == "true") {
    $("#effect_lock").attr("src", "coui://ui/mods/effectTesting/img/unlock-icon.png");
    unlockFrame("effect_frame");
} else  {
    $("#effect_lock").attr("src", "coui://ui/mods/effectTesting/img/lock-icon.png");
    lockFrame("effect_frame");
}

}

//loads locally stored settings
function loadPastSettings(){
    var localSettingsString = localStorage["effectTestingSettings"];
    if(localSettingsString == undefined){return}
    var localSettings = JSON.parse(localSettingsString);
        effectModel.modelOrient(localSettings.modelOrient);
        effectModel.unitInput(localSettings.unitInput);
        effectModel.effectInput(localSettings.effectInput);
        effectModel.previousUnits(localSettings.previousUnits);
        effectModel.previousEffects(localSettings.previousEffects);
        effectModel.selectedAnim(localSettings.selectedAnim);
        effectModel.selectedUnit(localSettings.selectedUnit);
        effectModel.selectedEffect(localSettings.selectedEffect);
        effectModel.effectBone(localSettings.effectBone);
        effectModel.boneOffset(localSettings.boneOffset);
        effectModel.boneOrient(localSettings.boneOrient);
        effectModel.useUnit(localSettings.useUnit);
        effectModel.useEffect (localSettings.useEffect);
        effectModel.useUnitEffects (localSettings.useUnitEffects);
        effectModel.autoDelete (localSettings.autoDelete);
        effectModel.timedDelete (localSettings.timedDelete);
        effectModel.timedReset (localSettings.timedReset);
        effectModel.refreshOnFileChange (localSettings.refreshOnFileChange);
        effectModel.useLastEffectPath (localSettings.useLastEffectPath);
        effectModel.refreshOnSettingsChange (localSettings.refreshOnSettingsChange);
        effectModel.deleteResetDuration (localSettings.deleteResetDuration);
        effectModel.autoDeleteAmount (localSettings.autoDeleteAmount);
        effectModel.snap (localSettings.snap);
        effectModel.scale(localSettings.scale);
        effectModel.travelSpeed(localSettings.travelSpeed);
        effectModel.displayedPreviousUnits(localSettings.displayedPreviousUnits);
        effectModel.selectedPreviousUnit(localSettings.selectedPreviousUnit);
        effectModel.displayedPreviousEffects(localSettings.displayedPreviousEffects);
        effectModel.selectedPreviousEffect(localSettings.selectedPreviousEffect);
}

//loads the chosen unit json and checks for errors
function loadUnit(unitPath){
    console.log("loading unit ", unitPath)

        $.getJSON("coui://"+unitPath, function(json) {
            try{
            effectModel.unitSpec(json);
            effectModel.selectedUnit(unitPath);
            effectModel.unitError(false)
            addToPreviousUnitList(unitPath);
            }
            catch(error){
                effectModel.unitError(true)
            }
        }).error(function(error){effectModel.unitError(true)})
   
}

//loads the chosen unit json and checks for errors
function loadEffect(effectPath){
    console.log("loading effect ", effectPath)
        $.getJSON("coui://"+effectPath, function(json) {
            try{
            effectModel.effectSpec(json);
            effectModel.selectedEffect(effectPath);
            effectModel.effectError(false)
            addToPreviousEffectList(effectPath);
            }
            catch(error){
                effectModel.effectError(true)
            }
        }).error(function(error){effectModel.effectError(true)})

    }

//adds selected unit to the previous unit list    
function addToPreviousUnitList(unitPath){
    var previousUnits = effectModel.previousUnits();
    if(previousUnits.length < 10 && _.contains(previousUnits,unitPath) == false){
        previousUnits.push(unitPath);
        effectModel.previousUnits(previousUnits);
        addToTruncatedUnits(unitPath);
    }
    else if(previousUnits.length >= 10 && _.contains(previousUnits,unitPath) == false){
        var newList = previousUnits.splice(-9)
        newList.push(unitPath)
        effectModel.previousUnits(newList)
        addToTruncatedUnits(unitPath);
    }

 
}    

function addToTruncatedUnits(){
    var truncatedUnitList = effectModel.previousUnits().map(function(unitPath){
        return unitPath.split("/")[unitPath.split("/").length-1];
    })
    effectModel.displayedPreviousUnits(truncatedUnitList);
    effectModel.selectedPreviousUnit(truncatedUnitList[truncatedUnitList.length-1])
}

function addToTruncatedEffects(){
    var truncatedEffectList = effectModel.previousEffects().map(function(effectPath){
        return effectPath.split("/")[effectPath.split("/").length-1];
    })
    effectModel.displayedPreviousEffects(truncatedEffectList);
    effectModel.selectedPreviousEffect(truncatedEffectList[truncatedEffectList.length-1])
}

//adds selected effect to the previous unit list 
function addToPreviousEffectList(effectPath){
    var previousEffects = effectModel.previousEffects();
    if(previousEffects.length < 10 && _.contains(previousEffects,effectPath) == false){
        previousEffects.push(effectPath);
        effectModel.previousEffects(previousEffects);
        addToTruncatedEffects();
    }
    else if(previousEffects.length >= 10 && _.contains(previousEffects,effectPath) == false){
        var newList = previousEffects.splice(-9)
        newList.push(effectPath)
        effectModel.previousEffects(newList);
        addToTruncatedEffects();
    }
  //  payload.boneOffset.split(",").map(function(string){return Number(string)})
  
}   
//computed functions
//-----------------------------------------------------------------------------

//ensures keyboard input is isolated to selected boxes
ko.computed(function() {
    var pauseInput = _.contains(effectModel.selectedBoxes(),true);
    if (pauseInput) {
        api.game.captureKeyboard(true);
    }
    else{
        api.game.releaseKeyboard(true);
   }
   api.Panel.message(api.Panel.parentId, 'pauseInput', pauseInput);
});

//loads unit file upon valid entry
ko.computed(function(){
    var unitInput = effectModel.unitInput();
    effectModel.unitInput(unitInput.replace("//","/"))
    if(_.endsWith(unitInput,".json")){
        loadUnit(unitInput);
    }
})

//loads effect file upon valid entry
ko.computed(function(){
    var effectInput = effectModel.effectInput();
    effectModel.effectInput(effectInput.replace("//","/"))
    if(_.endsWith(effectInput,".pfx")){
        loadEffect(effectInput);
    }
})
//loads unit anim choices on spec change
ko.computed(function(){
    var animList = ["NONE"];
    var unitModel = effectModel.unitSpec().model;
    if(unitModel !== undefined){
        if(unitModel.animations !== undefined){
            animList = animList.concat(_.keys(unitModel.animations))
        }
    }
   effectModel.anims(animList)
})
//replaces effect input upon previous effects selection
ko.computed(function(){
    var effectPath = effectModel.selectedPreviousEffect();
    var previousEffects = effectModel.previousEffects();
    for(var i = 0;i< previousEffects.length;i++){
        if(_.endsWith(previousEffects[i],effectPath)){
            effectPath = previousEffects[i];
        }
    }
    effectModel.effectInput(effectPath);
})
//replaces unit input upon previous units selection
ko.computed(function(){
    var unitPath = effectModel.selectedPreviousUnit();
    var previousUnits = effectModel.previousUnits();
    for(var i = 0;i< previousUnits.length;i++){
        if(_.endsWith(previousUnits[i],unitPath)){
            unitPath = previousUnits[i];
        }
    }
    effectModel.unitInput(unitPath);
})
//updates the settings for puppet spawning in live_game
ko.computed(function(){

    var settingsObject = {
        orientation:effectModel.modelOrient(),
        selectedAnim:effectModel.selectedAnim(),
        selectedUnit:effectModel.selectedUnit(),
        selectedEffect:effectModel.selectedEffect(),
        effectBone:effectModel.effectBone(),
        boneOffset:effectModel.boneOffset(),
        boneOrient:effectModel.boneOrient(),
        useUnit:effectModel.useUnit(),
        useEffect:effectModel.useEffect(),
        useUnitEffects:effectModel.useUnitEffects(),
        autoDelete:effectModel.autoDelete(),
        timedDelete:effectModel.timedDelete(),
        timedReset:effectModel.timedReset(),
        refreshOnFileChange:effectModel.refreshOnFileChange(),
        useLastEffectPath:effectModel.useLastEffectPath(),
        refreshOnSettingsChange:effectModel.refreshOnSettingsChange(),
        deleteResetDuration:effectModel.deleteResetDuration(),
        autoDeleteAmount:effectModel.autoDeleteAmount(),
        snap:effectModel.snap(),
        scale:effectModel.scale(),
        travelSpeed:effectModel.travelSpeed()
    }
    setLocalStorage();
    api.Panel.message(api.Panel.parentId, 'settingsChange', settingsObject);

})

//records current settings and puts in local storage
function setLocalStorage(){
    var settingsObject = {
        modelOrient:effectModel.modelOrient(),
        unitInput:effectModel.unitInput(),
        effectInput:effectModel.effectInput(),
        previousUnits:effectModel.previousUnits(),
        displayedPreviousUnits:effectModel.displayedPreviousUnits(),
        selectedPreviousUnit:effectModel.selectedPreviousUnit(),
        previousEffects:effectModel.previousEffects(),
        displayedPreviousEffects:effectModel.displayedPreviousEffects(),
        selectedPreviousEffect:effectModel.selectedPreviousEffect(),
        selectedAnim:effectModel.selectedAnim(),
        selectedUnit:effectModel.selectedUnit(),
        selectedEffect:effectModel.selectedEffect(),
        effectBone:effectModel.effectBone(),
        boneOffset:effectModel.boneOffset(),
        boneOrient:effectModel.boneOrient(),
        useUnit:effectModel.useUnit(),
        useEffect:effectModel.useEffect(),
        useUnitEffects:effectModel.useUnitEffects(),
        autoDelete:effectModel.autoDelete(),
        timedDelete:effectModel.timedDelete(),
        timedReset:effectModel.timedReset(),
        refreshOnFileChange:effectModel.refreshOnFileChange(),
        useLastEffectPath:effectModel.useLastEffectPath(),
        refreshOnSettingsChange:effectModel.refreshOnSettingsChange(),
        deleteResetDuration:effectModel.deleteResetDuration(),
        autoDeleteAmount:effectModel.autoDeleteAmount(),
        snap:effectModel.snap(),
        scale:effectModel.scale(),
        travelSpeed:effectModel.travelSpeed()
    }
    var settingsString = JSON.stringify(settingsObject);
    localStorage["effectTestingSettings"] = settingsString;
}



