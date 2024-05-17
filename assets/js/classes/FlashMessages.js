export class FlashMessages{
    static onlyOne = false;
    static defaultTime = 10;

    static messageTemplate(message, time) {
        return `
            <span style="transition: all 0.6s ease-in-out;" class="alert alert-success d-flex flex-column">
                <span class="d-flex justify-content-between align-items-center">
                    ${message}
                    <span class="btn mx-1 btn-close"></span>
                </span>
                <span class="tempo-decorrido rounded bg-success" data-time="${time}"></span>                    
            </span>
        `;
    }

    btnClose(alertElement, intervalId) {
        const btn = alertElement.querySelector(".btn-close");
        btn.addEventListener("click", () => {
            clearInterval(intervalId);
            alertElement.remove();
        });
    }

    static updateProgress(alertElement, time) {
        const progressBar = alertElement.querySelector(".tempo-decorrido");
        let tempoRestante = time;
        const intervalId = setInterval(() => {
            if (tempoRestante >= 0) {
                progressBar.style.width = `${(tempoRestante / time) * 100}%`;
                progressBar.textContent = `${tempoRestante}s`;
                tempoRestante -= 1;
            } else {
                clearInterval(intervalId);
                alertElement.remove();
            }
        }, 1000);

        return intervalId;
    }

    static print(message, time = FlashMessages.defaultTime) {
        FlashMessages.showMessage(message, time);
    }

    static showMessage(message, time) {
        FlashMessages.ensureContainerExists();
        const mensagemInformacional = document.getElementById("mensagem-informacional");
        const messageHtml = FlashMessages.messageTemplate(message, time);
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = messageHtml;

        // Adicionar mensagem sem recriar todas
        if (FlashMessages.onlyOne) {
            mensagemInformacional.innerHTML = '';
        }
        mensagemInformacional.appendChild(tempDiv.firstElementChild);

        // Get the newly added alert element
        const newAlert = mensagemInformacional.lastElementChild;
        if (newAlert) {
            const intervalId = FlashMessages.updateProgress(newAlert, time);
            const flash = new FlashMessages();
            flash.btnClose(newAlert, intervalId);
        } else {
            console.error("Failed to find the newly added alert element.");
        }
    }

    static ensureContainerExists() {
        if (!document.getElementById("mensagem-informacional")) {
            const div = document.createElement("div");
            div.id = "mensagem-informacional";
            div.style.overflowY = "auto";
            div.style.maxHeight = "100vh";
            div.classList.add("d-flex", "flex-column", "align-items-end");
            document.body.appendChild(div);
        }
    }


        /**
     * ${1:Description placeholder}
     *
     * @static
     * @param {*} message
     */
    static success(message, time = FlashMessages.defaultTime){
        FlashMessages.print(message, time)
    }

        /**
     * ${1:Description placeholder}
     *
     * @static
     * @param {*} message
     */
    static primary(message, time = FlashMessages.defaultTime){
        FlashMessages.print(message, time)
    }
        
        /**
     * ${1:Description placeholder}
     *
     * @static
     * @param {*} message
     */
    static danger(message, time = FlashMessages.defaultTime){
        FlashMessages.print(message, time)
    }

        /**
     * ${1:Description placeholder}
     *
     * @static
     * @param {*} message
     */
    static warning(message, time = FlashMessages.defaultTime){
        FlashMessages.print(message, time)
    }
    static unique(){
        FlashMessages.onlyOne = true;
    }
}