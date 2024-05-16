import {FlashMessages} from "./classes/FlashMessages.js";
import LoginValidation from "./classes/LoginValidation.js";

/**
 * @function auth - Função que valida os arquivos do formulário de login antes de os dados 
 * serem enviados para o back-end
 *
 * @param {Event} e
 */
const auth = (e)=>{
    e.preventDefault();
         
    const validate = new LoginValidation;
    validate.validated();

    if(!validate.errors()){
        FlashMessages.success("Campos validados com sucesso!");
        // e.target.submit();
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
