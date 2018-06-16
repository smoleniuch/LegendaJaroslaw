<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="stylesheet">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name='csrf-token' id='csrf-token' content="{{ csrf_token() }}">
        <meta id='preloaded-store' content="{{ $preloadedState }}">
    </head>
    <body>
      <div id="app"></div>
      <script src="{{ asset($bundlePath) }}"></script>
    </body>
</html>
