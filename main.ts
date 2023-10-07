/* 
Thermometer:
   uses the default digital meter to show the current microbit temperature
   (constrained to the range 0 degrees to 99 degrees)

Clicker:
   A simple use of the default digital meter lets you count things up
   (with Button A) and down(with Button B).  Possibly useful for counting
   people at an event; or cars in a carpark; or even in sheep in a pen, 
   though the limit is 99.

Bangometer:
  This example monitors jolts and knocks using the Spiral indicator.
  The wound-up size of the display shows the strength of each bang
  (up to a maximun of 1000 milli-gravities). The indicator is then 
  unwound back to zero over a time of 1.5 seconds.

Compass:
  The following code uses the rotary Dial style to show a compass needle that
  (should) always point North.Note that the dial uses a reversed scale 
  counting from 360 degrees down to zero. (You will first have to tilt the screen 
  as instructed to initialise the magnetometer)

Noise Meter:
  The following code uses the Bar style to show peak noise levels, sampled 
  four times a second.The reading uses a rolling average, so gradually dies away 
  over time. If it's too loud the indicator will flash to show a range error.

Water Spill:
  This example uses the Tidal indicator to simulate spilling water from the 
  bottom left to the top right as you tilt the microbit. A half-second animation 
  delay makes the movement smoother.

Plumb-line:
  Another use of the accelerometer maps the Pitch rotation(displaced by a 
  right-angle) onto the Dial indicator, with a reversed range, so that the 
  needle always hangs downwards.
  
Lie-detector
  This final example uses the Needle indicator to monitor the capacitive input
  on Pin2 of the microbit. The reading is a rolling average, and despite 
  possible inputs ranging from[0.. 1023], the sensitivity has been 
  experimentally focused onto a smaller working range of[600.. 800].
*/



enum Tests {
    Thermometer,
    Clicker,
    Bangometer,
    Compass,
    NoiseMeter,
    WaterSpill,
    PlumbLine,
    LieDetector
}
const maxTest = 8;

function setupTest(test: number) {
    meter.hide();
    switch (test) {
        case Tests.Thermometer:
            meter.digital();
            break;
        case Tests.Clicker:
            count = 0;
            meter.digital();
            break;
        case Tests.Bangometer:
            meter.use(meter.Styles.Spiral, 0, 1000);
            break;
        case Tests.Compass:
            input.calibrateCompass();
            basic.pause(2000);
            meter.use(meter.Styles.Dial, 360, 0);
            break;
        case Tests.NoiseMeter:
            meter.use(meter.Styles.Bar, 0, 100);
            reading = 0;
            break;
        case Tests.WaterSpill:
            meter.use(meter.Styles.Tidal, -30, 30);
            break;
        case Tests.PlumbLine:
            meter.use(meter.Styles.Dial, 360, 0);
            break;
        case Tests.LieDetector:
            meter.use(meter.Styles.Needle, 600, 800);
            pins.touchSetMode(TouchTarget.P2, TouchTargetMode.Capacitive);
            reading = 700;
            break;
    }
}

function updateTest(test: number) {
    switch (test) {
        case Tests.Thermometer:
            reading = input.temperature();
            meter.show(reading);
            basic.pause(5000);
            break;
        case Tests.Clicker:
            meter.show(count);
            break;
        case Tests.Bangometer:
            if (input.isGesture(Gesture.ThreeG)) {
                reading = input.acceleration(Dimension.Strength);
                meter.show(reading);
                meter.show(0, 1500);
            }
            break;
        case Tests.Compass:
            reading = input.compassHeading();
            meter.show(reading);
            basic.pause(500);
            break;
        case Tests.NoiseMeter:
            reading = (reading + input.soundLevel()) / 2;
            meter.show(reading);
            basic.pause(250);
            break;
        case Tests.WaterSpill:
            reading = input.rotation(Rotation.Roll) - input.rotation(Rotation.Pitch);
            meter.show(reading, 500);
            basic.pause(1000);
            break;
        case Tests.PlumbLine:
            reading = (input.rotation(Rotation.Pitch) + 442) % 360;
            meter.show(reading);
            basic.pause(1000);
            break;
        case Tests.LieDetector:
            reading = (reading + pins.analogReadPin(AnalogPin.P2)) / 2;
            meter.show(reading);
            basic.pause(500);
            break;
    }
}

input.onButtonPressed(Button.A, function () {
    if (choosing) {
        if (choice > 0) {
            choice--;
            basic.showNumber(choice);
        }
    } else {
        if (choice = Tests.Clicker) {
            if (count > -1) { count-- }
        }
    }
});

input.onButtonPressed(Button.B, function () {
    if (choosing) {
        if (choice < maxTest) {
            choice++;
            basic.showNumber(choice);
        }
    } else {
        if (choice = Tests.Clicker) {
            if (count < 101) { count++ }
        }
    }
});

input.onButtonPressed(Button.AB, function () {
    if (choosing) {
        choosing = false;
        setupTest(choice); // initiate test
    } else {
        meter.hide(); // terminate test
        basic.pause(500);
        //music.tonePlayable(Note.C, music.beat(BeatFraction.Whole))
        basic.showNumber(choice);
        choosing = true;
    }
});

let choosing = true;
let count = 0;
let reading = 0;
let choice = 0;
basic.showNumber(choice);
while (true) {  // keep iterating...
    if (!choosing) {
        updateTest(choice);
    }
    pause(20);
}
