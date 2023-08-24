const getCentroidIncomePopulation = (latlon, radius, setValue)=>{
    setValue({"fetching": 1})
    const result =  fetch(`http://localhost:8080/api/map?latlon=${latlon[0]},${latlon[1]}&radius=${radius}`)
                    .then(response =>{
                        if (!response.ok) {
                            throw Error(response.statusText);
                        }
                        return response.json()
                    })
                    .then(jsonData => {
                        return jsonData;
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        return "error";
                    });
    return result;
}

export default getCentroidIncomePopulation;