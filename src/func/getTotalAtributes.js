const getTotalAtributes = (playerCharacter) => {
    let STR = 0;
    let DEX = 0;
    let CON = 0;
    let INT = 0;
    let TOU = 0;
    let AGI = 0;
    
    playerCharacter.itens.forEach((item) => {
        STR+= item ? item.STR : 0;
        DEX+= item ? item.DEX : 0;
        CON+= item ? item.CON : 0;
        INT+= item ? item.INT : 0;
        TOU+= item ? item.TOU : 0;
        AGI+= item ? item.AGI : 0;
    });

    const totalItensAtributes = {
        itensSum: {
            STR, 
            DEX, 
            CON, 
            INT, 
            TOU, 
            AGI, 
        }
    };
    
    STR += playerCharacter.atributes.STR;
    DEX += playerCharacter.atributes.DEX;
    CON += playerCharacter.atributes.CON;
    INT += playerCharacter.atributes.INT;
    TOU += playerCharacter.atributes.TOU;
    AGI += playerCharacter.atributes.AGI;

    return {
        ...totalItensAtributes,
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

module.exports = getTotalAtributes;