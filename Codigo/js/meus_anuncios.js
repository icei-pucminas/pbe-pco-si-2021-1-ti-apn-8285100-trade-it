$(document).ready(function () {
    $.post('php/exibe_meus_anuncios.php', function (retorna) {
        let retornou = retorna;
        console.log(retornou);
        if (retornou == "") {
            $("#meusAnuncios").html("Nenhum anúncio encontrado");
        } else {

            let valor = []
            valor = (retornou.split("|"));

            let texto = '';
            let i = 0;
            let status = "";
            while (i < (valor.length - 1)) {
                if ((valor[i + 2]) == 1)
                    status = "Novo";
                else if ((valor[i + 2]) == 2)
                    status = "Usado (Como Novo)";
                else
                    status = "Usado (Aceitável)";

                texto = texto + `
                <fieldset class="fieldsetAnuncio">
                                <div class="row">
                                    <div class="col-12">
                                    <a href="anuncio.php" onclick="define_anuncio('${valor[(i + 3)]}')">
                                        <div class="row">
                                            <div class="col-2 divImagem">
                                                <div class="imagem">
                                                    <img src="${valor[(i + 3)]}" class="card-img-top">
                                                </div>
                                            </div>
                                            <div class="col-10">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="infoAnuncio">
                                                            <div class="row">
                                                                <label for="tituloAnuncio" class="lblInfo"> Título: </label>
                                                                <label id="tituloAnuncio"> ${valor[i]}</label>
                                                            </div>
                                                            <div class="row">
                                                                <label for="descricaoAnuncio" class="lblInfo"> Descrição: </label>
                                                                <label id="descricaoAnuncio" class="descricaoAnuncio"> ${valor[(i + 1)]}</label>
                                                            </div>
                                                            <div class="row">
                                                                <label for="statusAnuncio" class="lblInfo"> Status: </label>
                                                                <label id="statusAnuncio"> ${status}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-12">
                                                    <div class="row">
                                                        <div class="divBtnExcluir">
                                                            <button id="btnExcluirAnuncio" type="submit" class="btn btn-primary btnExcluirAnuncio">Excluir</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </a>
                                    </div>
                                </div>
                            </fieldset>`

                $("#meusAnuncios").html(texto);
                i = i + 4;
            }
        }

    });
});