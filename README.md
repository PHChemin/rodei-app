# Rodei
## Sobre o aplicativo

O Rodei é um aplicativo móvel voltado para a gestão financeira de caminhões, desenvolvido com o objetivo de oferecer maior controle e organização nas operações logísticas. Através dele, será possível acompanhar as finanças do caminhão, registrar e visualizar as viagens realizadas, despesas associadas e eventuais imprevistos ocorridos durante os trajetos. O sistema contará com dois perfis de usuário: gestores e motoristas. O gestor será responsável por cadastrar caminhões, registrar viagens e lançar ou acompanhar as despesas informadas. Já o motorista poderá registrar os gastos ocorridos ao longo da viagem.  
  
O aplicativo será desenvolvido utilizando o React Native. Para a interface, será utilizado o React Native Elements, e a comunicação entre o aplicativo e o backend será feita por meio de uma API desenvolvida em Laravel.

## Como rodar o projeto

### 📦 Backend (Laravel 12)
```bash
# 1. Clone o repositório
git clone https://github.com/PHChemin/rodei-app.git
cd rodei-app/backend

# 2. Instale as dependências PHP
composer install

# 3. Copie o arquivo de ambiente
cp .env.example .env

# 4. Gere a chave da aplicação
php artisan key:generate

# 5. Execute as migrações
php artisan migrate

# 6. Rode a aplicação em modo desenvolvimento
php artisan serve
```
### 📱 Mobile (React Native + Expo)
```bash
# 1. Vá até o diretório do app mobile
cd mobile-app/

# 2. Instale as dependências
yarn install

# 3. Copie o arquivo .env de exemplo (se existir)
cp .env.example .env

# 5. Inicie o projeto
yarn start
```

## Interface do Aplicativo
[https://youtu.be/KY5VE2RL9Lo](https://youtu.be/yvXVXeb6b6E)

## Diagrama do Banco
Diagrama da API:  
https://dbdiagram.io/d/RodeiDiagram-68041a181ca52373f599e8fd

<img width="1291" height="821" alt="rodei-diagram" src="https://github.com/user-attachments/assets/b1e6a76b-8ecb-4ce3-b44e-3d9571efaf43" />


## Protótipos de Telas
Protótipo realizado no Figma _(Página v2)_  
  
https://www.figma.com/design/tHKk2Co4Vp2Ffndpv8GiZn/Rodei?node-id=0-1&t=VIIJsGCZvSlDJJGy-1
