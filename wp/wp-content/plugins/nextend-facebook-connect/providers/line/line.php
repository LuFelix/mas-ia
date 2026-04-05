<?php

class NextendSocialProviderLine extends NextendSocialProviderDummy {

    protected $color = '#06C755';

    public function __construct() {
        $this->id     = 'line';
        $this->docUrl = 'https://social-login.nextendweb.com/documentation/providers/line/';
        $this->label  = 'Line';
        $this->path   = dirname(__FILE__);
    }
}

NextendSocialLogin::addProvider(new NextendSocialProviderLine());