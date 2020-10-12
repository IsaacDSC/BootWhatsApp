-Fluxo Mensagens
    -- Boas Vindas e apresentar o cardápio
    -- Vendas
    -- Resumo de todos os prod que o cliente pediu, total e aguardar confiramação do pedido
    -- endereço de entrega
    --encerramento



message.sender.pushname == nome que o usuario colocou no seu wpp
message.sender.name == nome que o usuario esta salvo na minha agenda
message.sender.id == numero misturado com siglas
message.sender.img ou imgFull == foto de perfil do cliente
message.body == mensagem recebida
message.from == quem enviou a mensagem
message.to == quem recebeu a mensagem


Instalar Chromium no servidor:
    1- npm i puppeteer
    2- sudo apt-get install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
    3-npm install sharp


Build Pack Heroku:

https://buildpack-registry.s3.amazonaws.com/buildpacks/jontewks/puppeteer.tgz
heroku/nodejs


Retirar emojis para não enviar ao banco de dados: text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
Para aceitar Emojis no Banco de dados: ALTER TABLE tabela MODIFY coluna VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


ALTER TABLE relacionamentos ADD COLUMN MenuId int first;
ALTER TABLE relacionamentos ADD FOREIGN KEY (cardapioId) REFERENCES menus(id);

Para Inserir na tabela os dados e retornar o id: {
    INSERT INTO  admins (name,email,password,createdAt,updatedAt)
    VALUES('bob','asdasd','sdasd','2020-09-20 01:51:52','2020-09-20 01:51:52');
    SELECT LAST_INSERT_ID();
}



function check() {
  document.getElementById("radio").checked = true;
}

Mudar o Ip enviaMensagem.js Socket.js ImagemQrCode.js


Fim