# Effect-Testing
 A modding tool for testing planetary annihilation effects, animations and unit looks, vastly improves iterative testing

### <b>Why is this useful</b>

This mod was created by me as I found a lot of the effect making process was inconvenient and could be vastly improved in ease and speed. <br>
Most of the features fix problems I found doing effect work and using the primitive version of this tool I had.
<br><br>
In addition to improving effects work you can also view unit animations/models in isolation or from normally hard to view angles without a valid anim tree
<br>
The mod generally tries to check files before spawning stuff so mistakes like syntax errors should no longer crash the game

### <b> How to setup testing </b>

While this does work somewhat out of the box there are some things you should know to get the most out of it
<br>
Pa's base files auto refresh, whereas mods do not. We can use this to our advantage by storing effects we are testing somewhere in the base game folder
<br>
<br>
In my case I have made a folder called testing inside the base pa effects folder <b>/pa/effects/specs/testing</b>
<br>
<br>the advantage of doing this is that when we spawn new copies of an effect after a file change it will have the new changes.
<br>The mod also contains an option to let it do this automatically for your last placed effect allowing for very quick iterative testing.

### <b>The hotkeys</b>
default hotkey is shown
<br>

<ins>Spawn Puppet</ins>(shift+z)
<br>
Spawns in an effect/unit puppet at the location of your mouse dependant on the selected settings in the ui

<ins>Clear Previous Puppet</ins>(shift+x)
<br>
Removes the last puppet you placed, mainly for fixing mistakes
<br>

<ins>Clear All Puppets</ins>(shift+c)
<br>
Removes all placed puppets, used when you mainly want to reset everything
<br>

<ins>Move Previous Puppet</ins>(shift+v)
<br>
Moves the last puppet you placed to your current mouse location, useful if you messed up placement/want something exact
<br>

<ins>Follow Cursor</ins>(shift+f)
<br>
Spawns a puppet with current settings that follows your cursor. very useful for projectiles simulations. re-use the hotkey to end it<br>

<ins>Set Move Path</ins>(shift+g)
<br>
Very similar to follow cursor but when you stop it with the hotkey the path you took is saved. puppets can be set to use the last saved path. <br>
Extremely useful for more advanced projectile testing that is hands off.

### <b>The UI </b>
![screenshot](https://user-images.githubusercontent.com/64487611/177117770-5824333d-cb2d-4ca6-814a-5520a98b2f1f.PNG) 

The ui is shown above. The main thing to know is that you can click the lock to unlock/lock it which makes the panel moveable
<br>
Nearly all settings changed are saved to local storage, so you can come back right where you left off/do not have to track down paths too often
### <b> What each option does</b>
- Effect Selection: Type in the path to a effect ending in .pfx, will turn red if invalid, green if valid and loaded
- Previous Effect Selection: Stores the last 10 effects you loaded in shorthand, can select from the menu
- Unit Selection: Type in the path to a unit ending in .json, will turn red if invalid, green if valid and loaded
- Previous Unit Selection: Stores the last 10 units you loaded in shorthand, cans elect from the menu
- Animation Selection: Menu contains the listed animations from the selected unit, select one to have it play
- Effect Bone: Type in the name of the bone you want to attach your selected effect to. if the name is invalid it will attach to bone root
- Offset From Bone: The offset from the attached bone
- Orientation From Bone: The orientation from the attached bone
- Model Orientation: By default the model is snapped to the ground, this lets you freely orient it
- Use Unit: if enabled the selected unit will be spawned
- Use Effect: if enabled the selected effect will be spawned
- Use Unit Effects: if enabled the units existing effects(e.g helios portal) will be attached to the unit
- Auto Delete: if enabled auto deletes the oldest puppet when the total exceeds the set number
- Timed Delete: if enabled deletes each puppet after the set amount of time in seconds(tied to puppet)
- Timed Reset: if enabled deletes and re-spawns the puppet after the set amount of time(tied to puppet)
- Use Last Move Path: If enabled the puppet will follow the set move path(last puppet only)
- Refresh On File Change: if enabled the puppet will be re-spawned whenever a file change is detected(last puppet only)
- Refresh On Settings Change: if enabled the puppet will be re-spawned on ui settings change(last puppet only)
- Delete/Reset Duration: Time for reset/delete options
- Auto Delete Amount: How many puppets before auto delete kicks in
- Snap: Distance from the ground
- Scale: Size of the puppet, this affects the model and attached effects
- Travel Speed: This changes the speed the puppets move for the path and follow cursor options, unit is not equal to pa move speed, 10 is recommended 
### <b> General Tips </b>

For rapid projectile testing, set up a back and forth path with refresh on settings change and use last move path options selected

Use the offset/orientation fields to speed up getting these values for the unit json

With a preset path and the moving anim selected you can somewhat emulate what effects look like in the actual game

Use timed reset for testing explosions without needing to set bLoop in their files

For the more creative you can probably make some cool scenes with model orientation, anims, and various scaled models/effects