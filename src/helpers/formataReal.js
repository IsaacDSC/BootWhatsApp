const dinheiroReal = (valor) => valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

exports.dinheiroReal = dinheiroReal