<?php

class NextendSocialProviderMicrosoft extends NextendSocialProviderDummy {

    protected $color = '#2F2F2F';

    public function __construct() {
        $this->id     = 'microsoft';
        $this->docUrl = 'https://social-login.nextendweb.com/documentation/providers/microsoft/';
        $this->label  = 'Microsoft';
        $this->path   = dirname(__FILE__);
    }
}

NextendSocialLogin::addProvider(new NextendSocialProviderMicrosoft());