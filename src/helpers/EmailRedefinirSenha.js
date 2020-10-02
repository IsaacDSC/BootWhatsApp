require('module-alias/register')
const send = require('@config/email')

async function RedefinirSenha(emailRedefinicao, senhaRedefinicao) {
    await send.transporter.sendMail({
        from: 'food trade business <food-trade-business@outlook.com>',
        to: `${emailRedefinicao}`,
        subject: 'Redefinição de Senha - Developing Solutions Tech',
        text: '',
        html: `
        <!DOCTYPE html>
        <html lang="pt-Br">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lanchonete XXX</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
            <link rel="stylesheet" href="vendors/bootstrap/dist/css/bootstrap.min.css">
            <link rel="stylesheet" href="vendors/font-awesome/css/font-awesome.min.css">
            <link rel="stylesheet" href="vendors/themify-icons/css/themify-icons.css">
            <link rel="stylesheet" href="vendors/flag-icon-css/css/flag-icon.min.css">
            <link rel="stylesheet" href="vendors/selectFX/css/cs-skin-elastic.css">

            <link rel="stylesheet" href="assets/css/style.css">
            <link rel="stylesheet" href="/css/forgotPassword.css">

            <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'>
        </head>

        <body>
        <div style="background-color: #e9ecef;">

        <!-- start preheader -->
        <div class="preheader"
            style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
            A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
        </div>
        <!-- end preheader -->

        <!-- start body -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">

            <!-- start logo -->
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 36px 24px;">
                                <a href="https://sendgrid.com" target="_blank" style="display: inline-block;">
                                    <img src="./img/paste-logo-light@2x.png" alt="Logo" border="0" width="48"
                                        style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                                </a>
                            </td>
                        </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
                </td>
            </tr>
            <!-- end logo -->

            <!-- start hero -->
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                                <h1
                                    style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                                    Reset Senha - ${senhaRedefinicao}</h1>
                            </td>
                        </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
                </td>
            </tr>
            <!-- end hero -->

            <!-- start copy block -->
            <tr>
                <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                <p style="margin: 0;">Toque no botão abaixo para redefinir a senha da sua conta. Se você não
                                    solicitou uma nova senha, você pode excluir este e-mail com segurança.</p>
                            </td>
                        </tr>
                        <!-- end copy -->

                        <!-- start button -->
                        <tr>
                            <td align="left" bgcolor="#ffffff">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                            <table border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                                         <a href="http://10.0.0.122/" target="_blank"
                                                            style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">
                                                            Confirmação Código</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- end button -->

                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                <p style="margin: 0;">
                                    Se isso não funcionar, Entre em contato com o Suporte Técnico</p>
                                <p style="margin: 0;"><a href="https://sendgrid.com"
                                        target="_blank">https://same-link-as-button.url/xxx-xxx-xxxx</a></p>
                            </td>
                        </tr>
                        <!-- end copy -->

                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff"
                                style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                                <p style="margin: 0;">Obrigado,<br>Pela Preferência</p>
                            </td>
                        </tr>
                        <!-- end copy -->

                    </table>
                    <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
                </td>
            </tr>
            <!-- end copy block -->

            <!-- start footer -->
            <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                    <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                        <!-- start permission -->
                        <tr>
                            <td align="center" bgcolor="#e9ecef"
                                style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                <p style="margin: 0;">Você recebeu este e-mail porque recebemos uma solicitação de
                                    [type_of_action] para sua conta. Se você não solicitou [type_of_action], pode excluir
                                    este e-mail com segurança.</p>
                            </td>
                        </tr>
                        <!-- end permission -->

                        <!-- start unsubscribe -->
                        <tr>
                            <td align="center" bgcolor="#e9ecef"
                                style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                <p style="margin: 0;">Para mais informações entre em contato com o<a
                                        href="https://sendgrid.com" target="_blank"> Suporte Técnico</a> a gora!.</p>
                                <p style="margin: 0;">Author: IsaacDSC & Mateus Mendes</p>
                            </td>
                        </tr>
                        <!-- end unsubscribe -->

                    </table>
                    <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
                </td>
            </tr>
            <!-- end footer -->

        </table>
        <!-- end body -->

    </div>

            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
                integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
                crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
                integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
                crossorigin="anonymous"></script>
            <script src="vendors/jquery/dist/jquery.min.js"></script>
            <script src="vendors/popper.js/dist/umd/popper.min.js"></script>
            <script src="vendors/bootstrap/dist/js/bootstrap.min.js"></script>
            <script src="assets/js/main.js"></script>

            <script src="/scripts/mascaraTelefone.js"></script>
            <script src="/scripts/mascaraCpf.js"></script>

        </body>

        </html>
        `

    }).then((message) => {
        console.log(message)
    }).catch((err) => {
        console.log(err)
    })

}


exports.RedefinirSenha = RedefinirSenha