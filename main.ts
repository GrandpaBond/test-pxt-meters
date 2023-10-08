function setupTest (test: number) {
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

function updateTest (test: number) {
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
            choice -= 1;
        }
    } else {
        if (choice = Tests.Clicker) {
            if (count > -1) {
                count -= 1;
            }
        }
    }
})

input.onButtonPressed(Button.B, function () {
    if (choosing) {
        if (choice < maxTest) {
            choice += 1
        }
    } else {
        if (choice = Tests.Clicker) {
            if (count < 101) {
                count += 1
            }
        }
    }
})

input.onButtonPressed(Button.AB, function () {
            choosing = !(choosing);
})

enum Tests {
    Thermometer,
    Clicker,
    Bangometer,
    Compass,
    NoiseMeter,
    WaterSpill,
    PlumbLine,
    LieDetector
};
let maxTest = 7;
let reading = 0;
let count = 0;
let choice = 0;
let choosing = true;
let running = false;
while (true) {
    // keep iterating...
    if (choosing) {
        if (running) { // terminate current test's display first
            meter.hide();
            basic.pause(50);
            running = false;
        }
        basic.showNumber(choice);
    } else {  // run the test
        if (!running) { // set the test up first
            meter.hide();
            basic.pause(50);
            // initiate test
            setupTest(choice);
            running = true;
        }
        updateTest(choice);
    }
    pause(20);
}
