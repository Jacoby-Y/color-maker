export const rgb = (r,g,b)=> (r < 16 ? `0${r.toString(16)}` : r.toString(16)) + (g < 16 ? `0${g.toString(16)}` : g.toString(16)) + (b < 16 ? `0${b.toString(16)}` : b.toString(16));

export const tooDark = (r,g,b)=> r+b+g < 255*3/2
