import { Language as L } from "./interfaces";

export const translations: { [key: string]: Map<L, string> } = {
  submit: new Map([
    [L.DE, "Lösung einreichen"],
    [L.EN, "Submit solution"]
  ]),
  netFunction: new Map([
    [L.DE, "Dieses Netz berechnet die folgende Funktion:"],
    [L.EN, "This network calculates the following function:"]
  ]),
  errFunction: new Map([
    [L.DE, "Dieses Netz nutzt die folgende Fehlerfunktion:"],
    [L.EN, "This network uses the following cost function:"]
  ]),
  tip: new Map([
    [
      L.DE,
      "Tipp: Benutze Stift und Papier für diese Übung! Das Formular dient nur zur Abgabe!"
    ],
    [
      L.EN,
      "Tip: Use pen and paper to solve this exercise! This form is only for the submission!"
    ]
  ]),
  invalidNumber: new Map([
    [L.DE, `Der eingegebene Wert "{0}" ist keine gültige Zahl!`],
    [L.EN, `The number {0} you entered is not a valid number!`]
  ]),
  missingValues: new Map([
    [L.DE, "Es fehlen {0} Eingabewert(e)!"],
    [L.EN, `{0} value(s) are missing!`]
  ]),
  wrongFFValue: new Map([
    [
      L.DE,
      "Bist du dir sicher? Wir haben {0} andere(n) Wert(e) heraus! Tip: {1} sieht falsch aus. Alle Werte davor stimmen, also versuche doch nochmal diesen Wert zu berechnen ;)"
    ],
    [
      L.EN,
      "Are you sure? We have {0} value(s) different! Hint: {1} seems wrong. All values before are correct, so try to recalculate this number ;)"
    ]
  ]),
  change: new Map([
    [L.DE, "Änderung von"],
    [L.EN, "Changing"]
  ]),
  to: new Map([
    [L.DE, "zu"],
    [L.EN, "to"]
  ]),
  submitted: new Map([
    [L.DE, "Abgegeben"],
    [L.EN, "Submitted"]
  ]),
  yieldsError: new Map([
    [L.DE, "ergibt einen Fehler von"],
    [L.EN, "yields error"]
  ]),
  step: new Map([
    [L.DE, "Schritt"],
    [L.EN, "Step"]
  ]),
  expected: new Map([
    [L.DE, "Soll-Wert"],
    [L.EN, "Expected"]
  ]),
  nextStep: new Map([
    [L.DE, "Weiter zum Backpropagation Schritt"],
    [L.EN, "Move on to the backpropagation step"]
  ]),
  thanks: new Map([
    [
      L.DE,
      "Danke dass du dir Zeit für diese Übung genommen hast! Deine Ergebnisse wurden an den Server übermittelt und du wirst gleich eine Antwort erhalten!"
    ],
    [
      L.EN,
      "Thank you for taking the time for this exercise! Your results were successfully transmitted to the server and you will receive an answer shortly!"
    ]
  ]),

  resultSuccess: new Map([
    [L.DE, "Deine Werte sind alle korrekt! Sehr gut gemacht!"],
    [L.EN, "All your values are correct! Good job!"]
  ]),

  resultError: new Map([
    [
      L.DE,
      "Die Werte sind leider nicht alle korrekt. Versuche es doch noch einmal, du hast so viele Versuche wie du brauchst."
    ],
    [L.EN, "Not all your values are correct. Try again and take your time!"]
  ]),

  whywow: new Map([
    [
      L.DE,
      "Du hast erfolreich den Backpropagation Schritt durchgeführt! Nun kannst du deine berechneten Gradienten einmal selbst nutzen um den Fehler dieses Netzes zu verringern! Du errinnerst dich bestimmt daran, dass der Gradient eines Gewichtes/Bias uns sagt mit welcher Intensität das Gewicht/Bias vergrößert oder verkleinert werden sollte. Probiere doch einmal das Netz mit dem Schieberegler unten auf dieser Seite zu verbessern :)"
    ],
    [
      L.EN,
      "You have successfully performed the backpropagation step! You can now use your calculated gradients to decrease the network's error! You might remember that the gradient of a weight/bias tells us how much this weight/bias needs to be increased or decreased to minimize the error. Go ahead and try to improve this network with the slider at the bottom of the page :)"
    ]
  ]),
  wowinstructions: new Map([
    [
      L.DE,
      "Hier kannst du den Wert von {0} anpassen und sehen, wie sich die Änderung auf den Fehler des Netzes auswirkt. Du wirst sehen, dass sich der Fehler bei Änderung in Richtung des negativen Gradienten verringern wird. Nichts anderes passiert im Gradient Descent Verfahren beim Trainieren von künstlichen neuronalen Netzen..."
    ],
    [
      L.EN,
      "Here you can change the value of {0} and see how the changes will affect the networks error. You will see that the error decreases when {0} is changed in the direction of the negative gradient. This is what is done with Gradient Descent during training of artificial neural networks..."
    ]
  ])
};
