import { in_array } from "./helpers.js";

/**
 * @description Classe de validação de campos de formulários. Não substitui a validação no backend.
 * @function validate - este método chama as validações dos campos
 * @function required - este método é para validação de campos requeridos
 * @function minlen - este método é para validar a quantidade de mínima de caracteres que um campo deve ter
 */
export default class Validation{
    /**
 * Os erros da validação
 *
 * @type {object}
 */
#errors;
    /**
 * Os campos a serem validados
 *
 * @type {HTMLCollection}
 */
#inputs;
    /**
 * Os valores dos campos validados
 *
 * @type {object}
 */
#result;
    /**
 * Uma classe filho que estende a classe pai Validation
 *
 * @type {instanceof Validation}
 */
#request;
    /**
 * As regras de validação para os campos
 *
 * @type {object}
 */
validations;

    /**
     * Valida campos de formulários
     * @param {object} validations 
     */
    validate(validations){
        let result = {};
        let param = '';
        this.#inputs = Array.from(document.querySelectorAll("[data-validation]"));
        this.#request = validations;

        if(!this.#inputs){
            throw new Error("É necessário informar o data-validation e o data-field nos campos a serem validados.")
        }

        if(this.#request && this.#request instanceof Validation){
            this.messages = this.#request['messages'];
            this.validations = this.#request.rules();
        }else{
            this.validations = validations;
        }

        this.#filterInputs();

        for(let field in this.validations){
            let validate = this.validations[field];
            if(this.validations[field].includes("|")){
                result[field] = this.#multipleValidation(validate, field, param);
            }else{
                result[field] = this.#uniqueValidation(validate, field, param);
            }
        }
            
        if(in_array(result, false, true)){
            return false;
        }
        this.#result = result;
       
    }

    /**
     * @description É chamado quando um campo tem múltiplas validações
     * @param {function} validate 
     * @param {string} field 
     * @param {string} param 
     * @returns string|false
     */
    #multipleValidation(validate, field, param){
        let result = [];
        let explodeValidatePipe = validate.split("|");
        for(let i =0; i < explodeValidatePipe.length; i++){
            result[field] = this.#uniqueValidation(explodeValidatePipe[i], field, param)
            if(result[field] === false || result[field] === null){
                break;
            }
        }
        return result[field];
    }
     /**
     * @description É chamado quando um campo tem uma única validação
     * @param {function} validate 
     * @param {string} field 
     * @param {string} param 
     * @returns string|false
     */
    #uniqueValidation(validate, field, param){
        if(validate.includes(":")){
            [validate, param] = validate.split(":");           
        }

        let func = this[validate];
            if(typeof func === "function"){
            return func.call(this, field, param);
        }
  
    }

    /**
     * Retorna todos os elementos validados com seus respectivos valores caso haja
     * @returns object|null
     */
    all(){
        return this.#result;
    }

    /**
     * Filtra os campos que devem ser validados de acordo com a propriedade data-validation,
     * caso não esteja com "true" a validação será removido do objeto #validations
     * @returns void
     */
    #filterInputs(){
        for(let i=0;i < this.#inputs.length;i++){
            const item = this.#inputs[i];
            if(!((item.name in this.validations) && item.dataset.validation.toLowerCase() == "true")){
                delete this.validations[item.name];   
            }
        }        
    }

     /**
     * Verifica se um campo não está vazio.
     * @param {string} field 
     * @returns string|bool
     */
      required(field){
        const value = this.#getValueOfField(field);

        if(value){
            return value;
        }

        this.#setError(field, 'required', 'Este campo é obrigatório.');
        return false;        
    }

    /**
     * Verifica se um campo é opcional.
     * @param {string} field 
     * @returns 
     */
    optional(field){
        const value = this.#getValueOfField(field);

        if(value){
            return value;
        }
        return null;    
    }

    /**
     * Verifica se o valor do campo possui a quantidade mínima de caracteres
     * @param {string} field - o campo a ser validado
     * @param {string} param - a quantidade mínima de caracteres que o campo deve ter 
     * @returns string|bool
     */
    minlen(field, param){
        const value = this.#getValueOfField(field);
        if(value.length < param || !value){
            this.#setError(field, 'minlen', `O campo deve ter no mínimo ${param} caractere(s)`);
            return false;
        }
        return value;
    }

     /**
     * Verifica se o valor do campo possui a quantidade máxima de caracteres permitida
     * @param {string} field - o campo a ser validado
     * @param {string} param - a quantidade máxima de caracteres que o campo deve ter 
     * @returns string|bool
     */
      maxlen(field, param){
        const value = this.#getValueOfField(field);
        if(value.length > param || !value){
            this.#setError(field, 'maxlen', `O campo deve ter no mínimo ${param} caractere(s)`);
            return false;
        }
        return value;
    }

    /**
     * Pega o valor dos campos a serem validados
     * @param {string} field - o campo do qual deve ser extraído o valor
     * @returns string|null
     */
    #getValueOfField(field){
        let result = [];
        for(let i = 0; i < this.#inputs.length;i++){
            if(true === (this.#inputs[i].name == field && this.#inputs[i].dataset.validation == "true")){
                const type = this.#inputs[i].type;
                if(type){
                    if(type === 'text' || type === 'password' || type === 'hidden' || type === 'textarea'){
                        result = [...result, this.#inputs[i].value.trim()];
                        console.log(result);
                    }else if(type === 'radio'){
                        result = [...result, this.#inputs[i].checked];
                    }else if(type === 'checkbox'){
                        result = [...result, this.#inputs[i].checked];
                    }
                }
            }
        }

        return result.join("");
    }
    
    /**
     * Define um erro no atributo privado errors
     * @param {string} field 
     * @param {string} method 
     * @param {string} value 
     * @returns this
     */
    #setError(field, method, value){
  
        if(this.#errors){
            if(field in this.#errors){
                this.#errors = {...this.#errors, [field]:{[method]:value}}
            }else{
                this.#errors = {...this.#errors, [field]:{[method]:value}}
            }
        }else{
            this.#errors = {[field]:{[method]:value}};
        }
        return this;
    }


    /**
     * Retorna todos os erros caso haja
     * @returns object|null
     */
    errors(){
        this.setMessages();
        return this.#errors;
    }

    /**
     * Troca as mensagens do atributo privado #errors caso a classe filho possua o método messages().
     * @param {object} messages 
     * @returns void
     */
    #changeMessages(messages){
        for(let key in messages){
            if(key.includes(".")){
                const [field, method] = key.split(".");
                if(this.#errors){
                    if(field in this.#errors){
                        if(method in this.#errors[field]){
                            this.#errors[field][method] = messages[field+"."+method];
                        }
                    }
                }
            }
        }
    }
    
    /**
     * Impõe as mensagens das validações
     * @param {object} messages 
     * @returns void
     */
    setMessages(messages){
        if(messages){
            this.#changeMessages(messages);
        }else{
            this.#changeMessages(this.messages());
        }       
    }
   
}