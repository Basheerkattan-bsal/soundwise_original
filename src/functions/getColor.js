import { prominent } from 'color.js';

const fetchColor = async(image) => {

  const color = await prominent(image, {
    format: 'hex',
    amount: 5,
  })

  return color
};

export default fetchColor
