
export interface FontPair {
  headline: {
    name: string;
    family: string; 
    weight: number;
  };
  body: {
    name: string;
    family: string;
    weight: number;
  };
}

export const fontPairings: FontPair[] = [
  {
    headline: { name: 'Playfair Display', family: "'Playfair Display', serif", weight: 700 },
    body: { name: 'Source Sans Pro', family: "'Source Sans Pro', sans-serif", weight: 400 },
  },
  {
    headline: { name: 'Montserrat', family: "'Montserrat', sans-serif", weight: 700 },
    body: { name: 'Merriweather', family: "'Merriweather', serif", weight: 400 },
  },
  {
    headline: { name: 'Oswald', family: "'Oswald', sans-serif", weight: 500 },
    body: { name: 'Lato', family: "'Lato', sans-serif", weight: 400 },
  },
  {
    headline: { name: 'Raleway', family: "'Raleway', sans-serif", weight: 600 },
    body: { name: 'Roboto', family: "'Roboto', sans-serif", weight: 400 },
  },
  {
    headline: { name: 'Lora', family: "'Lora', serif", weight: 700 },
    body: { name: 'Open Sans', family: "'Open Sans', sans-serif", weight: 400 },
  },
    {
    headline: { name: 'Roboto Slab', family: "'Roboto Slab', serif", weight: 700 },
    body: { name: 'Roboto', family: "'Roboto', sans-serif", weight: 400 },
  },
  {
    headline: { name: 'Poppins', family: "'Poppins', sans-serif", weight: 600 },
    body: { name: 'PT Sans', family: "'PT Sans', sans-serif", weight: 400 },
  },
  {
    headline: { name: 'Nunito', family: "'Nunito', sans-serif", weight: 800 },
    body: { name: 'Nunito Sans', family: "'Nunito Sans', sans-serif", weight: 400 },
  },
  {
    headline: { name: 'Anton', family: "'Anton', sans-serif", weight: 400 },
    body: { name: 'Work Sans', family: "'Work Sans', sans-serif", weight: 400 },
  },
  {
    headline: { name: 'Bebas Neue', family: "'Bebas Neue', sans-serif", weight: 400 },
    body: { name: 'Montserrat', family: "'Montserrat', sans-serif", weight: 400 },
  },
];
