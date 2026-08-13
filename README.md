# Alnarpsmodellen - Beräkning av återanskaffningskostnad för träd

En webbaserad applikation för att beräkna återanskaffningskostnad för träd enligt Alnarpsmodellen.

## Om Alnarpsmodellen

Alnarpsmodellen är en metod för att värdera träd och beräkna kostnaden för att ersätta ett skadat eller förlorat träd. Modellen tar hänsyn till:

- Trädmått (stamomkrets)
- Plantskolepris
- Skador och vitalitet (bedöms på en skala 0-4)
- Trädets placering (gatuträd eller övrig mark)
- Kulturella, biologiska och estetiska värden

## Beräkningsformler

### 1. Area värderat träd
```
Area = (Stamomkrets²) / (4 × π)
```

### 2. Pris per cm² för plantskoleträdet
```
Pris per cm² = Plantskolepris / 13,45
```
*(där 13,45 cm² är arean för ett träd av storlek 12-14)*

### 3. Trädets pris
```
Trädets pris = Pris per cm² × Area värderat träd
```
*(Max: 85 000 kr)*

### 4. Skador och vitalitet
```
Faktor = (Vitalitet + Rot/stambasskador + Stamskador + Kronskador) / 16
```
*(Varje parameter bedöms på skalan 0-4)*

### 5. Etableringskostnad

**För gatuträd:**
```
Etableringskostnad = 70 × Area + 20 000 kr
```

**För träd på övrig mark:**
```
Etableringskostnad = 70 × Area + 10 000 kr
```
*(Max: 75 000 kr)*

### 6. Återanskaffningskostnad
```
Återanskaffningskostnad = (Trädets pris × Skador och vitalitet) + Etableringskostnad
```

## Installation

Applikationen är helt statisk och kräver ingen installation. För att använda den:

1. Ladda ner eller klona projektet
2. Öppna `index.html` i en webbläsare

Alternativt, använd en lokal webbserver:

```bash
# Med Python 3
python -m http.server 8000

# Med Node.js (http-server)
npx http-server
```

## Användning

1. Fyll i grunduppgifter (datum, objekt, värderare)
2. Ange trädmått och plantskolepris
3. Bedöm skador och vitalitet med hjälp av reglagen (0-4)
4. Välj trädets placering
5. Markera relevanta kulturella, biologiska och estetiska värden
6. Lägg till eventuella kommentarer
7. Klicka på "Beräkna återanskaffningskostnad"
8. Se resultatet som visas längst ner på sidan

## Filstruktur

```
alnarpsmodellen/
├── index.html          # Huvudsidan med formuläret
├── style.css           # Styling för applikationen
├── script.js           # Beräkningslogik och interaktivitet
└── README.md           # Denna fil
```

## Teknisk information

- **Språk:** HTML5, CSS3, JavaScript (ES6+)
- **Responsiv:** Fungerar på desktop, tablet och mobil
- **Utskriftsvänlig:** Optimerad för utskrift
- **Inga beroenden:** Kör direkt i webbläsaren utan externa bibliotek

## Webbläsarkompatibilitet

Applikationen fungerar i alla moderna webbläsare:
- Chrome/Edge (rekommenderas)
- Firefox
- Safari
- Opera

## Licens

Detta projekt är skapat för beräkning av trädvärden enligt Alnarpsmodellen.

## Kontakt

För frågor eller förbättringsförslag, vänligen kontakta projektägaren.