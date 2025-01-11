export const formatMessage = (opt: any, buttons?: any[]) => {
   const {
      firstLine,
      frequency,
      eta,
      potential,
      mcap,
      liquidity,
      holders,
      vol24h,
      ca,
      user,
      futures,
      period,
      minBuyPrice,
      maxBuyPrice,
      minSellPrice,
      maxSellPrice,
      remarks
   } = opt;

   const updatedFirstLine = firstLine.replace(/\b(selling|buying)\b/g, (match) => {
      return match === 'selling' ? 'продаж' : 'купівля';
   });

   const translateTimeToUkrainian = (eta: string) => {
      return eta
         .replace(/\b(\d+)\s*h(?:ours?|s)?\b/gi, '$1 год')
         .replace(/\b(\d+)\s*m(?:inutes?|ins?)\b/gi, '$1 хв');
   };

   const translateFrequencyToUkrainian = (text: string): string => {
      return text
         .replace(/\b(\d+)\s*seconds?\b/gi, '$1 секунд')
         .replace(/\bevery\b/gi, 'кожні');
   };

   const convertToUkrainianPeriod = (period: string) => {
      const [start, end] = period.split(' - ');
      const convertToKyivTime = (gmtString: string) => {
         const date = new Date(gmtString);
         return date.toLocaleString("uk-UA", { timeZone: "Europe/Kiev" });
      };

      const startTime = convertToKyivTime(start);
      const endTime = convertToKyivTime(end);

      return `${startTime} - ${endTime}`;
   }

   const btns = buttons?.map(({ button }) =>
      `<b><a href="${button.url}">${button.text.replace(/DS/, 'Chart')}</a></b>`
   );

   const price = (() => {
      let res = '';

      if(!!minBuyPrice) {
         res += `<b>Мінімальна ціна покупки</b>: ${minBuyPrice.replace(/per/, 'за')}\n`;
      }
      if(!!maxBuyPrice) {
         res += `<b>Максимальна ціна покупки</b>: ${maxBuyPrice.replace(/per/, 'за')}\n`;
      }

      if(!!minSellPrice) {
         res += `<b>Мінімальна ціна продажу</b>: ${minSellPrice.replace(/per/, 'за')}\n`;
      }
      if(!!maxSellPrice) {
         res += `<b>Максимальна ціна продажу</b>: ${maxSellPrice.replace(/per/, 'за')}\n`;
      }
      
      return !!res ? `\n${res}` : '';
   })();

   return `
<b>${updatedFirstLine}</b>

<b>Кількість</b>: ${translateFrequencyToUkrainian(frequency)}
<b>Час</b>: ${translateTimeToUkrainian(eta)}
<b>Потенційна зміна ціни</b>: ${potential}
${price}
${!!futures ? `🔗: ${futures}\n` : ''}
⏰: ${convertToUkrainianPeriod(period)}
<pre><code class="language-remarks">${remarks}</code></pre>

${btns?.join(' | ')}
`
}

// export const formatMessage = (opt: any) => {
//    const {
//       firstLine,
//       frequency,
//       eta,
//       potential,
//       mcap,
//       liquidity,
//       holders,
//       vol24h,
//       ca,
//       user,
//       futures,
//       period,
//       remarks
//    } = opt;

//    return `
// ${firstLine}

// <b>Frequency</b>: ${frequency}
// <b>ETA</b>: ${eta}
// <b>Potential price change</b>: ${potential}

// <b>MCAP</b>: ${mcap}
// <b>Liquidity</b>: ${liquidity}
// <b>Holders</b>: ${holders}
// <b>Vol 24h</b>: ${vol24h}

// <b>CA</b>: <code>${ca}</code>
// #${ca.slice(-10)}

// <b>User</b>: <code>${user}</code>
// #${user.slice(-10)}
// ${!!futures ? `\n<b>Futures</b>: ${futures}\n` : ''}
// <b>Period</b>: ${period}
// <pre><code class="language-remarks">${remarks}</code></pre>
// `
// }