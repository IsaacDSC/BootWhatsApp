const dados= [ {
    nome: 'asdasda',
    telephone: '88888888888@c.us',
    neighborhood: null,
    address: '',
    name: 'Atum',
    class: 'pizza',
    desc: '',
    value: 20,
    id: 28,
    quantity: 1,
    note: 'n',
    delivery: 1.99,
    formPayment: '',
    profit: 15,
    spent: 5,
    status: 'Preparando',
  },
  {
    nome: 'Matheus',
    telephone: '553588798846@c.us',
    neighborhood: null,
    address: '',
    name: 'X-Tudo',
    class: 'promocoes',
    desc: '',
    value: 14.5,
    id: 29,
    quantity: 1,
    note: 'n',
    delivery: 1.99,
    formPayment: '',
    profit: 9.5,
    spent: 5,
    status: 'Preparando',
  },
   {
    nome: 'Matheus',
    telephone: '553588798846@c.us',
    neighborhood: null,
    address: '',
    name: 'Atum',
    class: 'pizza',
    desc: '',
    value: 20,
    id: 30,
    quantity: 2,
    note: 'N',
    delivery: 1.99,
    formPayment: '',
    profit: 30,
    spent: 10,
    status: 'Preparando',
  },
  {
   nome: 'Matheus',
   telephone: '553588798846@c.us',
   neighborhood: null,
   address: '',
   name: 'Atum',
   class: 'pizza',
   desc: '',
   value: 20,
   id: 30,
   quantity: 2,
   note: 'N',
   delivery: 1.99,
   formPayment: '',
   profit: 30,
   spent: 10,
   status: 'Preparando',
 },
 {
    nome: 'asdasda',
    telephone: '88888888888@c.us',
  neighborhood: null,
  address: '',
  name: 'Atum',
  class: 'pizza',
  desc: '',
  value: 20,
  id: 30,
  quantity: 2,
  note: 'N',
  delivery: 1.99,
  formPayment: '',
  profit: 30,
  spent: 10,
  status: 'Preparando',
},
{
 nome: 'asdasda',
 telephone: '88888888888@c.us',
 neighborhood: null,
 address: '',
 name: 'Atum',
 class: 'pizza',
 desc: '',
 value: 20,
 id: 30,
 quantity: 2,
 note: 'N',
 delivery: 1.99,
 formPayment: '',
 profit: 30,
 spent: 10,
 status: 'Preparando',
}
]

var saida = [];

for (var i = 0; i < dados.length; i++) {

    var telehpneIgual = false;
    
    for (var j = 0; j < i; j++) {
        if (saida[j] && dados[i].telephone == saida[j].telephone) {
            saida[j].pedidos.push({
                nome: dados[i].name,
                class: dados[i].class,
                value: dados[i].value,
                id:dados[i].id,
                profit:dados[i].profit,
                spent:dados[i].spent,
                quantity:dados[i].quantity,
       
            })
            telehpneIgual = true;
            break;
        }
    }
    
    if (!telehpneIgual) {
        saida.push({
            telephone: dados[i].telephone,
            nome: dados[i].nome,
            neighborhood: dados[i].neighborhood,
            address: dados[i].address,
            note:dados[i].note,
            delivery:dados[i].delivery,
            status:dados[i].status,
            formPayment:dados[i].formPayment,
            pedidos: [{
                nome: dados[i].name,
                class: dados[i].class,
                value: dados[i].value,
                id:dados[i].id,
                profit:dados[i].profit,
                spent:dados[i].spent,
                quantity:dados[i].quantity,
            }]
        })
    }
}

console.log(saida[1])