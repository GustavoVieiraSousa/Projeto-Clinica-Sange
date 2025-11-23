Antes de qualquer coisa, você precisará do npm ou pnpm para rodar o projeto em modo DEV.

Baixe o XAMPP, execute-o pela primeira vez e coloque a pasta do projeto dentro de htdocs, de modo que o caminho fique algo como:
"..\..\htdocs\Projeto-Clinica-Sange".

Abra o XAMPP novamente, inicie as portas do Apache e MySQL, e acesse a URL "http://localhost/dashboard/".
Em seguida, entre no phpMyAdmin, crie o banco de dados chamado "sange" e importe o arquivo de banco de dados fornecido junto ao projeto na pasta database.

Com o banco importado e configurado, abra a aplicação em seu editor de código (preferencialmente o Visual Studio Code) e, no terminal, execute o comando "npm run dev" ou "pnpm run dev"
A aplicação será iniciada em uma porta disponível, indicada no próprio terminal. Pronto — o programa estará em execução.
