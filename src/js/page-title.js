// Dynamisch page title script
// Wisselt de page title wanneer de gebruiker het tabblad verlaat

(function() {
  // Sla de originele page title op
  const originalTitle = document.title;
  const alternateTitle = "Psst... je tuin aanpakken?";
  const alternateDuration = 2000; // Toon alternate title 2 seconden
  const waitBeforeNextAlternate = 8000; // Wacht 8 seconden op originele title
  
  let timeoutId = null;

  function clearTitleTimeout() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  function startHiddenTitleCycle() {
    // Wacht eerst voordat de alternate title voor het eerst verschijnt
    timeoutId = setTimeout(function() {
      if (!document.hidden) {
        return;
      }

      document.title = alternateTitle;

      timeoutId = setTimeout(function() {
        document.title = originalTitle;

        if (document.hidden) {
          startHiddenTitleCycle();
        }
      }, alternateDuration);
    }, waitBeforeNextAlternate);
  }

  // Luister naar visibility changes
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // Tabblad is niet zichtbaar - start 2s alternate, 8s origineel cycle
      clearTitleTimeout();
      startHiddenTitleCycle();
      
    } else {
      // Tabblad is weer zichtbaar - stop interval en zet originele title terug
      clearTitleTimeout();
      document.title = originalTitle;
    }
  });
})();
