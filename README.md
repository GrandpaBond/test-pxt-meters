# Tests for Meters
## Thermometer (0)
   Uses the default digital meter to show the current microbit temperature
   (constrained to the range 0 degrees to 99 degrees)

## Clicker (1)
   A simple use of the default digital meter lets you count things up
   (with Button A) and down(with Button B).  Possibly useful for counting
   people at an event; or cars in a carpark; or even in sheep in a pen, 
   though the limit is 99.

## Bangometer (2)
  This example monitors jolts and knocks using the Spiral indicator.
  The wound-up size of the display shows the strength of each bang
  (up to a maximun of 1000 milli-gravities). The indicator is then 
  unwound back to zero over a time of 1.5 seconds.

## Compass (3)
  The following code uses the rotary Dial style to show a compass needle that
  (should) always point North.Note that the dial uses a reversed scale 
  counting from 360 degrees down to zero. (You will first have to tilt the screen 
  as instructed to initialise the magnetometer)

## Noise Meter (4)
  The following code uses the Bar style to show peak noise levels, sampled 
  four times a second.The reading uses a rolling average, so gradually dies away 
  over time. If it's too loud the indicator will flash to show a range error.

## Water Spill (5)
  This example uses the Tidal indicator to simulate spilling water from the 
  bottom left to the top right as you tilt the microbit. A half-second animation 
  delay semmulates viscosity, making the movement smoother.

## Plumb-line (6)
  Another use of the accelerometer computes the Yaw rotation, then maps it (displaced
  by a right-angle) onto the Dial indicator, so that the needle always hangs downwards.
  
## Lie-detector (7)
  This example uses the Needle indicator to monitor the capacitive input
  on Pin2 of the microbit. The reading is a rolling average, and despite 
  possible inputs ranging from[0.. 1023], the sensitivity has been 
  experimentally focused onto a smaller working range of[600.. 800].

## Light Meter (7)
  This final example uses the Bar indicator to monitor the ambient light-level.


> Open this page at [https://grandpabond.github.io/test-pxt-meters/](https://grandpabond.github.io/test-pxt-meters/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/grandpabond/test-pxt-meters** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/grandpabond/test-pxt-meters** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
