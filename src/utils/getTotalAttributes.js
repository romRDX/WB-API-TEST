const getTotalAttributes = (character) => {
    let STR = 0;
    let DEX = 0;
    let CON = 0;
    let INT = 0;
    let TOU = 0;
    let AGI = 0;
    
    if(character.itens){
        character.itens.forEach((item) => {
            STR+= item ? item.STR : 0;
            DEX+= item ? item.DEX : 0;
            CON+= item ? item.CON : 0;
            INT+= item ? item.INT : 0;
            TOU+= item ? item.TOU : 0;
            AGI+= item ? item.AGI : 0;
        });
    }

    const totalItensAttributes = {
        itensSum: {
            STR, 
            DEX, 
            CON, 
            INT, 
            TOU, 
            AGI, 
        }
    };
    
    STR += character.attributes.STR;
    DEX += character.attributes.DEX;
    CON += character.attributes.CON;
    INT += character.attributes.INT;
    TOU += character.attributes.TOU;
    AGI += character.attributes.AGI;

    return {
        ...totalItensAttributes,
        total: {
            STR,
            DEX,
            CON,
            INT,
            TOU,
            AGI,
        },
    }
};

module.exports = getTotalAttributes;