export const formatMessage = (opt: any) => {
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
      remarks
   } = opt;

   return `
${firstLine}

<b>Frequency</b>: ${frequency}
<b>ETA</b>: ${eta}
<b>Potential price change</b>: ${potential}

<b>MCAP</b>: ${mcap}
<b>Liquidity</b>: ${liquidity}
<b>Holders</b>: ${holders}
<b>Vol 24h</b>: ${vol24h}

<b>CA</b>: <code>${ca}</code>
#${ca.slice(-10)}

<b>User</b>: <code>${user}</code>
#${user.slice(-10)}
${!!futures ? `\n<b>Futures</b>: ${futures}\n` : ''}
<b>Period</b>: ${period}
<pre><code class="language-remarks">${remarks}</code></pre>
`
}