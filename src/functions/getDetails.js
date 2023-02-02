const getDetails = (type, id, searchParams) => {
  
  const result = fetch(`https://api.spotify.com/v1/${type}s/${id}`, searchParams)
    .then(res => res.json())
    .then(res => {
      console.log('getDetails', res)
      return res
    });

  return result
};

export default getDetails
