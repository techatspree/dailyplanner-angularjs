<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>

<html data-ng-app="App">
<head>
    <meta charset="utf-8">
    <title>Anmeldung</title>

    <!-- Css -->
    <c:url var="urlNormalize" value="/css/normalize.css"/>
    <link rel="stylesheet" type="text/css" href="${urlNormalize}">

    <c:url var="urlBootstrap" value="/css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="${urlBootstrap}">

    <c:url var="urlFontAwesome" value="/css/font-awesome.min.css"/>
    <link rel="stylesheet" type="text/css" href="${urlFontAwesome}">

    <c:url var="urlAppCss" value="/css/app.css"/>
    <link rel="stylesheet" type="text/css" href="${urlAppCss}">
</head>
<body>

<form method="post" action="j_security_check" name="loginForm" class="form-horizontal">
    <div id="modalLoginDialog" class="modal hide fade" tabindex="-1" role="dialog"
         aria-labelledby="dialogLabel"
         aria-hidden="true">
        <div class="modal-header">
            <h3 id="dialogLabel">Anmeldung</h3>
        </div>
        <div class="modal-body">
            <div class="control-group">
                <label class="control-label" for="username">Login:</label>

                <div class="controls">
                    <input id="username" type="text" name="j_username"
                           placeholder="Kennung"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="password">Passwort:</label>

                <div class="controls">
                    <input id="password" type="password" name="j_password"
                           placeholder="Passwort"/>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <input type="reset" class="btn" value="Zur&uuml;cksetzen"/>
            <input type="submit" class="btn btn-primary" value="Anmelden"/>
        </div>
    </div>
</form>

<!-- JavaScript -->

<c:url var="urlJQuery" value="/js/lib/jquery-1.9.1.min.js"/>
<script type="text/javascript" src="${urlJQuery}"></script>

<c:url var="urlBootstrap" value="/js/lib/bootstrap/bootstrap.js"/>
<script type="text/javascript" src="${urlBootstrap}"></script>

<script type="text/javascript">
$(document).ready(function () {
$('#modalLoginDialog').modal('show');
})
</script>

</body>
</html>