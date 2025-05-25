# Rodei
## Sobre o aplicativo

O Rodei é um aplicativo móvel voltado para a gestão financeira de caminhões, desenvolvido com o objetivo de oferecer maior controle e organização nas operações logísticas. Através dele, será possível acompanhar as finanças do caminhão, registrar e visualizar as viagens realizadas, despesas associadas e eventuais imprevistos ocorridos durante os trajetos. O sistema contará com dois perfis de usuário: gestores e motoristas. O gestor será responsável por cadastrar caminhões, registrar viagens e lançar ou acompanhar as despesas informadas. Já o motorista poderá registrar os gastos ocorridos ao longo da viagem.  

As funcionalidades vitais para o sistema são:
- Login;
- Registro;
- CRUD Frota;
- CRUD Caminhão;
- Adicionar viagens;
- Relatar despesas;
- Interface para o motorista;
  
Funcionalidades adicionais:
- Editar e deletar uma viagem;
- Dashboard para o gestor;
- Histórico mais detalhado
- Menu inferior;
- Envio de imagens/pdf nas viagens e despesas;
- Perfil do usuário;
  
O aplicativo será desenvolvido utilizando o React Native. Para a interface, será utilizado o React Native Elements, e a comunicação entre o aplicativo e o backend será feita por meio de uma API desenvolvida em Laravel.

