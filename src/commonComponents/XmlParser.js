const XmlParser = (sMyString) => {
    const oParser = new DOMParser();    
    try {
        const oDOM = oParser.parseFromString(sMyString, 'text/xml'); 
       // debugger;  
        if (oDOM.getElementsByTagName('parsererror').length > 0) {
            return false;
        } 
        return true;     
    } catch (error) {
       // console.log('coming feork xlmsl parser', error);
        //debugger;
        return false;       
    }
    
};

export default XmlParser;
