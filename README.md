# ValidationJS

Este projeto contém uma classe de validação front-end que usa as stacks:

- JavaScript;
- Bootstrap;
- Jquery.

para fornecer uma experiência de usuário suave e eficiente.

<img src="./assets/img/image1.png" alt="Imagem da tela inicial da tela de login sem as mensagens de validação">


<img src="./assets/img/image2.png" alt="Imagem da tela inicial da tela de login com as mensagens de validação">

## Importante

Esta classe de validação uusa módulos ES6, que requerem o uso de `import` e `export`. Por conta disso,
é necessário que a classe seja executada em um servidor local ou remoto. A execução direta pelo protocolo
`file://` não funcionára devido às restrições de CORS (Cross-Origin Resource Sharing) impostas pelos navegadores modernos para módulos ES6.

Certifique-se de acessar os arquivos através de um servidor, como o Live Server no Visual Studio Code ou qualquer outro servidor de sua preferência.

## Começando

Para começar a usar esta classe de validação, clone o repositório em sua máquina local e inclua os arquivos necessários em seu projeto.

### Pré-requisitos

- Bootstrap
- Jquery
- Servidor local ou remoto (Live Server)

### Instalação
Clone o repositório

```
git clone https://github.com/GE-ASDF/ValidationJS.git
```

Inclua o Jquery e o Bootstrap e o arquivo close-btns.js
```
<script src="./assets/js/bootstrap.bundle.js"></script>
<script src="./assets/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js" integrity="sha512-3gJwYpMe3QewGELv8k/BX9vcqhryRdzRMxVfq6ngyWXwo03GFEzjsUm8Q7RZcHPHksttq7/GFoxjCVUjkjvPdw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="./assets/js/close-btns.js"></script>
```

Crie um arquivo JS de validação, por exemplo:
```
LoginValidation.js
```
Agora crie o arquivo que executará as validações e inclua no seu HTML, por exemplo:
```
<script type="module" src="./assets/js/login.validation.js"></script> 
```

### Uso da classe

Abra o arquivo de validação que você criou (LoginValidation.js) importe a classe Validation.js, crie uma classe com o mesmo nome do arquivo e crie as regras de validação no método rules(), por exemplo:

```
import Validation from "./Validation.js";

/**
 * Classe de validação dos campos do formulário de login
 * @function rules - método que retorna as regras de validação dos campos
 * @function messages - método que define as mensagens que deverão aparecer para o usuário
 * quando os campos forem validados
 * @example 
 * // Exemplo de uso
 * rules(){
 *   return{
 *      user: 'required|minlen:3',
 *      password:'required'
 *   }
 * }
 * messages(){
 *       return {
 *           "user.required":"O campo usuário é obrigatório.",
 *           "user.minlen":"O campo usuário deve ter no mínimo 3 caracteres",
 *           "password.required":"O campo senha é obrigatório.",
 *       }
 *   }
 */
export default class LoginValidation extends Validation{

    /**
     * @function validated
     * @description Chama o método validate() passando como parâmetro o objeto this
     * @example
     * // Exemplo de uso
     * const validation = new LoginValidation()
     * validation.validated()
     * @returns void
     */
    validated(){
        this.validate(this);
    }

    /**
     * Método que retorna as regras de validação 
     * @returns object
     */
    rules(){
        return {
            'user': 'required|minlen:3',
            'password':'required',
        };
    }
    /**
     * @function messages
     * @description Define as mensagens que deverão ser apresentadas ao usuário
     * quando a validação dos campos terminar
     * @returns object
     */
    messages(){
        return {
            "user.required":"O campo usuário é obrigatório.",
            "user.minlen":"O campo usuário deve ter no mínimo 3 caracteres",
            "password.required":"O campo senha é obrigatório.",
        }
    }

}
```

Agora no arquivo que executará a validação (login.validation.js) importe o JS de validação (LoginValidation.js) e o JS FlashMessages.js. A validação pode ser executada s a partir de um evento, por exemplo:

```
import {FlashMessages} from "./classes/FlashMessages.js";
import LoginValidation from "./classes/LoginValidation.js";

const auth = (e)=>{
    e.preventDefault();
         
    const validate = new LoginValidation;
    validate.validated();

    if(!validate.errors()){
        e.target.submit();
    }else{
        const errors = validate.errors();
        for(let error in errors){
            for(let message in errors[error]){
                FlashMessages.danger(errors[error][message]);
            }
        }
    }
}

$(document).on("submit", "#form-login", auth)
```

### Removendo validação de um campo

Caso você não queira validar um campo de formulário, basta não colocá-lo nas regras de validação ou criar um atributo `data-validation="false"` no input HTML. Por exemplo:

```
// Nas regras de validação
rules(){
        return {
            // O campo user do formulário não será validado
            // 'user': 'required|minlen:3',
            'password':'required',
        };
    }

// No input HTML
<input data-validation="false" type="text" class="form-control" name="user" placeholder="Digite seu usuário">

```

### Validações disponíveis

- required;
- minlen;
- maxlen;
- optional.

### Validação múltipla

Para validação múltipla de um campo basta usar o símbolo `|` entre uma validação e outra, por exemplo:
```
    user: "required|minlen:3"
```

### Envio de parâmetros para a validação

Para enviar um parâmetro para uma validação basta usar o símbolo `:`, por exemplo:
```
    user: "minlen:3"
```

### MAIS INFORMAÇÕES

Você pode criar novos métodos para complementar a classe de validação, basta criá-los no arquivo Validation.js que está em `./assets/js/classes/Validation.js`

As classes principais estão documentadas para um melhor estudo.

