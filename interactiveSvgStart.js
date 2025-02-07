document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});

async function runProgram() {
  let selected;
  let selectedID;
  let color;
  let active;

  // Hent JSON
  let jsondata = await fetch("museum.json");
  let objekter = await jsondata.json();
  console.log(objekter);

  // 1. Load SVG map
  let mySvg = await fetch("kort1.svg");
  let svg = await mySvg.text();
  document.querySelector("#map").innerHTML = svg;

  // 2. Skift farve og vis tekst ved klik
  document.querySelector("#map #Points").addEventListener("click", function (event) {
    clicked(event);
  });

  function clicked(event) {
    // Find det klikkede element
    selected = event.target;
    // Find det klikkede elements ID
    selectedID = selected.getAttribute("id");
    console.log("Clicked element ID: ", selectedID);

    // Find det klikkede elements fillfarve
    color = selected.getAttribute("fill");
    console.log("Element color: ", color);

    // Find matching objekt fra JSON-dataet
    let objekt = objekter.find((o) => o.sted === selectedID);

    if (objekt) {
      // Vis infoboks
      document.querySelector("#info").style.visibility = "visible";
      document.querySelector("#info p").textContent = objekt.tekst;
      document.querySelector("#info img").src = "/img/" + objekt.billede + ".jpg";

      // Hvis der er et tidligere aktivt element, reset farven
      if (active) {
        active.setAttribute("fill", color);
      }

      // Gør det klikkede element til aktivt
      active = selected;

      // Skift farve på det valgte element
      if (color === "#b62300") {
        selected.setAttribute("fill", "#123456");
      } else {
        selected.setAttribute("fill", "#b62300");
      }

      // Klik på infoboks for at skjule den
      document.querySelector("#info").addEventListener("click", function () {
        document.querySelector("#info").style.visibility = "hidden";
        selected.setAttribute("fill", color); // Reset farven til original
      });
    }
  }
}

// document.addEventListener("DOMContentLoaded", function() {runProgram();

// });

// async function runProgram() {
//   let selected;
//   let selectedID;
//   let color;
//   let active;
//   // let infoboks;

//   // Hent JSON

//   let jsondata = await fetch("museum.json");
//   let objekter = await jsondata.json();
//   console.log(objekter);

//   // 1. Load SVG map

//   let mySvg = await fetch("kort1.svg");
//   let svg = await mySvg.text();

//   document.querySelector("#map").innerHTML = svg;

//   // 2. Find infobokse og skjul dem

//   // 3. Skift farve ved klik og vis tekst

//   document.querySelector("#map #Points").addEventListener("click", function (event) {
//     clicked(event);
//   });

//   // Function clicked

//   function clicked(obj) {
//     document.querySelector("#info").style.visibility = "visible";
//     console.log(obj.target);

//     objekter.forEach((objekt) => {
//       //   if (infoboks != undefined) {
//       //     infoboks.style.visibility = "hidden";

//       // a. Find det klikkede element

//       selected = obj.target;

//       // b. Find det klikkede elements ID

//       selectedID = selected.getAttribute("id");
//       console.log(selectedID);

//       // c. Find det klikkede elements fillfarve

//       color = selected.getAttribute("fill");
//       console.log(color);

//       // d. Vis infobokse

//       if (selectedID == objekt.sted) {
//         document.querySelector("#info p").textContent = objekt.tekst;
//         document.querySelector("#info img").src = "/img/" + objekt.billede + ".jpg";
//         document.querySelector("#info").addEventListener("click", function () {
//           document.querySelector("#info").style.visibility = "hidden";
//           document.querySelector("#" + selectedID).setAttribute("fill", "#b62300");
//         });
//       }
//     });

//     // 4. Hvis der tidligere har været klikket, så skal det forrige elements farve skifte farve til det originale

//     if (active != undefined) {
//       active.setAttribute("fill", color);
//     }

//     // Gør det klikkede til det aktive

//     active = selected;

//     // Skift farve på det valgte

//     if (color === "#b62300") {
//       document.querySelector("#" + selectedID).setAttribute("fill", "#123456");
//     }

//     // Reset farve og skjul tekst, hvis valgt element allerede er aktivt
//     else {
//       document.querySelector("#" + selectedID).setAttribute("fill", "#b62300");
//       // infoboks.style.visibility = "hidden";
//     }
//   }
// }
