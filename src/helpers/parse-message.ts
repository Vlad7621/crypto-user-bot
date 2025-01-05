// export const parseMessage = (text: string) => {
//    const extractValue = (regex: RegExp, str: string = text) => {
//       const match = str.match(regex);
//       return match ? match[1].trim() : null;
//    };

//    return {
//       firstLine: extractValue(/^([^\n]+)/),
//       amount: extractValue(/Amount:\s+([\d,\.]+\s+\w+)/),
//       frequency: extractValue(/Frequency:\s+\$(.+)$/m),
//       eta: extractValue(/ETA:\s+(.+)$/m),
//       potential: extractValue(/Potential price change:\s+(.+)$/m),
//       mcap: extractValue(/MCAP:\s+\$(.+)$/m),
//       liquidity: extractValue(/Liquidity:\s+\$(.+)$/m),
//       holders: extractValue(/Holders:\s+([\d,]+)/),
//       vol24h: extractValue(/Vol 24h:\s+\$(.+)$/m),
//       ca: extractValue(/CA:\s+([A-Za-z0-9]+)/),
//       user: extractValue(/User:\s+([A-Za-z0-9]+)/),
//       futures: extractValue(/Futures:\s+(.+)$/m, ),
//       period: extractValue(/Period:\s+(.+)$/m),
//       remarks: extractValue(/(🗒[\s\S]+?)DCA Tracker/)
//    };
// }

export const parseMessage = (html: string) => {
   const extractValue = (regex: RegExp, str: string = html) => {
      const match = str.match(regex);
      return match ? match[1].trim() : null;
   };

   return {
      firstLine: extractValue(/^([^\n]+)/),
      frequency: extractValue(/<strong>Frequency:<\/strong>\s+(.*)$/m),
      eta: extractValue(/<strong>ETA:<\/strong>\s+(.*)$/m),
      potential: extractValue(/<strong>Potential price change:<\/strong>\s+(.*)$/m),
      mcap: extractValue(/<strong>MCAP:<\/strong>\s+(.*)$/m),
      liquidity: extractValue(/<strong>Liquidity:<\/strong>\s+(.*)$/m),
      holders: extractValue(/<strong>Holders:<\/strong>\s+(.*)$/m),
      vol24h: extractValue(/<strong>Vol 24h:<\/strong>\s+(.*)$/m),
      ca: extractValue(/<strong>CA:<\/strong>\s*<code>([A-Za-z0-9]+)<\/code>/),
      user: extractValue(/<strong>User:<\/strong>\s*<code>([A-Za-z0-9]+)<\/code>/),
      futures: extractValue(/<strong>Futures:<\/strong>\s+(.*)$/m),
      period: extractValue(/<strong>Period:<\/strong>\s+(.*)$/m),
      remarks: extractValue(/<pre><code class="language-remarks">([\s\S]+?)<\/code><\/pre>/),
   };
};

