(function(){
api.settings.definitions.keyboard.settings.spawn_puppet = {
  title: 'Spawn Puppet',
  type: 'keybind',
  set: 'effect hotkeys',
  display_group: 'effect testing',
  display_sub_group: 'Effect Testing',
  default: 'shift+z'
}


api.settings.definitions.keyboard.settings.clear_previous_puppet = {
  title: 'Clear Previous Puppet',
  type: 'keybind',
  set: 'effect hotkeys',
  display_group: 'effect testing',
  display_sub_group: 'Effect Testing',
  default: 'shift+x'
}

api.settings.definitions.keyboard.settings.clear_all_puppets = {
  title: 'Clear All Puppets',
  type: 'keybind',
  set: 'effect hotkeys',
  display_group: 'effect testing',
  display_sub_group: 'Effect Testing',
  default: 'shift+c'
}

api.settings.definitions.keyboard.settings.move_puppet = {
  title: 'Move previous puppet',
  type: 'keybind',
  set: 'effect hotkeys',
  display_group: 'effect testing',
  display_sub_group: 'Effect Testing',
  default: 'shift+v'
}

api.settings.definitions.keyboard.settings.draw = {
  title: 'Follow Cursor',
  type: 'keybind',
  set: 'effect hotkeys',
  display_group: 'effect testing',
  display_sub_group: 'Effect Testing',
  default: 'shift+f'
}

api.settings.definitions.keyboard.settings.setPath = {
  title: 'Set Move Path',
  type: 'keybind',
  set: 'effect hotkeys',
  display_group: 'effect testing',
  display_sub_group: 'Effect Testing',
  default: 'shift+g'
}

action_sets.gameplay["move_puppet"] = function(){

  var currentUISettings = model.currentUISettings;
  model.holodeck.focusedPlanet().then(function(planetId){
  var mouseLocationPromise = model.holodeck.raycastTerrain(cursor_x,cursor_y)
  mouseLocationPromise.then(function(mouseLocation){
    
         
      var location = {
          planet:planetId || 0,
          pos: mouseLocation.pos,
         // scale:currentUISettings.scale, //unsure if I should include scale in  moving
          snap: currentUISettings.snap
      }
      
      

      api.puppet.moveLastPuppet(mostRecentPuppet.id, location);
          
      
  
  
  })
})
}

model.currentlyDrawing = false;

action_sets.gameplay["draw"] = function(){
  
  if(model.currentlyDrawing == true){action_sets.gameplay["clear_previous_puppet"]();model.currentlyDrawing = false;return}
  model.currentlyDrawing = true;
  action_sets.gameplay["spawn_puppet"]() ;  

  _.delay(action_sets.gameplay.loopedDraw,100);
}

//saves a drawn path for auto use
action_sets.gameplay["setPath"] = function(){
 
  if(model.currentlyDrawing == true){action_sets.gameplay["clear_previous_puppet"]();model.currentlyDrawing = false;return}
  model.currentPath = [];
  model.currentlyDrawing = true;
  action_sets.gameplay["spawn_puppet"]() ;  

  _.delay(action_sets.gameplay.loopedDraw,100,true)

  

}
model.currentPath = [];
action_sets.gameplay.loopedDraw = function(setPath){
    var currentUISettings = model.currentUISettings;
    var mouseLocationPromise = model.holodeck.raycastTerrain(cursor_x,cursor_y)
    model.holodeck.focusedPlanet().then(function(planetId){
    mouseLocationPromise.then(function(mouseLocation){
      
      var location = {
          planet:planetId || 0,
          pos: mouseLocation.pos,
          snap: currentUISettings.snap
      }
      if(setPath !== undefined){
        if(mostRecentPuppet !== undefined){
        model.currentPath.push(location);
        api.puppet.moveLastPuppet(mostRecentPuppet.id, location);
        }
        if(model.currentlyDrawing == true){_.delay(action_sets.gameplay.loopedDraw,50, true)}
      }
      else{
        if(mostRecentPuppet !== undefined){
        api.puppet.moveLastPuppet(mostRecentPuppet.id, location);
        }
        if(model.currentlyDrawing == true){_.delay(action_sets.gameplay.loopedDraw,50)}
      }
  
  })
})
}

action_sets.gameplay["spawn_puppet"] = function(){
  
  model.holodeck.focusedPlanet().then(function(planetId){
    api.puppet.createEffectPuppet(model.currentUISettings, planetId)
  })
}

// action_sets.gameplay["spawn_puppet"] = function(){
//   var currentUISettings = model.currentUISettings;
//   var mouseLocationPromise = model.holodeck.raycastTerrain(cursor_x,cursor_y)
//   mouseLocationPromise.then(function(mouseLocation){
    
         
//       var location = {
//           planet:mouseLocation.planet || 0,
//           pos: mouseLocation.pos,
//           scale:currentUISettings.scale
//       }
//       if(currentUISettings.isUnit){
//           var puppetIdPromise = api.puppet.createPuppet(currentUISettings.path, location,currentUISettings.anim_name,undefined,color,undefined)
//           puppetIdPromise.then(function(result){
//               var puppetObject = {}
//               puppetObject.id = result;
//               puppetObject.UIEffectSettings = currentUISettings

//           })
//       }
//       else{
//           var puppetIdPromise = api.puppet.createEffectVanilla(currentUISettings.path, location,undefined, currentUISettings.snap)
//           puppetIdPromise.then(function(result){
//               $.getJSON("coui://"+currentUISettings.path).then(function(data){
//                   console.log(data)
//               var puppetObject = {}
//               puppetObject.id = result;
//               puppetObject.string = JSON.stringify(data)
//               puppetObject.UIEffectSettings = currentUISettings
//               puppetObject.isUnit = false;
//               puppetObject.location = location;
//               model.effectPuppetArray.push(puppetObject)

//           })
//       })
      
//   }
//   })
 
// }
action_sets.gameplay["clear_all_puppets"] = function(){
  model.currentlyDrawing = false;
  api.puppet.killAllPuppets();
  model.effectPuppetArray = {};

}
action_sets.gameplay["clear_previous_puppet"] = function(){

  if(mostRecentPuppet !== undefined){
    api.getWorldView(0).unPuppet(mostRecentPuppet.id);
		delete model.effectPuppetArray[mostRecentPuppet.id];

  }
}
}
)()