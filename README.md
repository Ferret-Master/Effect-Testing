# Effect-Testing
 A modding tool for testing planetary annihilation effects, animations and unit looks, vastly improves iterative testing

### <b>Why is this useful</b>

This mod was created by me as I found a lot of the effect making process was inconvenient and could be vastly improved in ease and speed. <br>
Most of the features fix problems I found doing effect work and using the primitive version of this tool I had.
<br><br>
In addition to improving effects work you can also view unit animations/models in isolation or from normally hard to view angles without a valid anim tree

### <b> How to setup testing </b>

While this does work somewhat out of the box there are some things you should know to get the most out of it
<br>
Pa's base files auto refresh, whereas mods do not. We can use this to our advantage by storing effects we are testing somewhere in the base game folder
<br>
<br>
In my case I have made a folder called testing inside the based pa effects folder <b>/pa/effects/specs/testing</b>
<br>
<br>the advantage of doing this is that when we spawn new copies of an effect after a file change it will have the new changes.
<br>The mod also contains an option to let it do this automatically for your last placed effect allowing for very quick iterative testing.

### <b>The hotkeys</b>
default hotkey is shown
<br>

<u>Spawn Puppet</u>(shift+z)
<br>
Spawns in an effect/unit puppet at the location of your mouse dependant on the selected settings in the ui
<br>
<u>Clear Previous Puppet</u>(shift+x)
<br>
Removes the last puppet you placed, mainly for fixing mistakes
<br>
<u>Clear All Puppets</u>(shift+c)
<br>
Removes all placed puppets, used when you mainly want to reset everything
<br>
<u>Move Previous Puppet</u>(shift+v)
<br>
Moves the last puppet you placed to your current mouse location, useful if you messed up placement/want something exact
<br>
<u>Follow Cursor</u>(shift+f)
<br>
Spawns a puppet with current settings that follows your cursor. very useful for projectiles simulations. re-use the hotkey to end it<br>
<u>Set Move Path</u>(shift+g)
<br>
Very similar to follow cursor but when you stop it with the hotkey the path you took is saved. puppets can be set to use the last saved path. <br>
Extremely useful for more advanced projectile testing that is hands off.

### <b>The UI </b>
![screenshot](https://user-images.githubusercontent.com/64487611/177117770-5824333d-cb2d-4ca6-814a-5520a98b2f1f.PNG)
### <b> What each option does</b>

### <b> General Tips </b>
