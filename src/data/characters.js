const lobo = 'https://ibb.co/k8nhS1z';

// https://romullo-sander.imgbb.com/
// https://ibb.co/hyQ2KSd X
// https://ibb.co/L8wrZpB X
// https://ibb.co/ft3zZpZ X
// https://ibb.co/NKfdHXP X
// https://ibb.co/8P9f9Dg X
// https://ibb.co/GHyn8jR
// https://ibb.co/CQKnGm1
// https://ibb.co/fCsY06h
// https://ibb.co/YB7C0Kk
// https://ibb.co/9Y2bKqM
// https://ibb.co/XJmKp7X
// https://ibb.co/ZKd089m
// https://ibb.co/w6BkSLk
// https://ibb.co/bdDT5zW
// https://ibb.co/qB0TgQQ
// https://ibb.co/3Fyqh6H
// https://ibb.co/m5H69q2
// https://ibb.co/hfsqHBD
// https://ibb.co/x1p3KVX
// https://ibb.co/2dbH7LQ
// https://ibb.co/dmjWS4F
// https://ibb.co/8bjFYxX
// https://ibb.co/W6R7kXf
// https://ibb.co/VWT6D7h
// https://ibb.co/k6bbd90
// https://ibb.co/54fFZYw
// https://ibb.co/6YCyqJn
// https://ibb.co/XscWych
// https://ibb.co/Z21JhRd
// https://ibb.co/5hHRS4s
// https://ibb.co/NSwXT2v
// https://ibb.co/7W7HLCb
// https://ibb.co/p2HQz3r
// https://ibb.co/QvV4N8V X
// https://ibb.co/n6Qtd2B X
// https://ibb.co/3k2QSYv X
// https://ibb.co/vJS34DR X
// https://ibb.co/vLNkqD0 X

const icones = [
    { cam: 'https://ibb.co/hyQ2KSd'},
    { cam: 'https://ibb.co/L8wrZpB'},
    { cam: 'https://ibb.co/ft3zZpZ'},
    { cam: 'https://ibb.co/NKfdHXP'},
    { cam: 'https://ibb.co/8P9f9Dg'},
    { cam: 'https://ibb.co/QvV4N8V'},
    { cam: 'https://ibb.co/n6Qtd2B'},
    { cam: 'https://ibb.co/3k2QSYv'},
    { cam: 'https://ibb.co/vJS34DR'},
    { cam: 'https://ibb.co/vLNkqD0'},

    { cam: ''},
    { cam: ''},
    { cam: ''},
    { cam: ''},
    { cam: ''},
    { cam: ''},
    { cam: ''},
    { cam: ''},
    { cam: ''},
];

