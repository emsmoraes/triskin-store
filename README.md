# Triskin Store

> Aplicação modelo de e-commerce que permite listagem, edição e gerenciamento de produtos, com carrinho de compras persistente e processo de checkout simples.

## 🚀 Instalando

Para instalar o Triskin Store, siga estas etapas:

### 1. Clone o projeto do GitHub:

```sh
git clone https://github.com/emsmoraes/triskin-store.git
```

### 2. Entre na pasta do projeto:

```sh
cd triskin-store
```

### 3. Instale as dependências:

```sh
yarn
# ou
npm install
```

## ☕ Usando

Para rodar o projeto em modo desenvolvimento:

```sh
yarn dev
# ou
npm run dev
```

## 🧪 Testes

Para rodar os testes unitários:

```sh
yarn test
# ou
npm test
```

## 💡 Explicações das estratégias

- **Zustand:** Optei por utilizar Zustand pela performance, evitando re-renderizações desnecessárias, ao contrário do Context API, que poderia re-renderizar componentes ao redor.
- **Shadcn:** Escolhi o Shadcn pela personalização simples e eficiente, integração direta com Tailwind e pela agilidade no desenvolvimento.
- **Status ativo/inativo:** Como a API utilizada não possui um status de ativo/inativo, criei esse boolean com base no preço: valores ímpares indicam “ativo” e pares “inativo”.
- **Filtragem:** Para filtragem da lista, preferi filtrar apenas o array em memória, já que o número de itens é pequeno e isso não impacta a performance; em cenários com grandes volumes, implementaria a filtragem via API.
- **Formulários:** Utilizei React Hook Form com Zod para um controle mais robusto e seguro dos formulários.
- **Carrinho:** No carrinho, mantive a lógica simples: um item é considerado o mesmo apenas se id, título, preço e imagem forem idênticos. Assim, qualquer alteração em um desses campos gera um novo item, mesmo que o anterior permaneça.
- **React Query:** Escolhi o React Query pela praticidade, eliminando a necessidade de criar estados e funções manuais para requisições, além de contar com seu cache eficiente que otimiza o carregamento de dados.

## 🤝 Criador

Feito com ❤️ por Eduardo Meneses para a Triskin:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/emsmoraes" title="Eduardo Meneses">
        <img src="https://avatars.githubusercontent.com/u/85969484?s=400&u=b0e89e575a7cb91fc9f8a69e126a9d7587aa9478&v=4" width="100px;" alt="Foto do Eduardo Meneses no GitHub"/><br>
        <sub>
          <b>Eduardo Meneses</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
