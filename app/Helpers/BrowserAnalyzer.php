<?php

namespace App\Helpers;

class BrowserAnalyzer
{
    public static function supportGzipCompression()
    {
        $result = new \WhichBrowser\Parser($_SERVER['HTTP_USER_AGENT']);

        // return false;
        return $result->isBrowser('Chrome', '>=', '50') ||
               $result->isBrowser('Firefox', '>=', '44') ||
               $result->isBrowser('Opera', '>=', '38') ||
               $result->isBrowser('Edge', '>=', '15') ||
               $result->isBrowser('Safari', '>=', '11') ||
               $result->isBrowser('iOS Safari', '>=', '11.2') ||
               $result->isBrowser('Android', '>=', '66') ||
               $result->isBrowser('Opera Mobile', '>=', '46') ||
               $result->isBrowser('Firefox Android', '>=', '60') ||
               $result->isBrowser('Chrome Android', '>=', '66') ||
               $result->isBrowser('UC Browser', '>=', '11.8') ||
               $result->isBrowser('Samsung Internet', '>=', '5') ||
               $result->isBrowser('QQ', '>=', '1.2');
               
    }
}
