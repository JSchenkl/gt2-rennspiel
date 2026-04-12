# GT2 - Rennspiel

Ein browserbasiertes 2D-Rennspiel als einzelne HTML-Datei. Keine Installation noetig - einfach `index.html` im Browser oeffnen.

## Features

- **Mehrere Strecken** mit Streckenauswahl im Hauptmenue
- **Strecken-Editor** - eigene Strecken erstellen, bearbeiten und speichern (localStorage)
- **Strecken-Viewer** - Strecken frei erkunden
- **Realistisches Fahrverhalten** mit Drift-Mechanik und Schadenssystem
- **Regen- und Nachtmodus** fuer unterschiedliche Bedingungen
- **Ideallinie** einblendbar als Fahrhilfe
- **Engine-Sound** - dynamischer Motorsound via Web Audio API (Mehrzylinder-Synthese, Auspuff, Drift-Quietschen)
- **Gamepad-Unterstuetzung** (Xbox Controller) mit analogem Gas/Bremse und Lenkung
- **Kameramodi** - Draufsicht, Verfolgung und Filmkamera
- **Rundenzeiten** mit Live-Anzeige
- **Minimap** zur Orientierung

## Steuerung

### Tastatur
| Taste | Aktion |
|-------|--------|
| W / Pfeil hoch | Gas |
| S / Pfeil runter | Bremsen |
| A / Pfeil links | Links lenken |
| D / Pfeil rechts | Rechts lenken |
| C | Kameramodus wechseln |

### Xbox Controller
| Eingabe | Aktion |
|---------|--------|
| Rechter Trigger (RT) | Gas |
| Linker Trigger (LT) / A | Bremsen |
| Linker Stick | Lenken |
| B | Reparieren (bei Totalschaden) |
| Start | Kameramodus wechseln |
| Y | Zurueck zum Menue |

## Starten

Einfach `index.html` in einem modernen Browser oeffnen (Chrome, Firefox, Edge).

```
# Oder mit einem lokalen Server:
npx serve .
```

## Technik

- Vanilla JavaScript, kein Framework
- Canvas 2D Rendering
- Web Audio API fuer Sound
- Gamepad API fuer Controller
- localStorage fuer eigene Strecken