## Interface do Aplicativo
[https://youtu.be/KY5VE2RL9Lo](https://youtu.be/yvXVXeb6b6E)

## Diagrama do Banco
Diagrama da API:  
https://dbdiagram.io/d/RodeiDiagram-68041a181ca52373f599e8fd

![RodeiDiagram](https://github.com/user-attachments/assets/eddd4396-3f8e-4798-9339-bd442cf29273)


## Protótipos de Telas
Protótipo realizado no Figma  
  
https://www.figma.com/design/tHKk2Co4Vp2Ffndpv8GiZn/Rodei?node-id=0-1&t=VIIJsGCZvSlDJJGy-1

## Atividades 
Levando em conta, que a API será feita por mim ao mesmo tempo que o mobile, as sprints poderão demorar um tempo maior.  
Dividindo as sprints em **Mobile** e **Backend** para um maior controle e organização, compatível com a divisão das PRs e branchs (mobile/backend badge e nome de branch). As atividades do mobile serão referentes a criação das telas e visual, muitas vezes será feito com _placeholder_ ou _mock_ e posteriormente integrado com a API. 

#### ![Mobile](https://img.shields.io/badge/Mobile-007bff?style=for-the-badge&logo=expo&logoColor=white)

ATIVIDADES / *TEMPO EM SEMANAS*
- [X] Inicio do projeto e configuração do tema da aplicação / *0.2*
- [X] Login de usuários / *0.5*
- [X] Registro de usuários / *0.2*
- [X] CRUD Frotas e Página inicial *Minhas frotas* / *1*
- [ ] Adicionar i118n e as traduções para a aplicação / *0.5*
- [ ] CRUD caminhões / *1*
- [ ] Criar viagem / *1*
- [ ] Histórico do Caminhão / *1*

#### ![Backend](https://img.shields.io/badge/Backend-28a745?style=for-the-badge&logo=laravel&logoColor=white)

ATIVIDADES / *TEMPO EM SEMANAS*
- [X] Inicio do projeto / *1*
- [ ] Login e Registro de usuários / *1*
- [ ] CRUD Frotas e Página inicial *Minhas frotas* / *2*
- [ ] CRUD caminhões / *1*
- [ ] Criar viagem / *1*
- [ ] Histórico do Caminhão / *2*

## Atualizações desde o último checkpoint (25/05/2025)

#### Módulos aplicados
- **Gerenciamento de estado global** - Utilizei o Zustand com o middleware Immer como alternativa à mockagem de dados e uso da API. Foi criado um estado global (useFleetStore) responsável por armazenar as frotas (FleetBase[]) e fornecer funções para adicioná-las, removê-las, atualizá-las, buscá-las e incluir caminhões (TruckBase) em cada frota. Essa abordagem permitiu a criação de telas dinâmicas reais, com dados manipuláveis, evitando a necessidade de passar props entre múltiplos componentes e telas, e facilitando o desenvolvimento sem depender de um backend real durante as fases iniciais do projeto.
- **Projeto Expo e Workflow no GitHub** - O projeto foi iniciado com Expo já configurado com Navigation. Depois, removi arquivos e configurações desnecessárias, mantendo apenas o essencial. Em seguida, instalei as bibliotecas necessárias e integrei os hooks e services do projeto base para dar continuidade ao desenvolvimento. No GitHub, o workflow foi implementado com a configuração do repositório para permitir Pull Requests direcionadas à branch ```main```. Também criei um template para padronizar e melhorar a visualização das PRs. Todo o trabalho realizado até o momento foi feito por meio de Pull Requests documentadas, uso organizado de issues para controle das tarefas, além da padronização das nomenclaturas das branchs seguindo o formato: ```@desenvolvedor/local(mobile ou backend)/número da issue/nome ou descrição da issue```.
- **Roteamento Avançado com Expo Router** - O projeto utiliza o sistema de roteamento do Expo, baseado na estrutura de diretórios da pasta ```app``` e no uso de funções como ```push```, ```replace```, ```back```, entre outras. Adotei uma organização customizada, onde a pasta ```app``` é usada exclusivamente para o roteamento. Nela, arquivos como ```index.tsx``` e componentes ```_Screen``` servem apenas para renderizar os componentes reais das telas. Esses componentes de tela são desenvolvidos e organizados na pasta ```components/pages/```, que espelha a estrutura da pasta ```app```. Em minha visão, esse esquema proporciona uma organização mais limpa e intuitiva, facilitando a leitura e manutenção do projeto, além de permitir a criação de componentes locais (utilizados apenas naquele contexto) sem poluir ou acoplar elementos diretamente à camada de navegação.
- **Biblioteca de Componentes React Native Elements** - Utilizei a biblioteca RNEUI, configurando seu tema e constantes globais do projeto. Seus componentes, como ```Text``` e ```Button```, foram aplicados em praticamente todas as telas do sistema. Além disso, utilizei o hook ```useStyles```, criado a partir da função ```makeStyles```, para definir estilos personalizados com base no tema.
- **Validação de dados com Zod** - Para garantir a tipagem e a validação dos dados, utilizei a biblioteca Zod na definição de schemas. Foram criados os esquemas ```UserBase```, ```ManagerBase```, ```FleetBase``` e ```TruckBase```, e optei por utilizar o sufixo ```Base``` na nomenclatura para permitir futuras extensões e a criação de tipos derivados com base nesses modelos. Esses schemas foram organizados em pastas separadas conforme sua finalidade, o que facilita a organização e visualização. Vale destacar que eles ainda estão sujeitos a ajustes, pois existem funcionalidades a serem adiconadas à aplicação, e também tenho a intenção de que eles reflitam fielmente os schemas do backend.

#### Boas práticas aplicadas
- Foi realizado o **agrupamento de imports** por meio de arquivos ```index.ts``` nas pastas ```components/pages```, ```components/ui``` e ```schemas```, facilitando e simplificando a forma como os componentes e estruturas são importados ao longo do projeto.
- Foram criados **componentes reutilizáveis**, como ```AlertModal```, ```SelectInput```, ```TextInput``` e ```Headers```. Esses componentes são genéricos, pensados para serem utilizados em diferentes contextos da aplicação, e foram organizados dentro da pasta ```ui```.
- Para **componentes** que são **reutilizáveis**, mas não diretamente relacionados à interface de usuário genérica (como por exemplo um ```TruckCard```), foi adotada a pasta ```shared```, reservada para componentes reaproveitáveis mais específicos.
- Também foram implementados **componentes “locais”**, ou seja, utilizados exclusivamente em uma determinada tela. Esses ficam organizados dentro da pasta ```pages```, e seus arquivos e pastas são nomeados com _underline (_)_ para indicar rapidamente seu escopo restrito.
- Um exemplo de **componente composto** é o ```Headers```, que possui variações como ```Header.WithTitle``` e ```Header.WithMenu```. Com isso, ao reutilizar o Header, é possível montar diferentes combinações conforme a necessidade da tela.
- Por fim, os **imports das telas** foram padronizados e organizados em blocos: ```bibliotecas externas e React```; ```services, helpers, hooks e schemas```; ```componentes da UI ou shared```; e, por último, os ```componentes e serviços locais```. Isso melhora a legibilidade e mantém uma estrutura consistente entre os arquivos.
