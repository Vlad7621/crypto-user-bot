export const validationTotalVolume = (
   volume: string | null
) => {
   if (!volume) return false;

   const match = volume.match(/([\d,\.]+)([a-zA-Z]*)/);

   if (match) {
      const number = parseFloat(match[1].replace(/,/g, ''));
      const suffix = match[2] || '';

      if ((number > 500 && suffix === 'K') || suffix === 'M' || suffix === 'B') {
         return true;
      }

      return false;
   }

   return false;
};

export const validationFrequency = (
   frequency: string | null
) => {
   if (!frequency) return false;

   const match = frequency.match(/([\d,\.]+)([a-zA-Z]*)/);

   if (match) {
      const number = parseFloat(match[1].replace(/,/g, ''));
      const suffix = match[2] || '';

      if (number > 10 && !!suffix) {
         return true
      }

      return false;
   }

   return false;
}

export const validationEta = (
   eta: string | null
) => {
   if (!eta) return false;

   const match = eta.match(/(?:(\d+)\s*h(?:ours?|s)?)?(?:\s*,?\s*(\d+)\s*m(?:inutes?|ins?)?)?/);

   if (match) {
      const hours = match[1] ? parseInt(match[1]) : 0;
      const minutes = match[2] ? parseInt(match[2]) : 0;

      if (hours > 0 || minutes >= 9) {
         return true;
      }
   }

   return false;
}

export const validation = (
   volume: string | null,
   frequency: string | null,
   potential: string | null,
   eta: string | null,
   futures: string | null,
) => {
   const isValidTotalVolume = validationTotalVolume(volume);
   const isValidFrequency = validationFrequency(frequency);
 
   // const isValidPotential = parseFloat(potential || '0') > 10;
   const isValidEta = validationEta(eta);

   if(isValidTotalVolume && isValidFrequency && isValidEta && !!futures) {
      return true;
   }

   return false;
}