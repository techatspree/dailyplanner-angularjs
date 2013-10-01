<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>

<html>
<head>
    <meta charset="utf-8">
    <title>Anmeldung</title>

    <!-- don't remove!!! -->
    <meta name="authorized" content="false">

    <!-- CSS -->
    <c:url var="urlNormalize" value="/css/normalize.css"/>
    <link rel="stylesheet" type="text/css" href="${urlNormalize}">

    <c:url var="urlBootstrap" value="/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="${urlBootstrap}">

    <c:url var="urlFontAwesome" value="/css/font-awesome.min.css"/>
    <link rel="stylesheet" type="text/css" href="${urlFontAwesome}">

    <c:url var="urlAppCss" value="/css/app.css"/>
    <link rel="stylesheet" type="text/css" href="${urlAppCss}">
</head>
<body>

<div class="login clearfix">
    <form method="post" action="j_security_check" name="loginForm" role=form>
        <div class="form-group">
            <input id="username" type="text" name="j_username" placeholder="Benutzername">
            <label for="username"><span class="icon-user"></span></label>
        </div>

        <div class="form-group">
            <input id="password" type="password" name="j_password" placeholder="Passwort">
            <label for="password"><span class="icon-lock"></span></label>
        </div>

        <input type="submit" class="btn btn-lg btn-block btn-default" value="Anmelden">
    </form>
</div>

</body>
</html>