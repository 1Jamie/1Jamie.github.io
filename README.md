# b2g_camera
Work in progress camera app for B2G, this is frame work currently
the plan is to add support for video and flash, not sure thought with getusermedia we can do focus.

##Feel free to help out with the app if wanted, the falsh is going to be implemented with the same api as the flashlight apps,

#gallery 
This will be added later as seperate app but linked to by connecting to it from image preview in the corner

#flash
flash is going to be kept in seperate js script, when trigering takepicture() it will check true/false value of flash and true/false
it will call the flashbulb 500milsec before camera trigger till 500milseconds after trigger. The auto-flash will be a litle
more challenging, the app will have to take a sample frame and parse the average rgb values to calculate whether or not to use
flash, value of autoflash when put in place which will be toggled by button on top.
it will call the flashbulb 500milsec before camera trigger till 500milseconds after trigger. The auto-flash will be a litle
more challenging, the app will have to take a sample frame and parse the average rgb values to calculate whether or not to use
flash


#video
video support will be add at seperate time
