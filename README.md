## Sobre
<p>Este sistema é apenas uma demonstração de um CRUD feito com Laravel e React.</p>

<p>Este sistema serve para divulgar o meu trabalho e também serve como material de estudo para programadores que querem aprender um jeito diferente de usar o React.</p>

<p>Neste sistema eu utilizei o meu jeito de deixar o HTML separado do React e do Javascript, por isso há algumas diferenças em relação ao manual e ao tutorial do site do React. Caso você esteja procurando material de estudo para aprender o React sugiro que utilize o manual do React ao invés deste meu projeto.</p>

<p>CRUD significa:<br/>
Create (INSERT) (Cadastrar informações).<br/>
Read (SELECT) (Consultar informações).<br/>
Update (UPDATE) (Editar informações).<br/>
Delete (DELETE) (Excluir informações).<br/>
São quatro operações básicas.</p>

<p>Este sistema foi feito por mim, mas qualquer pessoa é livre para reutilizar e/ou modificar.</p>

<p>Observação: Os dados contidos no banco de dados deste sistema são fictícios.</p>

<br/>

## Instruções
<p>Para ver o resultado em um ambiente de desenvolvimento siga as instruções:</p>

<p>Inicie o MySQL Server.</p>

<p>Utilize o banco de dados contido no arquivo banco_de_dados_pessoas.sql.</p>

<p>Configure o MySQL Server para que o banco de dados deste sistema seja acessado por username root sem senha.</p>

<p>Se você preferir, você pode configurar neste sistema um outro username e uma outra senha.</p>

<p>Configure seu PHP pelo arquivo php.ini e certifique-se de deixar ativado intl e mbstring.</p>

<p>Coloque o diretório crud_laravel_react dentro do endereço DocumentRoot do seu Servidor Apache. Exemplo: coloque dentro de htdocs do XAMPP. Geralmente o DocumentRoot é o diretório htdocs do XAMPP e você pode consultar ou mudar o endereço de DocumentRoot pelo arquivo de configuração do Servidor Apache (exemplo: arquivo httpd.conf).</p>

<p>Configure um VirtualHost no Servidor Apache para este sistema.<br/>
Dica: configure com a porta 80 e ServerName localhost, se tiver dúvida procure algum tutorial.<br/>
Se utiliza XAMPP, o arquivo de configuração do Servidor Apache para VirtualHost será apache\conf\extra\httpd-vhosts.conf<br/>
Exemplo de VirtualHost configurado:<br/>
<code>&lt;VirtualHost *:80&gt;</code><br/>
<code>&nbsp;&nbsp;DocumentRoot "C:\Users\Rodrigo\Servidores\XAMPP001\htdocs\crud_laravel_react\public"</code><br/>
<code>&nbsp;&nbsp;ServerName localhost</code><br/>
<code>&lt;/VirtualHost&gt;</code></p>

<p>Inicie ou reinicie o Servidor Apache.</p>

<p>Dentro do diretório crud_laravel_react execute o comando:<br/>
composer install</p>

<p>Renomeie o arquivo .env.example para .env<br/>
Gere a chave APP_KEY do arquivo .env pelo comando: php artisan key:generate</p>

<p>Acesse o endereço http://localhost:80 em um navegador.</p>

<br/>
