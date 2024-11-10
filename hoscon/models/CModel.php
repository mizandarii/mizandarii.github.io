<?php

class CModel{
    public function GetData(){
        $arrayResult[] = array(
            'TITLE' => 'Blog hosting site',
            'DATE' => '22.06.2020',
            'AUTHOR' => 'VolDeMort',
            'IMAGE' => './assets/images/coffeecat.jpg',
            'TEXT' => 'Nulla morbi, ad pur Portwisu morbsed idarcu vestibulum dolor conmtum ax agestas lorem elit libere'
        );

        $arrayResult[] = array(
            'TITLE' => 'Blog hosting site NEW',
            'DATE' => '21.10.2021',
            'AUTHOR' => 'Igor',
            'IMAGE' => './assets/images/coffeecat.jpg',
            'TEXT' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'
        );
        return $arrayResult;
    }
}