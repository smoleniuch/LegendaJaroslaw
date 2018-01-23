<?php

namespace App\Helpers;

class StringHelper {

  public static function escapeCharacters(string $string,array $characters){

    $characers = array_map(function($char){

      return preg_quote($char);

    },$characters);



    $regexp = '/' . implode($characters, '|') . '/';

    $escapedString = preg_replace($regexp, '\\\\\0', $string);

    return $escapedString;

  }

}
