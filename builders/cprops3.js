/* scene-kit pieces for Chayei Sarah */
Object.assign(PR,{
 cave:`<path d="M-70 0q6-52 70-58q64 6 70 58z" fill="#9A8A6E"/><path d="M-58 0q4-40 58-46q54 6 58 46z" fill="#B3A283"/><path d="M-22 0q2-30 22-32q20 2 22 32z" fill="#3A2E22"/><path d="M-14 0q1-18 14-20q13 2 14 20z" fill="#241B13"/><path d="M-60 -6q20-6 30 0M30 -20q14-4 24 4" stroke="#8A7A5E" stroke-width="2" fill="none"/><path d="M-70 0h140" stroke="#7A6A4E" stroke-width="3"/>`,
 jug:`<path d="M-7 -30h14l-2 5q10 6 9 18q-1 10-14 10q-13 0-14-10q-1-12 9-18z" fill="#C9744A" stroke="#8A4A2A" stroke-width="1.2"/><path d="M-8 -14h16" stroke="#E8B28A" stroke-width="2"/><path d="M7 -22q8 2 6 10" stroke="#8A4A2A" stroke-width="2" fill="none"/>`,
 trough:`<path d="M-36 -14h72l-6 14h-60z" fill="#8A6A4A" stroke="#5A3A1A"/><path d="M-32 -12h64" stroke="#5DA8EE" stroke-width="4"/><path class="wave" d="M-30 -12q8-3 16 0t16 0 16 0 16 0" stroke="#BFE0FF" stroke-width="1.5" fill="none"/>`,
 jewels:`<g><circle cx="-22" r="10" fill="none" stroke="#E3B84A" stroke-width="4"/><circle cx="22" r="10" fill="none" stroke="#E3B84A" stroke-width="4"/><circle cy="-4" r="6" fill="none" stroke="#F4D35E" stroke-width="3"/>${[0,1,2].map(i=>`<path class="tw" style="animation-delay:${i*.4}s" d="M${-30+i*30} ${-22+(i%2)*6}l2 4 4 1-4 2-2 4-2-4-4-2 4-1z" fill="#FFF3B8"/>`).join("")}</g>`
});
