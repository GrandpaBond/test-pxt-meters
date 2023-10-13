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
            meter.use(meter.Styles.Spiral, 0, 200);
            reading = 1000; // gravity at rest
            meter.show(200); 
            meter.show(0,500); // initial unwinding display
            basic.pause(500);
            break;
        case Tests.Compass:
            input.calibrateCompass();
            basic.pause(2000);
            meter.use(meter.Styles.Dial, 360, 0);
            break;
        case Tests.NoiseMeter:
            meter.use(meter.Styles.Blob, 30, 80);
            reading = 0;
            break;
        case Tests.WaterSpill:
            meter.use(meter.Styles.Tidal, -30, 30);
            break;
        case Tests.PlumbLine:
            meter.use(meter.Styles.Dial, 0, 360);
            break;
        case Tests.LieDetector:
            meter.use(meter.Styles.Needle, 600, 800);
            pins.touchSetMode(TouchTarget.P2, TouchTargetMode.Capacitive);
            reading = 700;
            break;
        case Tests.LightLevel:
            meter.use(meter.Styles.Bar, 50, 200);
            break;
    }
}

function updateTest (test: number) {
    switch (test) {
        case Tests.Thermometer:
            reading = input.temperature();
            meter.show(reading);
            basic.pause(500);
            break;
        case Tests.Clicker:
            meter.show(count);
            basic.pause(50); 
            break;
        case Tests.Bangometer:
            let accel = input.acceleration(Dimension.Strength);
            let bang = Math.abs(accel-reading)
            reading = accel;
            if (accel > 50) { 
                meter.show(bang);
                basic.pause(250); // show the maximum
                meter.show(0, 1500); // dwindle over time
            }
            basic.pause(10); // to detect bangs, we can't hang about!
            break;
        case Tests.Compass:
            reading = input.compassHeading();
            meter.show(reading);
            basic.pause(500);
            break;
        case Tests.NoiseMeter:  // TODO add threshold 
            reading = (reading + input.soundLevel()) / 2;
            meter.show(reading, 800); // dwindle over time
            basic.pause(250);
            break;
        case Tests.WaterSpill:
            reading = input.rotation(Rotation.Roll) - input.rotation(Rotation.Pitch);
            meter.show(reading, 500); // add some viscosity
            basic.pause(1000);
            break;
        case Tests.PlumbLine:
            // input.rotation(Rotation.Yaw) doesn't seem to exist!
            let ax = input.acceleration(Dimension.X);
            let ay = input.acceleration(Dimension.Y);
            let yaw = Math.atan2(ay, ax) * 180 / Math.PI;
            reading = (yaw + 450) % 360;
            meter.show(reading);
            basic.pause(100);
            break;
        case Tests.LieDetector:
            reading = (reading + pins.analogReadPin(AnalogPin.P2)) / 2;
            meter.show(reading);
            break;
            basic.pause(250);
        case Tests.LightLevel:
            reading = input.lightLevel();
            meter.show(reading, 1000); // dwindle over time
            basic.pause(1000);
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
            choice += 1;
        }
    } else {
        if (choice = Tests.Clicker) {
            if (count < 100) {
                count += 1;
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
    LieDetector,
    LightLevel
};
let maxTest = Tests.LightLevel;
let reading = 0;
let count = 0;
let choice = 0;
let choosing = true;
let running = false;
while (true) {
    // keep iterating...
    if (choosing) {  // select a test
        if (running) { // terminate current test's display first
            meter.hide();
            basic.pause(100); // let that take effect
            running = false;
        } // state is now [!running and choosing]
        basic.showNumber(choice);
        basic.pause(100); 
        // pressing A+B will toggle state to [!running & !choosing]
    } else {  // run the currently selected test
        if (!running) { // set the test up first
            setupTest(choice);
            running = true;
        } // state is now {running & !choosing]
        updateTest(choice); 
        /* ...followed by various test-dependent delays, during which
          animated adjustment/flashing may take place, and (eventually)
          pressing A+B will toggle state to [running & choosing]
        */ 
    }
}
