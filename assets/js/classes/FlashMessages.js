export class FlashMessages{

    /**
 * ${1:Description placeholder}
 */
btnClose(){
        Array.from(document.getElementsByClassName("btn-close")).forEach(btn=>{
            btn.addEventListener("click", (e)=>{
                e.target.parentNode.remove();
            })
        })
        Array.from(document.getElementsByClassName("btn-close")).forEach(btn=>{
           setTimeout(() => {
             btn.parentNode.remove();
           }, 7000);
        })
    }

    static print(message){
        let mensagemInformacional = document.getElementById("mensagem-informacional");
        if(mensagemInformacional){
            mensagemInformacional.innerHTML +=`   
            <span style="transition: all 0.6s ease-in-out;" class="alert alert-success d-flex justify-content-between align-items-center">
                ${message}
                <span class="btn mx-1  btn-close"></span>
            </span>
            `
        }else{

            document.body.innerHTML +=`
            <div id="mensagem-informacional" style="overflow-y:auto;max-height:100vh" class="d-flex flex-column align-items-end">
            </div>
            `
            this.print(message)
            // mensagemInformacional = document.getElementById("mensagem-informacional");

        }
    }

    /**
 * ${1:Description placeholder}
 *
 * @static
 * @param {*} message
 */
static success(message){
        FlashMessages.print(message)
        const flash = new FlashMessages();
        flash.btnClose();
    }

    /**
 * ${1:Description placeholder}
 *
 * @static
 * @param {*} message
 */
static primary(message){
        FlashMessages.print(message)
        const flash = new FlashMessages();
        flash.btnClose();
    }
    
    /**
 * ${1:Description placeholder}
 *
 * @static
 * @param {*} message
 */
static danger(message){
        FlashMessages.print(message)

        const flash = new FlashMessages();
        flash.btnClose();
    }

    /**
 * ${1:Description placeholder}
 *
 * @static
 * @param {*} message
 */
static warning(message){
        FlashMessages.print(message)

        const flash = new FlashMessages();
        flash.btnClose();
    }
}