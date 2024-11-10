<?php

require_once ('./models/CModelDB.php');
require_once ('./views/CView.php');

class CController{
    public $model;
    public $view;

    public function SetMainPage () {
        $model = new CModelDB('localhost', 'root', '', 'php_blog');
        $resultModel = $model->GetData();

        return $resultModel;
    }

}