const personagens = [
    {
        id: 2536734,
        nome: 'Renekton x1',
        nivel: 10,
        classe: 'Crocodilo',
        atributos: {STR: 5, DEX: 4, CON: 4, INT: 1, TOU: 2, AGI: 3}, 
        habilidades: [
                { nome: 'Garras', mod: 1, custo: 50, tipo: 'ataque', icone: icones[0].cam},
                { nome: 'Mordida', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[1].cam},
                { nome: 'Corte', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[3].cam},
                { nome: 'Fúria', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[4].cam},
                { nome: 'Força da Natureza', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[5].cam},
                // { nome: 'Sangria', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[6].cam},
                // { nome: 'Rugido', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[7].cam},
                // { nome: 'Teste', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[8].cam},
                // { nome: 'Teste2', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[9].cam},
            ], 
        tracos: [
            { nome: 'regen', efeito: '', icone: icones[0].cam},
            { nome: 'sangriax', efeito: '', icone: icones[1].cam},
            { nome: 'sangria2', efeito: '', icone: icones[3].cam},
            { nome: 'sangria3', efeito: '', icone: icones[4].cam},
            { nome: 'sangria4', efeito: '', icone: icones[5].cam},
            { nome: 'sangria5', efeito: '', icone: icones[6].cam},
            { nome: 'sangria6', efeito: '', icone: icones[7].cam},
            { nome: 'sangria7', efeito: '', icone: icones[8].cam},
            { nome: 'sangria8', efeito: '', icone: icones[9].cam},
        ],
        items: [
            { nome: 'item1', efeito: '', icone: icones[0].cam},
            { nome: 'item2', efeito: '', icone: icones[1].cam},
            { nome: 'item3', efeito: '', icone: icones[3].cam},
            { nome: 'item4', efeito: '', icone: icones[4].cam},
            { nome: 'item5', efeito: '', icone: icones[5].cam},
            { nome: 'item6', efeito: '', icone: icones[6].cam},
            { nome: 'item7', efeito: '', icone: icones[7].cam},
            { nome: 'item8', efeito: '', icone: icones[8].cam},
            { nome: 'item9', efeito: '', icone: icones[9].cam},
        ],
        especial: { nome: 'especial', tipo: 'fortalecimento', mod: 1.4, efeito: ''},
        modelo: icones[2].cam,
        portrait: lobo
    },
    {
        id: 2536735,
        nome: 'Renekton x2',
        nivel: 10,
        classe: 'Crocodilo',
        atributos: {STR: 5, DEX: 4, CON: 4, INT: 1, TOU: 2, AGI: 3}, 
        habilidades: [
                { nome: 'Garras', mod: 1, custo: 50, tipo: 'ataque', icone: icones[0].cam},
                { nome: 'Mordida', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[1].cam},
                { nome: 'Corte', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[3].cam},
                { nome: 'Fúria', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[4].cam},
                { nome: 'Força da Natureza', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[5].cam},
                // { nome: 'Sangria', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[6].cam},
                // { nome: 'Rugido', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[7].cam},
                // { nome: 'Teste', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[8].cam},
                // { nome: 'Teste2', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[9].cam},
            ], 
        tracos: [
            { nome: 'regen', efeito: '', icone: icones[0].cam},
            { nome: 'sangriax', efeito: '', icone: icones[1].cam},
            { nome: 'sangria2', efeito: '', icone: icones[3].cam},
            { nome: 'sangria3', efeito: '', icone: icones[4].cam},
            { nome: 'sangria4', efeito: '', icone: icones[5].cam},
            { nome: 'sangria5', efeito: '', icone: icones[6].cam},
            { nome: 'sangria6', efeito: '', icone: icones[7].cam},
            { nome: 'sangria7', efeito: '', icone: icones[8].cam},
            { nome: 'sangria8', efeito: '', icone: icones[9].cam},
        ],
        items: [
            { nome: 'item1', efeito: '', icone: icones[0].cam},
            { nome: 'item2', efeito: '', icone: icones[1].cam},
            { nome: 'item3', efeito: '', icone: icones[3].cam},
            { nome: 'item4', efeito: '', icone: icones[4].cam},
            { nome: 'item5', efeito: '', icone: icones[5].cam},
            { nome: 'item6', efeito: '', icone: icones[6].cam},
            { nome: 'item7', efeito: '', icone: icones[7].cam},
            { nome: 'item8', efeito: '', icone: icones[8].cam},
            { nome: 'item9', efeito: '', icone: icones[9].cam},
        ],
        especial: { nome: 'especial', tipo: 'fortalecimento', mod: 1.4, efeito: ''},
        modelo: icones[2].cam,
        portrait: lobo
    },
    {
        id: 2536736,
        nome: 'Renekton x3',
        nivel: 10,
        classe: 'Crocodilo',
        atributos: {STR: 5, DEX: 4, CON: 4, INT: 1, TOU: 2, AGI: 3}, 
        habilidades: [
                { nome: 'Garras', mod: 1, custo: 50, tipo: 'ataque', icone: icones[0].cam},
                { nome: 'Mordida', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[1].cam},
                { nome: 'Corte', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[3].cam},
                { nome: 'Fúria', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[4].cam},
                { nome: 'Força da Natureza', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[5].cam},
                // { nome: 'Sangria', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[6].cam},
                // { nome: 'Rugido', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[7].cam},
                // { nome: 'Teste', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[8].cam},
                // { nome: 'Teste2', mod: 1.2, custo: 50, tipo: 'ataque', icone: icones[9].cam},
            ], 
        tracos: [
            { nome: 'regen', efeito: '', icone: icones[0].cam},
            { nome: 'sangriax', efeito: '', icone: icones[1].cam},
            { nome: 'sangria2', efeito: '', icone: icones[3].cam},
            { nome: 'sangria3', efeito: '', icone: icones[4].cam},
            { nome: 'sangria4', efeito: '', icone: icones[5].cam},
            { nome: 'sangria5', efeito: '', icone: icones[6].cam},
            { nome: 'sangria6', efeito: '', icone: icones[7].cam},
            { nome: 'sangria7', efeito: '', icone: icones[8].cam},
            { nome: 'sangria8', efeito: '', icone: icones[9].cam},
        ],
        items: [
            { nome: 'item1', efeito: '', icone: icones[0].cam},
            { nome: 'item2', efeito: '', icone: icones[1].cam},
            { nome: 'item3', efeito: '', icone: icones[3].cam},
            { nome: 'item4', efeito: '', icone: icones[4].cam},
            { nome: 'item5', efeito: '', icone: icones[5].cam},
            { nome: 'item6', efeito: '', icone: icones[6].cam},
            { nome: 'item7', efeito: '', icone: icones[7].cam},
            { nome: 'item8', efeito: '', icone: icones[8].cam},
            { nome: 'item9', efeito: '', icone: icones[9].cam},
        ],
        especial: { nome: 'especial', tipo: 'fortalecimento', mod: 1.4, efeito: ''},
        modelo: icones[2].cam,
        portrait: lobo
    },
];

module.exports = personagens;