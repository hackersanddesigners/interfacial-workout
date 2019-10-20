#include <Keyboard.h>
#include <movingAvg.h>

// Original values were 200 and then 600
const int PressedMaxThreshold = 200;
const int ReleasedMinThreshold = 300;
const byte PinCount = 3;

//Use at least 10Mohm resistors, or smaller in series

const byte InputPins[PinCount] = {A0, A1, A2};
const char KeyCodes[PinCount] = {'o', 't', 'n'};

/*
Cycle through elements (pin D on Makey)
    > go to previous content > o

Print (pin F on makey)
    > generate pdf > t

Choose random font (pin G on Makey)
    > random > n
*/


struct TouchInput
{
  byte analogPin;
  char keycode;
  movingAvg filter = movingAvg(20);
  boolean wasPressed = false;
};


TouchInput Pins[PinCount];


void setup()
{
  Serial.begin(115200);


  for (int i = 0; i < PinCount; i++)
  {
    Pins[i].analogPin = InputPins[i];
    Pins[i].keycode = KeyCodes[i];
    Pins[i].filter.begin();
  }
}




void loop()
{
  for (int i = 0; i < PinCount; i++)
  {
    float currentAverage = Pins[i].filter.reading(analogRead(Pins[i].analogPin));
    boolean previousState = Pins[i].wasPressed;
    boolean currentState = previousState; // Default if in the dead zone


    if (currentAverage < PressedMaxThreshold)
    {


      currentState = true;      // Pressed


    }
    else if  (currentAverage > ReleasedMinThreshold)
    {


      currentState = false;      // Released
    }


    if (currentState != previousState)
    {
      if (currentState)
        Keyboard.press(Pins[i].keycode);
      else
        Keyboard.release(Pins[i].keycode);
    }
    Pins[i].wasPressed = currentState;
  }
}
