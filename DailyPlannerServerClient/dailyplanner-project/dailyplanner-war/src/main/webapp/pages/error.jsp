<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>

<html data-ng-app="App">
<head>
    <meta charset="utf-8">
    <title>Fehler bei der Anmeldung</title>

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

<div class="login-error">
    <div class="alert alert-danger">
        <h4>Fehler bei der Anmeldung</h4>
        <p>
            Entweder sind Sie bei uns nicht registriert oder Sie haben ein falsches Passwort angegeben. Bitte versuchen Sie
            es noch einmal:
            <c:url var="urlApplication" value="/pages/index.html"/>
            <a href="${urlApplication}">Anmeldung</a>.
        </p>
    </div>
</div>

</body>
</html>