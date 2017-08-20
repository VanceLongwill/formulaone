// Returns an array of Integer values for a given range
// Used here to generate a list of year options for a react component
export const getArrayOfYears = (startYear, endYear) => {
  return Array.from(new Array(endYear-startYear+1), (x,i) => i + startYear);
}

export const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
