# MS Account App

## Descrição
O MS Account App é uma aplicação Node.js que utiliza Docker para facilitar o ambiente de desenvolvimento, junto com um banco de dados MySQL. Esta aplicação gerencia contas de usuário, permitindo operações como criação, leitura, atualização e exclusão de informações de conta.

## Funcionalidades Principais
- Gerenciamento de contas de usuário através de uma API RESTful.
- Persistência de dados usando MySQL.
- Documentação da API gerada automaticamente com Swagger.

## Pré-requisitos
Antes de iniciar, verifique se você possui os seguintes requisitos instalados em seu sistema:
- Docker
- Um arquivo `.env` configurado com as variáveis de ambiente necessárias (exemplo fornecido no repositório).

## Instalação e Uso
Siga as instruções abaixo para configurar e executar o MS Account App localmente.

### 1. Clone o Repositório
```bash
git clone https://github.com/matheusmoura10/teste-empreende-aqui.git
cd teste-empreende-aqui
```

### 2. Inicie os Containers Docker
Execute o seguinte comando para construir e iniciar os containers do Docker:
```bash
docker compose up -d --build
```

### 3. Acesse a Aplicação
Após os containers serem iniciados com sucesso, a aplicação estará disponível em [http://localhost:3000](http://localhost:3000). Você pode realizar solicitações HTTP para esta URL para interagir com a API.
Adicionei `Insomnia.json` como um exemplo de arquivo de configuração do Insomnia na raiz do projeto para ilustrar como os endpoints da API podem ser testados e documentados.

### 4. Documentação da API
A documentação da API está disponível em [http://localhost:3000/api](http://localhost:3000/api). Use o Swagger para explorar e testar os endpoints da API.

## Estrutura do Projeto
A estrutura de diretórios do projeto é organizada da seguinte forma:

Claro, vou continuar adicionando as próximas seções ao README:

markdown
Copiar código
### 3. Acesse a Aplicação
Após os containers serem iniciados com sucesso, a aplicação estará disponível em [http://localhost:3000](http://localhost:3000). Você pode realizar solicitações HTTP para esta URL para interagir com a API.

### 4. Documentação da API
A documentação da API está disponível em [http://localhost:3000/api](http://localhost:3000/api). Use o Swagger para explorar e testar os endpoints da API.

### 5. Estrutura do Projeto
A estrutura de diretórios do projeto é organizada da seguinte forma:

Nesta estrutura, a pasta `src/@core` contém a lógica de negócio e a infraestrutura da aplicação, enquanto outras pastas dentro de `src` são relacionadas ao framework e suas funcionalidades específicas.





