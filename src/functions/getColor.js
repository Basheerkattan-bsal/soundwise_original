import { prominent } from 'color.js';

const fetchColor = (image) => {

  prominent(image, {
    format: 'hex',
    amount: 5,
  }).then(color => {
    return(color);
  });
};

export default fetchColor
