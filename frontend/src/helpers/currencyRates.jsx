const currencyRates = (num) => {
  
    const convertToCOP = new Intl.NumberFormat('es-CO', {
        style : "currency",
        currency: "COP",
        minimumFractionDigits: 0
    });
  
  
    return convertToCOP.format(num); 
};

export default currencyRates